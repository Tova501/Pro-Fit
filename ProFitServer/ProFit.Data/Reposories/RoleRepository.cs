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
    public class RoleRepository : Repository<Role>, IRoleRepository
    {
        public RoleRepository(DataContext context) : base(context)
        {
        }

        public async Task<bool> AddPermissinForRoleAsync(string roleName, Permission permission)
        {
            var role = await this.GetRoleByNameAsync(roleName);
            if (role == null)
                return false;

            role.Permissions.Add(permission);
            return true;
        }

        public async Task<Role> GetRoleByNameAsync(string roleName)
        {
            var result = await _context.Roles.Where(role => role.RoleName == roleName).FirstOrDefaultAsync();
            return result;
        }

        public async Task<bool> IsRoleHasPermissinAsync(string roleName, string permissionName)
        {
            var result = await _context.Roles
                .AnyAsync(role => role.RoleName == roleName && role.Permissions
                .Any(permission => permission.PermissionName == permissionName));
            return result;
        }
    }
}
