using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Angular2.Core.DataLayer
{
    [Table("FileBlobs")]
    public class FileBlob
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public byte[] File  { get; set; }
    }
}
