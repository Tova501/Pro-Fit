using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.Entities
{

    [Table("Users")]
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [PasswordPropertyText]
        public string Password { get; set; }
        public string? Company { get; set; }
        public List<Job> Jobs { get; set; } = new List<Job>();
        public List<CV> CVs { get; set; } = new List<CV>();
        [Required]
        public ICollection<Role> Roles { get; set; } = new HashSet<Role>();
        public bool IsActive { get; set; } = true;
        [Column("CreatedAt", TypeName = "timestamp with time zone")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
