import { join } from "$std/path/mod.ts";
import { ensureTempDir, cleanupTempFile } from "../utils/fileUtils.ts";

/**
 * 电子书格式转换器
 */
export class BookConverter {
  /**
   * 转换电子书格式
   * @param inputBuffer 输入文件的二进制数据
   * @param sourceFormat 源格式
   * @param targetFormat 目标格式
   * @returns 转换后的二进制数据
   */
  public static async convert(
    inputBuffer: Uint8Array,
    sourceFormat: string,
    targetFormat: string
  ): Promise<Uint8Array> {
    // 创建临时目录
    const tempDir = await ensureTempDir();
    
    // 创建临时输入文件
    const inputPath = join(tempDir, `input.${sourceFormat}`);
    await Deno.writeFile(inputPath, inputBuffer);
    
    // 创建临时输出文件路径
    const outputPath = join(tempDir, `output.${targetFormat}`);
    
    try {
      // 执行转换
      await this.executeConversion(inputPath, outputPath, sourceFormat, targetFormat);
      
      // 读取转换后的文件
      return await Deno.readFile(outputPath);
    } finally {
      // 清理临时文件
      await cleanupTempFile(inputPath);
      await cleanupTempFile(outputPath);
    }
  }
  
  /**
   * 执行具体的转换操作
   */
  private static async executeConversion(
    inputPath: string,
    outputPath: string,
    sourceFormat: string,
    targetFormat: string
  ): Promise<void> {
    // 根据不同的格式组合选择不同的转换策略
    const conversionKey = `${sourceFormat}-to-${targetFormat}`;
    
    // 尝试使用Calibre的ebook-convert工具
    try {
      await this.convertWithCalibre(inputPath, outputPath);
      return;
    } catch (error) {
      console.log("Calibre转换失败，尝试使用内置转换方法:", error);
    }
    
    // 如果Calibre不可用，使用内置方法
    switch (conversionKey) {
      case "txt-to-epub":
        await this.convertTxtToEpub(inputPath, outputPath);
        break;
      case "txt-to-pdf":
        await this.convertTxtToPdf(inputPath, outputPath);
        break;
      case "epub-to-txt":
        await this.extractTextFromEpub(inputPath, outputPath);
        break;
      case "pdf-to-txt":
        await this.extractTextFromPdf(inputPath, outputPath);
        break;
      default:
        throw new Error(`不支持从 ${sourceFormat} 转换为 ${targetFormat}`);
    }
  }
  
  /**
   * 使用Calibre的ebook-convert工具进行转换
   */
  private static async convertWithCalibre(inputPath: string, outputPath: string): Promise<void> {
    const command = new Deno.Command("ebook-convert", {
      args: [inputPath, outputPath],
    });
    
    const { code, stdout, stderr } = await command.output();
    
    if (code !== 0) {
      const errorOutput = new TextDecoder().decode(stderr);
      throw new Error(`Calibre转换失败: ${errorOutput}`);
    }
  }
  
