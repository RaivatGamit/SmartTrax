using System;
using System.Data;
using Dapper;
using SmartTrax.Application.Interfaces;
using SmartTrax.Core.Entities;

namespace SmartTrax.Infrastructure.Repositories;

public class UserRepository: IUserRepository
{
    private readonly IDbConnection _db;

    public UserRepository(IDbConnection db)
    {
        _db = db;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        const string sql = "SELECT * FROM Users WHERE Email = @Email LIMIT 1";
        return await _db.QueryFirstOrDefaultAsync<User>(sql, new { Email = email });
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        const string sql = "SELECT * FROM Users WHERE Username = @Username LIMIT 1";
        return await _db.QueryFirstOrDefaultAsync<User>(sql, new { Username = username });
    }

    public async Task<int> CreateAsync(User user)
    {
        const string sql = @"
                INSERT INTO Users (Id, Username, Email, PasswordHash, Role)
                VALUES (@Id, @Username, @Email, @PasswordHash, @Role);
            ";
        return await _db.ExecuteAsync(sql, user);
    }
}
