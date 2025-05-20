using ProFit.Core.DTOs;
using ProFit.Core.ResultModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.IServices
{
    public interface IApplicationService
    {
        Task<List<ApplicationDTO>> GetByUserIdAsync(int userId);
        Task<List<ApplicationDTO>> GetFavoriteApplicationsForRecruiterAsync(int recruiterId);
        Task<List<ApplicationDTO>> GetApplicationsByJobId(int id);
        Task<Result<bool>> AddFavoriteAsync(int applicationId);
        Task<Result<bool>> RemoveFavoriteAsync(int applicationId);
    }
}
