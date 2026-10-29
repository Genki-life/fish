import React, { useState } from 'react';
import { Sparkles, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  MomoClownFish,
  LinglingButterflyFish,
  GlowingJellyfish,
  SeaweedDecor,
} from './FishIllustrations';
import { FishDetailModal } from './FishDetailModal';
import { FishPetData } from '../types';

interface AquariumSectionProps {
  baitCount: number;
  stepCount?: string | number;
  onFeed: (fishType: 'solo' | 'coop') => {
    didLevelUp: boolean;
    newLevel: number;
    fishName: string;
    overflow: number;
    newExp: number;
    maxExp: number;
  } | null;
  fishDataMap?: Record<'solo' | 'coop', FishPetData>;
  soloProgress: number;
  coopProgress: number;
  completedTaskCount?: number;
  onOpenInviteModal?: () => void;
  onEarnBait?: (amount: number) => void;
  isNightMode?: boolean;
  onToggleNightMode?: () => void;
  scrollY?: number;
}

// =====================================================================
// 1. 远景层装饰: 缸底细腻沙地地貌 (Seafloor Sand Dunes & Distant Terrain)
// =====================================================================
const DistantSeafloorBed: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => (
  <div className="absolute -bottom-1 inset-x-0 h-20 pointer-events-none z-0">
    <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="sand-grad-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isNightMode ? '#071B2F' : '#1E5BB5'} stopOpacity="0.8" />
          <stop offset="100%" stopColor={isNightMode ? '#020A13' : '#144690'} stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="sand-grad-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isNightMode ? '#0C2A4A' : '#2A72D4'} stopOpacity="0.85" />
          <stop offset="100%" stopColor={isNightMode ? '#02070D' : '#1B54A6'} stopOpacity="0.98" />
        </linearGradient>
      </defs>
      {/* 远景起伏沙丘脊线 1 */}
      <path
        d="M0,32 Q65,16 135,26 T275,20 Q345,30 400,16 L400,80 L0,80 Z"
        fill="url(#sand-grad-back)"
      />
      {/* 中远景沙丘脊线 2 */}
      <path
        d="M0,46 Q80,28 175,42 T330,34 Q375,42 400,36 L400,80 L0,80 Z"
        fill="url(#sand-grad-front)"
      />
      {/* 细小贝壳与鹅卵石化石微光 (Shell & Pebble Silhouette Dots - 晶莹白与浅海珍珠微光) */}
      <circle cx="85" cy="54" r="2.5" fill={isNightMode ? '#38BDF8' : '#FFFFFF'} fillOpacity="0.8" />
      <circle cx="210" cy="48" r="2" fill={isNightMode ? '#A5F3FC' : '#E0F2FE'} fillOpacity="0.85" />
      <circle cx="315" cy="52" r="3" fill={isNightMode ? '#38BDF8' : '#FFFFFF'} fillOpacity="0.75" />
      <circle cx="150" cy="62" r="1.5" fill={isNightMode ? '#7DD3FC' : '#BFDBFE'} fillOpacity="0.9" />
      <circle cx="260" cy="60" r="2" fill={isNightMode ? '#38BDF8' : '#DBEAFE'} fillOpacity="0.8" />
    </svg>
  </div>
);

// =====================================================================
// 2. 远景层装饰: 模糊低对比度水草轮廓 (Blurred Distant Seaweed Silhouettes)
// =====================================================================
const DistantBlurredSeaweed: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => (
  <>
    {/* 远景模糊低对比度水草 - 左侧 (深邃清澈天蓝) */}
    <div
      className={`absolute bottom-6 left-8 z-0 pointer-events-none transition-opacity duration-700 blur-[3px] scale-90 ${
        isNightMode ? 'opacity-25' : 'opacity-40'
      }`}
    >
      <SeaweedDecor
        className="animate-seaweed-2"
        color={isNightMode ? '#1E3A8A' : '#60A5FA'}
      />
    </div>
    {/* 远景模糊低对比度水草 - 中右侧 */}
    <div
      className={`absolute bottom-8 right-14 z-0 pointer-events-none scale-x-[-1] transition-opacity duration-700 blur-[3px] scale-80 ${
        isNightMode ? 'opacity-20' : 'opacity-35'
      }`}
    >
      <SeaweedDecor
        className="animate-seaweed-1"
        color={isNightMode ? '#172554' : '#93C5FD'}
      />
    </div>
  </>
);

