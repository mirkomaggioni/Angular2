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
    public class AttachmentsController : ApiController
    {
        private readonly Context _db = new Context();

        // GET: api/Attachments
        public IQueryable<Attachment> GetAttachments()
        {
            return _db.Attachments;
        }

        // GET: api/Attachments/5
        [ResponseType(typeof(Attachment))]
        public IHttpActionResult GetAttachment(Guid id)
        {
            Attachment attachment = _db.Attachments.Find(id);
            if (attachment == null)
            {
                return NotFound();
            }

            return Ok(attachment);
        }

        // PUT: api/Attachments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAttachment(Guid id, Attachment attachment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != attachment.Id)
            {
                return BadRequest();
            }

            _db.Entry(attachment).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttachmentExists(id))
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

        // POST: api/Attachments
        [ResponseType(typeof(Attachment))]
        public IHttpActionResult PostAttachment(Attachment attachment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.Attachments.Add(attachment);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (AttachmentExists(attachment.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = attachment.Id }, attachment);
        }

        // DELETE: api/Attachments/5
        [ResponseType(typeof(Attachment))]
        public IHttpActionResult DeleteAttachment(Guid id)
        {
            Attachment attachment = _db.Attachments.Find(id);
            if (attachment == null)
            {
                return NotFound();
            }

            _db.Attachments.Remove(attachment);
            _db.SaveChanges();

            return Ok(attachment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AttachmentExists(Guid id)
        {
            return _db.Attachments.Count(e => e.Id == id) > 0;
        }
    }
}