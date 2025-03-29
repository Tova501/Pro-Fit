using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.DTOs
{
    public class CvDTO
    {
        public int Id { get; set; }
        public int CandidateId { get; set; }
        public int JobId { get; set; }
        public bool IsGeneral { get; set; }
        public DateTime UploadedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string ContentType { get; set; }

    }
}
