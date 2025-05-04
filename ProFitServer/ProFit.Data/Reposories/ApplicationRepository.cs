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
    public class ApplicationRepository:Repository<Application>, IApplicationRepository
    {
        public ApplicationRepository(DataContext context) : base(context)
        {

        }
    }
}
