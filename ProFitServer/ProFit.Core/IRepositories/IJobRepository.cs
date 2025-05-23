﻿using ProFit.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.IRepositories
{
    public interface IJobRepository:IRepository<Job>
    {
        public Task<Job?> GetJobWithApplicationsAsync(int jobId);

    }
}
