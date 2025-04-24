import { useState, useEffect } from "preact/hooks";

interface ProgressIndicatorProps {
  isActive: boolean;
  duration?: number; // 预计持续时间（毫秒）
}

export default function ProgressIndicator({ isActive, duration = 5000 }: ProgressIndicatorProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    // 重置进度
    setProgress(0);

    // 创建一个模拟进度的计时器
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // 逐渐减慢进度增长速度
        const increment = (100 - prevProgress) / 20;
        const newProgress = prevProgress + increment;
        
        // 确保不超过95%（最后5%留给实际完成）
        return Math.min(newProgress, 95);
      });
    }, duration / 50);

    return () => {
      clearInterval(interval);
      // 如果组件卸载时正在活动，设置为100%
      if (isActive) {
        setProgress(100);
      }
    };
  }, [isActive, duration]);

  // 当不活动时不显示
  if (!isActive) {
    return null;
  }

  return (
    <div class="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
      <div
        class="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}