  /**
   * 将TXT转换为EPUB
   */
  private static async convertTxtToEpub(inputPath: string, outputPath: string): Promise<void> {
    // 读取TXT内容
    const content = await Deno.readTextFile(inputPath);
    const title = "Converted Document";
    
    // 创建临时目录结构
    const tempDir = join(await ensureTempDir(), crypto.randomUUID().toString());
    await Deno.mkdir(join(tempDir, "META-INF"), { recursive: true });
    await Deno.mkdir(join(tempDir, "OEBPS"), { recursive: true });
    
    // 创建mimetype文件
    await Deno.writeTextFile(join(tempDir, "mimetype"), "application/epub+zip");
    
    // 创建container.xml
    await Deno.writeTextFile(join(tempDir, "META-INF", "container.xml"), `
      <?xml version="1.0" encoding="UTF-8"?>
      <container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
        <rootfiles>
          <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
        </rootfiles>
      </container>
    `);
    
    // 创建content.opf
    await Deno.writeTextFile(join(tempDir, "OEBPS", "content.opf"), `
      <?xml version="1.0" encoding="UTF-8"?>
      <package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookID" version="2.0">
        <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
          <dc:title>${title}</dc:title>
          <dc:language>zh-CN</dc:language>
          <dc:identifier id="BookID">urn:uuid:${crypto.randomUUID()}</dc:identifier>
        </metadata>
        <manifest>
          <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
          <item id="content" href="content.html" media-type="application/xhtml+xml"/>
        </manifest>
        <spine toc="ncx">
          <itemref idref="content"/>
        </spine>
      </package>
    `);
    
    // 创建toc.ncx
    await Deno.writeTextFile(join(tempDir, "OEBPS", "toc.ncx"), `
      <?xml version="1.0" encoding="UTF-8"?>
      <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
        <head>
          <meta name="dtb:uid" content="urn:uuid:${crypto.randomUUID()}"/>
          <meta name="dtb:depth" content="1"/>
          <meta name="dtb:totalPageCount" content="0"/>
          <meta name="dtb:maxPageNumber" content="0"/>
        </head>
        <docTitle>
          <text>${title}</text>
        </docTitle>
        <navMap>
          <navPoint id="navPoint-1" playOrder="1">
            <navLabel>
              <text>${title}</text>
            </navLabel>
            <content src="content.html"/>
          </navPoint>
        </navMap>
      </ncx>
    `);
    
    // 创建content.html
    await Deno.writeTextFile(join(tempDir, "OEBPS", "content.html"), `
      <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <title>${title}</title>
          <meta charset="utf-8"/>
        </head>
        <body>
          <h1>${title}</h1>
          ${content.split("\n").map(line => `<p>${line}</p>`).join("")}
        </body>
      </html>
    `);
    
    // 创建ZIP文件
    const zipCommand = new Deno.Command("zip", {
      args: ["-r", outputPath, "."],
      cwd: tempDir,
    });
    
    try {
      const { code } = await zipCommand.output();
      if (code !== 0) {
        throw new Error("创建EPUB文件失败");
      }
    } finally {
      // 清理临时目录
      await Deno.remove(tempDir, { recursive: true });
    }
  }
  
  /**
   * 将TXT转换为PDF
   */
  private static async convertTxtToPdf(inputPath: string, outputPath: string): Promise<void> {
    // 读取TXT内容
    const content = await Deno.readTextFile(inputPath);
    const title = "Converted Document";
    
    // 使用pdf-lib创建PDF
    const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
    
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    const lines = content.split("\n");
    const linesPerPage = 40;
    const pageCount = Math.ceil(lines.length / linesPerPage);
    
    for (let i = 0; i < pageCount; i++) {
      const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
      const { width, height } = page.getSize();
      
      // 添加标题（仅在第一页）
      if (i === 0) {
        page.drawText(title, {
          x: 50,
          y: height - 50,
          size: 24,
          font,
          color: rgb(0, 0, 0),
        });
      }
      
      // 添加页码
      page.drawText(`Page ${i + 1} of ${pageCount}`, {
        x: width - 150,
        y: 30,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      
      // 添加内容
      const pageLines = lines.slice(i * linesPerPage, (i + 1) * linesPerPage);
      pageLines.forEach((line, index) => {
        const yPosition = i === 0 ? height - 100 - index * 20 : height - 50 - index * 20;
        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
      });
    }
    
    const pdfBytes = await pdfDoc.save();
    await Deno.writeFile(outputPath, pdfBytes);
  }
  
  /**
   * 从EPUB中提取文本
   */
  private static async extractTextFromEpub(inputPath: string, outputPath: string): Promise<void> {
    // 这是一个简化的实现，实际应用中需要解析EPUB文件
    await Deno.writeTextFile(outputPath, "这是从EPUB文件中提取的文本内容。\n实际应用中需要实现EPUB解析功能。");
  }
  
  /**
   * 从PDF中提取文本
   */
  private static async extractTextFromPdf(inputPath: string, outputPath: string): Promise<void> {
    // 这是一个简化的实现，实际应用中需要解析PDF文件
    await Deno.writeTextFile(outputPath, "这是从PDF文件中提取的文本内容。\n实际应用中需要实现PDF解析功能。");
  }
}