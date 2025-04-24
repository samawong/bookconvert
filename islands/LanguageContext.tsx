import { createContext } from "preact";
import { useContext, useState, useEffect } from "preact/hooks";
import { JSX } from "preact";

// 确保这些键存在于翻译对象中
const translations = {
  zh: {
    // 通用
    appName: "BookConvert",
    tagline: "简单、快速、安全的电子书格式转换工具",
    
    // 导航
    home: "首页",
    help: "帮助",
    about: "关于",
    
    // 转换表单
    selectFile: "选择文件",
    convertTo: "转换为",
    startConversion: "开始转换",
    converting: "正在转换...",
    fileSize: "文件大小超过限制（最大50MB）",
    selectFileFirst: "请先选择一个文件",
    conversionSuccess: "转换成功！文件已开始下载。",
    conversionError: "转换过程中发生错误",
    
    // 历史记录
    showHistory: "显示转换历史",
    hideHistory: "隐藏转换历史",
    clearHistory: "清除历史",
    
    // 页脚
    features: "功能",
    formatConversion: "格式转换",
    usageHelp: "使用帮助",
    support: "支持",
    faq: "常见问题",
    contactUs: "联系我们",
    company: "公司",
    aboutUs: "关于我们",
    privacyPolicy: "隐私政策",
    legal: "法律",
    termsOfService: "服务条款",
    copyright: "保留所有权利",
    
    // 首页
    heroTitle1: "简单、快速地",
    heroTitle2: "转换电子书格式",
    heroSubtitle: "支持EPUB、MOBI、PDF和TXT之间的相互转换，无需注册，完全免费",
    supportedFormats: "支持的格式",
    whyChooseUs: "为什么选择我们？",
    secure: "安全可靠",
    secureDesc: "您的文件仅用于转换，不会被存储或用于其他目的",
    fast: "快速高效",
    fastDesc: "先进的转换引擎确保快速处理，无需等待",
    quality: "高质量转换",
    qualityDesc: "尽可能保留原始格式的排版和内容",
    getStarted: "准备好开始了吗？",
    getStartedDesc: "立即转换您的第一个电子书",
    startNow: "开始转换",
    
    // 帮助页面
    helpTitle: "使用帮助",
    helpDesc: "如何使用我们的电子书转换工具",
    howToUse: "如何使用",
    step1: "步骤 1: 选择文件",
    step1Desc: "点击上传按钮或拖放文件到指定区域。支持 EPUB、MOBI、PDF 和 TXT 格式。",
    step2: "步骤 2: 选择目标格式",
    step2Desc: "从下拉菜单中选择您想要转换的目标格式。",
    step3: "步骤 3: 开始转换",
    step3Desc: "点击\"开始转换\"按钮，等待转换完成。",
    step4: "步骤 4: 下载转换后的文件",
    step4Desc: "转换完成后，文件将自动下载到您的设备。",
    faqTitle: "常见问题",
    faqQ1: "支持哪些格式？",
    faqA1: "我们支持 EPUB、MOBI、PDF 和 TXT 格式之间的相互转换。",
    faqQ2: "文件大小有限制吗？",
    faqA2: "是的，文件大小限制为 50MB。",
    faqQ3: "我的文件安全吗？",
    faqA3: "是的，您的文件仅用于转换，不会被存储或用于其他目的。",
    faqQ4: "转换需要多长时间？",
    faqA4: "转换时间取决于文件大小和复杂度，通常在几秒到几分钟之间。",
    
    // 关于页面
    aboutTitle: "关于我们",
    aboutDesc: "了解 BookConvert 的故事和使命",
    ourMission: "我们的使命",
    missionDesc: "我们的使命是提供一个简单、快速、安全的电子书格式转换工具，帮助用户轻松管理和阅读他们的电子书，无论使用什么设备。",
    ourStory: "我们的故事",
    storyDesc: "BookConvert 诞生于对简单易用的电子书工具的需求。我们发现许多现有的转换工具要么功能有限，要么使用复杂，因此我们创建了这个工具，希望为所有电子书爱好者提供一个更好的选择。",
    ourTech: "我们的技术",
    techDesc: "BookConvert 使用最新的 Web 技术构建，包括 Fresh 框架和 Deno 运行时。我们的转换引擎基于开源工具，经过优化以提供高质量的转换结果。",
    contactTitle: "联系我们",
    contactDesc: "如果您有任何问题、建议或反馈，请随时联系我们：",
    emailUs: "给我们发邮件",
  },
  en: {
    // General
    appName: "BookConvert",
    tagline: "Simple, fast, and secure e-book format conversion tool",
    
    // Navigation
    home: "Home",
    help: "Help",
    about: "About",
    
    // Conversion Form
    selectFile: "Select File",
    convertTo: "Convert To",
    startConversion: "Start Conversion",
    converting: "Converting...",
    fileSize: "File size exceeds limit (max 50MB)",
    selectFileFirst: "Please select a file first",
    conversionSuccess: "Conversion successful! File download has started.",
    conversionError: "An error occurred during conversion",
    
    // History
    showHistory: "Show Conversion History",
    hideHistory: "Hide Conversion History",
    clearHistory: "Clear History",
    
    // Footer
    features: "Features",
    formatConversion: "Format Conversion",
    usageHelp: "Usage Help",
    support: "Support",
    faq: "FAQ",
    contactUs: "Contact Us",
    company: "Company",
    aboutUs: "About Us",
    privacyPolicy: "Privacy Policy",
    legal: "Legal",
    termsOfService: "Terms of Service",
    copyright: "All rights reserved",
    
    // Home Page
    heroTitle1: "Simple and Fast",
    heroTitle2: "E-book Format Conversion",
    heroSubtitle: "Convert between EPUB, MOBI, PDF, and TXT formats. No registration required, completely free",
    supportedFormats: "Supported Formats",
    whyChooseUs: "Why Choose Us?",
    secure: "Secure & Reliable",
    secureDesc: "Your files are only used for conversion and are not stored or used for other purposes",
    fast: "Fast & Efficient",
    fastDesc: "Advanced conversion engine ensures quick processing with no waiting",
    quality: "High Quality Conversion",
    qualityDesc: "Preserves the original format's layout and content as much as possible",
    getStarted: "Ready to get started?",
    getStartedDesc: "Convert your first e-book now",
    startNow: "Start Converting",
    
    // Help page
    helpTitle: "Help",
    helpDesc: "How to use our e-book conversion tool",
    howToUse: "How to Use",
    step1: "Step 1: Select a File",
    step1Desc: "Click the upload button or drag and drop a file to the designated area. Supported formats include EPUB, MOBI, PDF, and TXT.",
    step2: "Step 2: Choose Target Format",
    step2Desc: "Select your desired output format from the dropdown menu.",
    step3: "Step 3: Start Conversion",
    step3Desc: "Click the 'Start Conversion' button and wait for the conversion to complete.",
    step4: "Step 4: Download Converted File",
    step4Desc: "Once conversion is complete, the file will automatically download to your device.",
    faqTitle: "Frequently Asked Questions",
    faqQ1: "What formats are supported?",
    faqA1: "We support conversion between EPUB, MOBI, PDF, and TXT formats.",
    faqQ2: "Is there a file size limit?",
    faqA2: "Yes, the maximum file size is 50MB.",
    faqQ3: "Are my files secure?",
    faqA3: "Yes, your files are only used for conversion and are not stored or used for other purposes.",
    faqQ4: "How long does conversion take?",
    faqA4: "Conversion time depends on file size and complexity, typically ranging from a few seconds to a few minutes.",
    
    // About page
    aboutTitle: "About Us",
    aboutDesc: "Learn about BookConvert's story and mission",
    ourMission: "Our Mission",
    missionDesc: "Our mission is to provide a simple, fast, and secure e-book format conversion tool that helps users easily manage and read their e-books, regardless of what device they use.",
    ourStory: "Our Story",
    storyDesc: "BookConvert was born out of a need for a simple, user-friendly e-book tool. We found that many existing conversion tools were either limited in functionality or complicated to use, so we created this tool to offer a better alternative for all e-book enthusiasts.",
    ourTech: "Our Technology",
    techDesc: "BookConvert is built using the latest web technologies, including the Fresh framework and Deno runtime. Our conversion engine is based on open-source tools, optimized to provide high-quality conversion results.",
    contactTitle: "Contact Us",
    contactDesc: "If you have any questions, suggestions, or feedback, please don't hesitate to reach out:",
    emailUs: "Email Us",
  }
};

// 创建上下文
type LanguageContextType = {
  language: string;
  t: (key: string) => string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "zh",
  t: (key) => key,
  setLanguage: () => {},
});

// 创建提供者组件
interface LanguageProviderProps {
  children: JSX.Element | JSX.Element[];
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState("zh");
  
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("language") || "zh";
      console.log("当前加载的语言:", savedLanguage);
      setLanguageState(savedLanguage);
    } catch (error) {
      console.error("加载语言设置出错:", error);
    }
  }, []);
  
  const setLanguage = (lang: string) => {
    console.log("切换语言到:", lang);
    try {
      // 先更新状态
      setLanguageState(lang);
      localStorage.setItem("language", lang);
      
      // 使用更可靠的方式刷新页面
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('lang_refresh', Date.now().toString());
      window.location.href = currentUrl.toString();
    } catch (error) {
      console.error("设置语言出错:", error);
    }
  };
  
  const t = (key: string): string => {
    try {
      // @ts-ignore
      return translations[language]?.[key] || key;
    } catch (error) {
      console.error(`翻译键 "${key}" 出错:`, error);
      return key;
    }
  };
  
  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 创建钩子函数
export function useLanguage() {
  return useContext(LanguageContext);
}