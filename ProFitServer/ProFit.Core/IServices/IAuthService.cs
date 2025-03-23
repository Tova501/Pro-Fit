using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProFit.Core.ResultModels;

namespace ProFit.Core.IServices
{
    public interface IAuthService
    {
        public string GenerateJwtToken(User user);
        public Task<Result<AuthenticationResult>> RegisterAsync(UserDTO user);
        public Task<Result<AuthenticationResult>> LoginAsync(UserDTO user);
    }
}
