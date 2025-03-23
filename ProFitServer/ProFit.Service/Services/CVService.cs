using AutoMapper;
using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using ProFit.Core.IRepositories;
using ProFit.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Service.Services
{
    public class CVService : ICVService
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryManager _repository;
        public CVService(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<CvDTO> AddAsync(int jobId, int userId)
        {
            CV cv = new CV()
            {
                Id = 0,
                CandidateId = userId,
                JobId = jobId,
                Score = 100
            };

            var result = await _repository.CVs.AddAsync(cv);
            return _mapper.Map<CvDTO>(result);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var cv = await _repository.CVs.GetByIdAsync(id);
            if(cv == null)
            {
                return false;
            }
            _repository.CVs.DeleteAsync(cv);
            await _repository.SaveAsync();
            return true;
        }

        public async Task<IEnumerable<CvDTO>> GetAllAsync()
        {
            var cvList = await _repository.CVs.GetAsync();
            return _mapper.Map<IEnumerable<CvDTO>>(cvList);
        }
        
        public async Task<CvDTO> GetByIdAsync(int id)
        {
            var item = _repository.CVs.GetByIdAsync(id);
            return _mapper.Map<CvDTO>(item);
        }

        public async Task<CvDTO> UpdateAsync(int id, MemoryStream stream)
        {
            throw new Exception("Not Implemnted");
        }
    }
}
