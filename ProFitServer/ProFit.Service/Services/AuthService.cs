using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using ProFit.Core.IRepositories;
using ProFit.Core.IServices;
using Microsoft.IdentityModel.Tokens;
using ProFit.Core.DTOs;
using ProFit.Core.Entities;
using ProFit.Core.IRepositories;
using ProFit.Core.IServices;
using ProFit.Service.Validators;
using FluentValidation;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using ProFit.Core.ResultModels;

namespace ProFit.Service.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRepositoryManager _repository;
        private readonly IValidator<User> _registerValidator;
        private readonly IMapper _mapper;
        public AuthService(
            IRepositoryManager repository,
            IValidator<User> registerValidator,
            IMapper mapper)
        {
            _repository = repository;
            _registerValidator = registerValidator;
            _mapper = mapper;
        }

        public string GenerateJwtToken(User user)
        {

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            claims.Add(new Claim(ClaimTypes.Role, user.Role.RoleName));

            var token = new JwtSecurityToken(
                Environment.GetEnvironmentVariable("JWT_ISSUER"),
                Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
                claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<User> ValidateUser(string email, string password)
        {
            User user = await _repository.Users.GetUserByEmailAsync(email);
            if (user != null)
            {
                if (BCrypt.Net.BCrypt.Verify(password, user.Password))
                {
                    return user;
                }
            }
            return null;
        }

        public async Task<Result<AuthenticationResult>> LoginAsync(UserDTO userDTO)
        {
            var user = await ValidateUser(userDTO.Email, userDTO.Password);
            if(user == null)
            {
                return Result<AuthenticationResult>.Failure("Invalid email or password.", 403);
            }
            var token = GenerateJwtToken(user);
            var resultUser = _mapper.Map<UserDTO>(user);
            var result = new AuthenticationResult(token, resultUser);
            return Result<AuthenticationResult>.Success(result);
        }

        public async Task<Result<AuthenticationResult>> RegisterAsync(UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            var validationResults = await _registerValidator.ValidateAsync(user);

            if (!validationResults.IsValid)
            {
                return Result<AuthenticationResult>.Failure(validationResults.Errors.ToString(), 400);
            }

            if (await _repository.Users.GetUserByEmailAsync(user.Email) != null)
            {
                return Result<AuthenticationResult>.Failure("User already exists", 409);
            }

            var hashPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password = hashPassword;
            var role = await _repository.Roles.GetRoleByNameAsync("User");
            user.Role = role;
            user.RoleId = role.Id;

            var result = await _repository.Users.AddAsync(user);
            if (result == null)
            {
                return Result<AuthenticationResult>.Failure("Failed to register user.", 500);
            }
            await _repository.SaveAsync();
            var token = GenerateJwtToken(user);
            var resultUser = _mapper.Map<UserDTO>(user);
            return Result<AuthenticationResult>.Success(new AuthenticationResult(token,resultUser));
        }
    }
}