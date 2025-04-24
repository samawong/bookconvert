import { Head } from "$fresh/runtime.ts";
import Layout from "../components/Layout.tsx";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>页面未找到 - 电子书格式转换</title>
      </Head>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              404
            </h1>
            <p className="mt-2 text-lg font-medium text-gray-600">
              页面未找到
            </p>
            <p className="mt-4 text-base text-gray-500">
              抱歉，您请求的页面不存在。
            </p>
            <div className="mt-8">
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                返回首页
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}