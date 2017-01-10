using System;
using System.Collections.Generic;
using System.Linq;
using Angular2.Core.DataLayer;
using Nest;
using Context = Angular2.Core.DataLayer.Context;

namespace Angular2.Core.ServiceLayer
{
    public class CitiesService : IElasticSearchService<City>
    {
        private readonly ElasticSearchClient _elasticSearchClient;
        private readonly Context _db = new Context();
        private readonly string _indexName;

        public CitiesService(ElasticSearchClient elasticSearchClient, string indexName)
        {
            _elasticSearchClient = elasticSearchClient;
            _indexName = indexName;
        }

        public ICreateIndexResponse CreateIndex()
        {
            var indexDescriptor = new CreateIndexDescriptor(_indexName).Mappings(
                ms => ms.Map<City>(m => m.AutoMap().Properties(ps =>
                    ps.Nested<District>(n => n
                        .Name(nn => nn.District)
                        .AutoMap()))));

            return _elasticSearchClient.GetClient().CreateIndex(_indexName);
        }

        public IBulkResponse BulkInsert()
        {
            return _elasticSearchClient.GetClient().IndexMany(_db.Cities.ToList(), _indexName);
        }

        public IEnumerable<City> Search(string query)
        {
            var results = _elasticSearchClient.GetClient().Search<City>(c => c.From(0).Size(10).Query(q => q.Prefix(p => p.Name, query) || q.Term("district.name", query)));

            return results.Documents.OrderBy(d => d.Name);
        }
    }
}
