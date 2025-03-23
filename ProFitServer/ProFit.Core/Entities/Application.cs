using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.Entities
{
    [Table("Applications")]
    public class Application
    {
        [Key]
        public int Id { get; set; }

        public int CandidateId { get; set; }
        [ForeignKey("CandidateId")]
        public User User { get; set; }

        public int JobId { get; set; }
        [ForeignKey("JobId")]
        public Job Job { get; set; }

        public int? CVId { get; set; }
        [ForeignKey("CVId")]
        public CV CV { get; set; }
    }
}
