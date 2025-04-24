import { Head } from "$fresh/runtime.ts";
import { JSX } from "preact";
import Header from "./Header.tsx";
import Footer from "../islands/Footer.tsx"; // 更新导入路径
import { useLanguage } from "../islands/LanguageContext.tsx";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  title?: string;
  description?: string;
}

export default function Layout({ children, title = "电子书格式转换", description = "在线转换电子书格式，支持EPUB、MOBI、PDF和TXT之间的相互转换" }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="stylesheet" href="/styles.css" /> 
      </Head>
      <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main class="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}