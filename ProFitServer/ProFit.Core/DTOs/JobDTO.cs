using ProFit.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.DTOs
{
    public class JobDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string? Company { get; set; }
        public string Requirements { get; set; }
        public string Skills { get; set; }
        public string Location { get; set; }
        public int YearsOfExperienceRequired { get; set; }
        public int RecruiterId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
