using AutoMapper;
using FluentValidation;
using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using ProFit.Core.IRepositories;
using ProFit.Core.IServices;
using ProFit.Core.ResultModels;
using ProFit.Service.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ProFit.Service.Services
{
    public class UserService : IUserService
    {
        readonly IRepositoryManager _repository;
        readonly IUserRepository _userRepository;
        readonly IMapper _mapper;
        public UserService(IRepositoryManager repository, IMapper mapper, IUserRepository userRepository)
        {
            _repository = repository;
            _mapper = mapper;
            _userRepository = userRepository;
        }
        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                return false;
            }
            _userRepository.DeleteAsync(user);
            await _repository.SaveAsync();
            return true;
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            var res = await _userRepository.GetAsync();
            return _mapper.Map<UserDTO[]>(res);
        }

        public async Task<UserDTO> GetUserByEmailAsync(string email)
        {
            var res = await _userRepository.GetUserByEmailAsync(email);
            return _mapper.Map<UserDTO>(res);
        }

        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var res = await _userRepository.GetByIdAsync(id);
            return _mapper.Map<UserDTO>(res);
        }

        public async Task<UserDTO> LoginAsync(string email, string password)
        {
            var res = _userRepository.LoginAsync(email, password);
            return _mapper.Map<UserDTO>(res);
        }

        public async Task<UserDTO> RegisterAsync(UserDTO user)
        {
            var res = await _userRepository.AddAsync(_mapper.Map<User>(user));
            return _mapper.Map<UserDTO>(res);


        }

        public async Task<UserDTO> UpdatePersonalDetailsAsync(int id, UserDTO user)
        {
            var existingUser = await _repository.Users.GetByIdAsync(id);
            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            var result = await _repository.Users.UpdateAsync(id, existingUser);
            
            await _repository.SaveAsync();
            var resultDTO = _mapper.Map<UserDTO>(result);
            return resultDTO;
        }

        public async Task<UserDTO?> ToggleUserStatus(int id)
        {
            var existingUser = await _repository.Users.GetByIdAsync(id);
            if (existingUser == null)
                return null;
            existingUser.IsActive = !existingUser.IsActive;
            var result = await _repository.Users.UpdateAsync(id, existingUser);

            await _repository.SaveAsync();
            var resultDTO = _mapper.Map<UserDTO>(result);
            return resultDTO;
        }

        public async Task<IEnumerable<UserGrowthOverTimeDTO>> GetUserGrowthOverTime()
        {
            // דוגמה: קיבוץ לפי חודש
            var users = await _repository.Users.GetAsync();
            return users.GroupBy(u => new DateTime(u.CreatedAt.Year, u.CreatedAt.Month, 1))
                    .Select(g => new UserGrowthOverTimeDTO
                    {
                        Date = g.Key,
                        UserCount = g.Count()
                    })
                    .OrderBy(x => x.Date)
                    .ToList();
        }

        public async Task<UserActiveStatusPieDTO> GetUserActiveStatusPie()
        {
            var users = await _repository.Users.GetAsync();
            var active = users.Count(u => u.IsActive);
            var inactive = users.Count(u => !u.IsActive);
            return new UserActiveStatusPieDTO
            {
                ActiveUsers = active,
                InactiveUsers = inactive
            };
        }

        public async Task<UserCVUploadBarDTO> GetUserCVUploadBar()
        {
            var users = await _repository.Users.GetAsync();
            var uploaded = users.Count(u => u.HasUploadedGeneralCV);
            var notUploaded = users.Count(u => !u.HasUploadedGeneralCV);
            return new UserCVUploadBarDTO
            {
                UploadedCV = uploaded,
                NotUploadedCV = notUploaded
            };
        }
    }
}
