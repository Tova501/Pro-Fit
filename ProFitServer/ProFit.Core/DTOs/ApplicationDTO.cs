using ProFit.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.DTOs
{
    public class ApplicationDTO
    {
        public int Id { get; set; }
        public UserDTO User { get; set; }
        public int JobId { get; set; }
        public CvDTO CV { get; set; }
        public int Score { get; set; }
    }
}
