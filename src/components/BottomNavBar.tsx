import React from 'react';
import { Home } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavBarProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  isNightMode?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  isNightMode = false,
}) => {
  return (
    <div className="px-4 pb-2 pt-1 shrink-0 z-30 select-none flex justify-center">
      <div
        id="bottom-navigation-bar"
        className={`w-auto min-w-[120px] px-6 h-[58px] rounded-full flex items-center justify-center relative transition-all duration-500 apple-floating-dock ${
          isNightMode ? 'apple-floating-dock-dark' : ''
        }`}
      >
        {/* 只保留不可切换的“今日”胶囊，对应翡翠绿主题色高亮 */}
        <div
          id="bottom-nav-tab-home"
          className="flex flex-col items-center justify-center py-1 select-none"
        >
          {/* Apple Liquid Glass pill highlight behind active icon */}
          <div className="flex items-center justify-center px-4 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 dark:bg-emerald-500/20 shadow-xs border border-white/40 dark:border-white/10 backdrop-blur-md">
            <Home className="w-4.5 h-4.5 stroke-[2.5] text-[#34C759] dark:text-emerald-400" />
          </div>

          <span
            className={`text-[10px] font-bold tracking-tight mt-0.5 ${
              isNightMode ? 'text-emerald-400' : 'text-[#34C759]'
            }`}
          >
            今日
          </span>
        </div>
      </div>
    </div>
  );
};



