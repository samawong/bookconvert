import { JSX } from "preact";
import { useLanguage } from "./LanguageContext.tsx";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  const { language, t, setLanguage } = useLanguage();
  
  // 切换语言
  const toggleLanguage = () => {
    console.log("当前语言:", language);
    const newLanguage = language === "zh" ? "en" : "zh";
    console.log("切换到:", newLanguage);
    setLanguage(newLanguage);
  };
  
  return (
    <footer class="bg-white border-t border-gray-200">
      {/* 页脚内容与之前相同 */}
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8 xl:col-span-1">
            <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">{t("appName")}</span>
            <p class="text-gray-500 text-base">
              {t("tagline")}
            </p>
            {/* 添加语言切换按钮 */}
            <div class="mt-4">
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
            </div>
          </div>
          
          {/* 其余页脚内容 */}
          <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  {t("features")}
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li>
                    <a href="/" class="text-base text-gray-500 hover:text-gray-900">
                      {t("formatConversion")}
                    </a>
                  </li>
                  <li>
                    <a href="/help" class="text-base text-gray-500 hover:text-gray-900">
                      {t("usageHelp")}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  {t("support")}
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-gray-900">
                      {t("faq")}
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-gray-900">
                      {t("contactUs")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  {t("company")}
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li>
                    <a href="/about" class="text-base text-gray-500 hover:text-gray-900">
                      {t("aboutUs")}
                    </a>
                  </li>
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-gray-900">
                      {t("privacyPolicy")}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  {t("legal")}
                </h3>
                <ul role="list" class="mt-4 space-y-4">
                  <li>
                    <a href="#" class="text-base text-gray-500 hover:text-gray-900">
                      {t("termsOfService")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 border-t border-gray-200 pt-8">
          <p class="text-base text-gray-400 text-center">
            &copy; {currentYear} {t("appName")}. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}