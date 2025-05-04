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
        Task<List<ApplicationDTO>> GetApplicationsByJobId(int id);
        Task<Result<ApplicationDTO>> ApplyAsync(int jobId, int userId);
        Task<Result<ApplicationDTO>> ApplyWithCVAsync(int jobId, int userId, int cvId);
        public Task<Result<bool>> CanManageJob(int jobId, int userId);
        public Task<Result<JobDTO>> ChangeStatus(int jobId);

    }
}
