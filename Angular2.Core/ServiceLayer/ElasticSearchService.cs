using System;
using System.Collections.Generic;
using System.Linq;
using Nest;
using Context = Angular2.Core.DataLayer.Context;

namespace Angular2.Core.ServiceLayer
{
    public class ElasticSearchService<T> : IElasticSearchService<T> where T : class
    {
        protected readonly Context Db = new Context();
        protected readonly ElasticSearchClient ElasticSearchClient;
        protected readonly string IndexName;

        public ElasticSearchService(ElasticSearchClient elasticSearchClient, string indexName)
        {
            ElasticSearchClient = elasticSearchClient;
            IndexName = indexName;
        }

        public virtual void Init()
        {
            CheckIndex();
            BulkInsert(Db.Set<T>().ToList());
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
            var results = ElasticSearchClient.GetClient().Search<T>(c => c.From(0).Size(10).Query(q => q.Prefix("_all", query)));

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
