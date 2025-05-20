using AutoMapper;
using ProFit.Core.DTOs;
using ProFit.Core.IRepositories;
using ProFit.Core.IServices;
using ProFit.Core.ResultModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Service.Services
{
    public class ApplicationService:IApplicationService
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;

        public ApplicationService(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<ApplicationDTO>> GetByUserIdAsync(int userId)
        {
            var applications = await _repository.Applications.GetAsync(a => a.CandidateId == userId);
            return _mapper.Map<List<ApplicationDTO>>(applications);
        }

        public async Task<List<ApplicationDTO>> GetApplicationsByJobId(int id)
        {
            var job = await _repository.Jobs.GetJobWithApplicationsAsync(id);
            return _mapper.Map<List<ApplicationDTO>>(job?.Applications);
        }

        public async Task<Result<bool>> AddFavoriteAsync(int applicationId)
        {
            var application = await _repository.Applications.GetByIdAsync(applicationId);
            if (application == null)
                return Result<bool>.Failure("Application not found", 404);

            application.IsFavorite = true;
            await _repository.Applications.UpdateAsync(applicationId, application);
            await _repository.SaveAsync();
            return Result<bool>.Success(true);
        }

        public async Task<Result<bool>> RemoveFavoriteAsync(int applicationId)
        {
            var application = await _repository.Applications.GetByIdAsync(applicationId);
            if (application == null)
                return Result<bool>.Failure("Application not found", 404);

            application.IsFavorite = false;
            await _repository.Applications.UpdateAsync(applicationId, application);
            await _repository.SaveAsync();
            return Result<bool>.Success(true);
        }

        public async Task<List<ApplicationDTO>> GetFavoriteApplicationsForRecruiterAsync(int recruiterId)
        {
            var favoriteApplications = await _repository.Applications
                .GetAsync(application => application.Job.RecruiterId == recruiterId && application.IsFavorite);

            return _mapper.Map<List<ApplicationDTO>>(favoriteApplications);
        }

    }
}
