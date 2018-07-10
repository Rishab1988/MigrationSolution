using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Migration.Controllers
{
    public class BadRequestJsonResult<T> : BadRequestObjectResult where T : class
    {
        private static string GetJson(T obj)
        {
            return JsonConvert.SerializeObject(obj);
        }
        public BadRequestJsonResult(T obj)
            : this(GetJson(obj))
        {
        }

        private BadRequestJsonResult(object error) : base(error)
        {
        }
    }
}