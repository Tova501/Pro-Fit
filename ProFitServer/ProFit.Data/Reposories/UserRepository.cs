using Microsoft.EntityFrameworkCore;
using ProFit.Core.Entities;
using ProFit.Core.IRepositories;
using ProFit.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Data.Reposories
{
    public class UserRepository(DataContext context):Repository<User>(context), IUserRepository
    {
        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Email == email);
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
        }

        public async Task<User> LoginAsync(string email, string password)
        {
            var res = await _context.Users.FirstOrDefaultAsync(user => user.Email == email && user.Password == password);
            return res;
        }


        public async Task<bool> UpdatePasswordAsync(int id, string password)
        {
            var user = await _context.Users.Where(user => user.Id == id).FirstOrDefaultAsync();
            if (user == null)
            {
                return false;
            }
            user.Password = password;
            return true;
        }

        public async Task<bool> UpdateNameAsync(int id, string name)
        {
            var user = await _context.Users.Where(user => user.Id == id).FirstOrDefaultAsync();
            if (user == null) 
            {
                return false;
            }
            user.Name = name;
            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<bool> UpdateRoleAsync(int id, Role role)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
            if (user == null)
            {
                return false;
            }
            user.Roles.Add(role);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var res = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
            if (res == null)
            {
                return false;
            }
            _context.Users.Remove(res);
            return true;
        }
    }
}
