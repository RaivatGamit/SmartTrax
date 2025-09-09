using System;
using SmartTrax.Application.Common.Helpers;
using SmartTrax.Application.DTOs.Auth;
using SmartTrax.Application.Interfaces;
using SmartTrax.Core.Entities;


namespace SmartTrax.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenGenerator _jwtGenerator;

    public AuthService(IUserRepository userRepository, IJwtTokenGenerator jwtGenerator)
    {
        _userRepository = userRepository;
        _jwtGenerator = jwtGenerator;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto dto)
    {
        var exists = await _userRepository.GetByEmailAsync(dto.Email);
        if (exists != null)
            throw new InvalidOperationException("Email already registered");

        var userNameExists = await _userRepository.GetByUsernameAsync(dto.Username);
        if (userNameExists != null)
            throw new InvalidOperationException("Username already taken");

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = PasswordHelper.Hash(dto.Password),
            Role = "User"
        };

        await _userRepository.CreateAsync(user);

        var token = _jwtGenerator.GenerateToken(user);

        return new AuthResponseDto
        {
            Token = token,
            Expiration = DateTime.UtcNow.AddMinutes(60),
            Username = user.Username,
            Email = user.Email
        };
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto dto)
    {
        var user = await _userRepository.GetByEmailAsync(dto.Email);
        if (user == null || !PasswordHelper.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid credentials");

        var token = _jwtGenerator.GenerateToken(user);

        return new AuthResponseDto
        {
            Token = token,
            Expiration = DateTime.UtcNow.AddMinutes(60),
            Username = user.Username,
            Email = user.Email
        };
    }
}