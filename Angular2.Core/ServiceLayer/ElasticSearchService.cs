using System;
using System.Collections.Generic;
using Nest;

namespace Angular2.Core.ServiceLayer
{
    public class ElasticSearchService<T> : IElasticSearchService<T> where T : class
    {
        protected readonly ElasticSearchClient ElasticSearchClient;
        protected readonly string IndexName;

        public ElasticSearchService(ElasticSearchClient elasticSearchClient, string indexName)
        {
            ElasticSearchClient = elasticSearchClient;
            IndexName = indexName;
        }

        public void CheckIndex()
        {
            if (IndexExist()) return;
            var response = CreateIndex();

            if (!response.IsValid)
            {
                throw new Exception(response.ServerError.ToString(), response.OriginalException);
            }
        }

        public void BulkInsert(List<T> objects)
        {
            var response = ElasticSearchClient.GetClient().IndexMany(objects, IndexName);
            if (!response.IsValid)
            {
                throw new Exception(response.ServerError.ToString(), response.OriginalException);
            }
        }

        public virtual IEnumerable<T> Search(string query)
        {
            var results = ElasticSearchClient.GetClient().Search<T>(c => c.From(0).Size(10).Query(q => q.Bool(b => b.Must(m => m.QueryString(qs => qs.DefaultField("_all").Query(query))))));

            return results.Documents;
        }

        protected virtual IResponse CreateIndex()
        {
            var indexDescriptor = new CreateIndexDescriptor(IndexName).Mappings(ms => ms.Map<T>(m => m.AutoMap()));
            return ElasticSearchClient.GetClient().CreateIndex(indexDescriptor);
        }

        protected bool IndexExist()
        {
            return ElasticSearchClient.GetClient().IndexExists(IndexName).Exists;
        }
    }
}
