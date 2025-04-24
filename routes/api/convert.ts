import { Handlers } from "$fresh/server.ts";
import { BookConverter } from "../../lib/converter.ts";
import { 
  ensureTempDir, 
  getMimeType, 
  isSupportedFormat, 
  getFileExtension 
} from "../../utils/fileUtils.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const form = await req.formData();
      const file = form.get("file") as File;
      const targetFormat = form.get("targetFormat") as string;
      
      if (!file) {
        return new Response(
          JSON.stringify({ message: "未提供文件" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      if (!targetFormat) {
        return new Response(
          JSON.stringify({ message: "未指定目标格式" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // 获取文件扩展名
      const fileName = file.name;
      const fileExt = getFileExtension(fileName);
      
      // 检查文件格式
      if (!fileExt || !isSupportedFormat(fileExt)) {
        return new Response(
          JSON.stringify({ message: "不支持的文件格式" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // 检查目标格式
      if (!isSupportedFormat(targetFormat)) {
        return new Response(
          JSON.stringify({ message: "不支持的目标格式" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // 如果源格式和目标格式相同，返回错误
      if (fileExt === targetFormat) {
        return new Response(
          JSON.stringify({ message: "源格式和目标格式相同" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      // 读取上传的文件数据
      const fileData = new Uint8Array(await file.arrayBuffer());
      
      // 执行转换
      const convertedData = await BookConverter.convert(fileData, fileExt, targetFormat);
      
      // 生成输出文件名
      const outputFileName = fileName.replace(new RegExp(`\\.${fileExt}$`), `.${targetFormat}`);
      
      // 返回转换后的文件
      return new Response(convertedData, {
        headers: {
          "Content-Type": getMimeType(targetFormat),
          "Content-Disposition": `attachment; filename="${encodeURIComponent(outputFileName)}"`,
        },
      });
    } catch (error) {
      console.error("转换过程中发生错误:", error);
      return new Response(
        JSON.stringify({ message: error instanceof Error ? error.message : "转换过程中发生错误" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  },
};