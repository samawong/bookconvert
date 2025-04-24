import { JSX } from "preact";

export default function Header(): JSX.Element {
  return (
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div class="flex justify-start lg:w-0 lg:flex-1">
            <a href="/" class="flex items-center">
              <span class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">BookConvert</span>
            </a>
          </div>
          
          <nav class="hidden md:flex space-x-10">
            <a href="/" class="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors">首页</a>
            <a href="/help" class="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors">帮助</a>
            <a href="/about" class="text-base font-medium text-gray-500 hover:text-gray-900 transition-colors">关于</a>
          </nav>
          
          
          {/* 移动端菜单按钮 */}
          <div class="md:hidden flex items-center">
            <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500" aria-expanded="false">
              <span class="sr-only">打开菜单</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}