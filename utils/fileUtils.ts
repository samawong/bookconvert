import { ensureDir } from "$std/fs/ensure_dir.ts";
import { join } from "$std/path/mod.ts";

/**
 * 创建临时文件路径
 * @param extension 文件扩展名
 * @returns 临时文件的完整路径
 */
export function createTempFilePath(extension: string): string {
  const tempDir = join(Deno.cwd(), "temp");
  return join(tempDir, `${crypto.randomUUID()}.${extension}`);
}

/**
 * 确保临时目录存在
 * @returns 临时目录的路径
 */
export async function ensureTempDir(): Promise<string> {
  const tempDir = join(Deno.cwd(), "temp");
  await ensureDir(tempDir);
  return tempDir;
}

/**
 * 清理临时文件
 * @param filePath 要删除的文件路径
 */
export async function cleanupTempFile(filePath: string): Promise<void> {
  try {
    await Deno.remove(filePath);
  } catch (error) {
    console.error(`清理临时文件失败: ${filePath}`, error);
  }
}

/**
 * 获取文件的MIME类型
 * @param format 文件格式
 * @returns 对应的MIME类型
 */
export function getMimeType(format: string): string {
  const mimeTypes: Record<string, string> = {
    epub: "application/epub+zip",
    mobi: "application/x-mobipocket-ebook",
    pdf: "application/pdf",
    txt: "text/plain",
  };
  
  return mimeTypes[format] || "application/octet-stream";
}

/**
 * 检查文件格式是否支持
 * @param format 文件格式
 * @returns 是否支持
 */
export function isSupportedFormat(format: string): boolean {
  const supportedFormats = ["epub", "mobi", "pdf", "txt"];
  return supportedFormats.includes(format.toLowerCase());
}

/**
 * 从文件名中提取扩展名
 * @param fileName 文件名
 * @returns 文件扩展名（小写）
 */
export function getFileExtension(fileName: string): string {
  return fileName.split(".").pop()?.toLowerCase() || "";
}