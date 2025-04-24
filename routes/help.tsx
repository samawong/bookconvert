import { Head } from "$fresh/runtime.ts";
import Layout from "../components/Layout.tsx";
import { useLanguage } from "../islands/LanguageContext.tsx";

export default function Help() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <Head>
        <title>{t("helpTitle")} | BookConvert</title>
      </Head>
      
      <div class="relative">
        <div class="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary-100 to-transparent"></div>
        
        <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center mb-16">
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              {t("helpTitle")}
            </h1>
            <p class="mt-4 text-xl text-gray-500">
              {t("helpDesc")}
            </p>
          </div>
          
          <div class="bg-white shadow-soft rounded-xl overflow-hidden mb-16">
            <div class="px-6 py-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">{t("howToUse")}</h2>
              
              <div class="space-y-12">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <span class="text-xl font-bold">1</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">{t("step1")}</h3>
                    <p class="mt-2 text-base text-gray-500">{t("step1Desc")}</p>
                  </div>
                </div>
                
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <span class="text-xl font-bold">2</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">{t("step2")}</h3>
                    <p class="mt-2 text-base text-gray-500">{t("step2Desc")}</p>
                  </div>
                </div>
                
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <span class="text-xl font-bold">3</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">{t("step3")}</h3>
                    <p class="mt-2 text-base text-gray-500">{t("step3Desc")}</p>
                  </div>
                </div>
                
                <div class="flex">
                  <div class="flex-shrink-0">
                    <div class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <span class="text-xl font-bold">4</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">{t("step4")}</h3>
                    <p class="mt-2 text-base text-gray-500">{t("step4Desc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white shadow-soft rounded-xl overflow-hidden">
            <div class="px-6 py-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">{t("faqTitle")}</h2>
              
              <div class="space-y-8">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{t("faqQ1")}</h3>
                  <p class="mt-2 text-base text-gray-500">{t("faqA1")}</p>
                </div>
                
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{t("faqQ2")}</h3>
                  <p class="mt-2 text-base text-gray-500">{t("faqA2")}</p>
                </div>
                
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{t("faqQ3")}</h3>
                  <p class="mt-2 text-base text-gray-500">{t("faqA3")}</p>
                </div>
                
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{t("faqQ4")}</h3>
                  <p class="mt-2 text-base text-gray-500">{t("faqA4")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}