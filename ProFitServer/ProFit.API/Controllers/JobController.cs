using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProFit.API.PostModels;
using ProFit.API.PutModels;
using ProFit.Core.DTOs;
using ProFit.Core.IServices;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProFit.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IJobService _jobService;
        private readonly IMapper _mapper;
        public JobController(IJobService jobService, IMapper mapper)
        {
            _jobService = jobService;
            _mapper = mapper;
        }

        // GET: api/<JobController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobDTO>>> Get()
        {
            return Ok(await _jobService.GetAllAsync());
        }


        // GET api/<JobController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JobDTO>> Get(int id)
        {
            var job = await _jobService.GetByIdAsync(id);
            if(job == null)
            {
                return NotFound();
        }
            return Ok(job);
        }

        // POST api/<JobController>
        [HttpPost("{id}/Apply")]
        public async Task<ActionResult<JobDTO>> Apply(int id)
        {
            var userId = (int)HttpContext.Items["userId"];
            var cv = await _jobService.ApplyAsync(id, userId);
            if (cv == null)
            {
                return BadRequest();
            }
            return Ok(cv);
        }

        [HttpPost("{id}/CreatePresignedUrl")]
        public async Task<ActionResult<string>> CreatePresignedUrl(int id, [FromBody] string contentType)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdString == null)
            {
                return Unauthorized();
            }

            if (!int.TryParse(userIdString, out int userId))
            {
                return BadRequest("Invalid user ID");
            }

            var presignedUrl = await _jobService.CreateFileAsync(id, userId, contentType);
            return Ok(presignedUrl);
        }


        [HttpPost]
        public async Task<ActionResult<JobDTO>> Post([FromBody] JobPostModel jobPost)
        {
            var userId = (int)HttpContext.Items["UserId"];
            var jobDTO = _mapper.Map<JobDTO>(jobPost);
            jobDTO.RecruiterId = userId;
            var result = await _jobService.AddAsync(jobDTO);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        // PUT api/<JobController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<JobDTO>> Put(int id, [FromBody] JobPutModel jobPut)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdString == null)
            {
                return Unauthorized();
            }
            if (!int.TryParse(userIdString, out int userId))
            {
                return BadRequest("Invalid user ID");
            }
            var authorizationResult = await _jobService.CanManageJob(id, userId);
            if (!authorizationResult.IsSuccess)
            {
                return NotFound();
            }
            if (!authorizationResult.Value)
            {
                return Unauthorized();
            }
            var job = _mapper.Map<JobDTO>(jobPut);

            var resultJob = await _jobService.UpdateAsync(id, job);
            return Ok(resultJob);
        }

        // DELETE api/<JobController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
