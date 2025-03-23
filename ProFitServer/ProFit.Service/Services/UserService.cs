using AutoMapper;
using FluentValidation;
using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using ProFit.Core.IRepositories;
using ProFit.Core.IServices;
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
        readonly IUserRepository _userRepository;
        readonly IMapper _mapper;
        public UserService(IMapper mapper, IUserRepository userRepository)
        {
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

        public async Task<bool> UpdateNameAsync(int id, string email)
        {
            return await _userRepository.UpdateNameAsync(id, email);
        }

        public async Task<bool> UpdatePasswordAsync(int id, string email)
        {
            return await _userRepository.UpdatePasswordAsync(id, email);
        }

    }
}
