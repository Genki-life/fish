import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DriftBottleGraphic, LinglingButterflyFish } from './FishIllustrations';

interface DriftBottleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCollect: (rewards: { tokens: number; shards: number; decor: number }) => void;
  isNightMode?: boolean;
}

export const DriftBottleModal: React.FC<DriftBottleModalProps> = ({
  isOpen,
  onClose,
  onCollect,
  isNightMode = false,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleOpenBottle = () => {
    setIsOpened(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#AF52DE', '#FFCC00', '#007AFF', '#34C759'],
    });
  };

  const handleCollect = () => {
    onCollect({
      tokens: 45,
      shards: 3,
      decor: 2,
    });
    setIsOpened(false);
    onClose();
  };

  return (
    <div
      id="drift-bottle-modal"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn ${
        isNightMode ? 'bg-black/60 backdrop-blur-md' : 'bg-black/25 backdrop-blur-sm'
      }`}
      onClick={onClose}
    >
      <div
        className="apple-glass-sheet rounded-[32px] p-6 w-full max-w-xs space-y-4.5 text-center relative overflow-hidden shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-28 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/10 relative z-10">
          <div className="text-left">
            <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-300 bg-purple-500/15 border border-purple-500/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              稀有漂流瓶
            </span>
            <h3 className={`text-[16px] font-bold mt-1 ${isNightMode ? 'text-slate-100' : 'text-slate-900'}`}>
              {isOpened ? '获得探索战利品' : '波波带回了漂流瓶'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer backdrop-blur-md ${
              isNightMode
                ? 'bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white'
                : 'bg-black/5 hover:bg-black/10 text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {!isOpened ? (
          /* STEP 1: UNOPENED BOTTLE DISPLAY */
          <div className="py-3 flex flex-col items-center space-y-3.5 relative z-10">
            {/* Ambient Purple Aura */}
            <div className="relative cursor-pointer group" onClick={handleOpenBottle}>
              <div className="absolute inset-0 -m-4 rounded-full bg-purple-500/20 blur-xl animate-pulse" />
              <div className="transform transition-transform group-hover:scale-105 group-active:scale-95 animate-bounce">
                <DriftBottleGraphic rarity="rare" size={88} />
              </div>
            </div>

            <p className={`text-[12px] font-normal leading-relaxed max-w-[240px] ${isNightMode ? 'text-slate-300' : 'text-slate-600'}`}>
              波波在深海探险中打捞到的紫色瓶子，里面似乎装着神秘字条和海洋宝物
            </p>

            <button
              onClick={handleOpenBottle}
              className="w-full py-3.5 rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 apple-btn-primary shadow-sm active:scale-[0.98] transition-all cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
            >
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>轻触开启漂流瓶</span>
            </button>
          </div>
        ) : (
          /* STEP 2: LOOT RESULT CARD (CLEAN & RELAXED) */
          <div className="space-y-3 py-1 relative z-10 animate-fadeIn">
            {/* Rewards List */}
            <div className="space-y-2.5 text-left">
              {/* 1. Token reward */}
              <div className="p-3 apple-glass-card rounded-[20px] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[14px] bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-lg shadow-xs">
                    🐚
                  </div>
                  <div>
                    <h4 className={`text-[13px] font-bold ${isNightMode ? 'text-slate-100' : 'text-slate-900'}`}>贝壳鱼饵</h4>
                    <span className="text-[11px] font-normal text-slate-400">用于喂养升级鱼类</span>
                  </div>
                </div>
                <span className="text-[15px] font-bold text-amber-600 dark:text-amber-400">+45</span>
              </div>

              {/* 2. Fish Shard */}
              <div className="p-3 apple-glass-card rounded-[20px] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[14px] bg-sky-500/20 border border-sky-500/30 flex items-center justify-center overflow-hidden shadow-xs">
                    <LinglingButterflyFish size={32} />
                  </div>
                  <div>
                    <h4 className={`text-[13px] font-bold ${isNightMode ? 'text-slate-100' : 'text-slate-900'}`}>翎翎碎片</h4>
                    <span className="text-[11px] font-normal text-slate-400">蝴蝶鱼共育专属碎片</span>
                  </div>
                </div>
                <span className="text-[14px] font-bold text-sky-600 dark:text-sky-400">× 3</span>
              </div>

              {/* 3. Ocean Decor Shard */}
              <div className="p-3 apple-glass-card rounded-[20px] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[14px] bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-base shadow-xs">
                    🪸
                  </div>
                  <div>
                    <h4 className={`text-[13px] font-bold ${isNightMode ? 'text-slate-100' : 'text-slate-900'}`}>发光珊瑚碎片</h4>
                    <span className="text-[11px] font-normal text-slate-400">水族箱环境装扮物</span>
                  </div>
                </div>
                <span className="text-[14px] font-bold text-rose-600 dark:text-rose-400">× 2</span>
              </div>
            </div>

            {/* Confirmation Button */}
            <button
              onClick={handleCollect}
              className="w-full py-3.5 rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 apple-btn-primary shadow-sm active:scale-[0.98] transition-all cursor-pointer mt-3"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>收下</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
