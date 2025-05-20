using Microsoft.EntityFrameworkCore;
using ProFit.Core.Entities;
using ProFit.Core.IRepositories;
using ProFit.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Data.Reposories
{
    public class ApplicationRepository:Repository<Application>, IApplicationRepository
    {
        public ApplicationRepository(DataContext context) : base(context)
        {

        }

        public async Task<IEnumerable<Application>> GetAsync(Expression<Func<Application, bool>> predicate)
        {
            return await _context.Applications
                .Include(a => a.CV)
                .Include(a => a.User)
                .Where(predicate)
                .ToListAsync();
        }

    }
}
