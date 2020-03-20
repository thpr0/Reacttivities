using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host=CreateHostBuilder(args).Build();

            using(var scope=host.Services.CreateScope())
            {
                var services=scope.ServiceProvider;
                try
                {
                    var context=services.GetRequiredService<DataContext>();
                    context.Database.Migrate();                    
                }
                catch (System.Exception ex)
                {                    
                   var logger=services.GetRequiredService<ILogger<Program>>();
                   logger.LogError(ex,"AN ERROR OCCURED DURING MIGRATION");
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