// =====================================================================
// 3. 近景层装饰: 靠近镜头的大颗粒微失焦气泡与光斑 (Macro Foreground Camera Layer)
// =====================================================================
const MacroForegroundLensLayer: React.FC<{ isNightMode?: boolean; parallaxOffset: number }> = ({
  isNightMode,
  parallaxOffset,
}) => (
  <div
    className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
    style={{ transform: `translateY(${parallaxOffset}px)`, transition: 'transform 0.05s linear' }}
  >
    {/* 1. 特大近景镜头气泡 A (带镜头景深微模糊、高光折射环) */}
    <div className="absolute bottom-0 left-[16%] w-6 h-6 rounded-full animate-macro-bubble-1">
      <div
        className={`w-full h-full rounded-full border-[1.2px] backdrop-blur-[0.5px] relative shadow-md ${
          isNightMode
            ? 'border-white/50 bg-cyan-300/10 shadow-[0_0_12px_rgba(103,232,249,0.3)]'
            : 'border-white/80 bg-white/20 shadow-[0_2px_8px_rgba(255,255,255,0.4)]'
        }`}
      >
        {/* 顶部主高光弧 */}
        <div className="absolute top-1 left-1.5 w-1.8 h-0.8 rounded-full bg-white -rotate-35 blur-[0.2px]" />
        {/* 底部副折射光弧 */}
        <div className="absolute bottom-1 right-1.5 w-1.2 h-0.5 rounded-full bg-white/80 -rotate-35" />
      </div>
    </div>

    {/* 2. 特大近景镜头气泡 B (中右侧镜头前快速掠过) */}
    <div className="absolute bottom-0 right-[20%] w-7 h-7 rounded-full animate-macro-bubble-2">
      <div
        className={`w-full h-full rounded-full border-[1.4px] backdrop-blur-[0.5px] relative shadow-md ${
          isNightMode
            ? 'border-white/60 bg-sky-300/10 shadow-[0_0_14px_rgba(56,189,248,0.35)]'
            : 'border-white/85 bg-white/25 shadow-[0_3px_10px_rgba(255,255,255,0.45)]'
        }`}
      >
        <div className="absolute top-1.5 left-1.8 w-2 h-1 rounded-full bg-white -rotate-35 blur-[0.2px]" />
        <div className="absolute bottom-1.2 right-1.8 w-1.2 h-0.5 rounded-full bg-white/80 -rotate-35" />
      </div>
    </div>

    {/* 3. 特大近景镜头气泡 C (左前侧镜头边掠过) */}
    <div className="absolute bottom-0 left-[6%] w-5 h-5 rounded-full animate-macro-bubble-3">
      <div
        className={`w-full h-full rounded-full border-[1.2px] backdrop-blur-[0.5px] relative shadow-xs ${
          isNightMode
            ? 'border-white/50 bg-sky-300/10 shadow-[0_0_10px_rgba(56,189,248,0.25)]'
            : 'border-white/80 bg-white/20 shadow-[0_2px_6px_rgba(255,255,255,0.35)]'
        }`}
      >
        <div className="absolute top-1 left-1.2 w-1.2 h-0.6 rounded-full bg-white -rotate-35" />
      </div>
    </div>

    {/* 4. 镜头前景漂浮柔光斑 (Foreground Lens Caustic Shimmer) */}
    <div className="absolute top-10 left-1/4 w-52 h-36 pointer-events-none mix-blend-overlay animate-lens-drift opacity-45">
      <div
        className={`w-full h-full rounded-full blur-xl ${
          isNightMode
            ? 'bg-gradient-to-tr from-cyan-400/35 to-indigo-300/20'
            : 'bg-gradient-to-tr from-white/70 to-sky-200/40'
        }`}
      />
    </div>
  </div>
);

// =====================================================================
// 水下柔和光斑组件 (Underwater Caustics Water Ripples & Light Waves)
// =====================================================================
const UnderwaterCausticPatchA: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => (
  <div className="absolute top-8 left-0 w-72 sm:w-84 h-48 pointer-events-none z-1 animate-caustic-1 mix-blend-overlay">
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="caustic-blur-1" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {/* 阳光穿透水面折射出的不规则波纹网状光斑 */}
      <path
        d="M20,45 C60,15 110,60 155,30 C200,10 245,50 290,25 C275,75 235,60 185,90 C135,115 80,75 20,45 Z"
        fill={isNightMode ? '#67E8F9' : '#FFFFFF'}
        fillOpacity={isNightMode ? '0.35' : '0.32'}
        filter="url(#caustic-blur-1)"
      />
      <path
        d="M35,70 C90,105 130,65 185,100 C230,125 265,85 295,115 C250,145 200,120 150,155 C90,140 55,105 35,70 Z"
        fill={isNightMode ? '#38BDF8' : '#FFFFFF'}
        fillOpacity={isNightMode ? '0.3' : '0.28'}
        filter="url(#caustic-blur-1)"
      />
      <path
        d="M75,25 Q125,90 80,150 T145,170 Q205,115 245,55"
        stroke={isNightMode ? '#A5F3FC' : '#FFFFFF'}
        strokeWidth="8"
        strokeLinecap="round"
        strokeOpacity={isNightMode ? '0.35' : '0.35'}
        filter="url(#caustic-blur-1)"
      />
      <path
        d="M150,20 Q120,80 175,130 T265,135"
        stroke={isNightMode ? '#7DD3FC' : '#FFFFFF'}
        strokeWidth="6"
        strokeLinecap="round"
        strokeOpacity={isNightMode ? '0.35' : '0.32'}
        filter="url(#caustic-blur-1)"
      />
    </svg>
  </div>
);

const UnderwaterCausticPatchB: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => (
  <div className="absolute bottom-4 right-0 w-80 sm:w-96 h-56 pointer-events-none z-1 animate-caustic-2 mix-blend-overlay">
    <svg viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="caustic-blur-2" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>
      {/* 缸底投下的水波纹光斑 */}
      <path
        d="M30,75 C75,35 140,80 195,45 C250,20 295,70 320,55 C300,115 255,95 205,140 C145,180 85,135 30,75 Z"
        fill={isNightMode ? '#38BDF8' : '#FFFFFF'}
        fillOpacity={isNightMode ? '0.35' : '0.32'}
        filter="url(#caustic-blur-2)"
      />
      <path
        d="M55,105 C115,145 165,105 225,150 C275,180 300,135 325,170 C270,200 210,170 160,205 C90,190 65,145 55,105 Z"
        fill={isNightMode ? '#38BDF8' : '#FFFFFF'}
        fillOpacity={isNightMode ? '0.25' : '0.26'}
        filter="url(#caustic-blur-2)"
      />
      <path
        d="M45,65 Q105,125 85,175 T165,185 Q235,135 285,85"
        stroke={isNightMode ? '#67E8F9' : '#FFFFFF'}
        strokeWidth="7"
        strokeLinecap="round"
        strokeOpacity={isNightMode ? '0.35' : '0.35'}
        filter="url(#caustic-blur-2)"
      />
    </svg>
  </div>
);

