using System;
using SmartTrax.Core.Entities;

namespace SmartTrax.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByUsernameAsync(string username);
    Task<int> CreateAsync(User user);
}
