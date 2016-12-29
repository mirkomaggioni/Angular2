using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using Newtonsoft.Json;

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

            var serializerSettings = config.Formatters.JsonFormatter.SerializerSettings;
            serializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
        }
    }
}
