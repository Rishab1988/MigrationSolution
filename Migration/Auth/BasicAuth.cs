using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Migration.Auth
{
    public abstract class AppMiddleware
    {
        protected readonly RequestDelegate NextMiddleware;

        protected AppMiddleware(RequestDelegate nextMiddleware)
        {
            NextMiddleware = nextMiddleware;
        }

        public abstract Task Invoke(HttpContext context);

    }

    public enum AuthHeader
    {
        Authorization,
        Basic
    }


    public interface IUser
    {
        string Name { get; set; }
        string Password { get; set; }
    }


    public class BasicAuth
    {

    }


    public class BasicAuthMiddleware : AppMiddleware
    {
        public BasicAuthMiddleware(RequestDelegate nextMiddleware) : base(nextMiddleware)
        {
        }

        public override async Task Invoke(HttpContext context)
        {
            var request = context.Request;
            if (request.Headers.TryGetValue(AuthHeader.Authorization.ToString(), out var value))
            {
                var firstAuthHeader = value.FirstOrDefault();
                if (firstAuthHeader != null)
                {
                    if (firstAuthHeader.StartsWith(AuthHeader.Basic.ToString(), StringComparison.OrdinalIgnoreCase))
                    {
                        var userNamePassword = Encoding.UTF8.GetString(Convert.FromBase64String(firstAuthHeader.Replace(AuthHeader.Basic.ToString(), "",
                            StringComparison.OrdinalIgnoreCase))).Split(':');
                        var userName = userNamePassword.ElementAt(0);
                        var password = userNamePassword.ElementAt(1);
                        if (string.Equals(userName, "test", StringComparison.CurrentCultureIgnoreCase) &&
                            password == "password")
                        {
                            await NextMiddleware.Invoke(context);
                            return;
                        }
                    }
                }
            }

            context.Response.StatusCode = 401;
            context.Response.Headers.Add("WWW-Authenticate", AuthHeader.Basic.ToString());
        }
    }
}
