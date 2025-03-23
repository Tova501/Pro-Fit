using ProFit.Core.DTOs;
using ProFit.Core.Entities;
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
        Task<List<CV>> GetCVsByJobId(int id);
        Task<CvDTO> ApplyAsync(int jobId, int userId);
        Task<string> CreateFileAsync(int jobId, int userId, string contentType);
    }
}
