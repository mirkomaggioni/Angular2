using System;
using System.Collections.Generic;
using Angular2.Core.DataLayer;
using Nest;

namespace Angular2.Core.ServiceLayer
{
    public class ElasticSearchClient
    {
        private readonly IElasticClient _client;

        public ElasticSearchClient(IElasticClient client)
        {
            _client = client;
        }

        public ElasticSearchClient(string uri, string indexName) : this(CreateElasticClient(uri, indexName)) {}

        public IElasticClient GetClient()
        {
            return _client;
        }

        private static ElasticClient CreateElasticClient(string uri, string indexName)
        {
            var node = new Uri(uri);
            var setting = new ConnectionSettings(node);
            setting.DefaultIndex(indexName);
            return new ElasticClient(setting);
        }
    }
}
