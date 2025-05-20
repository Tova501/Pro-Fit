using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProFit.API.PostModels;
using ProFit.API.PutModels;
using ProFit.Core.DTOs;
using ProFit.Core.IServices;
using ProFit.Service.Services;
using System.Security.Claims;

namespace ProFit.API.Controllers
{

    [Route("api/job")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IJobService _jobService;
        private readonly IMapper _mapper;
        private readonly ICVService _cvService;
        private readonly IS3Service _s3Service;
        public JobController(
            IJobService jobService,
            IMapper mapper,
            ICVService cvService,
            IS3Service s3Service)
        {
            _jobService = jobService;
            _mapper = mapper;
            _cvService = cvService;
            _s3Service = s3Service;
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
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        [HttpPost]
        public async Task<ActionResult<JobDTO>> Post([FromBody] JobPostModel jobPost)
        {
            if (HttpContext.Items["UserId"] is int userId)
            {
                var jobDTO = _mapper.Map<JobDTO>(jobPost);
                jobDTO.RecruiterId = userId;
                var result = await _jobService.AddAsync(jobDTO);
                if (result == null)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            else
            {
                return Unauthorized();
            }
        }

        // PUT api/<JobController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<JobDTO>> Put(int id, [FromBody] JobPutModel jobPut)
        {
            if (HttpContext.Items["UserId"] is int userId)
            {
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
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost("{id}/CreatePresignedUrlForCV")]
        public async Task<ActionResult<string>> CreatePresignedUrlForCV(int id, [FromBody] CVPostModel cv)
        {
            var userId = HttpContext.Items["UserId"]?.ToString();
            if (userId == null)
            {
                return Unauthorized();
            }

            var presignedUrl = await _s3Service.GeneratePresignedUrlAsync(id.ToString(), userId, cv.ContentType);
            if (presignedUrl == null)
            {
                return BadRequest();
            }
            return Ok(presignedUrl);
        }

        // POST api/<JobController>
        [HttpPost("{id}/Apply")]
        public async Task<ActionResult<ApplicationDTO>> Apply(int id)
        {
            if (HttpContext.Items["UserId"] is int userId)
            {
                var application = await _jobService.ApplyAsync(id, userId);
                if (application == null)
                {
                    return BadRequest();
                }
                return Ok(application);
            }
            else
            {
                return Unauthorized();
            }
        }


        [HttpPost("{id}/ConfirmCVUploadAndApply")]
        public async Task<ActionResult<CvDTO>> ConfirmCVUploadAndApply(int id, [FromBody] CVPostModel cv)
        {
            if (HttpContext.Items["UserId"] is int userId)
            {

                var cvResult = await _cvService.ConfirmJobSpecificCVUpload(id, userId, cv.ContentType);
                if (cvResult == null)
                {
                    return BadRequest();
                }

                var applicationResult = await _jobService.ApplyWithCVAsync(id, userId, cvResult.Id);
                if (applicationResult == null)
                {
                    return BadRequest();
                }

                return Ok(applicationResult);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> delete(int id)
        {
            if (HttpContext.Items["UserId"] is int userId)
            {
                var authorizationResult = await _jobService.CanManageJob(id, userId);
                if (!authorizationResult.IsSuccess)
                {
                    return NotFound();
                }
                if (!authorizationResult.Value)
                {
                    return Unauthorized();
                }
                try
                {
                    await _jobService.DeleteAsync(id);
                    return Ok(true);
                }
                catch
                {
                    return NotFound();
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPut("{id}/change-status")]
        public async Task<ActionResult<JobDTO>> UpdateStatus(int id)
        {
            var result = await _jobService.ChangeStatus(id);
            if (result.IsSuccess)
            {
                return Ok(result.Value);
            }
            else
            {
                if (result.ErrorCode == 404)
                {
                    return NotFound();
                }
                return BadRequest();
            }
        }

    }
}

