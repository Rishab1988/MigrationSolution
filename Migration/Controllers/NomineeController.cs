using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autofac;
using Microsoft.AspNetCore.Mvc;
using Migration.Common;

namespace Migration.Controllers
{
    [Route("api/[controller]")]
    public class NomineeController : ControllerBase
    {
        private readonly IParameterErrorRepository _parameterErrorCollection;
        public NomineeController(IParameterErrorRepository parameterErrorCollection)
        {
            _parameterErrorCollection = parameterErrorCollection;
        }

        [HttpGet("{loyaltyId}")]
        public IActionResult Get(string loyaltyId)
        {
            if (string.IsNullOrEmpty(loyaltyId))
            {
                _parameterErrorCollection.Add(c =>
                    {
                        c.Message = $"{nameof(loyaltyId)} cannot be null or empty";
                        c.Parameter = nameof(loyaltyId);
                    }
                );
                var result = new BadRequestJsonResult<IParameterErrorCollection>(_parameterErrorCollection.GetCollection());
                return result;
            }

            return Ok(0);
        }
    }
}