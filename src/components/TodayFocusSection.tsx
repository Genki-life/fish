import React from 'react';
import {
  Dumbbell,
  Flame,
  Activity,
  Wind,
  Sparkles,
  Bed,
  Smile,
  Droplets,
  Sun,
  Footprints,
  RotateCw,
  Check,
} from 'lucide-react';
import { FocusTaskItem, FOCUS_TASK_POOLS } from '../data/focusTasksData';

interface TodayFocusSectionProps {
  taskIndices: [number, number, number];
  completedTasks: Record<number, boolean>;
  onOpenTaskDetail: (task: FocusTaskItem, slotIndex: 0 | 1) => void;
  onSwitchTask: (slotIndex: 0 | 1, e?: React.MouseEvent) => void;
  onCompleteTask: (slotIndex: 0 | 1, baitReward?: number, e?: React.MouseEvent) => void;
  isNightMode?: boolean;
}

export const TodayFocusSection: React.FC<TodayFocusSectionProps> = ({
  taskIndices,
  completedTasks,
  onOpenTaskDetail,
  onSwitchTask,
  onCompleteTask,
  isNightMode = false,
}) => {
  const task0 = FOCUS_TASK_POOLS[0][taskIndices[0]];
  const task1 = FOCUS_TASK_POOLS[1][taskIndices[1]];

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
    <div id="todays-focus-module" className="w-full space-y-3">
      {/* ================= 1. 顶部 Header (替换说明为简单的"今日建议") ================= */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-baseline gap-1.5">
          <h2
            className={`text-[17px] font-bold tracking-tight transition-colors duration-500 ${
              isNightMode ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            今日专注与任务
          </h2>
        </div>
        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
          今日建议
        </span>
      </div>

      {/* ================= 2. Apple Health 28px 任务卡片列表 (精简为 2 张卡片，移除 HealthKit 标签与情绪打卡) ================= */}
      <div className="space-y-3.5">
        {/* ---------------- CARD 1: 力量训练 · 30分钟 ---------------- */}
        <div
          id="task-slot-0-card"
          className={`apple-solid-card rounded-[28px] overflow-hidden transition-all duration-300 relative group select-none ${
            isNightMode ? 'apple-solid-card-dark text-slate-100' : 'bg-[#FCFCFC] text-slate-800'
          }`}
          style={{
            boxShadow: isNightMode ? '0 8px 24px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* 上半部分：信息区（大留白 20px-24px 内边距） */}
          <div
            onClick={() => onOpenTaskDetail(task0, 0)}
            className="p-5 pb-4 flex items-center justify-between cursor-pointer"
          >
            {/* 左侧大图标：纯色圆角方形徽标 (圆角12px, 44x44px), 内部白色线性图标 */}
            <div
              className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center text-white shrink-0 shadow-xs transition-transform group-hover:scale-105"
              style={{
                backgroundColor: task0.color || '#FF3B30',
              }}
            >
              {renderIcon(task0.iconType, 'w-6 h-6 text-white stroke-[2.2]')}
            </div>

            {/* 中间：主标题与副标题 */}
            <div className="flex-1 min-w-0 px-3.5">
              <h3
                className={`font-bold text-[15px] leading-snug truncate transition-colors duration-500 ${
                  isNightMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {task0.title}
              </h3>
              <p
                className={`text-[12.5px] mt-1 font-normal truncate transition-colors duration-500 ${
                  isNightMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {task0.subtitle}
              </p>
            </div>

            {/* 右侧：单贝壳奖励标签 (装饰展示) */}
            <div className="flex items-center shrink-0">
              <div
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold text-[11px] tracking-tight shrink-0 leading-none transition-colors duration-500 ${
                  isNightMode
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                }`}
                title="完成可获得奖励"
              >
                <span className="text-[11px] leading-none">🐚</span>
                <span>+{task0.rewardBait || 15}</span>
              </div>
            </div>
          </div>

          {/* 分割线与下半部分：二分操作区 */}
          <div
            className={`border-t grid grid-cols-2 h-11 transition-colors duration-500 ${
              isNightMode
                ? 'border-white/5 divide-x divide-white/5 bg-[#0D1526]'
                : 'border-slate-100 divide-x divide-slate-100 bg-[#F9FAFB]'
            }`}
          >
            {/* 左半边：主操作按钮 (点击仅切换状态视觉反馈，不发放实际饵料) */}
            <button
              type="button"
              id="task-0-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                onCompleteTask(0, task0.rewardBait, e);
              }}
              className={`flex items-center justify-center gap-1.5 font-semibold text-[13.5px] transition-colors cursor-pointer ${
                completedTasks[0]
                  ? isNightMode
                    ? 'text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/30'
                    : 'text-emerald-600 bg-emerald-50/50 hover:bg-emerald-100/50'
                  : isNightMode
                  ? 'text-sky-400 hover:bg-white/5 active:bg-white/10'
                  : 'text-[#007AFF] hover:bg-sky-50 active:bg-sky-100/70'
              }`}
            >
              {completedTasks[0] ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>已完成</span>
                </>
              ) : (
                <span>开始</span>
              )}
            </button>

            {/* 右半边：次要操作按钮（换一个） */}
            <button
              type="button"
              id="task-0-switch-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSwitchTask(0, e);
              }}
              className={`flex items-center justify-center gap-1.5 font-medium text-[12.5px] transition-colors group cursor-pointer ${
                isNightMode
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5 active:bg-white/10'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 active:bg-slate-200/70'
              }`}
            >
              <span>换一个</span>
              <RotateCw className="w-3.5 h-3.5 text-current group-active:rotate-180 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* ---------------- CARD 2: 正念呼吸冥想 · 10分钟 ---------------- */}
        <div
          id="task-slot-1-card"
          className={`apple-solid-card rounded-[28px] overflow-hidden transition-all duration-300 relative group select-none ${
            isNightMode ? 'apple-solid-card-dark text-slate-100' : 'bg-[#FCFCFC] text-slate-800'
          }`}
          style={{
            boxShadow: isNightMode ? '0 8px 24px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* 上半部分：信息区（大留白 20px-24px 内边距） */}
          <div
            onClick={() => onOpenTaskDetail(task1, 1)}
            className="p-5 pb-4 flex items-center justify-between cursor-pointer"
          >
            {/* 左侧大图标：纯色圆角方形徽标 (圆角12px, 44x44px), 内部白色线性图标 */}
            <div
              className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center text-white shrink-0 shadow-xs transition-transform group-hover:scale-105"
              style={{
                backgroundColor: task1.color || '#007AFF',
              }}
            >
              {renderIcon(task1.iconType, 'w-6 h-6 text-white stroke-[2.2]')}
            </div>

            {/* 中间：主标题与副标题 */}
            <div className="flex-1 min-w-0 px-3.5">
              <h3
                className={`font-bold text-[15px] leading-snug truncate transition-colors duration-500 ${
                  isNightMode ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {task1.title}
              </h3>
              <p
                className={`text-[12.5px] mt-1 font-normal truncate transition-colors duration-500 ${
                  isNightMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {task1.subtitle}
              </p>
            </div>

            {/* 右侧：单贝壳奖励标签 (装饰展示) */}
            <div className="flex items-center shrink-0">
              <div
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold text-[11px] tracking-tight shrink-0 leading-none transition-colors duration-500 ${
                  isNightMode
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                }`}
                title="完成可获得奖励"
              >
                <span className="text-[11px] leading-none">🐚</span>
                <span>+{task1.rewardBait || 10}</span>
              </div>
            </div>
          </div>

          {/* 分割线与下半部分：二分操作区 */}
          <div
            className={`border-t grid grid-cols-2 h-11 transition-colors duration-500 ${
              isNightMode
                ? 'border-white/5 divide-x divide-white/5 bg-[#0D1526]'
                : 'border-slate-100 divide-x divide-slate-100 bg-[#F9FAFB]'
            }`}
          >
            {/* 左半边：主操作按钮 (点击仅切换状态视觉反馈，不发放实际饵料) */}
            <button
              type="button"
              id="task-1-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                onCompleteTask(1, task1.rewardBait, e);
              }}
              className={`flex items-center justify-center gap-1.5 font-semibold text-[13.5px] transition-colors cursor-pointer ${
                completedTasks[1]
                  ? isNightMode
                    ? 'text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/30'
                    : 'text-emerald-600 bg-emerald-50/50 hover:bg-emerald-100/50'
                  : isNightMode
                  ? 'text-sky-400 hover:bg-white/5 active:bg-white/10'
                  : 'text-[#007AFF] hover:bg-sky-50 active:bg-sky-100/70'
              }`}
            >
              {completedTasks[1] ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>已完成</span>
                </>
              ) : (
                <span>开始</span>
              )}
            </button>

            {/* 右半边：次要操作按钮（换一个） */}
            <button
              type="button"
              id="task-1-switch-btn"
              onClick={(e) => {
                e.stopPropagation();
                onSwitchTask(1, e);
              }}
              className={`flex items-center justify-center gap-1.5 font-medium text-[12.5px] transition-colors group cursor-pointer ${
                isNightMode
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5 active:bg-white/10'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 active:bg-slate-200/70'
              }`}
            >
              <span>换一个</span>
              <RotateCw className="w-3.5 h-3.5 text-current group-active:rotate-180 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
