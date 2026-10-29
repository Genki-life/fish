import React, { useState } from 'react';
import { X, Clock, Compass, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BoboSeahorse, DriftBottleGraphic } from './FishIllustrations';

export interface DispatchOption {
  id: 'short' | 'medium' | 'long';
  durationLabel: string;
  durationHours: number;
  bottleCount: number;
  title: string;
  desc: string;
}

interface BoboDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDispatch: (option: DispatchOption) => void;
  isNightMode?: boolean;
}

export const BoboDispatchModal: React.FC<BoboDispatchModalProps> = ({
  isOpen,
  onClose,
  onConfirmDispatch,
  isNightMode = false,
}) => {
  const options: DispatchOption[] = [
    {
      id: 'short',
      title: '短程探险',
      durationLabel: '1 小时',
      durationHours: 1,
      bottleCount: 1,
      desc: '浅海珊瑚区巡游',
    },
    {
      id: 'medium',
      title: '中程探索',
      durationLabel: '4 小时',
      durationHours: 4,
      bottleCount: 3,
      desc: '深海海沟秘境寻宝',
    },
    {
      id: 'long',
      title: '长程远征',
      durationLabel: '12 小时',
      durationHours: 12,
      bottleCount: 8,
      desc: '远洋古沉船探秘',
    },
  ];

  const [selectedOptionId, setSelectedOptionId] = useState<'short' | 'medium' | 'long'>('medium');

  if (!isOpen) return null;

  const selectedOption = options.find((opt) => opt.id === selectedOptionId) || options[1];

  const handleStart = () => {
    confetti({
      particleCount: 28,
      spread: 55,
      origin: { y: 0.6 },
      colors: ['#007AFF', '#FFCC00', '#34C759'],
    });
    onConfirmDispatch(selectedOption);
  };

  return (
    <div
      id="bobo-dispatch-modal"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn ${
        isNightMode ? 'bg-black/60 backdrop-blur-md' : 'bg-black/25 backdrop-blur-sm'
      }`}
      onClick={onClose}
    >
      <div
        className="apple-glass-sheet rounded-[32px] p-6 w-full max-w-sm space-y-4.5 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[16px] bg-sky-500/15 border border-sky-500/25 flex items-center justify-center shadow-xs">
              <BoboSeahorse size={30} />
            </div>
            <div>
              <h3 className={`text-[16px] font-bold ${isNightMode ? 'text-slate-100' : 'text-slate-900'}`}>
                派波波去探索
              </h3>
              <span className="text-[12px] font-normal text-slate-400">
                信使波波将带回神秘漂流瓶
              </span>
            </div>
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

        {/* 3 Exploration Options (Short / Medium / Long) */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            {options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={`relative p-3 rounded-[20px] border flex flex-col items-center justify-between text-center cursor-pointer transition-all active:scale-[0.97] backdrop-blur-md ${
                    isSelected
                      ? isNightMode
                        ? 'bg-sky-500/20 border-sky-400/50 shadow-md ring-1 ring-sky-400'
                        : 'bg-white border-[#007AFF]/40 shadow-md ring-1 ring-[#007AFF]'
                      : isNightMode
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-black/5 border-black/5 hover:bg-black/8'
                  }`}
                >
                  {/* Option Badge */}
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5 ${
                      isSelected
                        ? 'bg-[#007AFF] text-white'
                        : isNightMode
                        ? 'bg-white/10 text-slate-300'
                        : 'bg-black/10 text-slate-700'
                    }`}
                  >
                    {opt.title}
                  </span>

                  {/* Duration Text */}
                  <div className={`flex items-center gap-1 text-[12px] font-bold my-0.5 ${isNightMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    <span>{opt.durationLabel}</span>
                  </div>

                  {/* Drift Bottle Stack Display */}
                  <div className="mt-1 flex items-center justify-center gap-0.5 py-1">
                    <div className="flex -space-x-1.5 items-center">
                      {Array.from({ length: Math.min(opt.bottleCount, 4) }).map((_, i) => (
                        <div key={i} className="transform hover:scale-110 transition-transform">
                          <DriftBottleGraphic
                            size={18}
                            rarity={opt.bottleCount >= 8 ? 'legendary' : opt.bottleCount >= 3 ? 'rare' : 'common'}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Return Bottle Count Tag */}
                  <span className="text-[12px] font-bold text-sky-500 dark:text-sky-400 mt-1">
                    × {opt.bottleCount} 瓶
                  </span>
                </div>
              );
            })}
          </div>

          {/* Selected Option Description Banner */}
          <div className="apple-glass-card rounded-[18px] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#007AFF] stroke-[2.5]" />
              <span className={`text-[12px] font-medium ${isNightMode ? 'text-slate-200' : 'text-slate-700'}`}>
                {selectedOption.desc}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              免费派遣
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStart}
          className="w-full py-3.5 rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 apple-btn-primary shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>出发探索</span>
        </button>
      </div>
    </div>
  );
};
