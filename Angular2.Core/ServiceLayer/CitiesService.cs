using System;
using System.Collections.Generic;
using System.Linq;
using Angular2.Core.DataLayer;
using Nest;

namespace Angular2.Core.ServiceLayer
{
    public sealed class CitiesService : ElasticSearchService<City>
    {
        public CitiesService(ElasticSearchClient elasticSearchClient, string indexName): base(elasticSearchClient, indexName) {}

        protected override IResponse CreateIndex()
        {
            var indexDescriptor = new CreateIndexDescriptor(IndexName).Mappings(
                ms => ms.Map<City>(m => m.AutoMap().Properties(ps =>
                    ps.Nested<District>(n => n
                        .Name(nn => nn.District)
                        .AutoMap()))));

            return ElasticSearchClient.GetClient().CreateIndex(indexDescriptor);
        }

        public override IEnumerable<City> Search(string query)
        {
            var results = ElasticSearchClient.GetClient().Search<City>(c => c.From(0).Size(10).Query(q => q.Prefix(p => p.Name, query) || q.Term("district.name", query)));

            return results.Documents.OrderBy(d => d.Name);
        }
    }
}
