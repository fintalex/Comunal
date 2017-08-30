using Domain;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Configuration;
using Services.Classes;
using Services.Interfaces;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using Unity.Mvc5;

namespace Comunal
{
    public class DIconfig
    {
        public static void Initialise()
        {
            var container = new UnityContainer();

            //container.RegisterType<IPrincipal>(new InjectionFactory(c => HttpContext.Current.User));

            InitializeContainer(container);

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
            System.Web.Http.GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
        }

        private static void InitializeContainer(UnityContainer container)
        {
            container.RegisterType<IDataContext, DataContext>();

            container.RegisterType<IUserService, UserService>();
            container.RegisterType<IFlatService, FlatService>();

            container.RegisterType<IBillService, BillService>();

            container.RegisterType<ICounterService, CounterService>();
            container.RegisterType<ICounterDataService, CounterDataService>();

            container.RegisterType<IMaintenanceService, MaintenanceService>();
            container.RegisterType<IMaintenanceDataService, MaintenanceDataService>();

            container.RegisterType<IChartService, ChartService>();
        }
    }
}