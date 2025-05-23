﻿using System;
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
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [PasswordPropertyText]
        public string Password { get; set; }
        public List<Job> Jobs { get; set; } = new List<Job>();
        [Required]
        [ForeignKey(nameof(Role))]
        public int RoleId { get; set; }
        public Role Role { get; set; }

        public bool IsActive { get; set; } = true;
        //[Column("CreatedAt", TypeName = "timestamp with time zone")]
        [Column("CreatedAt", TypeName = "datetime(6)")]

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool HasUploadedGeneralCV { get; set; }
    }
}
