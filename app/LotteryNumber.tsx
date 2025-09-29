/**
 * 数字抽奖组件
 * 提供大屏幕数字滚动抽奖功能，支持1-200范围随机数生成
 * 商务风格设计，简洁大气，适合现场抽奖活动
 */
'use client'
import { useState, useEffect } from 'react';

interface LotteryNumberProps {
  min?: number;
  max?: number;
}

export function LotteryNumber({ min = 1, max = 200 }: LotteryNumberProps) {
  const [currentNumber, setCurrentNumber] = useState<number>(min);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [finalNumber, setFinalNumber] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const startLottery = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setShowResult(false);
    setFinalNumber(null);
    
    // 滚动3秒后停止
    setTimeout(() => {
      const winner = generateRandomNumber();
      setFinalNumber(winner);
      setIsRolling(false);
      setShowResult(true);
    }, 3000);
  };

  const resetLottery = () => {
    setIsRolling(false);
    setShowResult(false);
    setFinalNumber(null);
    setCurrentNumber(min);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRolling) {
      interval = setInterval(() => {
        setCurrentNumber(generateRandomNumber());
      }, 50);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRolling, min, max]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-black text-slate-800 mb-4 tracking-wider">
          幸运数字抽奖
        </h1>
        <p className="text-xl text-slate-600 font-medium">
          激动人心的时刻即将到来
        </p>
      </div>

      <div className="relative mb-12">
        <div className="bg-white rounded-3xl p-16 shadow-2xl border border-slate-200" 
             style={{ animation: showResult ? 'pulse-glow 2s ease-in-out infinite' : 'none' }}>
          <div className="number-display text-9xl font-black text-slate-800 min-w-[300px] text-center"
               style={{ 
                 color: showResult ? 'hsl(var(--primary))' : 'inherit',
                 animation: showResult ? 'winner-celebration 1s ease-in-out' : 'none'
               }}>
            {isRolling ? currentNumber : (showResult ? finalNumber : '???')}
          </div>
        </div>
        
        {showResult && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">
              🎉 中奖号码 🎉
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-6">
        <button
          onClick={startLottery}
          disabled={isRolling}
          className="px-12 py-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isRolling ? '抽奖中...' : '开始抽奖'}
        </button>
        
        <button
          onClick={resetLottery}
          disabled={isRolling}
          className="px-12 py-4 bg-gradient-to-r from-slate-500 to-slate-400 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          重新开始
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-500 text-lg font-medium">
          数字范围: {min} - {max}
        </p>
      </div>
    </div>
  );
}