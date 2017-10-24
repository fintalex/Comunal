﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Comunal
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //routes.MapRoute(
            //    name: "HomePage",
            //    //url: "{controller}/{action}/{id}",
            //    url: "homepage",
            //    defaults: new { controller = "Home", action = "HomePage"}
            //);

            routes.MapRoute(
                name: "Default",
                //url: "{controller}/{action}/{id}",
                url: "",
                defaults: new { controller = "Home", action = "HomePage2" }
            );

            routes.MapRoute(
                name: "Angular",
                url: "{*catchall}", // URL with parameters,
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
