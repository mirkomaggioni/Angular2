using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations.Schema;

namespace Angular2.Core.DataLayer
{
    [Table("Invoices")]
    public class Invoice
    {
        public Guid Id { get; set; }
        public Guid IdAttachment { get; set; }
        [ForeignKey("IdAttachment")]
        public virtual Attachment Attachment { get; set; }
        public Guid IdCustomer { get; set; }
        [ForeignKey("IdCustomer")]
        public virtual Customer Customer { get; set; }
        public int Number { get; set; }
        public int Year { get; set; }
        public DateTime EmissionDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? PaymentDate { get; set; }
    }
}
