using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.IServices
{
    public interface IUserService 
    {
        public Task<IEnumerable<UserDTO>> GetAllUsersAsync();
        public Task<UserDTO> GetUserByIdAsync(int id);
        public Task<UserDTO> GetUserByEmailAsync(string email);
        public Task<UserDTO> RegisterAsync(UserDTO user);
        public Task<UserDTO> LoginAsync(string email, string password);
        public Task<UserDTO> UpdatePersonalDetailsAsync(int id, UserDTO user);
        public Task<UserDTO?> ToggleUserStatus(int id);
        public Task<bool> DeleteUserAsync(int id);
    }
}