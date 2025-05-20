using ProFit.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.IRepositories
{
    public interface IApplicationRepository:IRepository<Application>
    {
        Task<IEnumerable<Application>> GetAsync(Expression<Func<Application, bool>> predicate);

    }
}
