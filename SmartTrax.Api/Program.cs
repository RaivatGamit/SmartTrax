using System.Data;
using System.Text;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SmartTrax.Application.Interfaces;
using SmartTrax.Infrastructure.Repositories;
using SmartTrax.Infrastructure.Security;
using SmartTrax.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add configuration & controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// IDbConnection (single DI registration) - scoped per request
builder.Services.AddScoped<IDbConnection>(sp =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    return new MySqlConnection(connectionString);
});

// Repositories & services
builder.Services.AddScoped<SmartTrax.Application.Interfaces.IUserRepository, UserRepository>();
builder.Services.AddScoped<SmartTrax.Application.Interfaces.IAuthService, AuthService>();
builder.Services.AddScoped<SmartTrax.Application.Interfaces.IJwtTokenGenerator, JwtTokenGenerator>();

// JWT authentication setup (validate tokens issued by JwtTokenGenerator)
var jwtKey = builder.Configuration["Jwt:Key"];
var keyBytes = Encoding.UTF8.GetBytes(jwtKey ?? throw new ArgumentNullException("Jwt:Key missing in config"));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
    };
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();