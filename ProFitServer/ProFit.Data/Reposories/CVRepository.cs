using Microsoft.EntityFrameworkCore;
using ProFit.Core.Entities;
using ProFit.Core.IRepositories;
using System.Threading.Tasks;

namespace ProFit.Data.Repositories
{
    public class CVRepository : Repository<CV>, ICVRepository
    {
        public CVRepository(DataContext context) : base(context) { }

        public async override Task<CV> UpdateAsync(int id, CV entity)
        {
            entity.UpdatedAt = DateTime.Now;
            return await base.UpdateAsync(id, entity);
        }
    }
}
