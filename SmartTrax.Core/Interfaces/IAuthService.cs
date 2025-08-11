using SmartTrax.Core.Entities;

namespace SmartTrax.Core.Interfaces
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(string username, string password, string email);
        Task<string?> LoginAsync(string username, string password);
    }
}
