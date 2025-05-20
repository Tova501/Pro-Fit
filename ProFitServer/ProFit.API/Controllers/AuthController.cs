using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProFit.API.PostModels;
using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using ProFit.Core.IServices;


namespace ProFit.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly IUserService _userService;
        public AuthController(
            IAuthService authService,
            IMapper mapper,
            IUserService userService)
        {
            _authService = authService;
            _mapper = mapper;
            _userService = userService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel userRegister)
        {
            var user = _mapper.Map<User>(userRegister);
            var userDTO = _mapper.Map<UserDTO>(user);

            var authResult = await _authService.RegisterAsync(userDTO);

            if (!authResult.IsSuccess)
            {
                if (authResult.ErrorCode == 409)
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


        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<UserDTO>> GetUserFromToken()
        {
            
            var userId = HttpContext.Items["UserId"];
            if (userId == null)
                return Unauthorized();
            var user = await _userService.GetUserByIdAsync((int)userId);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(user);
        }
    }

}