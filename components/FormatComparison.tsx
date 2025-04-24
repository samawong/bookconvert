import { JSX } from "preact";
import { useLanguage } from "../islands/LanguageContext.tsx";

interface FormatFeature {
  name: string;
  key: string;
  epub: boolean | string;
  mobi: boolean | string;
  pdf: boolean | string;
  txt: boolean | string;
}

export default function FormatComparison(): JSX.Element {
  const { t } = useLanguage();
  
  const features: FormatFeature[] = [
    { name: t("supportImages"), key: "supportImages", epub: true, mobi: true, pdf: true, txt: false },
    { name: t("supportToc"), key: "supportToc", epub: true, mobi: true, pdf: true, txt: false },
    { name: t("supportHyperlinks"), key: "supportHyperlinks", epub: true, mobi: true, pdf: true, txt: false },
    { name: t("supportFonts"), key: "supportFonts", epub: true, mobi: false, pdf: true, txt: false },
    { name: t("supportCss"), key: "supportCss", epub: true, mobi: true, pdf: true, txt: false },
    { name: t("supportInteractive"), key: "supportInteractive", epub: false, mobi: false, pdf: true, txt: false },
    { name: t("fileSize"), key: "fileSize", epub: t("medium"), mobi: t("medium"), pdf: t("large"), txt: t("verySmall") },
    { name: t("compatibility"), key: "compatibility", epub: t("high"), mobi: t("medium"), pdf: t("high"), txt: t("veryHigh") },
    { name: t("suitableDevices"), key: "suitableDevices", epub: t("mostReaders"), mobi: t("kindle"), pdf: t("computerTablet"), txt: t("allDevices") },
  ];

  return (
    <div class="mt-12">
      <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-8">{t("formatComparison")}</h2>
      <div class="overflow-x-auto shadow-soft rounded-xl">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("feature")}
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                EPUB
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MOBI
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PDF
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TXT
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {features.map((feature) => (
              <tr key={feature.key} class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {feature.name}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof feature.epub === "boolean" ? (
                    feature.epub ? (
                      <span class="text-green-600">✓</span>
                    ) : (
                      <span class="text-red-600">✗</span>
                    )
                  ) : (
                    feature.epub
                  )}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof feature.mobi === "boolean" ? (
                    feature.mobi ? (
                      <span class="text-green-600">✓</span>
                    ) : (
                      <span class="text-red-600">✗</span>
                    )
                  ) : (
                    feature.mobi
                  )}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof feature.pdf === "boolean" ? (
                    feature.pdf ? (
                      <span class="text-green-600">✓</span>
                    ) : (
                      <span class="text-red-600">✗</span>
                    )
                  ) : (
                    feature.pdf
                  )}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {typeof feature.txt === "boolean" ? (
                    feature.txt ? (
                      <span class="text-green-600">✓</span>
                    ) : (
                      <span class="text-red-600">✗</span>
                    )
                  ) : (
                    feature.txt
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}