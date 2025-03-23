using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public class JobCleanupService : BackgroundService
{
    private readonly ILogger<JobCleanupService> _logger;

    public JobCleanupService(ILogger<JobCleanupService> logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Running job cleanup service...");
            await CleanupOldJobs();
            await Task.Delay(TimeSpan.FromDays(1), stoppingToken); // הרץ כל יום
        }
    }

    private async Task CleanupOldJobs()
    {
        // כאן תוסיף את הקוד שלך למחיקת משרות ישנות ממסד הנתונים.
        // לדוגמה, שליחת שאילתת SQL למחיקת משרות לא פעילות.
    }
}
