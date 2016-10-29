using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using System.Web.Http;

[assembly: OwinStartup(typeof(Angular2.Web.Startup))]

namespace Angular2.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
   
            GlobalConfiguration.Configure(c => WebApiConfig.Register(config));
            app.UseWebApi(config);
        }
    }
}
