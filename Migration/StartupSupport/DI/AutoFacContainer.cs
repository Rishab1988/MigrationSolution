using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Migration.Common;

namespace Migration.StartupSupport.DI
{
    public class AutoFacContainer
    {
        public static AutofacServiceProvider GetServiceProvider(IServiceCollection services)
        {
            var builder = new ContainerBuilder();
            builder.RegisterModule(new AutoFacModule());
            builder.Populate(services);
            var container = builder.Build();
            return new AutofacServiceProvider(container);
        }
    }
}