const UnderwaterCausticPatchC: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => (
  <div className="absolute top-24 right-4 w-64 h-44 pointer-events-none z-1 animate-caustic-3 mix-blend-overlay">
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="caustic-blur-3" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {/* 中景水流漂浮折射光斑 */}
      <path
        d="M25,55 C65,25 115,65 165,35 C205,15 240,50 255,40 C235,90 195,75 155,110 C105,140 60,100 25,55 Z"
        fill={isNightMode ? '#7DD3FC' : '#FFFFFF'}
        fillOpacity={isNightMode ? '0.3' : '0.3'}
        filter="url(#caustic-blur-3)"
      />
      <path
        d="M40,35 Q85,90 65,135 T140,145 Q195,100 230,60"
        stroke={isNightMode ? '#A5F3FC' : '#FFFFFF'}
        strokeWidth="6"
        strokeLinecap="round"
        strokeOpacity={isNightMode ? '0.3' : '0.32'}
        filter="url(#caustic-blur-3)"
      />
    </svg>
  </div>
);

// =====================================================================
// 4. 鱼缸水域底部柔和有机波浪遮罩与背景虚化过渡组件 (Wave/Blob Shape Bottom Transition Mask)
// =====================================================================
const AquariumBottomWaveTransition: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => (
  <div className="absolute -bottom-1 inset-x-0 h-20 sm:h-24 pointer-events-none z-30 select-none overflow-hidden">
    {/* 柔和向上羽化渐变 (Soft Gradient Blur Fade out) */}
    <div
      className={`absolute inset-0 bg-gradient-to-t pointer-events-none transition-colors duration-700 ${
        isNightMode
          ? 'from-[#060B14] via-[#060B14]/80 via-35% to-transparent'
          : 'from-[#F6F7FA] via-[#F6F7FA]/85 via-40% to-transparent'
      }`}
    />

    {/* 第一层: 远景柔和半透明浅波浪 (Distant Soft Mist Wave) */}
    <svg
      viewBox="0 0 400 80"
      preserveAspectRatio="none"
      className="absolute bottom-0 inset-x-0 w-full h-full pointer-events-none opacity-50 transition-colors duration-700"
    >
      <path
        d="M0,45 C45,28 105,62 170,38 C235,14 300,52 360,32 C385,24 395,28 400,30 L400,80 L0,80 Z"
        fill={isNightMode ? '#0A1526' : '#C7DEFC'}
      />
    </svg>

    {/* 第二层: 中景舒缓波浪流线 (Midground Organic Blob Wave) */}
    <svg
      viewBox="0 0 400 80"
      preserveAspectRatio="none"
      className="absolute bottom-0 inset-x-0 w-full h-full pointer-events-none opacity-80 transition-colors duration-700"
    >
      <path
        d="M0,52 C55,36 120,68 185,46 C250,24 315,60 370,42 C385,38 395,40 400,44 L400,80 L0,80 Z"
        fill={isNightMode ? '#070D18' : '#E2EEFD'}
      />
    </svg>

    {/* 第三层: 近景主波浪实体层 (Foreground Seamless Organic Curve to Page Mesh Background) */}
    <svg
      viewBox="0 0 400 80"
      preserveAspectRatio="none"
      className="absolute bottom-0 inset-x-0 w-full h-full pointer-events-none transition-colors duration-700"
    >
      <path
        d="M0,60 C60,45 130,72 205,52 C275,32 335,66 385,50 C392,48 398,51 400,52 L400,80 L0,80 Z"
        fill={isNightMode ? '#060B14' : '#F6F7FA'}
      />
    </svg>

    {/* 波浪边缘细腻微光描边 (Wave Rim Ambient Sheen) */}
    <svg
      viewBox="0 0 400 80"
      preserveAspectRatio="none"
      className="absolute bottom-0 inset-x-0 w-full h-full pointer-events-none transition-colors duration-700"
    >
      <path
        d="M0,60 C60,45 130,72 205,52 C275,32 335,66 385,50 C392,48 398,51 400,52"
        fill="none"
        stroke={isNightMode ? '#38BDF8' : '#FFFFFF'}
        strokeWidth="1.5"
        strokeOpacity={isNightMode ? '0.22' : '0.8'}
      />
    </svg>
  </div>
);

