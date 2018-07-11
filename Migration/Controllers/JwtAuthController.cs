using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Migration.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class JwtAuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public JwtAuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Index()
        {
            if (HttpContext.Items.TryGetValue("username", out var value))
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Issuer"],
                    claims: new List<Claim>
                    {
                        new Claim("email", "r@google.com"),
                        new Claim(ClaimTypes.MobilePhone, "8826473129"),
                        new Claim(ClaimTypes.Name,value.ToString())
                    },
                    notBefore: null,
                    expires: DateTime.Now.AddMinutes(10),
                    signingCredentials: creds
                );
                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }

            return Unauthorized();

        }
    }
}