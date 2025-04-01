using ProFit.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class CV
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public int CandidateId { get; set; }
    [ForeignKey("CandidateId")]
    public string Path { get; set; }
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    [Column("UpdatedAt", TypeName = "timestamp with time zone")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public bool IsGeneral { get; set; }
    public string ContentType { get; set; }
}
