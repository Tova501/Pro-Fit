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
    public class PermissionRepository : Repository<Permission>, IPermissionRepository
    {
        public PermissionRepository(DataContext context) : base(context)
        {
        }

        public async Task<Permission?> GetPermissionByNameAsync(string name)
        {
            var result = await _context.Permissions.FirstOrDefaultAsync(permission => permission.PermissionName == name);
            return result;
        }
    }
}
