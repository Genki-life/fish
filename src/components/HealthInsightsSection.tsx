import React, { useState } from 'react';
import { Bed, Heart, Flame, X, ShieldCheck } from 'lucide-react';

interface MetricDetailData {
  id: 'sleep' | 'hrv' | 'activity';
  title: string;
  value: string;
  unit: string;
  referenceText: string;
  iconBg: string;
  advice: string;
  breakdown: { label: string; value: string; desc: string }[];
}

interface HealthInsightsSectionProps {
  isNightMode?: boolean;
}

export const HealthInsightsSection: React.FC<HealthInsightsSectionProps> = ({
  isNightMode = false,
}) => {
  const [activeMetric, setActiveMetric] = useState<MetricDetailData | null>(null);

  const metricDetails: Record<'sleep' | 'hrv' | 'activity', MetricDetailData> = {
    sleep: {
      id: 'sleep',
      title: '睡眠结构分析',
      value: '6.5',
      unit: 'hrs',
      referenceText: '基线目标 7.5h',
      iconBg: 'bg-[#AF52DE]',
      advice:
        '昨夜深睡比例良好（1.4h），但总时长略低于基准目标 1 小时。建议今晚适度提早就寝。',
      breakdown: [
        { label: '深睡 (Deep Sleep)', value: '1.4h (22%)', desc: '用于机体与肌肉修复' },
        { label: '浅睡 & REM', value: '5.1h (78%)', desc: '脑力与情绪记忆重整' },
        { label: '入睡潜伏期', value: '14 mins', desc: '入睡迅速，神经放松良好' },
      ],
    },
    hrv: {
      id: 'hrv',
      title: '心率变异性解读',
      value: '42',
      unit: 'ms',
      referenceText: '较昨日 +5ms · 基线舒畅',
      iconBg: 'bg-[#FF2D55]',
      advice:
        '自主神经系统处于平衡舒畅的黄金恢复区，身体已准备好承接适量力量训练或中低强度有氧。',
      breakdown: [
        { label: '自适应基线区间', value: '35 - 50 ms', desc: '7天个人健康舒适带' },
        { label: '静息心率', value: '58 bpm', desc: '晨起心率平稳舒缓' },
        { label: '准备度评分', value: '88/100', desc: '身体恢复状态充沛' },
      ],
    },
    activity: {
      id: 'activity',
      title: '今日耗力建议',
      value: '520',
      unit: 'kcal',
      referenceText: '适度区间 450 - 600 kcal',
      iconBg: 'bg-[#FF9500]',
      advice:
        '已消耗 520 kcal，处于建议的适度耗力区间。无需过度加练，配合今日计划即可达成健康平衡。',
      breakdown: [
        { label: '当前已消耗', value: '520 kcal', desc: '完成建议适度带的 86%' },
        { label: '建议负荷区间', value: '450 - 600 kcal', desc: '避免过度疲劳的最佳耗力带' },
        { label: '步数统计', value: '7,430 步', desc: '日常体能维持良好' },
      ],
    },
  };

  return (
    <div id="health-data-interpretation-module" className="w-full space-y-2.5">
      {/* ================= 1. 模块 Header ================= */}
      <div className="flex items-center justify-between px-1">
        <h2
          className={`text-[16px] font-bold tracking-tight transition-colors duration-500 ${
            isNightMode ? 'text-slate-100' : 'text-slate-900'
          }`}
        >
          健康洞察
        </h2>
        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
          实时体征同步
        </span>
      </div>

      {/* ================= 2. 三张数据卡片（Apple Health 纯色不透明卡片） ================= */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* ---------------- CARD 1: 睡眠 (紫色底+白色床图标) ---------------- */}
        <div
          id="metric-card-sleep"
          onClick={() => setActiveMetric(metricDetails.sleep)}
          className={`apple-solid-card rounded-[22px] p-3 flex flex-col justify-between transition-all duration-300 cursor-pointer group h-[112px] ${
            isNightMode ? 'apple-solid-card-dark' : 'bg-[#FCFCFC]'
          }`}
          style={{
            boxShadow: isNightMode ? '0 6px 20px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* [顶层]：纯色圆角方形徽标 (12px, 44x44px 比例适配) + 白色线性图标 + 标题“睡眠” */}
          <div className="flex items-center gap-2">
            <div className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] rounded-[12px] bg-[#AF52DE] flex items-center justify-center shrink-0 shadow-xs">
              <Bed className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.2]" />
            </div>
            <span
              className={`text-[12.5px] font-bold transition-colors duration-500 ${
                isNightMode ? 'text-slate-200' : 'text-slate-700'
              }`}
            >
              睡眠
            </span>
          </div>

          {/* [中层]：大字数值“6h 30m” */}
          <div className="flex items-baseline gap-0.5 my-auto">
            <span
              className={`text-[20px] sm:text-[23px] font-black leading-none tracking-tight transition-colors duration-500 ${
                isNightMode ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              6
            </span>
            <span
              className={`text-[10px] font-medium leading-none mr-0.5 transition-colors duration-500 ${
                isNightMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              h
            </span>
            <span
              className={`text-[20px] sm:text-[23px] font-black leading-none tracking-tight transition-colors duration-500 ${
                isNightMode ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              30
            </span>
            <span
              className={`text-[10px] font-medium leading-none transition-colors duration-500 ${
                isNightMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              m
            </span>
          </div>

          {/* [底层]：Apple 风格分段条 */}
          <div
            className={`w-full h-1.5 rounded-full flex overflow-hidden gap-0.5 transition-colors duration-500 ${
              isNightMode ? 'bg-white/10' : 'bg-black/5'
            }`}
          >
            {/* 深睡 */}
            <div
              className="h-full bg-[#AF52DE] rounded-l-full"
              style={{ width: '22%' }}
              title="深睡 1.4h"
            />
            {/* 浅睡 */}
            <div
              className="h-full bg-[#C77DFF] rounded-r-full"
              style={{ width: '65%' }}
              title="浅睡 5.1h"
            />
          </div>
        </div>

        {/* ---------------- CARD 2: 心率变异性 HRV (红色底+白色心形图标) ---------------- */}
        <div
          id="metric-card-hrv"
          onClick={() => setActiveMetric(metricDetails.hrv)}
          className={`apple-solid-card rounded-[22px] p-3 flex flex-col justify-between transition-all duration-300 cursor-pointer group h-[112px] ${
            isNightMode ? 'apple-solid-card-dark' : 'bg-[#FCFCFC]'
          }`}
          style={{
            boxShadow: isNightMode ? '0 6px 20px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* [顶层]：纯色圆角方形徽标 (12px) + 白色线性图标 + 标题“HRV” */}
          <div className="flex items-center gap-2">
            <div className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] rounded-[12px] bg-[#FF2D55] flex items-center justify-center shrink-0 shadow-xs">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.2]" />
            </div>
            <span
              className={`text-[12.5px] font-bold transition-colors duration-500 ${
                isNightMode ? 'text-slate-200' : 'text-slate-700'
              }`}
            >
              HRV
            </span>
          </div>

          {/* [中层]：大字数值“42 ms” */}
          <div className="flex items-baseline gap-1 my-auto">
            <span
              className={`text-[20px] sm:text-[23px] font-black leading-none tracking-tight transition-colors duration-500 ${
                isNightMode ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              42
            </span>
            <span
              className={`text-[10px] font-medium leading-none transition-colors duration-500 ${
                isNightMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              ms
            </span>
            <span className="text-[11px] font-bold text-[#34C759] leading-none ml-0.5" title="较昨日上升">
              ↑
            </span>
          </div>

          {/* [底层]：Apple 风格游标线 */}
          <div className="relative w-full h-1.5 flex items-center">
            {/* 背景底线 */}
            <div
              className={`w-full h-1 rounded-full transition-colors duration-500 ${
                isNightMode ? 'bg-white/10' : 'bg-black/5'
              }`}
            />

            {/* 适宜区间带 (35-50ms) */}
            <div
              className={`absolute h-1.5 rounded-full ${
                isNightMode ? 'bg-emerald-500/40' : 'bg-emerald-200'
              }`}
              style={{ left: '28%', width: '52%' }}
            />

            {/* 游标圆点 */}
            <div
              className="absolute w-2.5 h-2.5 rounded-full bg-[#FF2D55] border-2 border-white shadow-xs"
              style={{ left: '58%', transform: 'translateX(-50%)' }}
            />
          </div>
        </div>

        {/* ---------------- CARD 3: 耗力 ACT (橙色底+白色火焰图标) ---------------- */}
        <div
          id="metric-card-activity"
          onClick={() => setActiveMetric(metricDetails.activity)}
          className={`apple-solid-card rounded-[22px] p-3 flex flex-col justify-between transition-all duration-300 cursor-pointer group h-[112px] ${
            isNightMode ? 'apple-solid-card-dark' : 'bg-[#FCFCFC]'
          }`}
          style={{
            boxShadow: isNightMode ? '0 6px 20px rgba(0,0,0,0.35)' : '0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* [顶层]：纯色圆角方形徽标 (12px) + 白色线性图标 + 标题“耗力” */}
          <div className="flex items-center gap-2">
            <div className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] rounded-[12px] bg-[#FF9500] flex items-center justify-center shrink-0 shadow-xs">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.2]" />
            </div>
            <span
              className={`text-[12.5px] font-bold transition-colors duration-500 ${
                isNightMode ? 'text-slate-200' : 'text-slate-700'
              }`}
            >
              耗力
            </span>
          </div>

          {/* [中层]：大字数值“520 kcal” */}
          <div className="flex items-baseline gap-1 my-auto">
            <span
              className={`text-[20px] sm:text-[23px] font-black leading-none tracking-tight transition-colors duration-500 ${
                isNightMode ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              520
            </span>
            <span
              className={`text-[10px] font-medium leading-none transition-colors duration-500 ${
                isNightMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              kcal
            </span>
            <span
              className={`text-[10px] font-medium leading-none ml-0.5 transition-colors duration-500 ${
                isNightMode ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              / 600
            </span>
          </div>

          {/* [底层]：Apple 风格进度条 */}
          <div
            className={`w-full h-1.5 rounded-full overflow-hidden transition-colors duration-500 ${
              isNightMode ? 'bg-white/10' : 'bg-black/5'
            }`}
          >
            <div
              className="h-full rounded-full bg-[#FF9500] transition-all"
              style={{ width: '86%' }}
            />
          </div>
        </div>
      </div>

      {/* ================= 4. 指标深度解读弹窗 (Apple Health Solid Modal) ================= */}
      {activeMetric && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-fadeIn">
          <div
            className={`rounded-[28px] p-5 w-full max-w-xs border shadow-2xl space-y-4 animate-scaleUp transition-colors duration-500 ${
              isNightMode
                ? 'bg-[#121B30] border-white/15 text-slate-100'
                : 'bg-white border-slate-100 text-slate-800'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-[44px] h-[44px] rounded-[12px] flex items-center justify-center shadow-xs shrink-0 ${activeMetric.iconBg}`}
                >
                  {activeMetric.id === 'sleep' && <Bed className="w-5 h-5 text-white stroke-[2.2]" />}
                  {activeMetric.id === 'hrv' && <Heart className="w-5 h-5 text-white stroke-[2.2]" />}
                  {activeMetric.id === 'activity' && <Flame className="w-5 h-5 text-white stroke-[2.2]" />}
                </div>
                <div>
                  <h4
                    className={`text-[15px] font-bold ${
                      isNightMode ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {activeMetric.title}
                  </h4>
                  <p className={`text-[11px] font-medium ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {activeMetric.referenceText}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveMetric(null)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isNightMode
                    ? 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            {/* Numerical Highlight */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between transition-colors duration-500 ${
                isNightMode
                  ? 'bg-white/5 border-white/10'
                  : 'bg-slate-50/90 border-slate-100'
              }`}
            >
              <span className={`text-[13px] font-semibold ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                今日测量值
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-[44px] sm:text-[50px] font-black tracking-tight leading-none ${isNightMode ? 'text-slate-100' : 'text-slate-900'}`}>
                  {activeMetric.value}
                </span>
                <span className={`text-[15px] font-semibold ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {activeMetric.unit}
                </span>
              </div>
            </div>

            {/* AI Actionable Advice */}
            <div
              className={`p-3.5 rounded-2xl border text-[12px] leading-relaxed transition-colors duration-500 ${
                isNightMode
                  ? 'bg-sky-950/30 border-sky-500/20 text-sky-200'
                  : 'bg-sky-50/70 border-sky-100 text-sky-900'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#007AFF]" />
                <span>身心建议</span>
              </div>
              <p className="font-normal opacity-90">{activeMetric.advice}</p>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2 pt-1">
              <span className={`text-[11px] font-bold uppercase tracking-wider block ${isNightMode ? 'text-slate-400' : 'text-slate-400'}`}>
                结构详情
              </span>
              <div className="space-y-1.5">
                {activeMetric.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-[11.5px] transition-colors duration-500 ${
                      isNightMode
                        ? 'bg-white/5 border-white/5'
                        : 'bg-white border-slate-100 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className={`font-semibold ${isNightMode ? 'text-slate-200' : 'text-slate-800'}`}>
                        {item.label}
                      </div>
                      <div className={`text-[10px] mt-0.5 ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {item.desc}
                      </div>
                    </div>
                    <div className={`font-bold shrink-0 ml-2 ${isNightMode ? 'text-sky-400' : 'text-[#007AFF]'}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Close Button */}
            <button
              type="button"
              onClick={() => setActiveMetric(null)}
              className="w-full py-2.5 rounded-2xl bg-[#007AFF] text-white text-[13px] font-bold shadow-md hover:bg-sky-600 active:scale-98 transition-all cursor-pointer"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
