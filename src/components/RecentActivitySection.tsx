import React from 'react';
import { Dumbbell, Wind, Footprints, Clock, Flame } from 'lucide-react';

interface ActivityLogItem {
  id: string;
  title: string;
  category: string;
  time: string;
  duration: string;
  icon: 'dumbbell' | 'wind' | 'footprints';
  badgeBg: string;
  calories?: string;
  rewardBait?: number | null; // null indicates no bait rewarded
}

interface RecentActivitySectionProps {
  isNightMode?: boolean;
}

export const RecentActivitySection: React.FC<RecentActivitySectionProps> = ({
  isNightMode = false,
}) => {
  const recentLogs: ActivityLogItem[] = [
    {
      id: '1',
      title: '力量训练',
      category: 'Strength',
      time: '08:30',
      duration: '32分钟',
      calories: '240 kcal',
      rewardBait: 15,
      icon: 'dumbbell',
      badgeBg: 'bg-[#FF3B30]',
    },
    {
      id: '2',
      title: '正念呼吸冥想',
      category: 'Mindfulness',
      time: '07:15',
      duration: '10分钟',
      rewardBait: 10,
      icon: 'wind',
      badgeBg: 'bg-[#AF52DE]',
    },
    {
      id: '3',
      title: '晨间快走',
      category: 'Outdoor',
      time: '昨天',
      duration: '45分钟',
      calories: '210 kcal',
      rewardBait: null, // 纯 HealthKit 被动记录，未关联待办，不产出代币
      icon: 'footprints',
      badgeBg: 'bg-[#34C759]',
    },
  ];

  return (
    <div id="recent-activity-section" className="w-full space-y-2">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <h2
          className={`text-[16px] font-bold tracking-tight transition-colors duration-500 ${
            isNightMode ? 'text-slate-100' : 'text-slate-900'
          }`}
        >
          活动记录
        </h2>
        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
          最近 24 小时
        </span>
      </div>

      {/* Activity Items List (Apple Health Solid Floating Cards) */}
      <div className="space-y-2.5">
        {recentLogs.map((log) => (
          <div
            key={log.id}
            className={`apple-solid-card rounded-[24px] p-4 flex items-center justify-between gap-3.5 transition-all duration-300 cursor-pointer ${
              isNightMode ? 'apple-solid-card-dark text-slate-100' : 'bg-[#FCFCFC] text-slate-800'
            }`}
            style={{
              boxShadow: isNightMode ? '0 6px 20px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.06)',
            }}
          >
            {/* Left: Icon + Title + Time */}
            <div className="flex items-center gap-3.5 min-w-0">
              {/* 纯色圆角方形徽标(圆角12px, 尺寸44x44px), 内部放置白色线性图标 */}
              <div
                className={`w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shrink-0 shadow-xs text-white transition-transform duration-300 group-hover:scale-105 ${log.badgeBg}`}
              >
                {log.icon === 'dumbbell' && <Dumbbell className="w-5 h-5 text-white stroke-[2.2]" />}
                {log.icon === 'wind' && <Wind className="w-5 h-5 text-white stroke-[2.2]" />}
                {log.icon === 'footprints' && <Footprints className="w-5 h-5 text-white stroke-[2.2]" />}
              </div>
              <div className="min-w-0">
                <h4
                  className={`text-[14.5px] font-bold leading-tight truncate transition-colors duration-500 ${
                    isNightMode ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {log.title}
                </h4>
                <div
                  className={`flex items-center gap-1.5 text-[11.5px] font-medium mt-1 transition-colors duration-500 ${
                    isNightMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {log.time}
                  </span>
                  <span>·</span>
                  <span>{log.duration}</span>
                </div>
              </div>
            </div>

            {/* Right: Calories & Shell Bait Earned */}
            <div className="text-right shrink-0">
              {log.calories && (
                <div
                  className={`flex items-center justify-end gap-1 text-[12.5px] font-bold transition-colors duration-500 ${
                    isNightMode ? 'text-orange-300' : 'text-orange-600'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{log.calories}</span>
                </div>
              )}

              {log.rewardBait ? (
                <span
                  className={`text-[11.5px] font-bold block mt-1 px-2.5 py-0.5 rounded-full ${
                    isNightMode
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100/80'
                  }`}
                >
                  +{log.rewardBait} 🐚
                </span>
              ) : (
                <div className="h-[15px]" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
