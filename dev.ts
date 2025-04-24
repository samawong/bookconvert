#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

// 构建 Tailwind CSS
async function buildTailwind() {
  try {
    // 确保输出目录存在
    await Deno.mkdir("./static/css", { recursive: true });
    
    // 使用Deno运行npx命令构建Tailwind
    const process = new Deno.Command("npx", {
      args: [
        "tailwindcss",
        "-i",
        "./static/styles.css",
        "-o",
        "./static/css/styles.out.css",
      ],
      stdout: "piped",
      stderr: "piped",
    });
    
    const { code, stdout, stderr } = await process.output();
    
    if (code === 0) {
      console.log("✅ Tailwind CSS 构建成功");
    } else {
      console.error("❌ Tailwind CSS 构建失败");
      console.error(new TextDecoder().decode(stderr));
    }
  } catch (error) {
    console.error("❌ Tailwind CSS 构建失败:", error);
  }
}

// 构建 Tailwind CSS
await buildTailwind();

// 启动 Fresh 开发服务器
await dev(import.meta.url, "./main.ts", config);