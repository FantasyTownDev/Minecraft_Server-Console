using Fantasy.MinecraftServerConsole.Hubs;
using Microsoft.AspNetCore.SignalR;
using System.Diagnostics;

namespace Fantasy.MinecraftServerConsole.Services
{
    public class ServerService(IHubContext<LogHub> hub) : BackgroundService
    {
        private Process? _mc;

        protected override async Task ExecuteAsync(CancellationToken ct)
        {
            await Task.Yield();
            StartServer();   // java -jar server.jar
            while (!ct.IsCancellationRequested)
                await Task.Delay(1000, ct);
        }

        private void StartServer()
        {
            _mc = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "java",
                    Arguments = "-jar server.jar nogui",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };
            _mc.OutputDataReceived += (_, e) =>
            {
                if (string.IsNullOrWhiteSpace(e.Data)) return;
                // 实时推给 SignalR
                hub.Clients.All.SendAsync("ReceiveLog", e.Data);
            };
            _mc.Start();
            _mc.BeginOutputReadLine();
        }
    }
}