// =====================================================================
// 5. 顶端水面阳光散射高光反射带 (Top Water Surface Sunlight Specular & Shimmer Band)
// =====================================================================
const TopWaterSurfaceSunlightSpecular: React.FC<{ isNightMode?: boolean }> = ({ isNightMode }) => (
  <div className="absolute top-0 inset-x-0 h-28 pointer-events-none z-10 select-none overflow-hidden">
    {/* 顶端水面漫射光晕 (Soft Overhead Sun Bloom / Moon Glow) */}
    <div
      className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b pointer-events-none transition-colors duration-700 ${
        isNightMode
          ? 'from-sky-200/25 via-sky-300/10 to-transparent'
          : 'from-white via-white/45 via-white/10 to-transparent'
      }`}
    />

    {/* 横向浮动阳光闪耀高光带 (Horizontal Shimmering Sunlight Specular Sweep) */}
    <div className="absolute top-0 inset-x-0 h-10 overflow-hidden pointer-events-none">
      <div
        className={`w-[140%] -left-[20%] absolute top-0 h-8 bg-gradient-to-r ${
          isNightMode
            ? 'from-transparent via-cyan-200/30 via-sky-100/40 via-cyan-200/30 to-transparent'
            : 'from-transparent via-white/85 via-cyan-50/90 via-white/85 to-transparent'
        } animate-surface-sunlight blur-[2.5px]`}
      />
    </div>

    {/* 水面张力波纹弯月面曲线 (Water Meniscus Rim Line) */}
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      className="absolute top-0 inset-x-0 w-[110%] -left-[5%] h-5 pointer-events-none animate-surface-meniscus opacity-85 transition-colors duration-700"
    >
      <path
        d="M0,2 Q40,6 90,3 T180,4 T270,2 T360,5 Q385,3 400,2"
        fill="none"
        stroke={isNightMode ? 'rgba(186, 230, 253, 0.55)' : 'rgba(255, 255, 255, 0.95)'}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M0,4 Q50,8 110,4 T210,6 T310,3 Q365,6 400,4"
        fill="none"
        stroke={isNightMode ? 'rgba(125, 211, 252, 0.35)' : 'rgba(255, 255, 255, 0.7)'}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>

    {/* 极细水面折射高光丝 (Specular Hairline) */}
    <div
      className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r ${
        isNightMode
          ? 'from-transparent via-sky-200/60 to-transparent'
          : 'from-transparent via-white/95 to-transparent'
      } animate-surface-sheen pointer-events-none shadow-[0_1px_4px_rgba(255,255,255,0.7)]`}
    />

    {/* 顶端水面微光闪烁粼粼微粒 (Water Surface Sun Sparkles / Glints) */}
    <div className="absolute top-0.5 left-[18%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-water-glint-1 pointer-events-none" />
    <div className="absolute top-1 left-[48%] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff] animate-water-glint-2 pointer-events-none" />
    <div className="absolute top-0.5 right-[24%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-water-glint-3 pointer-events-none" />
    <div className="absolute top-1.5 right-[12%] w-1 h-1 rounded-full bg-white shadow-[0_0_6px_#ffffff] animate-water-glint-1 pointer-events-none" />
  </div>
);

const defaultFishDataMap: Record<'solo' | 'coop', FishPetData> = {
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
};

