namespace Angular2.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Attachments",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        Path = c.String(),
                        Size = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Cities",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        IdDistrict = c.Guid(nullable: false),
                        Name = c.String(),
                        Zip = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Districts", t => t.IdDistrict, cascadeDelete: true)
                .Index(t => t.IdDistrict);
            
            CreateTable(
                "dbo.Districts",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        Country = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        IdCity = c.Guid(nullable: false),
                        Name = c.String(),
                        Address = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Cities", t => t.IdCity, cascadeDelete: true)
                .Index(t => t.IdCity);
            
            CreateTable(
                "dbo.Invoices",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        IdAttachment = c.Guid(nullable: false),
                        IdCustomer = c.Guid(nullable: false),
                        Number = c.Int(nullable: false),
                        Year = c.Int(nullable: false),
                        EmissionDate = c.DateTime(nullable: false),
                        DueDate = c.DateTime(nullable: false),
                        PaymentDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Attachments", t => t.IdAttachment, cascadeDelete: true)
                .ForeignKey("dbo.Customers", t => t.IdCustomer, cascadeDelete: true)
                .Index(t => t.IdAttachment)
                .Index(t => t.IdCustomer);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Invoices", "IdCustomer", "dbo.Customers");
            DropForeignKey("dbo.Invoices", "IdAttachment", "dbo.Attachments");
            DropForeignKey("dbo.Customers", "IdCity", "dbo.Cities");
            DropForeignKey("dbo.Cities", "IdDistrict", "dbo.Districts");
            DropIndex("dbo.Invoices", new[] { "IdCustomer" });
            DropIndex("dbo.Invoices", new[] { "IdAttachment" });
            DropIndex("dbo.Customers", new[] { "IdCity" });
            DropIndex("dbo.Cities", new[] { "IdDistrict" });
            DropTable("dbo.Invoices");
            DropTable("dbo.Customers");
            DropTable("dbo.Districts");
            DropTable("dbo.Cities");
            DropTable("dbo.Attachments");
        }
    }
}
