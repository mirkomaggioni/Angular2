using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Angular2.Core.DataLayer;

namespace Angular2.Web.Controllers.Api
{
    public class DistrictsController : ApiController
    {
        private readonly Context _db = new Context();

        // GET: api/Districts
        public IQueryable<District> GetDistricts()
        {
            return _db.Districts.OrderBy(d => d.Name);
        }

        // GET: api/Districts/5
        [ResponseType(typeof(District))]
        public IHttpActionResult GetDistrict(Guid id)
        {
            District district = _db.Districts.Find(id);
            if (district == null)
            {
                return NotFound();
            }

            return Ok(district);
        }

        // PUT: api/Districts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDistrict(Guid id, District district)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != district.Id)
            {
                return BadRequest();
            }

            _db.Entry(district).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DistrictExists(id))
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

        // POST: api/Districts
        [ResponseType(typeof(District))]
        public IHttpActionResult PostDistrict(District district)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (district.Id == Guid.Empty)
            {
                district.Id = Guid.NewGuid();
            }

            _db.Districts.Add(district);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (DistrictExists(district.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = district.Id }, district);
        }

        // DELETE: api/Districts/5
        [ResponseType(typeof(District))]
        public IHttpActionResult DeleteDistrict(Guid id)
        {
            District district = _db.Districts.Find(id);
            if (district == null)
            {
                return NotFound();
            }

            _db.Districts.Remove(district);
            _db.SaveChanges();

            return Ok(district);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DistrictExists(Guid id)
        {
            return _db.Districts.Count(e => e.Id == id) > 0;
        }
    }
}