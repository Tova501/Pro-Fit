using ProFit.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.IRepositories
{
    public interface IUserRepository:IRepository<User>
    {
        public Task<User> GetUserByEmailAsync(string email);
        public Task<User> LoginAsync(string email, string password);
        public Task<bool> UpdatePasswordAsync(int id, string password);
        public Task<bool> UpdateNameAsync(int id, string name);
        public Task<bool> UpdateRoleAsync(int id, Role role);
    }
}
