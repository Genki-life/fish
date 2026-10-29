import React, { useState } from 'react';
import { Wifi, Battery, Signal, Sparkles, UserPlus, X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AquariumSection } from './AquariumSection';
import { TodayFocusSection } from './TodayFocusSection';
import { BottomNavBar } from './BottomNavBar';
import { TaskDetailSecondaryPage } from './TaskDetailSecondaryPage';
import { FocusTaskItem, FOCUS_TASK_POOLS } from '../data/focusTasksData';
import { FishPetData } from '../types';

export const DeviceFrameWrapper: React.FC = () => {
  const [baitCount, setBaitCount] = useState<number>(86);
  const [soloProgress, setSoloProgress] = useState<number>(65);
  const [coopProgress, setCoopProgress] = useState<number>(40);

  // 鱼缸双鱼成长数据状态 (莫莫 & 翎翎)
  const [fishDataMap, setFishDataMap] = useState<Record<'solo' | 'coop', FishPetData>>({
    solo: {
      id: 'solo',
      name: '莫莫',
      species: '小丑鱼',
      avatarIcon: '🐡',
      level: 2,
      currentGrowth: 35,
      maxGrowth: 50,
      glowColor: '#FF9600',
    },
    coop: {
      id: 'coop',
      name: '翎翎',
      species: '蝴蝶鱼',
      avatarIcon: '🐠',
      level: 3,
      currentGrowth: 60,
      maxGrowth: 100,
      coopBadge: '🤝 与 Mia 共育',
      glowColor: '#1CB0F6',
    },
  });

  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [inviteSent, setInviteSent] = useState<boolean>(false);

  // 全局昼夜模式状态 (Synchronized Day / Night Mode)
  const [isNightMode, setIsNightMode] = useState<boolean>(false);

  // Today's Focus task state & secondary page state
  const [taskIndices, setTaskIndices] = useState<[number, number, number]>([0, 0, 0]);
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({ 0: true });
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [activeSecondaryTask, setActiveSecondaryTask] = useState<{
    task: FocusTaskItem;
    slotIndex: 0 | 1 | 2;
  } | null>(null);
  const [scrollY, setScrollY] = useState(0);

  const completedTaskCount = Object.values(completedTasks).filter(Boolean).length;

  // Feeding logic (单次投喂消耗 5 饵料，增加 15 成长值，支持等级+1与溢出结转)
  const handleFeed = (fishType: 'solo' | 'coop'): {
    didLevelUp: boolean;
    newLevel: number;
    fishName: string;
    overflow: number;
    newExp: number;
    maxExp: number;
  } | null => {
    const FEED_COST = 5;
    const GROWTH_ADD = 15;

    if (baitCount < FEED_COST) return null;

    setBaitCount((prev) => Math.max(0, prev - FEED_COST));

    const target = fishDataMap[fishType];
    const newTotal = target.currentGrowth + GROWTH_ADD;
    let didLevelUp = false;
    let newLevel = target.level;
    let newGrowth = newTotal;
    let newMaxGrowth = target.maxGrowth;

    if (newTotal >= target.maxGrowth) {
      didLevelUp = true;
      newLevel = target.level + 1;
      newGrowth = newTotal - target.maxGrowth; // 结转溢出部分
      // 下一级所需成长值
      newMaxGrowth = Math.round(50 + (newLevel - 2) * 35);
    }

    setFishDataMap((prev) => ({
      ...prev,
      [fishType]: {
        ...target,
        level: newLevel,
        currentGrowth: newGrowth,
        maxGrowth: newMaxGrowth,
      },
    }));

    if (fishType === 'solo') {
      setSoloProgress(Math.min(100, Math.round((newGrowth / newMaxGrowth) * 100)));
    } else {
      setCoopProgress(Math.min(100, Math.round((newGrowth / newMaxGrowth) * 100)));
    }

    return {
      didLevelUp,
      newLevel,
      fishName: target.name,
      overflow: newGrowth,
      newExp: newGrowth,
      maxExp: newMaxGrowth,
    };
  };

  const handleEarnBait = (amount: number) => {
    setBaitCount((prev) => prev + amount);
  };

  // Switch task in slot (cycles through the pool for this category)
  const handleSwitchTask = (slotIndex: 0 | 1 | 2, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const pool = FOCUS_TASK_POOLS[slotIndex];
    const nextIndex = (taskIndices[slotIndex] + 1) % pool.length;

    setTaskIndices((prev) => {
      const updated: [number, number, number] = [prev[0], prev[1], prev[2]];
      updated[slotIndex] = nextIndex;
      return updated;
    });

    const nextTask = pool[nextIndex];

    // If currently viewing this task in secondary detail page, update the view as well
    if (activeSecondaryTask && activeSecondaryTask.slotIndex === slotIndex) {
      setActiveSecondaryTask({
        slotIndex,
        task: nextTask,
      });
    }

    // Reset completion for the newly switched task
    setCompletedTasks((prev) => ({ ...prev, [slotIndex]: false }));
  };

  // Complete / toggle task status (visual feedback only, no bait issued)
  const handleCompleteTask = (slotIndex: 0 | 1 | 2, _baitReward?: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setCompletedTasks((prev) => ({
      ...prev,
      [slotIndex]: !prev[slotIndex],
    }));
  };

  const handleSelectMood = (mood: 'happy' | 'neutral' | 'sad', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedMood(mood);
  };

  const handleSendInvite = () => {
    setInviteSent(true);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.5 },
    });
    setTimeout(() => {
      setShowInviteModal(false);
      setInviteSent(false);
    }, 1500);
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-0 sm:py-6 sm:px-4 transition-colors duration-700 ${
        isNightMode ? 'bg-[#040812]' : 'bg-[#E5E8EF]'
      }`}
    >
      {/* iPhone 390x844 Proportional Canvas with Apple Liquid Glass frame */}
      <div
        id="iphone-screen-container"
        className={`w-full sm:w-[390px] h-screen sm:h-[844px] sm:rounded-[50px] sm:border-[8px] flex flex-col justify-between overflow-hidden relative transition-all duration-700 ${
          isNightMode
            ? 'apple-mesh-bg-dark text-slate-100 sm:border-[#1E293B]/80 sm:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85),0_0_50px_rgba(30,58,138,0.25)]'
            : 'apple-mesh-bg-light text-slate-800 sm:border-slate-800/90 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18),0_0_30px_rgba(196,168,232,0.15)]'
        }`}
      >
        {/* Apple Health Signature Multi-Point Gaussian Diffusion Orbs (Zero Banding / Watercolor Aurora) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {isNightMode ? (
            <>
              {/* Deep Midnight Violet & Indigo Orbs */}
              <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#3B2060] opacity-45 blur-[85px]" />
              <div className="absolute -top-12 -right-12 w-80 h-80 rounded-full bg-[#122F55] opacity-45 blur-[85px]" />
              <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#16294A] opacity-35 blur-[90px]" />
              <div className="absolute bottom-1/4 -right-10 w-72 h-72 rounded-full bg-[#2B1B4A] opacity-35 blur-[85px]" />
            </>
          ) : (
            <>
              {/* Top-Left Lavender #C4A8E8 */}
              <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#C4A8E8] opacity-55 blur-[85px]" />
              {/* Top-Right Peach #F5B8B0 */}
              <div className="absolute -top-14 -right-14 w-80 h-80 rounded-full bg-[#F5B8B0] opacity-50 blur-[85px]" />
              {/* Mid Center Delicate Morning Sky Mist #D8E6F8 */}
              <div className="absolute top-1/3 left-1/6 w-88 h-88 rounded-full bg-[#DCE8F8] opacity-40 blur-[95px]" />
              {/* Mid-Left Soft Lilac #E6DAF5 */}
              <div className="absolute bottom-1/3 -left-10 w-72 h-72 rounded-full bg-[#E5D7F8] opacity-40 blur-[85px]" />
              {/* Lower-Right Pale Apricot/Coral #FDE4D8 */}
              <div className="absolute bottom-1/4 -right-10 w-72 h-72 rounded-full bg-[#FEE4D6] opacity-45 blur-[85px]" />
            </>
          )}
        </div>

        {/* TOP STATUS BAR (iOS standard liquid floating overlay, seamless on top of aquarium with zero dividing line or background banner) */}
        <div
          className={`absolute top-0 inset-x-0 pt-3 px-6 h-11 flex items-center justify-between z-40 select-none pointer-events-none transition-colors duration-500 ${
            isNightMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          <div className="text-[14px] font-bold tracking-tight">9:41</div>

          {/* Dynamic Island Pill (iPhone signature) */}
          <div className="w-26 h-5.5 bg-black rounded-full mx-auto hidden sm:flex items-center justify-between px-2.5 shadow-xs pointer-events-auto">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            <div className="w-2 h-2 rounded-full bg-[#1CB0F6]/70 animate-pulse" />
          </div>

          <div
            className={`flex items-center gap-1.5 transition-colors duration-500 ${
              isNightMode ? 'text-white/90' : 'text-slate-900/90'
            }`}
          >
            <Signal className="w-3.5 h-3.5 fill-current stroke-none" />
            <Wifi className="w-3.5 h-3.5 stroke-[2.4]" />
            <Battery className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>
        </div>

        {/* MAIN SCROLLABLE CONTENT AREA */}
        <div
          onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
          className="flex-1 overflow-y-auto no-scrollbar relative w-full"
        >
          {activeSecondaryTask ? (
            /* SECONDARY PAGE: Focus Task Detail & Exercise Guide */
            <div className="pt-12 sm:pt-14 p-3.5 space-y-3.5 pb-24">
              <TaskDetailSecondaryPage
                task={activeSecondaryTask.task}
                isCompleted={!!completedTasks[activeSecondaryTask.slotIndex]}
                onBack={() => setActiveSecondaryTask(null)}
                onSwitchTask={() => handleSwitchTask(activeSecondaryTask.slotIndex)}
                onCompleteTask={() =>
                  handleCompleteTask(
                    activeSecondaryTask.slotIndex,
                    activeSecondaryTask.task.rewardBait
                  )
                }
                isNightMode={isNightMode}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col">
              {/* SECTION 1: Aquarium Immersive Stage (Edge-to-edge from Y=0 top screen, full bleed continuous vertical gradient) */}
              <AquariumSection
                baitCount={baitCount}
                onFeed={handleFeed}
                fishDataMap={fishDataMap}
                soloProgress={soloProgress}
                coopProgress={coopProgress}
                completedTaskCount={completedTaskCount}
                onOpenInviteModal={() => setShowInviteModal(true)}
                onEarnBait={handleEarnBait}
                isNightMode={isNightMode}
                onToggleNightMode={() => setIsNightMode((prev) => !prev)}
                scrollY={scrollY}
              />

              {/* LOWER CONTENT SECTION (Padded Apple Health cards) */}
              <div className="w-full px-3.5 pt-1 pb-4 space-y-4 relative z-20">
                {/* SECTION 0: Apple Health Signature Page Header */}
                <div className="px-1 pt-0 pb-0.5 space-y-0.5 select-none">
                  <p className="text-[13px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    8月31日 星期一
                  </p>
                  <h1
                    className={`text-[32px] sm:text-[36px] font-black tracking-tight leading-tight transition-colors duration-500 ${
                      isNightMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    今日身心
                  </h1>
                </div>

                {/* SECTION 2: Today's Focus Module */}
                <TodayFocusSection
                  taskIndices={taskIndices}
                  completedTasks={completedTasks}
                  onOpenTaskDetail={(task, slotIndex) =>
                    setActiveSecondaryTask({ task, slotIndex })
                  }
                  onSwitchTask={handleSwitchTask}
                  onCompleteTask={handleCompleteTask}
                  isNightMode={isNightMode}
                />

                {/* Extra spacing at bottom for floating bottom dock */}
                <div className="h-20" />
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM NAVIGATION BAR (Apple Floating Glass Dock) */}
        <BottomNavBar
          isNightMode={isNightMode}
        />

        {/* iPhone Bottom Home Indicator Bar */}
        <div className="w-full flex justify-center pb-1.5 pt-0.5 shrink-0 bg-transparent relative z-20">
          <div
            className={`w-32 h-1 rounded-full transition-colors duration-500 ${
              isNightMode ? 'bg-white/30' : 'bg-black/20'
            }`}
          />
        </div>

        {/* Invite Friend Modal (Apple Liquid Glass Sheet) */}
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md animate-fadeIn">
            <div
              className={`rounded-[28px] p-5 w-full max-w-xs border shadow-2xl space-y-4 transition-colors duration-500 ${
                isNightMode
                  ? 'bg-[#111C33]/90 border-white/15 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl'
                  : 'bg-white/90 border-white/80 text-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-xl'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs ${
                      isNightMode
                        ? 'bg-sky-500/20 text-sky-400 border border-sky-400/30'
                        : 'bg-sky-50 text-[#007AFF] border border-sky-200'
                    }`}
                  >
                    <UserPlus className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h4
                      className={`text-base font-bold ${
                        isNightMode ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      双人共育水族馆
                    </h4>
                    <span
                      className={`text-[11px] font-medium ${
                        isNightMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      结伴养成稀有海洋生物
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isNightMode
                      ? 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              <p
                className={`text-xs leading-relaxed ${
                  isNightMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                邀请好友或家人结伴共育，共同达成每日专注与健康指标，解锁翎翎蝴蝶鱼与稀有海洋造景！
              </p>

              <div
                className={`p-3 rounded-2xl border text-center ${
                  isNightMode
                    ? 'bg-sky-950/40 border-sky-800/60 text-sky-300'
                    : 'bg-sky-50/70 border-sky-100 text-sky-900'
                }`}
              >
                <span className="text-xs font-semibold">
                  邀请链接：<span className="font-bold underline">aquahabit.app/join/alex42</span>
                </span>
              </div>

              <button
                onClick={handleSendInvite}
                className="apple-glass-btn apple-btn-primary w-full py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {inviteSent ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>邀请已发送！</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>复制并发送邀请</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

