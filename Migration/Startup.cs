using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Dapper.FluentMap;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Migration.Auth;
using Migration.Common;
using Migration.Config;
using Migration.DAL;
using Migration.StartupSupport.DI;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

//configuration
//view component
// tag helper pack
// bundling and minification

namespace Migration
{
    using System.Diagnostics.CodeAnalysis;

    public class TestFilter : IDocumentFilter
    {
        public void Apply(SwaggerDocument swaggerDoc, DocumentFilterContext context)
        {
            swaggerDoc.Schemes = new string[] { "https" };
        }
    }
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        /// <summary>
        /// Gets the configuration.
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// Gets the environment.
        /// </summary>
        public IHostingEnvironment Environment { get; }

        /// <summary>
        /// The configure services.
        /// </summary>
        /// <param name="services">
        /// The services.
        /// </param>
        /// <returns>
        /// The <see cref="IServiceProvider"/>.
        /// </returns>
        [SuppressMessage("StyleCop.CSharp.ReadabilityRules", "SA1101:PrefixLocalCallsWithThis", Justification = "Reviewed. Suppression is OK here.")]
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            var authPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .Build();
            JwtBearerAuth.AddAuthentication(services, this.Configuration);
            services.AddClaimPolicies(this.Configuration);
            services.AddMvc(c =>
            {
                c.Filters.Add(new AuthorizeFilter(authPolicy));
                c.Filters.Add(new RequireHttpsAttribute());
            }).AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix, options => { options.ResourcesPath = "Resources"; })
                .AddDataAnnotationsLocalization();

            // services.AddMvc();
            services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc(
                        "v1",
                        new Info
                            {
                                Version = "v1",
                                Title = "Migration Solution",
                                Description = "My First ASP.NET Core Web API",
                                TermsOfService = "None",
                                Contact = new Contact()
                                              {
                                                  Name = "Migration Solution",
                                                  Email = "x@x.com",
                                                  Url = "www.x.com"
                                              }
                            });
                    c.AddSecurityDefinition(
                        "Bearer",
                        new ApiKeyScheme
                            {
                                In = "header",
                                Description = "Please enter JWT with Bearer into field",
                                Name = "Authorization",
                                Type = "apiKey"
                            });
                    c.AddSecurityRequirement(
                        new Dictionary<string, IEnumerable<string>> { { "Bearer", Enumerable.Empty<string>() }, });
                    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                    c.IncludeXmlComments(xmlPath);
                });

            services.AddHsts(c => { c.IncludeSubDomains = true; });
            services.AddHttpsRedirection(c =>
            {
                c.RedirectStatusCode = 301;
                if (this.Environment.IsDevelopment())
                {
                    c.HttpsPort = 44314;
                }
            });
            services.AddLocalization(options => { options.ResourcesPath = "Resources"; });
            services.Configure<SwaggerConfig>(Configuration.GetSection("Swagger"));
            services.Configure<DbConString>(Configuration.GetSection("ConnectionStrings"));

            FluentMapper.Initialize(config =>
            {
                config.AddMap(new UserInfoMap());
            });

            #region Dependency Module Injection and builder binding
            return AutoFacContainer.GetServiceProvider(services);
            #endregion
        }

        // This method gets called by the runtime. Use this meth`~~od to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IOptions<SwaggerConfig> swaggerOptions)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRequestLocalization(options =>
            {
                options.SupportedCultures = new List<CultureInfo>
                {
                   new CultureInfo("en-US"), new CultureInfo ("fr-FR")
                };
                options.SupportedUICultures = options.SupportedCultures;
                options.DefaultRequestCulture = new RequestCulture("en-US");
            });



            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            var logger = loggerFactory.CreateLogger("Middleware");

            logger.LogDebug("Current Culture :" + CultureInfo.CurrentCulture.ToString());

            logger.LogInformation("Middleware pipeline started");
            //loggerFactory.AddLog4Net("log4net.config");
            app.Use(async (c, p) =>
            {
                c.Response.Headers.Add("X-HostingEnvironment", env.EnvironmentName);
                await p.Invoke();
            });

            app.UseWhen(x => x.Request.Path.Value.IndexOf("/JwtAuth", StringComparison.OrdinalIgnoreCase) >= 0, y => y.UseMiddleware<BasicAuthMiddleware>());
            app.UseAuthentication();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint(swaggerOptions.Value.Endpoint, "Migration Solution"));
            app.UseStatusCodePages();
            app.UseStaticFiles();
            app.UseHsts();

            app.UseHttpsRedirection();
            app.UseErrorHandler();
            app.UseMvc();

        }
    }
}
