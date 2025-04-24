import { useLanguage } from "./LanguageContext.tsx";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    console.log("当前语言:", language);
    const newLanguage = language === "zh" ? "en" : "zh";
    console.log("切换到:", newLanguage);
    setLanguage(newLanguage);
  };
  
  return (
    <button 
      onClick={toggleLanguage}
      class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      type="button"
    >
      {language === "zh" ? "English" : "中文"}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    </button>
  );
}