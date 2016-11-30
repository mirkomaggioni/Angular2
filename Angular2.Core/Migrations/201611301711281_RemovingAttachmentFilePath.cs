namespace Angular2.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovingAttachmentFilePath : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Attachments", "Path");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Attachments", "Path", c => c.String());
        }
    }
}
