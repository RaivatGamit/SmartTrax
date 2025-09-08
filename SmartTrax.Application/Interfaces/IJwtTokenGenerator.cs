using System;
using SmartTrax.Core.Entities;

namespace SmartTrax.Application.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}
