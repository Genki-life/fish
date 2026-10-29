import React from 'react';

// ==========================================
// 1. 小丑鱼「莫莫」 (Clownfish Momo - Lv.2)
// ==========================================
export const MomoClownFish: React.FC<{
  className?: string;
  size?: number;
  onClick?: () => void;
  isEating?: boolean;
  isFrozen?: boolean;
}> = ({ className = '', size = 92, onClick, isEating = false, isFrozen = false }) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer select-none transition-transform active:scale-95 ${className}`}
      style={{ width: size, height: size * 0.72 }}
    >
      {/* Optional Frozen Overlay */}
      {isFrozen && (
        <div className="absolute inset-0 bg-sky-200/50 backdrop-blur-[1px] rounded-full z-20 flex items-center justify-center pointer-events-none border border-sky-300">
          <span className="text-sm">❄️</span>
        </div>
      )}

      <svg
        viewBox="0 0 160 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Tail Fin */}
        <g className="animate-tail">
          <path
            d="M28 58 C10 40 4 28 2 34 C0 42 12 55 12 58 C12 61 0 74 2 82 C4 88 10 76 28 58 Z"
            fill="#FF8600"
            stroke="#2B2B2B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M10 44 C8 48 8 68 10 72"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* Dorsal Fin (Top) */}
        <path
          d="M70 26 C82 8 106 12 114 28 C98 28 84 28 70 26 Z"
          fill="#FF8600"
          stroke="#2B2B2B"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Ventral Fin (Bottom) */}
        <path
          d="M80 88 C90 102 108 98 112 86 C98 86 88 88 80 88 Z"
          fill="#FF8600"
          stroke="#2B2B2B"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Main Body */}
        <ellipse
          cx="86"
          cy="58"
          rx="58"
          ry="34"
          fill="#FF8600"
          stroke="#2B2B2B"
          strokeWidth="4.5"
        />

        {/* White Stripe 1 (Middle) */}
        <path
          d="M72 26 C80 38 82 78 72 90 C80 90 92 84 92 76 C86 58 86 42 92 40 C92 32 80 26 72 26 Z"
          fill="#FFFFFF"
          stroke="#2B2B2B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* White Stripe 2 (Head) */}
        <path
          d="M112 28 C122 38 124 74 114 86 C120 84 126 78 126 70 C120 54 120 44 126 42 C126 34 120 30 112 28 Z"
          fill="#FFFFFF"
          stroke="#2B2B2B"
          strokeWidth="3"
        />

        {/* Pectoral Fin (Side fin) */}
        <g className={isEating ? 'animate-spin' : 'animate-tail'}>
          <ellipse
            cx="96"
            cy="65"
            rx="16"
            ry="10"
            transform="rotate(-20 96 65)"
            fill="#FFAA00"
            stroke="#2B2B2B"
            strokeWidth="3.5"
          />
          <path
            d="M92 63 L106 67"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* Eye */}
        <circle cx="128" cy="50" r="11" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="3.5" />
        <circle cx="131" cy="49" r="6.5" fill="#1E293B" />
        <circle cx="134" cy="46" r="2.5" fill="#FFFFFF" />

        {/* Rosy Cheek */}
        <ellipse cx="120" cy="66" rx="6" ry="3.5" fill="#FF5252" fillOpacity="0.75" />

        {/* Cute Smile / Mouth */}
        {isEating ? (
          <ellipse cx="143" cy="62" rx="4" ry="5" fill="#2B2B2B" />
        ) : (
          <path
            d="M141 58 C141 62 136 65 133 63"
            stroke="#2B2B2B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};

// ==========================================
// 2. 蝴蝶鱼「翎翎」（共育鱼 - Lv.3 - 黄色底色 + 黑色条纹 + 华丽光效）
// ==========================================
export const LinglingButterflyFish: React.FC<{
  className?: string;
  size?: number;
  onClick?: () => void;
  isEating?: boolean;
}> = ({ className = '', size = 105, onClick, isEating = false }) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer select-none transition-transform active:scale-95 ${className}`}
      style={{ width: size, height: size * 0.8 }}
    >
      {/* Radiant glow aura & Star sparkle */}
      <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-tr from-yellow-300/35 via-amber-400/25 to-sky-300/25 blur-md animate-aura pointer-events-none" />

      <div className="absolute -top-1 right-2 text-yellow-400 text-xs animate-bounce pointer-events-none">
        ✨
      </div>
      <div className="absolute top-2 -left-1 text-amber-300 text-[10px] animate-pulse pointer-events-none">
        ✦
      </div>

      <svg
        viewBox="0 0 170 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-lg"
      >
        {/* Tail Fin */}
        <g className="animate-tail">
          <path
            d="M32 65 C12 45 4 32 2 38 C0 48 14 62 14 65 C14 68 0 82 2 92 C4 98 12 85 32 65 Z"
            fill="#FFD200"
            stroke="#2B2B2B"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M14 50 C12 55 12 75 14 80"
            stroke="#2B2B2B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* Tall Elegant Dorsal Fin (Yellow + Black tip) */}
        <path
          d="M75 32 C90 2 125 6 132 36 C110 35 90 34 75 32 Z"
          fill="#FFD200"
          stroke="#2B2B2B"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Black accent stripe on Dorsal */}
        <path
          d="M92 14 L98 32"
          stroke="#2B2B2B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M110 16 L114 34"
          stroke="#2B2B2B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Ventral Fin (Bottom) */}
        <path
          d="M85 96 C98 122 126 118 132 94 C112 94 98 96 85 96 Z"
          fill="#FFD200"
          stroke="#2B2B2B"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Main Body (Disc shape - Yellow Base) */}
        <path
          d="M32 65 C32 36 65 24 95 24 C132 24 154 44 154 65 C154 86 132 106 95 106 C65 106 32 94 32 65 Z"
          fill="#FFD200"
          stroke="#2B2B2B"
          strokeWidth="4.5"
        />

        {/* Characteristic Black Butterflyfish Stripes */}
        <path
          d="M68 28 C80 42 82 88 68 102 C78 100 88 94 88 84 C80 62 80 46 88 44 C88 34 78 30 68 28 Z"
          fill="#2B2B2B"
          stroke="#2B2B2B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M102 26 C114 40 116 88 102 104 C112 102 120 94 120 82 C112 60 112 44 120 42 C120 32 112 28 102 26 Z"
          fill="#2B2B2B"
          stroke="#2B2B2B"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Black Eye Mask Stripe */}
        <path
          d="M130 30 C138 42 138 88 128 100 C134 96 142 88 142 80 C136 60 136 48 142 44 C142 36 134 32 130 30 Z"
          fill="#2B2B2B"
          stroke="#2B2B2B"
          strokeWidth="2"
        />

        {/* Big Sparkling Eye */}
        <circle cx="136" cy="56" r="11" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="3.5" />
        <circle cx="138" cy="55" r="7" fill="#1CB0F6" />
        <circle cx="140" cy="52" r="3" fill="#FFFFFF" />
        <circle cx="135" cy="58" r="1.5" fill="#FFFFFF" />

        {/* Side Fin */}
        <g className="animate-tail">
          <ellipse
            cx="108"
            cy="70"
            rx="16"
            ry="11"
            transform="rotate(-15 108 70)"
            fill="#FFFFFF"
            stroke="#2B2B2B"
            strokeWidth="3.5"
          />
          <path
            d="M102 68 L116 72"
            stroke="#FFD200"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* Rosy Blush */}
        <ellipse cx="128" cy="74" rx="7" ry="4" fill="#FF5252" fillOpacity="0.75" />

        {/* Lv.3 Sparkle Badge Crown */}
        <path
          d="M140 26 L143 32 L149 32 L144 36 L146 42 L140 38 L134 42 L136 36 L131 32 L137 32 Z"
          fill="#FFC800"
          stroke="#B45309"
          strokeWidth="1.5"
        />

        {/* Mouth */}
        {isEating ? (
          <ellipse cx="152" cy="68" rx="4" ry="5" fill="#2B2B2B" />
        ) : (
          <path
            d="M150 64 C150 68 146 70 142 69"
            stroke="#2B2B2B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};

// ==========================================
// 3. 蓝倒吊「蓝蓝」 (Blue Tang Lanlan - Low Vitality 灰暗低活力)
// ==========================================
export const LanlanBlueTang: React.FC<{
  className?: string;
  size?: number;
  onClick?: () => void;
  isFrozen?: boolean;
}> = ({ className = '', size = 66, onClick, isFrozen = false }) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer select-none transition-transform active:scale-95 opacity-80 ${className}`}
      style={{ width: size, height: size * 0.72 }}
    >
      {/* Optional Frozen Overlay */}
      {isFrozen && (
        <div className="absolute inset-0 bg-sky-200/60 backdrop-blur-[1px] rounded-full z-20 flex items-center justify-center pointer-events-none border border-sky-300">
          <span className="text-xs">❄️</span>
        </div>
      )}

      <svg
        viewBox="0 0 150 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Tail Fin (Muted Yellow/Gray) */}
        <path
          d="M26 55 C12 40 4 28 2 34 C0 42 12 52 12 55 C12 58 0 68 2 76 C4 82 12 70 26 55 Z"
          fill="#A3B8CC"
          stroke="#475569"
          strokeWidth="3.5"
        />

        {/* Dorsal Fin */}
        <path
          d="M60 22 C72 10 96 14 104 28 C90 28 75 25 60 22 Z"
          fill="#64748B"
          stroke="#475569"
          strokeWidth="3.5"
        />

        {/* Blue Tang Oval Body (Muted Low-Saturation Navy/Slate) */}
        <ellipse
          cx="78"
          cy="55"
          rx="52"
          ry="32"
          fill="#8DA4C4"
          stroke="#475569"
          strokeWidth="4"
        />

        {/* Tang Palette Black/Dark Swirl (Muted) */}
        <path
          d="M48 55 C48 38 72 32 94 38 C74 42 66 52 74 65 C82 78 104 74 94 82 C72 88 48 76 48 55 Z"
          fill="#475569"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Yellow Tang Wedge (Muted) */}
        <path
          d="M34 55 L58 42 L58 68 Z"
          fill="#CBD5E1"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Sleepy / Low Vitality Eye */}
        <ellipse cx="112" cy="48" rx="9" ry="9" fill="#F1F5F9" stroke="#475569" strokeWidth="3" />
        <line x1="104" y1="48" x2="120" y2="48" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

        {/* Sleepy Zzz */}
        <text x="124" y="32" fill="#64748B" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
          z
        </text>

        {/* Downturned Mouth */}
        <path d="M124 60 C122 61 118 61 116 60" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// ==========================================
// 4. 信使角色「波波」海马形象 (Bobo the Seahorse)
// 支持本体渐变/分段填色进度呈现 (0/3 灰度, 1/3 填色, 2/3 填色, 3/3 完全彩色+呼吸+金色光晕)
// ==========================================
export const BoboSeahorse: React.FC<{
  className?: string;
  size?: number;
  completedTasksCount?: number; // 0, 1, 2, 3
  isReadyToDispatch?: boolean;
  onClick?: () => void;
}> = ({
  className = '',
  size = 52,
  completedTasksCount = 1,
  isReadyToDispatch = false,
  onClick,
}) => {
  // Calculate fill percentage: 0 -> 0%, 1 -> 33.3%, 2 -> 66.7%, 3 -> 100%
  const clampedCount = Math.min(3, Math.max(0, completedTasksCount));
  const isFull = isReadyToDispatch || clampedCount >= 3;
  const fillPercentage = isFull ? 100 : (clampedCount / 3) * 100;

  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer select-none transition-all duration-300 ${
        isFull ? 'animate-bobo-breathe' : 'active:scale-95'
      } ${className}`}
      style={{ width: size, height: size * 1.15 }}
      title={
        isFull
          ? '波波信使（已集满能量，可派遣出发！）'
          : `波波信使（进度 ${clampedCount}/3）`
      }
    >
      {/* 3/3 满格金色发光光晕效果 */}
      {isFull && (
        <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-amber-400/50 via-yellow-300/60 to-amber-500/50 blur-[7px] animate-pulse pointer-events-none" />
      )}

      {/* Layer 1: 底层 100% 灰阶剪影图层 (无任务/未填充区域呈现灰色轮廓与明暗) */}
      <svg
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm opacity-60 filter grayscale contrast-90"
      >
        {/* Dorsal Fin */}
        <path
          d="M26 48 C16 42 16 62 26 66 Z"
          fill="#94A3B8"
          stroke="#475569"
          strokeWidth="3"
        />

        {/* Seahorse Snout & Head */}
        <path
          d="M48 24 C46 14 58 10 68 14 C78 18 84 28 80 38 C76 44 68 46 64 48 C60 56 62 70 54 82 C48 92 34 98 28 92 C24 86 28 78 36 78 C42 78 44 66 42 56 C40 44 40 32 48 24 Z"
          fill="#CBD5E1"
          stroke="#475569"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Snout tube */}
        <path
          d="M76 28 L94 30 C96 32 96 36 94 38 L78 38 Z"
          fill="#CBD5E1"
          stroke="#475569"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Curled Tail Tip */}
        <path
          d="M28 92 C22 96 16 90 20 84 C24 78 32 80 34 86"
          stroke="#475569"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Belly Plates */}
        <path
          d="M60 48 C56 56 56 70 50 78 C46 76 46 60 52 50 Z"
          fill="#94A3B8"
          stroke="#475569"
          strokeWidth="2.5"
        />
        <line x1="50" y1="56" x2="58" y2="54" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <line x1="47" y1="64" x2="55" y2="62" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
        <line x1="44" y1="72" x2="52" y2="70" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

        {/* Crown Crest on Head */}
        <path
          d="M52 14 L56 6 L62 12 L68 4 L72 14 Z"
          fill="#94A3B8"
          stroke="#475569"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Eye */}
        <circle cx="68" cy="26" r="7" fill="#F1F5F9" stroke="#475569" strokeWidth="2.5" />
        <circle cx="70" cy="25" r="4" fill="#334155" />
        <circle cx="72" cy="23" r="1.5" fill="#FFFFFF" />

        {/* Subtle Rosy Blush */}
        <ellipse cx="64" cy="36" rx="4" ry="2.5" fill="#94A3B8" fillOpacity="0.4" />
      </svg>

      {/* Layer 2: 顶层彩色图层 (使用垂直方向 inset 剪裁，自底向上呈现填色进度) */}
      {fillPercentage > 0 && (
        <div
          className="absolute inset-0 transition-all duration-500 ease-out pointer-events-none"
          style={{
            clipPath: `inset(${100 - fillPercentage}% 0 0 0)`,
          }}
        >
          <svg
            viewBox="0 0 100 115"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-md"
          >
            {/* Dorsal Fin (Mint Fluttering fin) */}
            <path
              d="M26 48 C16 42 16 62 26 66 Z"
              fill="#A7F3D0"
              stroke="#2B2B2B"
              strokeWidth="3"
            />

            {/* Seahorse Snout & Head (Sky Blue) */}
            <path
              d="M48 24 C46 14 58 10 68 14 C78 18 84 28 80 38 C76 44 68 46 64 48 C60 56 62 70 54 82 C48 92 34 98 28 92 C24 86 28 78 36 78 C42 78 44 66 42 56 C40 44 40 32 48 24 Z"
              fill="#38BDF8"
              stroke="#2B2B2B"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Snout tube */}
            <path
              d="M76 28 L94 30 C96 32 96 36 94 38 L78 38 Z"
              fill="#38BDF8"
              stroke="#2B2B2B"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Curled Tail Tip */}
            <path
              d="M28 92 C22 96 16 90 20 84 C24 78 32 80 34 86"
              stroke="#2B2B2B"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Mint Green Belly Plates */}
            <path
              d="M60 48 C56 56 56 70 50 78 C46 76 46 60 52 50 Z"
              fill="#A7F3D0"
              stroke="#2B2B2B"
              strokeWidth="2.5"
            />
            <line x1="50" y1="56" x2="58" y2="54" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round" />
            <line x1="47" y1="64" x2="55" y2="62" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round" />
            <line x1="44" y1="72" x2="52" y2="70" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round" />

            {/* Crown Crest on Head */}
            <path
              d="M52 14 L56 6 L62 12 L68 4 L72 14 Z"
              fill="#FDE047"
              stroke="#2B2B2B"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Big Cartoon Eye */}
            <circle cx="68" cy="26" r="7" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="2.5" />
            <circle cx="70" cy="25" r="4" fill="#0F172A" />
            <circle cx="72" cy="23" r="1.5" fill="#FFFFFF" />

            {/* Rosy Blush */}
            <ellipse cx="64" cy="36" rx="4" ry="2.5" fill="#FF5252" fillOpacity="0.75" />
          </svg>

          {/* 填充进度水平分割线 (类似上色进度条贴在角色轮廓内部) */}
          {fillPercentage > 0 && fillPercentage < 100 && (
            <div
              className="absolute left-1 right-1 h-[2px] bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.9)] pointer-events-none rounded-full"
              style={{
                top: `${100 - fillPercentage}%`,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 5. 漂流瓶插画 (Drift Bottle - Common Blue / Rare Purple / Legendary Gold)
// ==========================================
export const DriftBottleGraphic: React.FC<{
  rarity?: 'common' | 'rare' | 'legendary';
  className?: string;
  size?: number;
}> = ({ rarity = 'rare', className = '', size = 70 }) => {
  const getBottleFill = () => {
    switch (rarity) {
      case 'common':
        return {
          glass: '#38BDF8',
          glow: 'from-sky-300 to-blue-500',
          accent: '#0284C7',
          cork: '#B45309',
        };
      case 'legendary':
        return {
          glass: '#FBBF24',
          glow: 'from-amber-300 to-yellow-500',
          accent: '#D97706',
          cork: '#92400E',
        };
      case 'rare':
      default:
        return {
          glass: '#C084FC',
          glow: 'from-purple-300 to-fuchsia-500',
          accent: '#9333EA',
          cork: '#B45309',
        };
    }
  };

  const colors = getBottleFill();

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: size * 1.3 }}
    >
      <svg
        viewBox="0 0 80 105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Cork Stopper */}
        <path
          d="M32 6 L48 6 L46 16 L34 16 Z"
          fill={colors.cork}
          stroke="#2B2B2B"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Bottle Neck */}
        <path
          d="M30 16 L50 16 L50 26 L30 26 Z"
          fill={colors.glass}
          fillOpacity="0.85"
          stroke="#2B2B2B"
          strokeWidth="3"
        />

        {/* Bottle Body */}
        <path
          d="M30 26 C18 36 12 50 12 70 C12 88 22 98 40 98 C58 98 68 88 68 70 C68 50 62 36 50 26 Z"
          fill={colors.glass}
          fillOpacity="0.85"
          stroke="#2B2B2B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Rolled Letter / Parchment inside */}
        <rect
          x="30"
          y="50"
          width="20"
          height="32"
          rx="4"
          fill="#FEF08A"
          stroke="#2B2B2B"
          strokeWidth="2"
          transform="rotate(-8 40 66)"
        />
        <line
          x1="32"
          y1="60"
          x2="46"
          y2="58"
          stroke="#CA8A04"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="33"
          y1="68"
          x2="45"
          y2="66"
          stroke="#CA8A04"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Glass Highlight Sheen */}
        <path
          d="M20 54 C18 64 20 82 30 90"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// ==========================================
// 5. 治愈鮟鱇鱼「安安 / 灯灯」 (Healing Anglerfish - 3D Q版粘土治愈系伴侣)
// ==========================================
export const HealingAnglerfish: React.FC<{
  className?: string;
  size?: number;
  onClick?: () => void;
  isEating?: boolean;
}> = ({ className = '', size = 88, onClick, isEating = false }) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer select-none transition-transform active:scale-95 ${className}`}
      style={{ width: size, height: size * 0.85 }}
    >
      {/* 暖金关怀微光光晕 (Golden Healing Ambient Glow from the Lantern) */}
      <div className="absolute -top-3.5 right-1 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300/40 via-yellow-200/50 to-amber-400/20 blur-md animate-pulse pointer-events-none" />

      {/* SVG 3D Q版粘土硅胶质感鮟鱇鱼 */}
      <svg
        viewBox="0 0 160 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          {/* 莫兰迪灰紫渐变 (Dusty Lavender / Morandi Navy Grey) */}
          <linearGradient id="anglerBodyGrad" x1="20" y1="30" x2="140" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A8A3BA" />
            <stop offset="60%" stopColor="#8C859F" />
            <stop offset="100%" stopColor="#756E88" />
          </linearGradient>

          {/* 软淡粉暖米色腹部 (Soft Peach/Warm Beige Belly) */}
          <linearGradient id="anglerBellyGrad" x1="70" y1="70" x2="130" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF0E6" />
            <stop offset="100%" stopColor="#FCD5CE" />
          </linearGradient>

          {/* 半透明软鳍渐变 */}
          <linearGradient id="anglerFinGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4CFE2" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#9C95B0" stopOpacity="0.65" />
          </linearGradient>

          {/* 暖金灯笼光芒径向渐变 */}
          <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        {/* 尾鳍 (半透明软体质感，轻柔摇摆动效) */}
        <g className="animate-tail">
          <path
            d="M32 72 C14 55 4 44 2 50 C0 58 14 70 14 74 C14 78 0 90 2 98 C4 104 14 93 32 76 Z"
            fill="url(#anglerFinGrad)"
            stroke="#5D576E"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* 尾鳍软光条纹 */}
          <path
            d="M12 62 C10 66 10 82 12 86"
            stroke="#FFFFFF"
            strokeOpacity="0.6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>

        {/* 背鳍 (柔和圆润软体小鳍) */}
        <path
          d="M62 42 C72 26 92 28 98 42 C85 42 72 42 62 42 Z"
          fill="url(#anglerFinGrad)"
          stroke="#5D576E"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 腹鳍 (圆润软体小底鳍) */}
        <path
          d="M74 102 C84 114 98 112 102 100 C92 100 82 102 74 102 Z"
          fill="url(#anglerFinGrad)"
          stroke="#5D576E"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 主体圆滚滚胖嘟嘟球形身体 */}
        <ellipse
          cx="88"
          cy="74"
          rx="52"
          ry="40"
          fill="url(#anglerBodyGrad)"
          stroke="#5D576E"
          strokeWidth="4"
        />

        {/* 身体顶部立体高光 (模拟3D粘土硅胶质感) */}
        <ellipse
          cx="78"
          cy="48"
          rx="26"
          ry="10"
          fill="#FFFFFF"
          fillOpacity="0.25"
          transform="rotate(-10 78 48)"
        />

        {/* 软淡粉暖米色腹部 */}
        <path
          d="M62 82 C68 102 96 112 122 98 C126 94 130 86 130 80 C112 90 84 88 62 82 Z"
          fill="url(#anglerBellyGrad)"
          stroke="#5D576E"
          strokeWidth="2"
        />

        {/* 侧面半透明软体胸鳍 (Pectoral Fin) */}
        <g className={isEating ? 'animate-spin' : 'animate-tail'}>
          <ellipse
            cx="94"
            cy="82"
            rx="15"
            ry="10"
            transform="rotate(-15 94 82)"
            fill="url(#anglerFinGrad)"
            stroke="#5D576E"
            strokeWidth="3"
          />
          <path
            d="M90 80 L102 84"
            stroke="#FFFFFF"
            strokeOpacity="0.6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* 治愈系憨态大眼 (温和黑亮大圆眼 + 柔光高光) */}
        <circle cx="120" cy="62" r="10" fill="#FFFFFF" stroke="#5D576E" strokeWidth="3.5" />
        <circle cx="122" cy="61" r="6" fill="#2E283E" />
        <circle cx="124.5" cy="58.5" r="2.5" fill="#FFFFFF" />
        <circle cx="120" cy="63.5" r="1" fill="#FFFFFF" />

        {/* 软萌粉嫩腮红 */}
        <ellipse cx="112" cy="78" rx="6" ry="3.5" fill="#FF9AA2" fillOpacity="0.8" />

        {/* 微张呆萌小嘴 (去凶猛化，圆润微张无牙齿) */}
        {isEating ? (
          <ellipse cx="138" cy="74" rx="4.5" ry="5.5" fill="#3D3452" stroke="#5D576E" strokeWidth="2" />
        ) : (
          <path
            d="M136 71 C136 76 130 78 126 75"
            stroke="#4A425F"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}

        {/* 【核心亮点】：头顶柔和弯曲小触角 (Antenna) */}
        <path
          d="M86 40 C84 20 106 14 122 18 C128 19 133 22 134 26"
          stroke="#5D576E"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* 暖金色发光小灯笼悬挂连接点 */}
        <line x1="134" y1="26" x2="134" y2="30" stroke="#5D576E" strokeWidth="2.5" strokeLinecap="round" />

        {/* 暖金色微光透明气泡小灯笼 (Glowing Warm Golden Lantern) */}
        <g className="animate-pulse">
          {/* 外圈光晕 */}
          <circle cx="134" cy="36" r="12" fill="#FEF08A" fillOpacity="0.35" />
          {/* 灯笼晶体核心 */}
          <circle
            cx="134"
            cy="36"
            r="7.5"
            fill="url(#lanternGlow)"
            stroke="#D97706"
            strokeWidth="1.5"
            className="drop-shadow-sm"
          />
          {/* 气泡高光反光点 */}
          <circle cx="132" cy="33.5" r="2" fill="#FFFFFF" fillOpacity="0.9" />
        </g>
      </svg>
    </div>
  );
};

// ==========================================
// 6. 发光水母「悠悠」 (Bioluminescent Glowing Jellyfish - 半透明伞状轻盈浮动)
// ==========================================
export const GlowingJellyfish: React.FC<{
  className?: string;
  size?: number;
  colorScheme?: 'violet' | 'cyan' | 'peach';
}> = ({ className = '', size = 42, colorScheme = 'violet' }) => {
  const gradId = `jellyGrad_${colorScheme}`;
  const glowId = `jellyGlow_${colorScheme}`;

  const colors = {
    violet: {
      bellTop: '#D8B4FE',
      bellBottom: '#A855F7',
      core: '#C084FC',
      tentacles: '#E9D5FF',
      glow: '#C084FC',
    },
    cyan: {
      bellTop: '#7DD3FC',
      bellBottom: '#0284C7',
      core: '#38BDF8',
      tentacles: '#BAE6FD',
      glow: '#38BDF8',
    },
    peach: {
      bellTop: '#FBCFE8',
      bellBottom: '#EC4899',
      core: '#F472B6',
      tentacles: '#FCE7F3',
      glow: '#F472B6',
    },
  }[colorScheme];

  return (
    <div
      className={`relative inline-block pointer-events-none select-none ${className}`}
      style={{ width: size, height: size * 1.35 }}
    >
      {/* Outer ambient bioluminescent pulse glow */}
      <div
        className="absolute inset-0 rounded-full blur-sm opacity-60 animate-pulse"
        style={{ background: colors.glow }}
      />

      <svg
        viewBox="0 0 100 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id={gradId} x1="50" y1="10" x2="50" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={colors.bellTop} stopOpacity="0.85" />
            <stop offset="60%" stopColor={colors.bellBottom} stopOpacity="0.65" />
            <stop offset="100%" stopColor={colors.core} stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id={glowId} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="60%" stopColor={colors.core} stopOpacity="0.7" />
            <stop offset="100%" stopColor={colors.bellBottom} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Jellyfish Bell Dome (伞盖) */}
        <path
          d="M15 52 C15 20 32 10 50 10 C68 10 85 20 85 52 C85 58 80 62 72 60 C64 58 58 64 50 62 C42 60 36 64 28 60 C20 58 15 56 15 52 Z"
          fill={`url(#${gradId})`}
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />

        {/* Glowing inner organ core */}
        <ellipse cx="50" cy="38" rx="18" ry="12" fill={`url(#${glowId})`} />

        {/* Bell rim highlight fringe */}
        <path
          d="M22 55 Q35 62 50 58 Q65 62 78 55"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeOpacity="0.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Soft bioluminescent tentacles (柔美触须) */}
        <g className="animate-seaweed-1" style={{ transformOrigin: '50px 60px' }}>
          {/* Main center tentacle */}
          <path
            d="M50 62 C46 80 54 98 48 125 C45 130 52 135 50 135"
            stroke={colors.tentacles}
            strokeWidth="2"
            strokeOpacity="0.75"
            strokeLinecap="round"
          />
          {/* Left flowing tentacle */}
          <path
            d="M36 60 C30 78 40 98 32 118 C28 126 34 130 30 132"
            stroke={colors.tentacles}
            strokeWidth="1.5"
            strokeOpacity="0.65"
            strokeLinecap="round"
          />
          {/* Right flowing tentacle */}
          <path
            d="M64 60 C70 78 60 98 68 118 C72 126 66 130 70 132"
            stroke={colors.tentacles}
            strokeWidth="1.5"
            strokeOpacity="0.65"
            strokeLinecap="round"
          />
          {/* Thin sensory filaments */}
          <path
            d="M28 58 Q20 85 24 110"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.5"
            strokeDasharray="2 2"
          />
          <path
            d="M72 58 Q80 85 76 110"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.5"
            strokeDasharray="2 2"
          />
        </g>
      </svg>
    </div>
  );
};

// ==========================================
// 7. Seaweed Decor
// ==========================================
export const SeaweedDecor: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#10B981',
}) => {
  return (
    <svg
      viewBox="0 0 60 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-12 h-28 pointer-events-none ${className}`}
    >
      <path
        d="M28 140 C14 110 42 90 20 60 C8 40 34 20 28 0 C38 20 18 40 32 65 C48 95 24 115 32 140 Z"
        fill={color}
        fillOpacity="0.75"
      />
      <path
        d="M38 140 C28 120 46 100 36 78 C28 60 44 40 40 25 C46 40 34 58 44 80 C54 104 36 122 42 140 Z"
        fill={color}
        fillOpacity="0.55"
      />
    </svg>
  );
};
