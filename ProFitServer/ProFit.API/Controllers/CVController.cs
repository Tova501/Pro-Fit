using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProFit.API.PostModels;
using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using ProFit.Core.IServices;

namespace ProFit.API.Controllers
{
    [Route("api/cv")]
    [ApiController]
    public class CVController : ControllerBase
    {
        private readonly ICVService _cvService;
        private readonly IS3Service _s3Service;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public CVController(
            ICVService cVService, 
            IUserService userService,
            IMapper mapper,
            IS3Service s3Service)
        {
            _cvService = cVService;
            _userService = userService;
            _mapper = mapper;
            _s3Service = s3Service;
        }

        // GET: api/<CVController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CV>>> Get()
        {
            var results = await _cvService.GetAllAsync();
            return Ok(results);
        }

        // GET api/<CVController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CV>> Get(int id)
        {
            var result = await _cvService.GetByIdAsync(id);
            return Ok(result);
        }

        // GET api/<CVController>/5
        [HttpGet("general/{userId}")]
        public async Task<ActionResult<CV>> GetByUserId(int userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (!user.HasUploadedGeneralCV)
                return BadRequest();
            var result = await _cvService.GetGeneralCVByUserId(userId);
            return Ok(result);
        }


        [HttpPost("generate-upload-url")]
        public async Task<IActionResult> GenerateUploadUrl([FromBody] CVPostModel cv)
        {
            var userId = HttpContext.Items["UserId"].ToString();
            var url = await _s3Service.GeneratePresignedUrlAsync("general", userId, cv.ContentType);
            if (url == null)
            {
                return BadRequest();
            }
            return Ok(new { presignedUrl = url });
        }

        [HttpPost("generate-view-url/{cvId}")]
        public async Task<IActionResult> GenerateViewUrl(int cvId)
        {
            var url = await _cvService.GetViewUrlByIdAsync(cvId);
            if (url == null)
            {
                return BadRequest();
            }
            return Ok(new { presignedUrl = url });
        }

        [HttpPost("confirm-upload")]
        public async Task<IActionResult> ConfirmUpload([FromBody] CVPostModel cv)
        {
            var userId = (int)HttpContext.Items["UserId"];
            var cvResult = await _cvService.ConfirmGeneralCVUpload(userId, cv.ContentType);
            return Ok(cvResult);
        }

    }
}
