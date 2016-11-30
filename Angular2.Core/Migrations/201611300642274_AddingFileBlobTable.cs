namespace Angular2.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingFileBlobTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FileBlobs",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                        File = c.Binary(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Attachments", "IdFileBlob", c => c.Guid());
            CreateIndex("dbo.Attachments", "IdFileBlob");
            AddForeignKey("dbo.Attachments", "IdFileBlob", "dbo.FileBlobs", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Attachments", "IdFileBlob", "dbo.FileBlobs");
            DropIndex("dbo.Attachments", new[] { "IdFileBlob" });
            DropColumn("dbo.Attachments", "IdFileBlob");
            DropTable("dbo.FileBlobs");
        }
    }
}
