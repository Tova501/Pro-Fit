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
    public class PermissionService:IPermissionService
    {
        readonly IPermissionRepository _permissionRepository;
        readonly IMapper _mapper;

        public PermissionService(IPermissionRepository permissionRepository, IMapper mapper)
        {
            _permissionRepository = permissionRepository;
            _mapper = mapper;
        }

        public async Task<PermissionDTO> AddPermissionAsync(PermissionDTO permission)
        {
            var permissionEntity = _mapper.Map<Permission>(permission);
            var addedPermission = await _permissionRepository.AddAsync(permissionEntity);
           
            return _mapper.Map<PermissionDTO>(addedPermission);
        }

        public async Task<PermissionDTO> GetPermissionByIdAsync(int id)
        {
            return _mapper.Map<PermissionDTO>(await _permissionRepository.GetByIdAsync(id));
        }

        public async Task<PermissionDTO> GetPermissionByNameAsync(string name)
        {
            return _mapper.Map<PermissionDTO>(await _permissionRepository.GetPermissionByNameAsync(name));
        }

        public async Task<List<PermissionDTO>> GetPermissionsAsync()
        {
            var permissions = await _permissionRepository.GetAsync();
            return _mapper.Map<List<PermissionDTO>>(permissions);
        }

        public async Task<bool> RemovePermissionAsync(int id)
        {
            var item = await _permissionRepository.GetByIdAsync(id);
            if(item == null)
            {
                return false;
            }
            _permissionRepository.DeleteAsync(item);

            return true;
        }

        public async Task<PermissionDTO> UpdatePermissionAsync(int id, PermissionDTO permission)
        {
            var permissionEntity = _mapper.Map<Permission>(permission);
            var updatedPermission = await _permissionRepository.UpdateAsync(id, permissionEntity);
            return _mapper.Map<PermissionDTO>(updatedPermission);
        }
    }
}
