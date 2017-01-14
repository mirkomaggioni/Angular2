using System;
using System.Collections;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using Angular2.Core.DataLayer;
using Angular2.Core.ServiceLayer;
using System.Collections.Generic;

namespace Angular2.Web.Controllers.Api
{
    public class CitiesController : ApiController
    {
        private readonly CitiesService _elasticSearchService;

        public CitiesController(CitiesService elasticSearchService)
        {
            _elasticSearchService = elasticSearchService;
        }

        // GET: api/Cities
        public IEnumerable<City> GetCities(string query)
        {
            return _elasticSearchService.Search(query);
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}