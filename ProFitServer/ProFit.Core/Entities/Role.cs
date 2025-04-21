using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.Entities
{
    [Table("Roles")]
    public class Role
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string RoleName { get; set; }
        
        public string Description { get; set; }

        //[Column("CreatedAt", TypeName = "timestamp with time zone")]
        [Column("CreatedAt", TypeName = "datetime(6)")]

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //[Column("UpdatedAt", TypeName = "timestamp with time zone")]
        [Column("UpdatedAt", TypeName = "datetime(6)")]

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        public ICollection<User>? Users { get; set; } = new List<User>();
    }
}
