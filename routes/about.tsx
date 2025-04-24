import { Head } from "$fresh/runtime.ts";
import Layout from "../components/Layout.tsx";
import { useLanguage } from "../islands/LanguageContext.tsx";

export default function About() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <Head>
        <title>{t("aboutTitle")} | BookConvert</title>
      </Head>
      
      <div class="relative">
        <div class="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary-100 to-transparent"></div>
        
        <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center mb-16">
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              {t("aboutTitle")}
            </h1>
            <p class="mt-4 text-xl text-gray-500">
              {t("aboutDesc")}
            </p>
          </div>
          
          <div class="space-y-16">
            <div class="bg-white shadow-soft rounded-xl overflow-hidden">
              <div class="px-6 py-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">{t("ourMission")}</h2>
                <p class="text-lg text-gray-500">{t("missionDesc")}</p>
              </div>
            </div>
            
            <div class="bg-white shadow-soft rounded-xl overflow-hidden">
              <div class="px-6 py-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">{t("ourStory")}</h2>
                <p class="text-lg text-gray-500">{t("storyDesc")}</p>
              </div>
            </div>
            
            <div class="bg-white shadow-soft rounded-xl overflow-hidden">
              <div class="px-6 py-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">{t("ourTech")}</h2>
                <p class="text-lg text-gray-500">{t("techDesc")}</p>
              </div>
            </div>
            
            <div class="bg-white shadow-soft rounded-xl overflow-hidden">
              <div class="px-6 py-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">{t("contactTitle")}</h2>
                <p class="text-lg text-gray-500 mb-6">{t("contactDesc")}</p>
                
                <a 
                  href="mailto:contact@bookconvert.example.com" 
                  class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {t("emailUs")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}