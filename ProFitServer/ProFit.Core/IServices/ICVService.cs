using ProFit.Core.DTOs;

namespace ProFit.Core.IServices
{
    public interface ICVService
    {

        Task<IEnumerable<CvDTO>> GetAllAsync();
        Task<CvDTO> GetGeneralCVByUserId(int userId);
        Task<CvDTO> GetByIdAsync(int id);
        Task<CvDTO> UpdateAsync(int id, MemoryStream stream);
        Task<bool> DeleteAsync(int id);
        Task<CvDTO> ConfirmGeneralCVUpload(int userId, string contentType);
        Task<CvDTO> ConfirmJobSpecificCVUpload(int jobId, int userId, string contentType);
        public Task<string> GetViewUrlByIdAsync(int id);

    }
}
