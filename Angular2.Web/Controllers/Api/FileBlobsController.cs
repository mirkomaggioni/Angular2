using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Angular2.Core.DataLayer;

namespace Angular2.Web.Controllers.Api
{
    public class FileBlobsController : ApiController
    {
        private readonly Context _db = new Context();

        [ResponseType(typeof(Guid))]
        public async Task<IHttpActionResult> PostFileBlob()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new Exception();

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);

            HttpContent content = provider.Contents.First();
            var fileName = content.Headers.ContentDisposition.FileName.Trim('\"');
            var buffer = await content.ReadAsByteArrayAsync();

            var fileBlob = new FileBlob()
            {
                Id = Guid.NewGuid(),
                Name = fileName,
                File = buffer
            };

            _db.FileBlobs.Add(fileBlob);
            await _db.SaveChangesAsync();

            return Ok(fileBlob.Id);
        }
    }
}
