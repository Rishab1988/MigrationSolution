using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autofac;

namespace Migration.Common
{
    public class AutoFacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<ParameterError>().As<IParameterError>();
            builder.RegisterType<ParameterErrorRepository>().As<IParameterErrorRepository>();
            builder.RegisterType<ParameterErrorCollection>().As<IParameterErrorCollection>();
            builder.RegisterType<ParameterErrorCollection>().AsSelf();
        }
    }
}
