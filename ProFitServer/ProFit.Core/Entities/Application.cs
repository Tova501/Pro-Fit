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

        [ForeignKey(nameof(User))]
        public int CandidateId { get; set; }
        public User User { get; set; }

        [ForeignKey(nameof(Job))]
        public int JobId { get; set; }
        public Job Job { get; set; }

        [ForeignKey(nameof(CV))]
        public int? CVId { get; set; }
        public CV CV { get; set; }
        public int Score { get; set; }
    }
}
