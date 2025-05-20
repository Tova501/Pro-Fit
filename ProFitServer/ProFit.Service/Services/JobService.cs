using Amazon.S3;
using Amazon.S3.Model;
using AutoMapper;
using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using ProFit.Core.IRepositories;
using ProFit.Core.IServices;
using ProFit.Core.ResultModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Service.Services
{
    public class JobService : IJobService
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly ICVService _cvService;
        private readonly IS3Service _s3Service;

        public JobService(
            IRepositoryManager repository,
            IMapper mapper,
            ICVService cvService,
            IS3Service s3Service)
        {
            _repository = repository;
            _mapper = mapper;
            _cvService = cvService;
            _s3Service = s3Service;
        }

        public async Task<JobDTO> AddAsync(JobDTO jobDto)
        {
            var job = _mapper.Map<Job>(jobDto);
            var resultJob = await _repository.Jobs.AddAsync(job);
            await _repository.SaveAsync();
            return _mapper.Map<JobDTO>(resultJob);
        }

        public async Task DeleteAsync(int id)
        {
            var item = await _repository.Jobs.GetByIdAsync(id);
            if (item == null)
            {
                throw new Exception("User Not Found");
            }
            // Check if the job has any applications
            var applications = await _repository.Applications.GetAsync();
            var jobApplications = applications.Where(a => a.JobId == id).ToList();
            foreach (var application in jobApplications)
            {
                // Delete the application
                if(!application.CV.IsGeneral)
                {
                    await _s3Service.DeleteAsync(application.CV.Path);
                }
                _repository.Applications.DeleteAsync(application);
            }
            _repository.Jobs.DeleteAsync(item);
            await _repository.SaveAsync();
        }

        public async Task<IEnumerable<JobDTO>> GetAllAsync()
        {
            var jobs = await _repository.Jobs.GetAsync();
            return _mapper.Map<IEnumerable<JobDTO>>(jobs);
        }

        public async Task<JobDTO> GetByIdAsync(int id)
        {
            var job = await _repository.Jobs.GetByIdAsync(id);
            return _mapper.Map<JobDTO>(job);
        }

        public async Task<JobDTO> UpdateAsync(int id, JobDTO jobDto)
        {
            var job = _mapper.Map<Job>(jobDto);
            var existingJob = await _repository.Jobs.GetByIdAsync(id);

            existingJob.UpdatedAt = DateTime.UtcNow;
            existingJob.Title = job.Title;
            existingJob.Description = job.Description;
            existingJob.Requirements = job.Requirements;
            existingJob.Skills = job.Skills;
            existingJob.YearsOfExperienceRequired = job.YearsOfExperienceRequired;
            existingJob.Location = job.Location;
            existingJob.Company = job.Company;

            var resultJob = await _repository.Jobs.UpdateAsync(id, existingJob);
            var resultJobDto = _mapper.Map<JobDTO>(resultJob);
            await _repository.SaveAsync();
            return resultJobDto;
        }

        public async Task<Result<ApplicationDTO>> ApplyAsync(int jobId, int userId)
        {
            // Check if the user has a general CV uploaded
            var generalCv = await _repository.CVs.GetGeneralCvByUserIdAsync(userId);
            if (generalCv == null)
            {
                return Result<ApplicationDTO>.Failure("General CV not found", 404);
            }

            // Create a new application entity
            var application = new Application
            {
                CandidateId = userId,
                JobId = jobId,
                CVId = generalCv.Id,
                Score = 0
            };

            await _repository.Applications.AddAsync(application);
            await _repository.SaveAsync();

            return Result<ApplicationDTO>.Success(_mapper.Map<ApplicationDTO>(application));
        }

        public async Task<Result<bool>> CanManageJob(int jobId, int userId)
        {
            var job = await _repository.Jobs.GetByIdAsync(jobId);
            if (job == null)
            {
                return Result<bool>.Failure("Job not found", 404);
            }
            return Result<bool>.Success(job.RecruiterId == userId);
        }

        public async Task<Result<ApplicationDTO>> ApplyWithCVAsync(int jobId, int userId, int cvId)
        {
            var application = new Application
            {
                CandidateId = userId,
                JobId = jobId,
                CVId = cvId,
                Score = 0
            };

            await _repository.Applications.AddAsync(application);
            await _repository.SaveAsync();

            return Result<ApplicationDTO>.Success(_mapper.Map<ApplicationDTO>(application));
        }

        public async Task<Result<JobDTO>> ChangeStatus(int jobId)
        {
            var existingJob = await _repository.Jobs.GetByIdAsync(jobId);
            if (existingJob == null)
            {
                return Result<JobDTO>.Failure("Job not found", 404);
            }

            existingJob.IsActive = !existingJob.IsActive;
            await _repository.Jobs.UpdateAsync(jobId, existingJob);
            await _repository.SaveAsync();

            return Result<JobDTO>.Success(_mapper.Map<JobDTO>(existingJob));
        }

    }
}

