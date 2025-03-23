using ProFit.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

public class CV
{
    public int Id { get; set; }
    public int CandidateId { get; set; }
    [ForeignKey("CandidateId")]
    public User User { get; set; }
    public int? JobId { get; set; }
    [ForeignKey("JobId")]
    public Job? Job { get; set; }
    [Column("UploadedAt", TypeName = "timestamp with time zone")]
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    [Column("UpdatedAt", TypeName = "timestamp with time zone")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public int Score { get; set; }
    public bool IsGeneral { get; set; }
}
