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
        private readonly Context _db = new Context();
        private readonly ElasticSearchService _elasticSearchService;

        public CitiesController(ElasticSearchService elasticSearchService)
        {
            _elasticSearchService = elasticSearchService;
        }

        // GET: api/Cities
        public IEnumerable<City> GetCities(string query)
        {
            return _elasticSearchService.SearchCities(query);
        }

        // GET: api/Cities/5
        [ResponseType(typeof(City))]
        public IHttpActionResult GetCity(Guid id)
        {
            City city = _db.Cities.Find(id);
            if (city == null)
            {
                return NotFound();
            }

            return Ok(city);
        }

        // PUT: api/Cities/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCity(Guid id, City city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != city.Id)
            {
                return BadRequest();
            }

            _db.Entry(city).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Cities
        [ResponseType(typeof(City))]
        public IHttpActionResult PostCity(City city)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (city.Id == Guid.Empty)
            {
                city.Id = Guid.NewGuid();
            }

            _db.Cities.Add(city);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CityExists(city.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = city.Id }, city);
        }

        // DELETE: api/Cities/5
        [ResponseType(typeof(City))]
        public IHttpActionResult DeleteCity(Guid id)
        {
            City city = _db.Cities.Find(id);
            if (city == null)
            {
                return NotFound();
            }

            _db.Cities.Remove(city);
            _db.SaveChanges();

            return Ok(city);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CityExists(Guid id)
        {
            return _db.Cities.Count(e => e.Id == id) > 0;
        }
    }
}