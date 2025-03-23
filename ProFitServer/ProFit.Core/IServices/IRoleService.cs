using ProFit.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.IServices
{
    public interface IRoleService
    {
        public Task<bool> IsRoleHasPermissinAsync(string roleName, string permission);
        public Task<RoleDTO> GetRoleByNameAsync(string roleName);
        public Task<IEnumerable<RoleDTO>> GetRolesAsync();
        public Task<bool> AddPermissinForRoleAsync(string roleName, string permission);
        public Task<bool> AddRoleAsync(RoleDTO role);
        public Task<bool> UpdateRoleAsync(int id, RoleDTO role);
        public Task<bool> DeleteRoleAsync(int id);
    }
}
