using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace Fantasy.MinecraftServerConsole.Pages
{
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [IgnoreAntiforgeryToken]
    public class ErrorModel : PageModel
    {
        private readonly ILogger<ErrorModel> _logger;
        private readonly IHostEnvironment _env;

        public ErrorModel(ILogger<ErrorModel> logger, IHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        [BindProperty(SupportsGet = true)]
        public int? StatusCode { get; set; }

        public string ErrorTitle { get; set; } = "系统错误";
        public string ErrorMessage { get; set; } = "发生未知错误";
        public string? RequestId { get; set; }
        public bool ShowDetails => _env.IsDevelopment();
        public string? ExceptionDetails { get; set; }

        public void OnGet()
        {
            RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier;

            // 获取原始错误信息（如果有）
            var exceptionHandlerPathFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            var statusCodeReExecuteFeature = HttpContext.Features.Get<IStatusCodeReExecuteFeature>();

            if (StatusCode.HasValue)
            {
                ParseStatusCode(StatusCode.Value);
            }
            else if (exceptionHandlerPathFeature?.Error != null)
            {
                StatusCode = 500;
                ErrorTitle = "服务器内部错误";
                ErrorMessage = _env.IsDevelopment()
                    ? exceptionHandlerPathFeature.Error.Message
                    : "服务器遇到错误，无法完成请求";
                ExceptionDetails = exceptionHandlerPathFeature.Error.ToString();

                _logger.LogError(exceptionHandlerPathFeature.Error,
                    "未处理异常 at {Path}",
                    exceptionHandlerPathFeature.Path);
            }

            // 记录错误日志
            _logger.LogWarning("错误页面访问: StatusCode={StatusCode}, Path={Path}, RequestId={RequestId}",
                StatusCode,
                statusCodeReExecuteFeature?.OriginalPath ?? HttpContext.Request.Path,
                RequestId);
        }

        private void ParseStatusCode(int code)
        {
            switch (code)
            {
                case 400:
                    ErrorTitle = "错误请求";
                    ErrorMessage = "服务器无法理解该请求，请检查输入数据";
                    break;
                case 401:
                    ErrorTitle = "未授权";
                    ErrorMessage = "您需要登录才能访问此资源";
                    break;
                case 403:
                    ErrorTitle = "禁止访问";
                    ErrorMessage = "您没有权限访问此资源";
                    break;
                case 404:
                    ErrorTitle = "页面未找到";
                    ErrorMessage = "请求的资源不存在或已被移除";
                    break;
                case 405:
                    ErrorTitle = "方法不允许";
                    ErrorMessage = "请求方法不被允许";
                    break;
                case 408:
                    ErrorTitle = "请求超时";
                    ErrorMessage = "服务器等待客户端发送请求的时间过长";
                    break;
                case 500:
                    ErrorTitle = "服务器内部错误";
                    ErrorMessage = "服务器遇到错误，无法完成请求";
                    break;
                case 502:
                    ErrorTitle = "错误网关";
                    ErrorMessage = "网关或代理服务器收到无效响应";
                    break;
                case 503:
                    ErrorTitle = "服务不可用";
                    ErrorMessage = "服务器当前无法处理请求，可能过载或维护中";
                    break;
                case 504:
                    ErrorTitle = "网关超时";
                    ErrorMessage = "网关或代理服务器未及时从上游服务器收到响应";
                    break;
                default:
                    ErrorTitle = "系统错误";
                    ErrorMessage = $"发生未知错误 (HTTP {code})";
                    break;
            }
        }
    }
}