using System;

namespace SmartTrax.Application.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(string userId, string userName, string role);
}
