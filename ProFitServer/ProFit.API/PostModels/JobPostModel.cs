namespace ProFit.API.PostModels
{
    public class JobPostModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string? Company { get; set; }
        public string Requirements { get; set; }
        public string Skills { get; set; } 
        public int YearsOfExperienceRequired { get; set; }
        public string Location { get; set; }
    }
}