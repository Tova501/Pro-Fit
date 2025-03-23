using AutoMapper;
using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using ProFit.Core.IRepositories;
using ProFit.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Service.Services
{
    public class RoleService:IRoleService
    {
        readonly IRoleRepository _roleRepository;
        readonly IPermissionRepository _permissionRepository;
        readonly IMapper _mapper;

        public RoleService(IRoleRepository roleRepository, IMapper mapper, IPermissionRepository permissionRepository)
        {
            _roleRepository = roleRepository;
            _mapper = mapper;
            _permissionRepository = permissionRepository;
        }
        public async Task<IEnumerable<RoleDTO>> GetRolesAsync()
        {
            var roles = await _roleRepository.GetAsync();
            return _mapper.Map<IEnumerable<RoleDTO>>(roles);
        }

        public async Task<RoleDTO> GetRoleByNameAsync(string roleName)
        {
            var role = await _roleRepository.GetRoleByNameAsync(roleName);
            return _mapper.Map<RoleDTO>(role);
        }

        public async Task<bool> IsRoleHasPermissinAsync(string roleName, string permission)
        {
            return await _roleRepository.IsRoleHasPermissinAsync(roleName, permission);
        }

        public async Task<bool> AddPermissinForRoleAsync(string roleName, string permission)
        {
            try
            {
                var res = await _permissionRepository.GetPermissionByNameAsync(permission);
                if (res == null)
                {
                    throw new Exception(" permission not found");
                }
                return await _roleRepository.AddPermissinForRoleAsync(roleName, res);
            }
            catch
            {
                throw new Exception("failed to add permission");
            }
        }
        public async Task<bool> AddRoleAsync(RoleDTO role)
        {
            var result = await _roleRepository.AddAsync(_mapper.Map<Role>(role));
            return result != null;
        }
        public async Task<bool> UpdateRoleAsync(int id, RoleDTO role)
        {
            var result = await _roleRepository.UpdateAsync(id, _mapper.Map<Role>(role));
            return result != null;
        }
        public async Task<bool> DeleteRoleAsync(int id)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            _roleRepository.DeleteAsync(role);
            return true;
        }

    }
}
