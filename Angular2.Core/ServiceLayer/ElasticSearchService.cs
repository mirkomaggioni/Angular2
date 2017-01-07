using System;
using System.Collections;
using Angular2.Core.DataLayer;
using Nest;
using Context = Angular2.Core.DataLayer.Context;
using System.Collections.Generic;
using System.Linq;

namespace Angular2.Core.ServiceLayer
{
    public class ElasticSearchService
    {
        private readonly Context _db = new Context();
        private ElasticClient _client;

        public ElasticSearchService(string uri)
        {
            var node = new Uri(uri);
            var setting = new ConnectionSettings(node);
            setting.DefaultIndex("angular2");
            _client = new ElasticClient(setting);            
        }

        public void CreateIndex()
        {
            CreateCityIndex();
        }

        public IEnumerable<City> SearchCities(string query)
        {
            var results = _client.Search<City>(c => c.From(0).Size(10).Query(q => q.Prefix(p => p.Name, query) || q.Term("district.name", query)));

            return results.Documents.OrderBy(d => d.Name);
        }

        private void CreateCityIndex()
        {
            var indexDescriptor = new CreateIndexDescriptor("angular2").Mappings(
                ms => ms.Map<City>(m => m.AutoMap().Properties(ps =>
                    ps.Nested<District>(n => n
                        .Name(nn => nn.District)
                        .AutoMap()))));

            _client.CreateIndex(indexDescriptor);
            _client.IndexMany(_db.Cities, "angular2");
        }
        
    }
}
