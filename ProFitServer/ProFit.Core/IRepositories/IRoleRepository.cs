using ProFit.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.IRepositories
{
    public interface IRoleRepository:IRepository<Role>
    {
        public Task<bool> IsRoleHasPermissinAsync(string roleName, string permissionName);
        public Task<Role> GetRoleByNameAsync(string roleName);
        public Task<bool> AddPermissinForRoleAsync(string roleName, Permission permission);
    }
}
