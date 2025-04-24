import { Head } from "$fresh/runtime.ts";
import Layout from "../components/Layout.tsx";
import ConversionForm from "../islands/ConversionForm.tsx";
import ConversionHistory from "../islands/ConversionHistory.tsx";
import FormatComparison from "../components/FormatComparison.tsx";
import { useLanguage } from "../islands/LanguageContext.tsx";

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div class="relative">
        {/* 顶部渐变背景 */}
        <div class="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary-100 to-transparent"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center mb-16">
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span class="block">{t("heroTitle1")}</span>
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">{t("heroTitle2")}</span>
            </h1>
            <p class="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              {t("heroSubtitle")}
            </p>
          </div>

          <div class="max-w-xl mx-auto">
            <div class="card mb-8 transform transition-all hover:scale-[1.01]">
              <ConversionForm />
            </div>
            <ConversionHistory />
          </div>

          <div class="mt-24">
            <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-12">{t("supportedFormatsTitle")}</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  title: "EPUB",
                  description: t("mostReaders"),
                  icon: "📱",
                  color: "from-blue-500 to-indigo-500",
                },
                {
                  title: "MOBI",
                  description: t("kindle"),
                  icon: "📚",
                  color: "from-green-500 to-teal-500",
                },
                {
                  title: "PDF",
                  description: t("computerTablet"),
                  icon: "📄",
                  color: "from-red-500 to-pink-500",
                },
                {
                  title: "TXT",
                  description: t("allDevices"),
                  icon: "📝",
                  color: "from-yellow-500 to-orange-500",
                },
              ].map((format) => (
                <div key={format.title} class="card overflow-hidden group">
                  <div class={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${format.color}`}></div>
                  <div class="p-6">
                    <div class="text-4xl mb-4 transform transition-transform group-hover:scale-110">{format.icon}</div>
                    <h3 class="text-xl font-bold text-gray-900">{format.title}</h3>
                    <p class="mt-2 text-gray-600">{format.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div class="mt-24">
            <FormatComparison />
          </div>
          
          <div class="mt-24">
            <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-12">{t("whyChooseUs")}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="card overflow-hidden group">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600"></div>
                <div class="p-6">
                  <div class="text-primary-500 text-4xl mb-4 transform transition-transform group-hover:scale-110">🔒</div>
                  <h3 class="text-xl font-bold text-gray-900">{t("secure")}</h3>
                  <p class="mt-2 text-gray-600">
                    {t("secureDesc")}
                  </p>
                </div>
              </div>
              <div class="card overflow-hidden group">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600"></div>
                <div class="p-6">
                  <div class="text-primary-500 text-4xl mb-4 transform transition-transform group-hover:scale-110">⚡</div>
                  <h3 class="text-xl font-bold text-gray-900">{t("fast")}</h3>
                  <p class="mt-2 text-gray-600">
                    {t("fastDesc")}
                  </p>
                </div>
              </div>
              <div class="card overflow-hidden group">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600"></div>
                <div class="p-6">
                  <div class="text-primary-500 text-4xl mb-4 transform transition-transform group-hover:scale-110">💯</div>
                  <h3 class="text-xl font-bold text-gray-900">{t("quality")}</h3>
                  <p class="mt-2 text-gray-600">
                    {t("qualityDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-24 text-center">
            <h2 class="text-3xl font-extrabold text-gray-900 mb-6">{t("getStarted")}</h2>
            <p class="text-xl text-gray-500 mb-8">{t("getStartedDesc")}</p>
            <a href="#top" class="btn px-8 py-3 text-base">
              {t("startNow")}
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}