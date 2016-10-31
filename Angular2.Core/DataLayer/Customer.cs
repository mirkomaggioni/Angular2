using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations.Schema;

namespace Angular2.Core.DataLayer
{
    [Table("Customers")]
    public class Customer
    {
        public Guid Id { get; set; }
        public Guid IdCity { get; set; }
        [ForeignKey("IdCity")]
        public virtual City City { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
}
