using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Migration.Auth
{
    public class JwtBearerAuth
    {
      public static void AddAuthentication(IServiceCollection services, IConfiguration configuration)
      {           
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(c =>
            {
                c.IncludeErrorDetails = true;
                c.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]))
                };
            });
        }
    }

    public class ClaimTypes2
    {

        public static string CompanyEmail => "ComapanyEmail";
    }

    public static class ClaimsPolicy
    {
        public static IServiceCollection AddClaimPolicies(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddAuthorization(c => { c.AddPolicy("CompanyEmail", c1 =>
                {
                    c1.RequireClaim(ClaimTypes2.CompanyEmail);
                });
            });
            return services;
        }
    }

}