export const AquariumSection: React.FC<AquariumSectionProps> = ({
  baitCount,
  stepCount = '6,420',
  onFeed,
  fishDataMap,
  soloProgress,
  coopProgress,
  completedTaskCount = 1,
  onOpenInviteModal,
  onEarnBait,
  isNightMode: controlledIsNightMode,
  onToggleNightMode,
  scrollY = 0,
}) => {
  const activeFishMap = fishDataMap || defaultFishDataMap;

  const [feedAnimation, setFeedAnimation] = useState<{
    active: boolean;
    target: 'solo' | 'coop' | null;
    x: number;
    y: number;
  }>({
    active: false,
    target: null,
    x: 50,
    y: 20,
  });

  const [fishMessage, setFishMessage] = useState<string | null>(null);
  const [showFishDetailModal, setShowFishDetailModal] = useState<boolean>(false);
  const [selectedFishForModal, setSelectedFishForModal] = useState<'solo' | 'coop'>('solo');

  // 昼夜模式开关状态 (若外部传入则使用全局状态)
  const [localNightMode, setLocalNightMode] = useState<boolean>(false);
  const isNightMode = controlledIsNightMode !== undefined ? controlledIsNightMode : localNightMode;
  const [isRopePulling, setIsRopePulling] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 视差速度差计算 (Parallax Speeds for 3 Depth Layers)
  // 远景移动最慢 (0.16x), 中景正常 (0.42x), 近景移动最快 (0.88x)
  const farParallax = scrollY * 0.16;
  const midParallax = scrollY * 0.42;
  const nearParallax = scrollY * 0.88;

  // Toggle Day/Night Mode with Pull-Rope Spring Physics
  const handlePullRope = () => {
    if (isRopePulling) return;
    setIsRopePulling(true);

    const nextMode = !isNightMode;
    if (onToggleNightMode) {
      onToggleNightMode();
    } else {
      setLocalNightMode(nextMode);
    }

    // Subtle celebration particles on pull
    confetti({
      particleCount: 14,
      spread: 35,
      origin: { x: 0.88, y: 0.28 },
      colors: nextMode ? ['#FEF08A', '#38BDF8', '#C084FC'] : ['#FDE047', '#38BDF8', '#67E8F9'],
    });

    setToastMessage(nextMode ? '🌙 切换至静夜沉浸模式 · 全局微光亮起' : '☀️ 切换至明媚白昼模式');
    setTimeout(() => setToastMessage(null), 2000);

    setTimeout(() => {
      setIsRopePulling(false);
    }, 650);
  };

  const handleFishClick = (fishName: string, message: string) => {
    setFishMessage(`🐟 ${fishName}: "${message}"`);
    setTimeout(() => setFishMessage(null), 3000);
  };

  const handleFeedClick = (target: 'solo' | 'coop') => {
    const result = onFeed(target);
    if (!result) {
      setToastMessage('⚠️ 饵料不足！完成今日专注任务可获取鱼饵。');
      setTimeout(() => setToastMessage(null), 2500);
      return null;
    }

    setFeedAnimation({
      active: true,
      target,
      x: target === 'solo' ? 35 : 68,
      y: 40,
    });

    if (result.didLevelUp) {
      setToastMessage(`🎉 恭喜！${result.fishName} 升级到 Lv.${result.newLevel}！✨`);
      confetti({
        particleCount: 36,
        spread: 60,
        origin: { y: 0.35 },
        colors: target === 'solo' ? ['#58CC02', '#FFC800', '#FF8600'] : ['#1CB0F6', '#FFC800', '#CE82FF'],
      });
    } else {
      setToastMessage(`🍲 投喂成功！${result.fishName} 成长值 +15`);
    }
    setTimeout(() => setToastMessage(null), 2800);

    setTimeout(() => {
      setFeedAnimation({ active: false, target: null, x: 50, y: 20 });
    }, 1200);

    return result;
  };

  return (
    <>
      <div
        id="aquarium-pet-module"
        className={`relative w-full h-[516px] sm:h-[536px] min-h-[496px] overflow-hidden flex flex-col justify-between pt-14 pb-3 px-4 transition-all duration-700 select-none ${
          isNightMode
            ? 'bg-gradient-to-b from-[#162D4A] via-[#0E1E34] via-[#071324] to-[#020812]'
            : 'bg-gradient-to-b from-[#F0F7FF] via-[#DCEBFE] via-[#8EC2FA] via-[#3B8BF6] to-[#1A6ED8]'
        }`}
      >
        {/* ================================================================= */}
        {/* 顶端水面阳光散射高光反射带 (Top Water Surface Sunlight Specular & Shimmer Band) */}
        {/* ================================================================= */}
        <TopWaterSurfaceSunlightSpecular isNightMode={isNightMode} />

        {/* ================================================================= */}
        {/* 1. 远景层 (DEPTH LAYER 1: 缸底沙地、模糊水草轮廓、远景微光水母与浮游尘埃) */}
        {/* 视差速度: 移动最慢 (scrollY * 0.16) + 14s 极缓呼吸漂浮 */}
        {/* ================================================================= */}
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden animate-far-drift"
          style={{ transform: `translateY(${farParallax}px)`, transition: 'transform 0.05s linear' }}
        >
          {/* 水面高光散射与微光反射层 (从最顶端 Y=0 开始延伸的水面浅蓝白光效) */}
          <div
            className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b pointer-events-none transition-colors duration-700 ${
              isNightMode
                ? 'from-sky-200/25 via-sky-300/10 to-transparent'
                : 'from-white/90 via-white/40 via-white/10 to-transparent'
            }`}
          />

          {/* 缸底沙地起伏地貌与微光化石 */}
          <DistantSeafloorBed isNightMode={isNightMode} />

          {/* 模糊低对比度水草轮廓 (blur 3px, 营造清透远景纵深) */}
          <DistantBlurredSeaweed isNightMode={isNightMode} />

          {/* 远景深层光束与漂浮生物 */}
          {isNightMode ? (
            <>
              {/* 夜间深海暗光与月光光束 (Moonlight Caustic Rays) */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-transparent to-cyan-950/40" />
              <div className="absolute top-0 left-4 w-52 h-full bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent transform -skew-x-12 animate-caustic-rays" />
              <div className="absolute top-0 right-14 w-44 h-full bg-gradient-to-r from-transparent via-indigo-300/15 to-transparent transform -skew-x-6 animate-caustic-rays" />

              {/* 远景微光浮游生物光点 (Bioluminescent Plankton Motes) */}
              <div className="absolute bottom-12 left-1/4 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_#67e8f9] animate-plankton-1" />
              <div className="absolute bottom-24 left-1/2 w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_6px_#fde047] animate-plankton-2" />
              <div className="absolute bottom-20 right-1/3 w-2 h-2 rounded-full bg-purple-300 shadow-[0_0_6px_#c084fc] animate-plankton-3" />
              <div className="absolute top-28 left-1/3 w-1.5 h-1.5 rounded-full bg-sky-200 shadow-[0_0_6px_#7dd3fc] animate-plankton-2" />

              {/* 远景深水发光水母 3 只 */}
              <div className="absolute top-16 left-12 opacity-70 animate-jelly-1">
                <GlowingJellyfish size={36} colorScheme="violet" />
              </div>
              <div className="absolute top-10 right-20 opacity-75 animate-jelly-2">
                <GlowingJellyfish size={32} colorScheme="cyan" />
              </div>
              <div className="absolute bottom-28 left-1/2 opacity-55 animate-jelly-3">
                <GlowingJellyfish size={26} colorScheme="peach" />
              </div>
            </>
          ) : (
            <>
              {/* 白天清晨浅海阳光穿透水体光束 (Sunlight Soft Shafts) */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-blue-600/10" />
              <div className="absolute top-0 left-6 w-40 h-full bg-gradient-to-r from-transparent via-white/45 via-sky-100/25 to-transparent transform -skew-x-12 animate-caustic-rays" />
              <div className="absolute top-0 right-10 w-36 h-full bg-gradient-to-r from-transparent via-white/35 via-sky-50/20 to-transparent transform -skew-x-6 animate-caustic-rays" />
              <div className="absolute top-0 left-1/3 w-28 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-8 animate-caustic-rays" />

              {/* 白天清透浮游光点与阳光碎屑 (Sunlight Dapple Sparkle Motes) */}
              <div className="absolute top-20 left-[18%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff] animate-plankton-1 opacity-75" />
              <div className="absolute top-36 right-[28%] w-1 h-1 rounded-full bg-white shadow-[0_0_5px_#ffffff] animate-plankton-2 opacity-80" />
              <div className="absolute bottom-28 left-[35%] w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_5px_#ffffff] animate-plankton-3 opacity-70" />
              <div className="absolute bottom-16 right-[18%] w-1.5 h-1.5 rounded-full bg-sky-100 shadow-[0_0_6px_#bae6fd] animate-plankton-1 opacity-75" />
              <div className="absolute top-28 right-[12%] w-1 h-1 rounded-full bg-white shadow-[0_0_4px_#ffffff] animate-plankton-2 opacity-85" />
              <div className="absolute bottom-32 left-[12%] w-1 h-1 rounded-full bg-white/90 shadow-[0_0_4px_#ffffff] animate-plankton-3 opacity-65" />
            </>
          )}
        </div>

        {/* ================================================================= */}
        {/* 2. 中景层 (DEPTH LAYER 2: 清晰水草、折射水波纹光斑、密集细腻活水气泡) */}
        {/* 视差速度: 正常中速 (scrollY * 0.42) */}
        {/* ================================================================= */}
        <div
          className="absolute inset-0 pointer-events-none z-5 overflow-hidden"
          style={{ transform: `translateY(${midParallax}px)`, transition: 'transform 0.05s linear' }}
        >
          {/* 清晰水草 (Crisp Foreground-Mid Seaweeds - 湛蓝海洋水草) */}
          <div className={`absolute bottom-0 left-2 z-1 pointer-events-none transition-opacity duration-700 ${isNightMode ? 'opacity-55' : 'opacity-75'}`}>
            <SeaweedDecor className="animate-seaweed-1" color={isNightMode ? '#1D4ED8' : '#2563EB'} />
          </div>
          <div className={`absolute bottom-0 right-3 z-1 pointer-events-none scale-x-[-1] transition-opacity duration-700 ${isNightMode ? 'opacity-50' : 'opacity-70'}`}>
            <SeaweedDecor className="animate-seaweed-2" color={isNightMode ? '#1E40AF' : '#3B82F6'} />
          </div>

          {/* 3 处中景柔和水波纹光影光斑 */}
          <UnderwaterCausticPatchA isNightMode={isNightMode} />
          <UnderwaterCausticPatchB isNightMode={isNightMode} />
          <UnderwaterCausticPatchC isNightMode={isNightMode} />

          {/* ======================================================= */}
          {/* 缸底持续缓慢上升并于水面附近淡出的活水细腻气泡流 (+30% 数量，微小分散) */}
          {/* ======================================================= */}
          {/* 气泡流 1: 左侧海草根部涌出 */}
          <div className="absolute bottom-1 left-7 w-2 h-2 rounded-full bg-white/75 border border-white/90 animate-bubble-rise-1 shadow-[0_0_3px_rgba(255,255,255,0.7)]" />
          <div className="absolute bottom-3 left-10 w-2.5 h-2.5 rounded-full bg-white/70 border border-white/85 animate-bubble-rise-5 shadow-[0_0_4px_rgba(255,255,255,0.6)]" />
          <div className="absolute bottom-0 left-4 w-1.5 h-1.5 rounded-full bg-white/80 border border-white animate-bubble-rise-9 shadow-[0_0_2px_rgba(255,255,255,0.8)]" />

          {/* 气泡流 2: 中左清透沙丘缝隙涌出 */}
          <div className="absolute bottom-0 left-1/3 w-1.8 h-1.8 rounded-full bg-white/80 border border-white animate-bubble-rise-2 shadow-[0_0_3px_rgba(255,255,255,0.7)]" />
          <div className="absolute bottom-2 left-[24%] w-1.5 h-1.5 rounded-full bg-white/75 border border-white/90 animate-bubble-rise-7 shadow-[0_0_2px_rgba(255,255,255,0.6)]" />
          <div className="absolute bottom-3 left-[38%] w-3 h-3 rounded-full bg-white/65 border border-white/85 animate-bubble-rise-4 shadow-[0_0_4px_rgba(255,255,255,0.5)]" />

          {/* 气泡流 3: 缸体中央微泉涌出 */}
          <div className="absolute bottom-1 left-1/2 w-1.5 h-1.5 rounded-full bg-white/80 border border-white animate-bubble-rise-8 shadow-[0_0_2px_rgba(255,255,255,0.7)]" />
          <div className="absolute bottom-2 left-[54%] w-2 h-2 rounded-full bg-white/75 border border-white/90 animate-bubble-rise-10 shadow-[0_0_3px_rgba(255,255,255,0.6)]" />

          {/* 气泡流 4: 中右与右侧海草根部涌出 */}
          <div className="absolute bottom-1 right-1/3 w-2.5 h-2.5 rounded-full bg-white/70 border border-white/85 animate-bubble-rise-3 shadow-[0_0_3px_rgba(255,255,255,0.6)]" />
          <div className="absolute bottom-0 right-[26%] w-1.5 h-1.5 rounded-full bg-white/80 border border-white animate-bubble-rise-7 shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
          <div className="absolute bottom-2 right-14 w-2 h-2 rounded-full bg-white/80 border border-white/90 animate-bubble-rise-6 shadow-[0_0_3px_rgba(255,255,255,0.7)]" />
          <div className="absolute bottom-0 right-6 w-2.8 h-2.8 rounded-full bg-white/70 border border-white/85 animate-bubble-rise-1 shadow-[0_0_4px_rgba(255,255,255,0.6)]" />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-white/80 border border-white animate-bubble-rise-8 shadow-[0_0_2px_rgba(255,255,255,0.7)]" />
        </div>

        {/* ================================================================= */}
        {/* 3. 近景层 (DEPTH LAYER 3: 靠近镜头的大颗粒微失焦气泡、偶尔飘过的近景大光斑) */}
        {/* 视差速度: 移动最快 (scrollY * 0.88) 制造逼真的立体镜头景深 */}
        {/* ================================================================= */}
        <MacroForegroundLensLayer isNightMode={isNightMode} parallaxOffset={nearParallax} />

        {/* ================================================================= */}
        {/* TOP ROW: 顶部悬浮玻璃胶囊 + 右上角白天/夜间模式切换按钮 */}
        {/* ================================================================= */}
        <div className="relative z-20 flex items-center justify-between gap-2 pointer-events-none px-1">
          {/* 玻璃悬浮胶囊: 同时展示饵料余额与今日步数 */}
          <div
            id="aquarium-organic-bubble-cluster"
            className="flex items-center gap-2 select-none pointer-events-auto"
          >
            <div
              id="glass-pill-bait-steps-status"
              className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full backdrop-blur-[14px] border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all ${
                isNightMode
                  ? 'bg-white/15 text-white'
                  : 'bg-white/25 text-slate-900'
              }`}
              title="饵料余额与今日步数"
            >
              <div className="flex items-center gap-1.5" title="当前饵料数量 (贝壳)">
                <span className="text-[12px] leading-none">🐚</span>
                <span className="font-black text-[11px] leading-none tracking-tight">
                  {baitCount}
                </span>
              </div>
              <div className={`w-[1px] h-3 ${isNightMode ? 'bg-white/25' : 'bg-slate-900/15'}`} />
              <div className="flex items-center gap-1.5" title="今日步数">
                <span className="text-[12px] leading-none">👣</span>
                <span className="font-black text-[11px] leading-none tracking-tight">
                  {stepCount}
                </span>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 【右上角黄色滑块拉绳挂件】(Pull-Rope Switch) */}
          {/* ================================================================= */}
          <div
            id="aquarium-pull-rope-switch"
            onClick={handlePullRope}
            className="pointer-events-auto cursor-pointer group flex flex-col items-center select-none pt-0 -mr-0.5 px-2 relative"
            title={isNightMode ? '拉动切换为白昼模式 ☀️' : '拉动切换为静夜沉浸模式 🌙'}
          >
            {/* 1. 顶端固定黄色“底座” */}
            <div
              id="pull-rope-fixed-mount"
              className={`w-3.5 h-1.5 rounded-full border shadow-xs z-10 shrink-0 transition-colors duration-500 ${
                isNightMode
                  ? 'bg-amber-400 border-amber-200/90 shadow-[0_1px_4px_rgba(251,191,36,0.6)]'
                  : 'bg-amber-300 border-amber-100 shadow-[0_1px_3px_rgba(0,0,0,0.18)]'
              }`}
            />

            {/* 2. 细巧吊绳 (附带弹性形变动效) */}
            <div
              id="pull-rope-cord"
              className={`w-[1.5px] h-6 transition-colors duration-500 ${
                isRopePulling
                  ? 'animate-cord-stretch'
                  : 'group-hover:scale-y-105 group-active:scale-y-130'
              } ${
                isNightMode
                  ? 'bg-gradient-to-b from-amber-200/90 via-amber-300 to-amber-400 shadow-[0_0_4px_#FDE047]'
                  : 'bg-gradient-to-b from-white/95 via-amber-100/90 to-amber-200/90'
              }`}
              style={{ transformOrigin: 'top center' }}
            />

            {/* 3. 绳尾吊坠挂件 */}
            <div
              id="pull-rope-pendant"
              className={`relative -mt-0.5 flex items-center justify-center ${
                isRopePulling
                  ? 'animate-pendant-pull'
                  : 'group-hover:translate-y-0.5 group-active:translate-y-2'
              }`}
              style={{ transformOrigin: 'top center' }}
            >
              {isNightMode ? (
                /* 夜间模式: 发光小气泡吊坠 */
                <div className="relative w-4 h-4 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-500 border border-white/90 shadow-[0_0_12px_#FBBF24,0_0_20px_#F59E0B] flex items-center justify-center animate-pulse">
                  <div className="absolute top-0.5 left-1 w-1 h-0.5 bg-white rounded-full blur-[0.2px]" />
                  <Moon className="w-2.5 h-2.5 text-amber-950 fill-amber-950" />
                </div>
              ) : (
                /* 白天模式: 普通米色/暖黄色小木珠吊坠 */
                <div className="relative w-3.5 h-3.5 rounded-full bg-gradient-to-b from-[#FAF5EE] via-[#E8DEC8] to-[#D5C2A5] border border-[#BFA785] shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-1 h-1 rounded-full bg-[#BFA785]/60" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Speech/Status Bubble */}
        {fishMessage && (
          <div className={`relative z-30 mx-auto -mt-1 px-3.5 py-1.5 rounded-full backdrop-blur-[12px] border border-white/40 shadow-md animate-bounce text-[11.5px] font-black select-none ${
            isNightMode ? 'bg-white/20 text-white' : 'bg-white/35 text-slate-900'
          }`}>
            {fishMessage}
          </div>
        )}

        {/* Bottom Toast Message */}
        {toastMessage && (
          <div className={`absolute top-14 left-1/2 -translate-x-1/2 z-40 backdrop-blur-[12px] px-4 py-1.5 rounded-full text-[11.5px] font-bold shadow-lg border border-white/40 whitespace-nowrap animate-bounce flex items-center gap-1.5 pointer-events-none ${
            isNightMode ? 'bg-slate-900/65 text-white' : 'bg-white/35 text-slate-900'
          }`}>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ================================================================= */}
        {/* AQUARIUM LIVING STAGE: Multi-Depth Cartoon Fishes with Bioluminescence */}
        {/* ================================================================= */}
        <div className="relative z-10 w-full flex-1 flex flex-col justify-between py-1 px-1 my-auto">
          {/* Falling Food Pellet Particle during Feed */}
          {feedAnimation.active && (
            <div
              className="absolute z-30 transition-all duration-700 ease-in flex flex-col items-center pointer-events-none"
              style={{
                left: `${feedAnimation.x}%`,
                top: `${feedAnimation.y}%`,
              }}
            >
              <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-amber-800 shadow-md animate-spin" />
              <div className="text-[11px] font-black text-emerald-700 bg-white/95 px-2 py-0.5 rounded-full border border-emerald-300 shadow-sm mt-1 animate-bounce">
                +15 成长值!
              </div>
            </div>
          )}

          {/* Swimming Stage: 精简为 2 条鱼 (莫莫 · Lv.2 & 翎翎 · Lv.3) */}
          <div className="w-full flex items-center justify-between px-6 py-6 my-auto">
            {/* 1. 小丑鱼「莫莫」 (Lv.2 橙白条纹 - 夜间泛起冰蓝微光 + 2-4px持续轻微浮动呼吸与慢速轨迹) */}
            <div
              id="fish-momo-card"
              className={`relative animate-swim-solo cursor-pointer shrink-0 transition-all duration-500 hover:scale-105 active:scale-95 ${
                isNightMode ? 'fish-bioluminescence' : ''
              }`}
              onClick={() => {
                setSelectedFishForModal('solo');
                setShowFishDetailModal(true);
              }}
              title="点击打开投喂操作面板"
            >
              <div className="animate-fish-breathe-1">
                <MomoClownFish
                  size={88}
                  isEating={feedAnimation.target === 'solo'}
                />
                {/* Glass Pill Tag: 莫莫 · Lv.2 (实时动态显示等级) */}
                <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full backdrop-blur-[12px] border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.08)] px-2.5 py-0.5 flex items-center gap-1 whitespace-nowrap transition-all duration-300 ${
                  isNightMode
                    ? 'bg-white/15 text-white'
                    : 'bg-white/25 text-slate-900'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 shadow-xs" />
                  <span className="text-[9.5px] font-black tracking-tight">{activeFishMap.solo.name} · Lv.{activeFishMap.solo.level}</span>
                </div>
              </div>
            </div>

            {/* 2. 蝴蝶鱼「翎翎」（共育鱼 - Lv.3 - 黄黑条纹 + 华丽光效 + 2-4px持续轻微浮动呼吸） */}
            <div
              id="fish-lingling-card"
              className={`relative animate-swim-coop cursor-pointer shrink-0 transition-all duration-500 hover:scale-105 active:scale-95 ${
                isNightMode ? 'fish-bioluminescence' : ''
              }`}
              onClick={() => {
                setSelectedFishForModal('coop');
                setShowFishDetailModal(true);
              }}
              title="点击打开投喂操作面板"
            >
              <div className="animate-fish-breathe-2">
                <LinglingButterflyFish
                  size={98}
                  isEating={feedAnimation.target === 'coop'}
                />
                {/* Glass Pill Tag: 翎翎 · Lv.3 (实时动态显示等级) */}
                <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full backdrop-blur-[12px] border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.08)] px-2.5 py-0.5 flex items-center gap-1 whitespace-nowrap transition-all duration-300 ${
                  isNightMode
                    ? 'bg-white/15 text-white'
                    : 'bg-white/25 text-slate-900'
                }`}>
                  <Sparkles className="w-2.5 h-2.5 text-yellow-300 fill-yellow-300 shrink-0" />
                  <span className="text-[9.5px] font-black tracking-tight">{activeFishMap.coop.name} · Lv.{activeFishMap.coop.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 鱼缸场景底部柔和波浪曲线遮罩与渐变虚化过渡 (Soft Wave/Blob Bottom Transition) */}
        {/* ================================================================= */}
        <AquariumBottomWaveTransition isNightMode={isNightMode} />
      </div>

      {/* FISH SPECIES DETAIL & FEEDING PANEL MODAL */}
      <FishDetailModal
        isOpen={showFishDetailModal}
        onClose={() => setShowFishDetailModal(false)}
        baitCount={baitCount}
        fishDataMap={activeFishMap}
        initialFishId={selectedFishForModal}
        onFeed={handleFeedClick}
        onOpenInviteModal={onOpenInviteModal}
        isNightMode={isNightMode}
      />
    </>
  );
};
