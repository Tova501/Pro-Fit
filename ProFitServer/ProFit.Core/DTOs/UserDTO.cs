using ProFit.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using static ProFit.Core.Entities.User;

namespace ProFit.Core.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool HasUploadedGeneralCV { get; set; }
        public bool IsActive { get; set; }
    }
        public class UserGrowthOverTimeDTO
        {
            public DateTime Date { get; set; }
            public int UserCount { get; set; }
        }

        public class UserActiveStatusPieDTO
        {
            public int ActiveUsers { get; set; }
            public int InactiveUsers { get; set; }
        }

        public class UserCVUploadBarDTO
        {
            public int UploadedCV { get; set; }
            public int NotUploadedCV { get; set; }
        }
}
