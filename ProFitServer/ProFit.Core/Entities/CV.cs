using ProFit.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class CV
{
    [Key]
    public int Id { get; set; }
    public int CandidateId { get; set; }
    
    public string Path { get; set; }

    [Column("UploadedAt", TypeName = "datetime(6)")]
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    // [Column("UpdatedAt", TypeName = "timestamp with time zone")]
    [Column("UpdatedAt", TypeName = "datetime(6)")]
     public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public bool IsGeneral { get; set; }
    public string ContentType { get; set; }
}
