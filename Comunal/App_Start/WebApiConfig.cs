namespace Comunal
{
    using System.Web.Http;
    using System.Net.Http.Formatting;

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.AddQueryStringMapping(
                "$format", "json", "application/json");
            GlobalConfiguration.Configuration.Formatters.XmlFormatter.AddQueryStringMapping(
                "$format", "xml", "application/xml");
            
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
        }
    }
}