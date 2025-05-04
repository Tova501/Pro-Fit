using Microsoft.AspNetCore.Mvc;
using ProFit.API.PutModels;
using ProFit.Core.DTOs;
using ProFit.Core.IServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProFit.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> Get()
        {
            return Ok(await _userService.GetAllUsersAsync());
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}/personal-details")]
        public async Task<ActionResult<UserDTO>> UpdatePersonalDetails(int id, [FromBody]UserPutModel user)
        {
            var userDTO = new UserDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
            };
            var result = await _userService.UpdatePersonalDetailsAsync(id, userDTO);
            if(result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
