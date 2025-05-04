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
                .Include(j => j.Applications) // טוען את היישומים
                    .ThenInclude(a => a.User) // טוען את ה-User עבור כל יישום
                .Include(j => j.Applications)
                    .ThenInclude(a => a.CV) // טוען את ה-CV עבור כל יישום
                .FirstOrDefaultAsync(j => j.Id == jobId);
        }
        

        public async override Task<Job> UpdateAsync(int id, Job entity)
        {
            return await base.UpdateAsync(id, entity);
        }
    }
}
