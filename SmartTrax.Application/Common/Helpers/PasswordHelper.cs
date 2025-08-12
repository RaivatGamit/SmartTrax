using System;
using System.Security.Cryptography;
using System.Text;

namespace SmartTrax.Application.Common.Helpers;

public class PasswordHelper
{
    // Simple SHA256 hashing (works without external packages).
    // If you want stronger / salted hashing, use BCrypt in Infrastructure.
    public static string Hash(string password)
    {
        using var sha = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(password);
        var hashed = sha.ComputeHash(bytes);
        return Convert.ToBase64String(hashed);
    }

    public static bool Verify(string password, string storedHash)
    {
        return Hash(password) == storedHash;
    }
}
