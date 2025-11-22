using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Fantasy.MinecraftServerConsole.Pages
{
    public class IndexModel : PageModel
    {
        /* 后端决定延时和去向 */
        public int Seconds { get; private set; } = 5;   // 倒计时秒数
        public string NextUrl { get; private set; } = string.Empty; // 跳转目标

        public void OnGet()
        {
            bool valid = false; // 后期换 ValidateCookie()
            NextUrl = valid ? "/console" : "/login";
        }
    }
}
