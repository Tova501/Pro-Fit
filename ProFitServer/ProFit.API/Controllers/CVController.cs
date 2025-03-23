using AutoMapper;
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
