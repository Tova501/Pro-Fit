using ProFit.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;

public class CV
{
    public int Id { get; set; }
    public int CandidateId { get; set; }
    [ForeignKey("CandidateId")]
    public User User { get; set; }

    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    [Column("UpdatedAt", TypeName = "timestamp with time zone")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public bool IsGeneral { get; set; }
    public string ContentType { get; set; }
}
