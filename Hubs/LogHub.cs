using Microsoft.AspNetCore.SignalR;

namespace Fantasy.MinecraftServerConsole.Hubs
{
    public class LogHub : Hub
    {
        public async Task SendLog(string line)
            => await Clients.All.SendAsync("ReceiveLog", line);
    }
}
