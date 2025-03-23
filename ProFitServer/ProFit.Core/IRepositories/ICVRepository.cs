using ProFit.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace ProFit.Core.IRepositories
{
    public interface ICVRepository:IRepository<CV>
    {
       // Task<IEnumerable<CV>> GetCVsWithJobAsync();
    }
}
