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
    public string? Company { get; set; }
    [Required]
    public string Requirements { get; set; }

    public string Skills { get; set; }
    public int YearsOfExperienceRequired { get; set; } 
    public string Location { get; set; }

    public int RecruiterId { get; set; }
    [ForeignKey("RecruiterId")]
    public User User { get; set; }
    public List<Application> Applications { get; set; } = new List<Application>();
    [Column("CreatedAt", TypeName = "timestamp with time zone")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [Column("UpdatedAt", TypeName = "timestamp with time zone")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
