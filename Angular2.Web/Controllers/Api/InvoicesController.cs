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
    public class InvoicesController : ApiController
    {
        private readonly Context _db = new Context();

        // GET: api/Invoices
        public IQueryable<Invoice> GetInvoices()
        {
            return _db.Invoices;
        }

        // GET: api/Invoices/5
        [ResponseType(typeof(Invoice))]
        public IHttpActionResult GetInvoice(Guid id)
        {
            Invoice invoice = _db.Invoices.Find(id);
            if (invoice == null)
            {
                return NotFound();
            }

            return Ok(invoice);
        }

        // PUT: api/Invoices/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutInvoice(Guid id, Invoice invoice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != invoice.Id)
            {
                return BadRequest();
            }

            _db.Entry(invoice).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

        // POST: api/Invoices
        [ResponseType(typeof(Invoice))]
        public IHttpActionResult PostInvoice(Invoice invoice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (invoice.Id == Guid.Empty)
            {
                invoice.Id = Guid.NewGuid();
            }

            _db.Invoices.Add(invoice);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (InvoiceExists(invoice.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = invoice.Id }, invoice);
        }

        // DELETE: api/Invoices/5
        [ResponseType(typeof(Invoice))]
        public IHttpActionResult DeleteInvoice(Guid id)
        {
            Invoice invoice = _db.Invoices.Find(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _db.Invoices.Remove(invoice);
            _db.SaveChanges();

            return Ok(invoice);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool InvoiceExists(Guid id)
        {
            return _db.Invoices.Count(e => e.Id == id) > 0;
        }
    }
}