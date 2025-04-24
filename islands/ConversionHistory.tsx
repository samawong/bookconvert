import { useState, useEffect } from "preact/hooks";
import { useLanguage } from "./LanguageContext.tsx";

interface ConversionRecord {
  id: string;
  fileName: string;
  sourceFormat: string;
  targetFormat: string;
  timestamp: number;
}

export default function ConversionHistory() {
  const [history, setHistory] = useState<ConversionRecord[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // 从localStorage加载历史记录
    const storedHistory = localStorage.getItem("conversionHistory");
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error("解析历史记录失败:", e);
      }
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("conversionHistory");
    setHistory([]);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div class="mt-8">
      <div class="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsVisible(!isVisible)}
          class="text-sm font-medium text-primary-600 hover:text-primary-700 focus:outline-none transition-colors"
        >
          {isVisible ? t("hideHistory") : t("showHistory")}
        </button>
        {isVisible && (
          <button
            onClick={clearHistory}
            class="text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none transition-colors"
          >
            {t("clearHistory")}
          </button>
        )}
      </div>

      {isVisible && (
        <div class="bg-white shadow-soft rounded-xl overflow-hidden">
          <ul class="divide-y divide-gray-200">
            {history.map((record) => (
              <li key={record.id} class="hover:bg-gray-50 transition-colors">
                <div class="px-4 py-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-primary-600 truncate">
                      {record.fileName}
                    </p>
                    <div class="ml-2 flex-shrink-0 flex">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {record.sourceFormat.toUpperCase()} → {record.targetFormat.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div class="mt-2 sm:flex sm:justify-between">
                    <div class="sm:flex">
                      <p class="flex items-center text-sm text-gray-500">
                        <svg class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                        </svg>
                        {new Date(record.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}