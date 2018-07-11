using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
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
using Swashbuckle.AspNetCore.Swagger;

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
            //services.AddMvc();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Migration Solution",
                    Description = "My First ASP.NET Core Web API",
                    TermsOfService = "None",
                    Contact = new Contact() { Name = "Migration Solution", Email = "x@x.com", Url = "www.x.com" }
                });
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme { In = "header", Description = "Please enter JWT with Bearer into field", Name = "Authorization", Type = "apiKey" });
                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>> {
                    { "Bearer", Enumerable.Empty<string>() },
                });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            #region Dependency Module Injection and builder binding
            return AutoFacContainer.GetServiceProvider(services);
            #endregion
        }

        // This method gets called by the runtime. Use this meth`~~od to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseWhen(x => x.Request.Path.Value.IndexOf("/JwtAuth", StringComparison.OrdinalIgnoreCase) >= 0, y => y.UseMiddleware<BasicAuthMiddleware>());
            app.UseAuthentication();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Migration Solution"));

            app.UseMvc();
            
        }
    }
}
