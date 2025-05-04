using System;

namespace ProFit.Core.DTOs
{
    public class CvDTO
    {
        public int Id { get; set; }
        public int CandidateId { get; set; }
        public bool IsGeneral { get; set; }
        public string Path { get; set; }

        public string ContentType { get; set; }
    }

}
