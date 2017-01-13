using System;
using System.Collections.Generic;
using System.Configuration;
using System.Reflection;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using Angular2.Core.ServiceLayer;
using Angular2.Web.Controllers.Api;
using Autofac;
using Autofac.Integration.WebApi;
using Newtonsoft.Json;

[assembly: OwinStartup(typeof(Angular2.Web.Startup))]

namespace Angular2.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var builder = new ContainerBuilder();

            builder.Register(c => new ElasticSearchClient("http://localhost:9200", "cities"))
                .AsSelf()
                .SingleInstance();

            builder.Register(c => new CitiesService(c.Resolve<ElasticSearchClient>(), "cities"))
                .AsSelf()
                .AsImplementedInterfaces()
                .SingleInstance();

            var apiControllersAssembly = Assembly.GetAssembly(typeof(CustomersController));

            builder.RegisterApiControllers(apiControllersAssembly);

            var containerBuilder = builder.Build();

            var config = new HttpConfiguration
            {
                DependencyResolver = new AutofacWebApiDependencyResolver(containerBuilder)
            };
   
            GlobalConfiguration.Configure(c => WebApiConfig.Register(config));
            app.UseWebApi(config);

            var serializerSettings = config.Formatters.JsonFormatter.SerializerSettings;
            serializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;

            InitElasticSearchServices(containerBuilder);
        }

        private static void InitElasticSearchServices(IContainer containerBuilder)
        {
            containerBuilder.Resolve<CitiesService>();
        }
    }
}
