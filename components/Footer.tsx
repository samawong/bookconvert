import { JSX } from "preact";
import { useLanguage } from "../islands/LanguageContext.tsx";
import LanguageSwitcher from "../islands/LanguageSwitcher.tsx";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="space-y-8 xl:col-span-1">
            <span class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">{t("appName")}</span>
            <p class="text-gray-500 text-base">
              {t("tagline")}
            </p>
            {/* 使用语言切换器组件 */}
            <div class="mt-4">
              <LanguageSwitcher />
            </div>
          </div>
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