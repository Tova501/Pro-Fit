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
        //GET
        public Task<IEnumerable<UserDTO>> GetAllUsersAsync();
        public Task<UserDTO> GetUserByIdAsync(int id);
        public Task<UserDTO> GetUserByEmailAsync(string email);

        //PUT
        public Task<UserDTO> RegisterAsync(UserDTO user);

        //POST
        public Task<UserDTO> LoginAsync(string email, string password);
        public Task<bool> UpdatePasswordAsync(int id, string email);
        public Task<bool> UpdateNameAsync(int id, string email);

        //DELETE
        public Task<bool> DeleteUserAsync(int id);
    }
}