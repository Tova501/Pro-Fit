using AutoMapper;
using ProFit.Core.Entities;
using ProFit.API.PostModels;
using ProFit.API.PutModels;
using ProFit.Core.DTOs;


namespace ProFit.API.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Job, JobPostModel>().ReverseMap();
            CreateMap<User, LoginModel>().ReverseMap();
            CreateMap<User, RegisterModel>().ReverseMap();

            CreateMap<Job, JobPutModel>().ReverseMap();
            CreateMap<User, UserPutModel>().ReverseMap();

            CreateMap<JobDTO, Job>().ReverseMap();
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<CV, CvDTO>().ReverseMap();
            CreateMap<Application, ApplicationDTO>().ReverseMap();

            CreateMap<JobDTO, JobPostModel>().ReverseMap();
            CreateMap<UserDTO, LoginModel>().ReverseMap();
            CreateMap<UserDTO, RegisterModel>().ReverseMap();

            CreateMap<JobPutModel, JobDTO>();
        }
    }
}
