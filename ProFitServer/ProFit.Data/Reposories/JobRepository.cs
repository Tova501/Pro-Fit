using Microsoft.EntityFrameworkCore;
using Mysqlx.Crud;
using ProFit.Core.Entities;
using ProFit.Core.IRepositories;
using ProFit.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Data.Reposories
{
    public class JobRepository : Repository<Job>, IJobRepository
    {
        public JobRepository(DataContext context) : base(context)
        {
        }

        public async Task<Job?> GetJobWithApplicationsAsync(int jobId)
        {
            return await _context.Jobs
                .Include(j => j.Applications)
                .FirstOrDefaultAsync(j => j.Id == jobId);
        }

        public async override Task<Job> UpdateAsync(int id, Job entity)
        {
            return await base.UpdateAsync(id, entity);
        }
    }
}
