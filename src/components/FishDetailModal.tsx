import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MomoClownFish, LinglingButterflyFish } from './FishIllustrations';
import { FishPetData } from '../types';

export const FEED_BAIT_COST = 5;
export const FEED_GROWTH_GAIN = 15;

interface FishDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  baitCount: number;
  fishDataMap: Record<'solo' | 'coop', FishPetData>;
  initialFishId?: 'solo' | 'coop';
  onFeed: (fishType: 'solo' | 'coop') => {
    didLevelUp: boolean;
    newLevel: number;
    fishName: string;
    overflow: number;
    newExp: number;
    maxExp: number;
  } | null;
  onOpenInviteModal?: () => void;
  isNightMode?: boolean;
}

export const FishDetailModal: React.FC<FishDetailModalProps> = ({
  isOpen,
  onClose,
  baitCount,
  fishDataMap,
  initialFishId = 'solo',
  onFeed,
  isNightMode = false,
}) => {
  const [selectedFishId, setSelectedFishId] = useState<'solo' | 'coop'>('solo');

  useEffect(() => {
    if (initialFishId) {
      setSelectedFishId(initialFishId);
    }
  }, [initialFishId, isOpen]);

  if (!isOpen) return null;

  const currentFish = fishDataMap[selectedFishId] || fishDataMap.solo;
  const growthPercent = Math.min(100, Math.round((currentFish.currentGrowth / currentFish.maxGrowth) * 100));
  const canFeed = baitCount >= FEED_BAIT_COST;
  const remainingGrowthToLevelUp = Math.max(0, currentFish.maxGrowth - currentFish.currentGrowth);

  const handleConfirmFeed = () => {
    if (!canFeed) return;

    // 执行投喂逻辑
    const result = onFeed(selectedFishId);

    if (result) {
      if (result.didLevelUp) {
        confetti({
          particleCount: 36,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#007AFF', '#34C759', '#FFD60A', '#FF9500'],
        });
      }
      // 投喂后关闭弹层，返回鱼缸主视图，页面数据实时刷新
      onClose();
    }
  };

  return (
    <div
      id="fish-feeding-modal-overlay"
      className={`fixed inset-0 z-50 flex items-end justify-center animate-fadeIn transition-colors duration-500 ${
        isNightMode ? 'bg-black/65 backdrop-blur-md' : 'bg-black/30 backdrop-blur-sm'
      }`}
      onClick={onClose}
    >
      {/* 底部抽屉 (Apple Liquid Glass Sheet) */}
      <div
        id="fish-feeding-bottom-sheet"
        className="w-full sm:max-w-[420px] rounded-t-[32px] apple-glass-sheet flex flex-col overflow-hidden animate-slideUp transition-all pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部 Apple 拖动指示把手 + 关闭按钮 */}
        <div className="pt-3 pb-1 px-4 flex items-center justify-between relative">
          <div
            className={`w-10 h-1.2 rounded-full mx-auto transition-colors ${
              isNightMode ? 'bg-white/20' : 'bg-black/15'
            }`}
          />
          <button
            id="close-fish-feed-sheet-btn"
            onClick={onClose}
            className={`absolute right-4 top-3 w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer backdrop-blur-md ${
              isNightMode
                ? 'bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white'
                : 'bg-black/5 hover:bg-black/10 text-slate-500 hover:text-slate-900'
            }`}
            title="关闭"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* 标题与副标题 */}
        <div className="px-6 pt-1 pb-3 text-center">
          <h3 className={`text-[17px] font-black tracking-tight ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
            投喂操作面板
          </h3>
          <p className="text-[12px] text-slate-400 dark:text-slate-400 mt-0.5">
            投喂微光饵料，加速爱鱼成长升级
          </p>
        </div>

        {/* 鱼类快速切换 (莫莫 / 翎翎) */}
        <div
          id="feed-fish-switcher"
          className="px-6 pb-3 flex items-center justify-center gap-2.5"
        >
          {(['solo', 'coop'] as const).map((id) => {
            const fish = fishDataMap[id];
            const isSelected = id === selectedFishId;
            return (
              <button
                key={id}
                id={`switch-to-${id}-btn`}
                onClick={() => setSelectedFishId(id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? isNightMode
                      ? 'bg-sky-500 text-white shadow-[0_0_12px_rgba(14,165,233,0.5)] scale-102'
                      : 'bg-sky-500 text-white shadow-sm scale-102'
                    : isNightMode
                    ? 'bg-white/10 text-slate-300 hover:bg-white/15'
                    : 'bg-black/5 text-slate-600 hover:bg-black/10'
                }`}
              >
                <span>{fish.avatarIcon}</span>
                <span>{fish.name} · Lv.{fish.level}</span>
              </button>
            );
          })}
        </div>

        {/* 鱼类展示卡 */}
        <div className="px-5 space-y-3.5">
          <div
            id="fish-display-card"
            className="w-full h-42 rounded-[24px] relative flex flex-col items-center justify-center overflow-hidden apple-glass-card shadow-inner transition-all"
          >
            {/* 背景光环 */}
            <div
              className={`absolute w-36 h-36 rounded-full blur-2xl pointer-events-none transition-all duration-700 ${
                isNightMode ? 'opacity-35' : 'opacity-20'
              }`}
              style={{ backgroundColor: currentFish.glowColor }}
            />

            {/* 鱼类名称与标签 */}
            <div className="absolute top-3 inset-x-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className={`text-[15px] font-black tracking-tight ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
                  {currentFish.name}
                </span>
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-400">
                  ({currentFish.species})
                </span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-tight flex items-center gap-1 backdrop-blur-md border ${
                  isNightMode
                    ? 'bg-amber-400/20 border-amber-300/30 text-amber-300'
                    : 'bg-amber-400/15 border-amber-400/25 text-amber-800'
                }`}
              >
                <Sparkles className="w-3 h-3 fill-current" />
                Lv.{currentFish.level}
              </span>
            </div>

            {/* 3D 鱼类立绘 */}
            <div className="relative z-10 scale-105 mt-1">
              {currentFish.id === 'coop' && <LinglingButterflyFish size={96} isEating={false} />}
              {currentFish.id === 'solo' && <MomoClownFish size={88} isEating={false} />}
            </div>

            {/* 状态徽章 (若是共育鱼显示 Mia 徽章) */}
            <div className="absolute bottom-2.5 z-10">
              {currentFish.coopBadge ? (
                <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold backdrop-blur-md border ${
                  isNightMode
                    ? 'bg-sky-500/20 border-sky-400/30 text-sky-200'
                    : 'bg-sky-500/10 border-sky-500/20 text-sky-700'
                }`}>
                  {currentFish.coopBadge}
                </span>
              ) : (
                <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold backdrop-blur-md border ${
                  isNightMode
                    ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700'
                }`}>
                  ✨ 活力充沛
                </span>
              )}
            </div>
          </div>

          {/* 成长值数据展示卡 (严格满足需求: 展示 该鱼当前成长值 / 升级所需成长值，如 "35 / 50") */}
          <div
            id="fish-growth-status-box"
            className={`p-3.5 rounded-[20px] backdrop-blur-md border space-y-2.5 transition-all ${
              isNightMode
                ? 'bg-white/5 border-white/10 text-white'
                : 'bg-slate-50/90 border-black/5 text-slate-900 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>成长进度</span>
                <span className="text-[10.5px] font-normal text-slate-400">
                  (升至 Lv.{currentFish.level + 1})
                </span>
              </div>

              {/* 该鱼当前成长值 / 升级所需成长值 (如 "35 / 50") */}
              <div className="flex items-baseline gap-1">
                <span className="text-base font-black text-amber-500 dark:text-amber-400 tracking-tight">
                  {currentFish.currentGrowth}
                </span>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  / {currentFish.maxGrowth}
                </span>
              </div>
            </div>

            {/* Apple 玻璃质感进度条 */}
            <div
              className={`w-full h-3 rounded-full p-0.5 border overflow-hidden backdrop-blur-sm ${
                isNightMode
                  ? 'bg-white/10 border-white/10'
                  : 'bg-slate-200/80 border-black/5'
              }`}
            >
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-sky-400 via-emerald-400 to-emerald-500 relative shadow-[0_0_8px_rgba(52,199,89,0.35)]"
                style={{ width: `${growthPercent}%` }}
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40 rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400 pt-0.5">
              <span>单次投喂增加 +{FEED_GROWTH_GAIN} 成长值</span>
              <span>还需 {remainingGrowthToLevelUp} 成长值升级</span>
            </div>
          </div>

          {/* 饵料消耗与余额展示 */}
          <div
            id="feed-cost-summary-pill"
            className={`px-3.5 py-2.5 rounded-[16px] flex items-center justify-between text-xs font-medium border ${
              !canFeed
                ? 'bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-400'
                : isNightMode
                ? 'bg-white/5 border-white/10 text-slate-300'
                : 'bg-slate-100/80 border-black/5 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span>当前饵料余额：</span>
              <span className="font-bold text-amber-500 dark:text-amber-400">
                🐚 {baitCount}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11.5px]">
              <span>单次消耗：</span>
              <span className="font-bold">{FEED_BAIT_COST} 饵料</span>
            </div>
          </div>

          {/* 若饵料不足给出醒目提示 */}
          {!canFeed && (
            <div className="flex items-center gap-1.5 px-2 text-[11px] text-rose-500 dark:text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>当前饵料余额不足以支付单次投喂，可完成今日专注任务获取鱼饵</span>
            </div>
          )}
        </div>

        {/* 底部投喂操作按钮 (严格满足需求: 投喂按钮显示单次投喂消耗的饵料数量；若余额不足则置灰并提示"饵料不足") */}
        <div className="px-5 pt-3">
          <button
            id="confirm-feed-action-btn"
            onClick={handleConfirmFeed}
            disabled={!canFeed}
            className={`w-full py-3.5 rounded-full font-bold text-[15px] tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer ${
              canFeed
                ? 'bg-gradient-to-r from-[#007AFF] to-[#0A84FF] text-white shadow-md shadow-sky-500/25 hover:brightness-105'
                : isNightMode
                ? 'bg-white/10 text-slate-500 cursor-not-allowed border border-white/10 opacity-70'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300 opacity-80'
            }`}
          >
            {canFeed ? (
              <>
                <span>🍲</span>
                <span>确认投喂（消耗 {FEED_BAIT_COST} 饵料）</span>
              </>
            ) : (
              <>
                <span>⚠️</span>
                <span>饵料不足（需 {FEED_BAIT_COST} 饵料）</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
