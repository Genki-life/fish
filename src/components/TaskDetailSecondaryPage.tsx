import React, { useState } from 'react';
import {
  ArrowLeft,
  RotateCw,
  Sparkles,
  Heart,
  Flame,
  CheckCircle2,
  Clock,
  Activity,
  ShieldCheck,
  Zap,
  Info,
  Check,
  Dumbbell,
  Wind,
  Smile,
  Footprints,
  Droplets,
  Sun,
  Bed,
  Timer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FocusTaskItem } from '../data/focusTasksData';

interface TaskDetailSecondaryPageProps {
  task: FocusTaskItem;
  isCompleted: boolean;
  onBack: () => void;
  onSwitchTask: () => void;
  onCompleteTask: () => void;
  isNightMode?: boolean;
}

export const TaskDetailSecondaryPage: React.FC<TaskDetailSecondaryPageProps> = ({
  task,
  isCompleted,
  onBack,
  onSwitchTask,
  onCompleteTask,
  isNightMode = false,
}) => {
  const [isSwitching, setIsSwitching] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSwitchClick = () => {
    setIsSwitching(true);
    onSwitchTask();
    setToastMessage('已为您切换至新推荐条目 ✨');

    setTimeout(() => {
      setIsSwitching(false);
    }, 400);

    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCompleteClick = () => {
    if (isCompleted) return;
    onCompleteTask();
    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#58CC02', '#1CB0F6', '#FFC800', '#FF4B4B', '#CE82FF'],
    });
  };

  const renderIcon = (type: string, className: string = 'w-6 h-6') => {
    switch (type) {
      case 'dumbbell':
        return <Dumbbell className={className} />;
      case 'running':
      case 'footprints':
        return <Footprints className={className} />;
      case 'hiit':
        return <Flame className={className} />;
      case 'core':
      case 'neck':
        return <Activity className={className} />;
      case 'wind':
        return <Wind className={className} />;
      case 'stretch':
        return <Sparkles className={className} />;
      case 'sleep':
        return <Bed className={className} />;
      case 'smile':
        return <Smile className={className} />;
      case 'water':
        return <Droplets className={className} />;
      case 'sun':
        return <Sun className={className} />;
      default:
        return <Activity className={className} />;
    }
  };

  return (
    <div
      id="task-secondary-detail-page"
      className={`w-full flex-1 flex flex-col justify-between space-y-4 animate-fadeIn pb-2 transition-colors duration-500 ${
        isNightMode ? 'text-slate-100' : 'text-slate-800'
      }`}
    >
      {/* TOP BAR: Back Navigation + "换一个条目" Switch Button */}
      <div className="flex items-center justify-between gap-2 shrink-0">
        <button
          onClick={onBack}
          className={`flex items-center gap-1.5 text-[13px] font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-xs ${
            isNightMode
              ? 'bg-white/10 border border-white/10 text-slate-200 hover:bg-white/15'
              : 'bg-white/80 border border-black/5 text-slate-700 hover:bg-white'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回</span>
        </button>

        {/* 换一个条目 (Switch Item) Button */}
        <button
          id="switch-task-button"
          onClick={handleSwitchClick}
          className={`flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md transition-all active:scale-95 shadow-xs cursor-pointer ${
            isNightMode
              ? 'bg-amber-500/20 border border-amber-400/30 text-amber-300 hover:bg-amber-500/30'
              : 'bg-amber-500/10 border border-amber-500/20 text-amber-700 hover:bg-amber-500/20'
          } ${isSwitching ? 'scale-95' : ''}`}
          title="点击切换同类别的其他运动或任务"
        >
          <RotateCw className={`w-3.5 h-3.5 stroke-[2.5] ${isSwitching ? 'animate-spin' : ''}`} />
          <span>换一个条目</span>
        </button>
      </div>

      {/* Floating Switch Feedback Toast */}
      {toastMessage && (
        <div className="bg-slate-900/90 dark:bg-slate-800/90 text-white text-[12px] font-medium px-4 py-2 rounded-full backdrop-blur-xl border border-white/10 shadow-lg flex items-center justify-center gap-2 animate-fadeIn mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SCROLLABLE MAIN CONTENT AREA */}
      <div className="space-y-3.5 overflow-y-auto no-scrollbar pr-0.5">
        {/* HEADER HERO CARD */}
        <div
          className={`apple-solid-card rounded-[28px] p-5 space-y-4 relative overflow-hidden transition-all ${
            isNightMode ? 'apple-solid-card-dark text-slate-100' : 'bg-[#FCFCFC] text-slate-800'
          }`}
          style={{
            boxShadow: isNightMode ? '0 8px 24px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              {/* 纯色圆角方形徽标 (圆角12px, 44x44px), 内部放置白色线性图标 */}
              <div
                className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: task.color }}
              >
                {renderIcon(task.iconType, 'w-6 h-6 text-white stroke-[2.2]')}
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                  {task.categoryName}
                </span>
                <h2
                  className={`text-[17px] font-bold leading-tight ${
                    isNightMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {task.title}
                </h2>
                <p
                  className={`text-[12.5px] font-medium mt-0.5 ${
                    isNightMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {task.subtitle}
                </p>
              </div>
            </div>

            {/* Reward Tag */}
            <div
              className={`text-[11.5px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0 border ${
                isNightMode
                  ? 'bg-amber-500/15 border-amber-400/20 text-amber-300'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}
            >
              <span>🐚</span>
              <span>+{task.rewardBait} 鱼饵</span>
            </div>
          </div>

          {/* 3 Metric Pills Grid */}
          <div
            className={`grid grid-cols-3 gap-2.5 pt-3 border-t ${
              isNightMode ? 'border-white/5' : 'border-slate-100'
            }`}
          >
            {/* Metric 1: 时长 */}
            <div
              className={`rounded-2xl p-2.5 text-center ${
                isNightMode ? 'bg-white/5' : 'bg-slate-50'
              }`}
            >
              <span className="text-[10.5px] font-medium text-slate-400 block">建议时长</span>
              <span className="text-[14px] font-bold mt-0.5 block">{task.duration}</span>
            </div>

            {/* Metric 2: 消耗 */}
            <div
              className={`rounded-2xl p-2.5 text-center ${
                isNightMode ? 'bg-white/5' : 'bg-slate-50'
              }`}
            >
              <span className="text-[10.5px] font-medium text-slate-400 block">预估消耗</span>
              <span className="text-[14px] font-bold mt-0.5 block">{task.calories}</span>
            </div>

            {/* Metric 3: 难度 */}
            <div
              className={`rounded-2xl p-2.5 text-center ${
                isNightMode ? 'bg-white/5' : 'bg-slate-50'
              }`}
            >
              <span className="text-[10.5px] font-medium text-slate-400 block">适宜强度</span>
              <span className="text-[14px] font-bold mt-0.5 block">{task.difficulty}</span>
            </div>
          </div>
        </div>

        {/* WHY RECOMMENDED INSIGHT CARD */}
        <div
          className={`apple-solid-card rounded-[28px] p-4.5 space-y-2 transition-all ${
            isNightMode ? 'apple-solid-card-dark text-slate-100' : 'bg-[#FCFCFC] text-slate-800'
          }`}
          style={{
            boxShadow: isNightMode ? '0 8px 24px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex items-center gap-2 text-[#007AFF] text-[13px] font-bold">
            <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
            <span>智能推荐依据</span>
          </div>
          <p className={`text-[12.5px] leading-relaxed ${isNightMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {task.whyRecommended}
          </p>
        </div>

        {/* INSTRUCTIONS STEP-BY-STEP LIST */}
        <div
          className={`apple-solid-card rounded-[28px] p-5 space-y-3.5 transition-all ${
            isNightMode ? 'apple-solid-card-dark text-slate-100' : 'bg-[#FCFCFC] text-slate-800'
          }`}
          style={{
            boxShadow: isNightMode ? '0 8px 24px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          <h3 className="text-[14.5px] font-bold">动作分解与指引</h3>
          <div className="space-y-3">
            {task.instructions.map((step, idx) => (
              <div key={idx} className="space-y-1">
                <h4 className={`text-[13px] font-bold ${isNightMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  {step.title}
                </h4>
                <p className={`text-[12px] leading-relaxed ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION BUTTON */}
      <div className="shrink-0 pt-2">
        {isCompleted ? (
          <div className="w-full py-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2 font-bold text-[14px]">
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
            <span>已完成该项专注任务</span>
          </div>
        ) : (
          <button
            onClick={handleCompleteClick}
            className="w-full py-3.5 rounded-2xl bg-[#007AFF] text-white font-bold text-[14.5px] shadow-lg shadow-sky-500/25 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5 stroke-[2.5]" />
            <span>打卡完成并领取 🐚 +{task.rewardBait} 鱼饵</span>
          </button>
        )}
      </div>
    </div>
  );
};
