﻿using ProFit.Core.Entities;
using System.Data;

namespace ProFit.API.PostModels
{
    public class RegisterModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ContentType { get; set; }
    }
}
