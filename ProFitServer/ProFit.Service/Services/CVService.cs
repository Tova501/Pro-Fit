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
        private readonly IS3Service _s3Service;

        public CVService(
            IRepositoryManager repository, 
            IMapper mapper,
            IS3Service s3Service)
        {
            _repository = repository;
            _mapper = mapper;
            _s3Service = s3Service;
        }

        public async Task<CvDTO> GetGeneralCVByUserId(int userId)
        {
            var result = await _repository.CVs.GetGeneralCvByUserIdAsync(userId);
            return _mapper.Map<CvDTO>(result);
        }


        public async Task<CvDTO> ConfirmGeneralCVUpload(int userId, string contentType)
        {
            try
            {
                var user = await _repository.Users.GetByIdAsync(userId);
                user.HasUploadedGeneralCV = true;
                await _repository.Users.UpdateAsync(userId, user);

                CV cv = new CV()
                {
                    CandidateId = userId,
                    IsGeneral = true,
                    ContentType = contentType,
                    Path = $"general/{userId}",
                    UpdatedAt = DateTime.UtcNow
                };

                var resultCV = await _repository.CVs.AddAsync(cv);
                await _repository.SaveAsync();

                var cvDto = _mapper.Map<CvDTO>(resultCV);
                return cvDto;
            }
            catch (DbUpdateException dbEx)
            {
                // טיפול בשגיאות עדכון מסד נתונים
                throw new Exception("Database update error: " + dbEx.InnerException?.Message);
            }
            catch (Exception ex)
            {
                throw new Exception("Error while saving CV: " + ex.Message);
            }
        }


        public async Task<CvDTO> ConfirmJobSpecificCVUpload(int jobId, int userId, string contentType)
        {
            CV cv = new CV()
            {
                CandidateId = userId,
                IsGeneral = false,
                ContentType = contentType,
                Path = $"{jobId}/{userId}"
            };
            var resultCV = await _repository.CVs.AddAsync(cv);
            await _repository.SaveAsync();
            var cvDto = _mapper.Map<CvDTO>(resultCV);
            return cvDto;
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
            var item = await _repository.CVs.GetByIdAsync(id);
            return _mapper.Map<CvDTO>(item);
        }

        public async Task<CvDTO> UpdateAsync(int id, MemoryStream stream)
        {
            throw new Exception("Not Implemnted");
        }

        public async Task<string> GetViewUrlByIdAsync(int id)
        {
            var cv = await _repository.CVs.GetByIdAsync(id);
            if(cv == null)
            {
                throw new Exception("Not Fount");
            }
            var url = await _s3Service.GeneratePresignedViewUrlAsync(cv.Path, cv.ContentType);
            return url;
        }
    }
}
