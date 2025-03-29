using AutoMapper;
using FluentValidation;
using FluentValidation.Validators;
using Microsoft.AspNetCore.Mvc;
using ProFit.API.PostModels;
using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using ProFit.Core.IServices;

namespace ProFit.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;

        public AuthController(
            IConfiguration configuration, 
            IAuthService authService,
            IMapper mapper)
        {
            _configuration = configuration;
            _authService = authService;
            _mapper = mapper;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel userRegister)
        {
            var user = _mapper.Map<User>(userRegister);
            var userDTO = _mapper.Map<UserDTO>(user);

            var authResult = await _authService.RegisterAsync(userDTO);

            if (!authResult.IsSuccess)
            {
                if(authResult.ErrorCode == 409)
                {
                    return Conflict(authResult.ErrorMessage);
                }
                return BadRequest(authResult.ErrorMessage);
        }

            return Ok(authResult.Value);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel userLogin)
        {
            var user = _mapper.Map<User>(userLogin);
            var userDTO = _mapper.Map<UserDTO>(user);
            var authResult = await _authService.LoginAsync(userDTO);

            if (!authResult.IsSuccess)
            {
                return Unauthorized(authResult.ErrorMessage);
            }

            return Ok(authResult.Value);
        }

    }
}

