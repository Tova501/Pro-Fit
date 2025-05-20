using Microsoft.EntityFrameworkCore;
using ProFit.Core.DTOs;
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
    public class UserRepository(DataContext context) : Repository<User>(context), IUserRepository
    {
        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users.Include(user=>user.Role).FirstOrDefaultAsync(user => user.Email == email);
        }


        public async Task<User> LoginAsync(string email, string password)
        {
            var result = await _context.Users.FirstOrDefaultAsync(user => user.Email == email && user.Password == password);
            return result;
        }

    }
}
