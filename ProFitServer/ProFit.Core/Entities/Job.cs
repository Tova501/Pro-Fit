using ProFit.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Jobs")]
public class Job
{
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(100)]
    public string Title { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public string Requirments { get; set; }
    public int RecruiterId { get; set; }
    [ForeignKey("RecruiterId")]
    public User User { get; set; }
    public List<CV> CVs { get; set; } = new List<CV>();
    [Column("CreatedAt", TypeName = "timestamp with time zone")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [Column("UpdatedAt", TypeName = "timestamp with time zone")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
