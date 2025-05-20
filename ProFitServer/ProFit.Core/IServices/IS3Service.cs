using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.IServices
{
    public interface IS3Service
    {
        public Task<string> GeneratePresignedUrlAsync(string folderName, string fileName, string contentType);

        public Task<string> GererateDownloadUrlAsync(string folderName, string fileName);

        public Task<string> GeneratePresignedViewUrlAsync(string key, string contentType);

        public Task<string> GeneratePresignedUrlUpdateAsync(string path);

        public Task<bool> DeleteAsync(string path);

    }
}
