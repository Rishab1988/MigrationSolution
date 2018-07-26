using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Autofac;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Migration.Common;
using Migration.Resources;

namespace Migration.Controllers
{
    [ProducesResponseType(401)]
    [Route("api/[controller]")]
    public class NomineeController : ControllerBase
    {
        private readonly IParameterErrorRepository _parameterErrorCollection;
        private readonly ILogger<NomineeController> _logger;
        private readonly IStringLocalizer<NomineeController> _localizer;
        public NomineeController(IComponentContext componentContext, IParameterErrorRepository parameterErrorCollection, ILogger<NomineeController> logger, IStringLocalizer<NomineeController> localizer)
        {
            _parameterErrorCollection = parameterErrorCollection;
            _logger = logger;
            _localizer = localizer;
        }

        /// <summary>
        /// Gets the nominee information for the provided lotyalty id
        /// </summary>
        /// <param name="loyaltyId"></param>
        /// <returns></returns>
        [HttpGet]
        //[Route("{loyaltyId?}")]
        [ProducesResponseType(typeof(IParameterErrorCollection),400)]
        [ProducesResponseType(typeof(int),200)]
        public IActionResult Get([FromQuery]string loyaltyId)
        {
            _logger.LogDebug($"Read {nameof(loyaltyId)} as "+loyaltyId);
            //throw new ArgumentException("test message", nameof(loyaltyId));
            if (string.IsNullOrEmpty(loyaltyId))
            {
                _parameterErrorCollection.Add(c =>
                    {
                        c.Message = _localizer.GetString(LocalizedResourceBrowser.ParameterNullorEmpty,nameof(loyaltyId));
                        c.Parameter = nameof(loyaltyId);
                    }
                );
                var result = new BadRequestJsonResult<IParameterErrorCollection>(_parameterErrorCollection.GetCollection());
                return result;
            }

            if (User.HasClaim(x => x.Type == ClaimTypes.Email))
            {
                var claim = User.FindFirst(ClaimTypes.Email);

                return Ok(claim.Value);
            }

            return Ok(User);
        }
    }
}