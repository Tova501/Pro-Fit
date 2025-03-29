﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProFit.API.PostModels;
using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using ProFit.Core.IServices;

namespace ProFit.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CVController : ControllerBase
    {
        private readonly ICVService _cvService;
        private readonly IMapper _mapper;
        public CVController(ICVService cVService, IMapper mapper)
        {
            _cvService = cVService;
            _mapper = mapper;
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
        [HttpPost("generate-upload-url")]
        public async Task<IActionResult> GenerateUploadUrl([FromBody] CVPostModel cv)
        {
            var userId = (int)HttpContext.Items["UserId"];
            var url = _cvService.GenerateUploadUrl(userId, cv.ContentType);
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
            var cvResult = _cvService.ConfirmGeneralCVUpload(userId, cv.ContentType);
            return Ok(cvResult);
        }

        // PUT api/<CVController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<string>> Put(int id, [FromBody]IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                // Example: UploadToAws(stream, file.FileName);
            }

            return Ok("File uploaded successfully.");
        }

        // DELETE api/<CVController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
