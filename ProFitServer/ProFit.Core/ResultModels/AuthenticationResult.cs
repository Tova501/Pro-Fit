using ProFit.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Core.ResultModels
{
    public class AuthenticationResult
    {
        public string Token { get; set; }
        public UserDTO User { get; set; }

        public AuthenticationResult(string token, UserDTO user)
        {
            Token = token;
            User = user;
        }
    }
}
