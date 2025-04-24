import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext
): Promise<Response> {
  try {
    return await ctx.next();
  } catch (error) {
    console.error("未捕获的错误:", error);
    
    // 返回友好的错误页面
    return new Response(
      `
      <!DOCTYPE html>
      <html lang="zh-CN">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>出错了</title>
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background-color: #f9fafb;
            }
            .error-container {
              text-align: center;
              padding: 2rem;
              background-color: white;
              border-radius: 0.5rem;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              max-width: 32rem;
            }
            h1 {
              color: #ef4444;
              font-size: 1.5rem;
              margin-bottom: 1rem;
            }
            p {
              color: #4b5563;
              margin-bottom: 1.5rem;
            }
            .btn {
              display: inline-block;
              background-color: #3b82f6;
              color: white;
              padding: 0.5rem 1rem;
              border-radius: 0.25rem;
              text-decoration: none;
              font-weight: 500;
              transition: background-color 0.2s;
            }
            .btn:hover {
              background-color: #2563eb;
            }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1>出错了</h1>
            <p>抱歉，处理您的请求时发生了错误。请稍后再试。</p>
            <a href="/" class="btn">返回首页</a>
          </div>
        </body>
      </html>
      `,
      {
        status: 500,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      }
    );
  }
}