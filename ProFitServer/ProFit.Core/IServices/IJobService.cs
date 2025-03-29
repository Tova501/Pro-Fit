using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using ProFit.Core.ResultModels;
using System;

namespace ProFit.Core.IServices
{
    public interface IJobService
    {
        Task<IEnumerable<JobDTO>> GetAllAsync();
        Task<JobDTO> GetByIdAsync(int id);
        Task<JobDTO> AddAsync(JobDTO job);
        Task<JobDTO> UpdateAsync(int id, JobDTO job);
        Task DeleteAsync(int id);
        Task<List<Application>> GetApplicationsByJobId(int id);
        Task<CvDTO> ApplyAsync(int jobId, int userId);
        Task<string> CreateFileAsync(int jobId, int userId, string contentType);
        public Task<Result<bool>> CanManageJob(int jobId, int userId);

    }
}
