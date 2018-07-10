using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Migration.Auth;
using Migration.Common;
using Migration.StartupSupport.DI;

namespace Migration
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            var authPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();
            JwtBearerAuth.AddAuthentication(services, Configuration);
            services.AddMvc(c => c.Filters.Add(new AuthorizeFilter(authPolicy)));
            #region Dependency Module Injection and builder binding
            return AutoFacContainer.GetServiceProvider(services);
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseWhen(x => x.Request.Path.Value.IndexOf("/JwtAuth", StringComparison.OrdinalIgnoreCase) >= 0, y => y.UseMiddleware<BasicAuthMiddleware>());
            app.UseAuthentication();
            app.UseMvc();
            
        }
    }
}
