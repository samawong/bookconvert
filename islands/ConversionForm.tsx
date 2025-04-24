import { useState } from "preact/hooks";
import FileUploader from "./FileUploader.tsx";
import ProgressIndicator from "./ProgressIndicator.tsx";
import { useLanguage } from "./LanguageContext.tsx";

const formats = [
  { value: "epub", label: "EPUB", accept: ".epub" },
  { value: "mobi", label: "MOBI", accept: ".mobi" },
  { value: "pdf", label: "PDF", accept: ".pdf" },
  { value: "txt", label: "TXT", accept: ".txt" },
];

export default function ConversionForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState("epub");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { t, language } = useLanguage(); // 修改这一行，确保获取 language 变量

  const handleFileSelect = (file: File) => {
    // 检查文件大小（限制为50MB）
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setError(t("fileSize"));
      return;
    }
    
    setSelectedFile(file);
    setError("");
    setSuccess("");
  };

  const handleFormatChange = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    setTargetFormat(select.value);
  };

  // 获取当前文件格式
  const getCurrentFormat = () => {
    if (!selectedFile) return null;
    const extension = selectedFile.name.split(".").pop()?.toLowerCase();
    return extension;
  };

  // 保存转换记录到历史
  const saveToHistory = () => {
    if (!selectedFile) return;
    
    const record = {
      id: crypto.randomUUID(),
      fileName: selectedFile.name,
      sourceFormat: getCurrentFormat() || "",
      targetFormat,
      timestamp: Date.now(),
    };
    
    // 从localStorage获取现有历史
    const storedHistory = localStorage.getItem("conversionHistory");
    let history = [];
    
    if (storedHistory) {
      try {
        history = JSON.parse(storedHistory);
      } catch (e) {
        console.error("解析历史记录失败:", e);
      }
    }
    
    // 添加新记录（限制最多保存10条）
    history = [record, ...history].slice(0, 10);
    
    // 保存回localStorage
    localStorage.setItem("conversionHistory", JSON.stringify(history));
  };

  // 在 handleSubmit 函数中添加调试日志
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    console.log("提交表单，当前语言:", language);
    
    if (!selectedFile) {
      setError(t("selectFileFirst"));
      return;
    }

    setIsConverting(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("targetFormat", targetFormat);

      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t("conversionError"));
      }

      // 处理成功响应
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // 创建下载链接
      const a = document.createElement("a");
      const fileExtension = targetFormat.toLowerCase();
      const fileName = selectedFile.name.split(".")[0] + "." + fileExtension;
      
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // 保存转换记录到历史
      saveToHistory();
      
      setSuccess(t("conversionSuccess"));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("conversionError"));
    } finally {
      setIsConverting(false);
    }
  };

  // 过滤掉当前格式，避免转换为相同格式
  const availableFormats = formats.filter(
    (format) => format.value !== getCurrentFormat()
  );

  return (
    <form onSubmit={handleSubmit} class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {t("selectFile")}
        </label>
        <FileUploader
          onFileSelect={handleFileSelect}
          accept=".epub,.mobi,.pdf,.txt"
        />
      </div>

      {selectedFile && (
        <div class="mt-6">
          <label
            htmlFor="format"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("convertTo")}
          </label>
          <div class="relative">
            <select
              id="format"
              value={targetFormat}
              onChange={handleFormatChange}
              class="input appearance-none"
            >
              {availableFormats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div class="rounded-lg bg-red-50 p-4 border border-red-200">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">{t("error")}</h3>
              <div class="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div class="rounded-lg bg-green-50 p-4 border border-green-200">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">{t("success")}</h3>
              <div class="mt-2 text-sm text-green-700">
                <p>{success}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isConverting && (
        <div class="mt-4">
          <ProgressIndicator isActive={isConverting} duration={8000} />
          <p class="text-sm text-center text-gray-600">{t("processing")}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={!selectedFile || isConverting}
          class={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all duration-200 ${
            !selectedFile || isConverting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          }`}
        >
          {isConverting ? (
            <>
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t("converting")}
            </>
          ) : (
            t("startConversion")
          )}
        </button>
      </div>
    </form>
  );
}