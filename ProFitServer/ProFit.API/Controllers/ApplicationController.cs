using Microsoft.AspNetCore.Mvc;
using ProFit.Core.DTOs;
using ProFit.Core.IServices;
using ProFit.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProFit.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationService _applicationService;

        public ApplicationController(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationDTO>>> GetJobApplications([FromQuery] int? jobId = null)
        {
            try
            {
                List<ApplicationDTO> applications;
                if (jobId.HasValue)
                {
                    applications = await _applicationService.GetApplicationsByJobId(jobId.Value);
                }
                else
                {
                    if (HttpContext.Items["UserId"] is int userId)
                    {
                        applications = await _applicationService.GetByUserIdAsync(userId);
                    }
                    else
                    {
                        return Unauthorized("UserId not found in context.");
                    }
                }
                return Ok(applications);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("{applicationId}/favorite")]
        public async Task<IActionResult> AddFavorite(int applicationId)
        {
            var result = await _applicationService.AddFavoriteAsync(applicationId);
            if (!result.IsSuccess)
                return NotFound(result.ErrorMessage);
            return Ok();
        }

        [HttpDelete("{applicationId}/favorite")]
        public async Task<IActionResult> RemoveFavorite(int applicationId)
        {
            var result = await _applicationService.RemoveFavoriteAsync(applicationId);
            if (!result.IsSuccess)
                return NotFound(result.ErrorMessage);
            return Ok();
        }

        //[HttpGet("{id}/applications/{applicationId}/presignedUrl")]
        //public async Task<ActionResult<IEnumerable<ApplicationDTO>>> GetViewPresigenedUrl(int id)
        //{
        //    if (HttpContext.Items["UserId"] is int userId)
        //    {
        //        var authorizationResult = await _jobService.CanManageJob(id, userId);
        //        if (!authorizationResult.IsSuccess)
        //        {
        //            return NotFound();
        //        }
        //        if (!authorizationResult.Value)
        //        {
        //            return Unauthorized();
        //        }
        //        try
        //        {
        //            var result = await _jobService.GetApplicationsByJobId(id);
        //            return Ok(result);
        //        }
        //        catch (Exception ex)
        //        {
        //            return BadRequest(ex.Message);
        //        }
        //    }
        //    else
        //    {
        //        return Unauthorized();
        //    }
        //}
    }
}
