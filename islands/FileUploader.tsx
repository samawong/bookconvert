import { useState } from "preact/hooks";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

export default function FileUploader({ onFileSelect, accept }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div
      class={`file-drop-area ${isDragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        class="sr-only"
        onChange={handleFileChange}
        accept={accept}
      />
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="flex flex-col items-center text-center mt-4">
          {fileName ? (
            <>
              <p class="text-sm font-medium text-gray-900">{fileName}</p>
              <p class="text-xs text-gray-500 mt-1">点击更换文件</p>
            </>
          ) : (
            <>
              <p class="text-sm font-medium text-gray-900">
                拖放文件到这里或
              </p>
              <p class="text-xs text-gray-500 mt-1">
                支持 EPUB, MOBI, PDF, TXT 格式
              </p>
            </>
          )}
          <label
            for="file-upload"
            class="mt-4 btn"
          >
            选择文件
          </label>
        </div>
      </div>
    </div>
  );
}