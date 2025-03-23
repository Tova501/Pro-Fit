using ProFit.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.IServices
{
    public interface IPermissionService
    {
        public Task<PermissionDTO> AddPermissionAsync(PermissionDTO permission);
        public Task<List<PermissionDTO>> GetPermissionsAsync();
        public Task<PermissionDTO> GetPermissionByIdAsync(int id);
        public Task<PermissionDTO> GetPermissionByNameAsync(string name);
        public Task<bool> RemovePermissionAsync(int id);
        public Task<PermissionDTO> UpdatePermissionAsync(int id, PermissionDTO permission);
    }
}
