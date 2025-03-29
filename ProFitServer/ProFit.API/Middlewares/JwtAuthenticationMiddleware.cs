using System.Security.Claims;

namespace ProFit.API.Middlewares
{
    public class JwtAuthenticationMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtAuthenticationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path.StartsWithSegments("/api/Auth/Login") || context.Request.Path.StartsWithSegments("/api/Auth/Register"))
            {
                await _next(context); 
                return;
            }

            var userIdString = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdString == null || !int.TryParse(userIdString, out int userId))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Unauthorized");
                return;
            }

            context.Items["UserId"] = userId;

            await _next(context);
        }

    }

}
