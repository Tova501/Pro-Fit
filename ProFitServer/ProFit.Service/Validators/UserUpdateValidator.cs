using FluentValidation;
using ProFit.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProFit.Service.Validators
{
    public class UserUpdateValidator:AbstractValidator<UserDTO>
    {
        public UserUpdateValidator()
        {
            RuleFor(user => user.Name)
                .NotEmpty().WithMessage("Name is required.");
        }
    }
}
