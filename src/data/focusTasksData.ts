export interface FocusTaskItem {
  id: string;
  slotIndex: 0 | 1 | 2;
  categoryName: string;
  title: string;
  subtitle: string;
  duration: string;
  targetProgress: number;
  currentProgress: number;
  unit: string;
  calories?: string;
  rewardBait: number;
  iconType: 'dumbbell' | 'running' | 'hiit' | 'core' | 'wind' | 'stretch' | 'sleep' | 'neck' | 'smile' | 'water' | 'sun' | 'footprints';
  color: string;
  bgLight: string;
  badgeTag: string;
  hrZone: string;
  difficulty: '极简' | '轻松' | '中等' | '较高';
  whyRecommended: string;
  instructions: {
    title: string;
    description: string;
  }[];
  tips: string[];
  benefits: string[];
}

export const FOCUS_TASK_POOLS: Record<0 | 1 | 2, FocusTaskItem[]> = {
  // Slot 0: 动态激活与步数下肢练习
  0: [
    {
      id: 'fast-walk-15m',
      slotIndex: 0,
      categoryName: '活力激活 · 步数微运动',
      title: '快走 15 分钟',
      subtitle: '唤醒身体，激活循环',
      duration: '15分钟',
      targetProgress: 15,
      currentProgress: 0,
      unit: '分钟',
      calories: '75 kcal',
      rewardBait: 15,
      iconType: 'footprints',
      color: '#FF8600',
      bgLight: '#FFF4E5',
      badgeTag: '激活循环',
      hrZone: '100 - 120 bpm (轻度有氧)',
      difficulty: '极简',
      whyRecommended: '轻快步伐能迅速加速下肢血液微循环回流，刺激多巴胺分泌，有效驱散久坐疲惫感。',
      instructions: [
        {
          title: '1. 自然挺胸迈步 (5 分钟)',
          description: '双臂自然弯曲随步伐前后摆动，脚跟先着地平滑过渡到脚尖。',
        },
        {
          title: '2. 节奏提速快走 (8 分钟)',
          description: '微幅加快步频，保持呼吸深长，感受背部微热与身体复苏。',
        },
        {
          title: '3. 放慢步调平稳呼吸 (2 分钟)',
          description: '缓慢慢走，平复心率，调整正常呼吸节律。',
        },
      ],
      tips: [
        '保持目视前方，避免低头看手机。',
        '配合深长呼吸，充分给大脑充氧。',
      ],
      benefits: [
        '迅速唤醒身体能量，提高工作效率',
        '改善久坐引起的下肢循环不畅',
      ],
    },
    {
      id: 'stair-climbing-3f',
      slotIndex: 0,
      categoryName: '力量刺激 · 下肢强化',
      title: '爬楼梯练习 · 3 层',
      subtitle: '强化下肢力量',
      duration: '3层',
      targetProgress: 3,
      currentProgress: 0,
      unit: '层',
      calories: '45 kcal',
      rewardBait: 15,
      iconType: 'dumbbell',
      color: '#FF4B4B',
      bgLight: '#FFEAEA',
      badgeTag: '下肢强化',
      hrZone: '110 - 130 bpm (中度刺激)',
      difficulty: '轻松',
      whyRecommended: '上下楼梯能够有效激活臀大肌与股四头肌，增强膝关节支撑韧带力量。',
      instructions: [
        {
          title: '1. 全脚掌踩实台阶',
          description: '后脚跟踩稳台阶，利用臀部和腿后侧发力推起身体，身体稍前倾。',
        },
        {
          title: '2. 匀速平稳登阶',
          description: '保持匀速呼吸，发力时呼气，步幅平缓稳定。',
        },
      ],
      tips: [
        '膝关节方向与脚尖一致，避免内扣。',
      ],
      benefits: [
        '紧致臀腿肌肉线条',
        '提升日常运动耐力与关节稳定性',
      ],
    },
    {
      id: 'outdoor-walk-10m',
      slotIndex: 0,
      categoryName: '户外自然 · 阳光漫步',
      title: '户外散步 · 10 分钟',
      subtitle: '晒晒太阳，换个心情',
      duration: '10分钟',
      targetProgress: 10,
      currentProgress: 0,
      unit: '分钟',
      calories: '40 kcal',
      rewardBait: 15,
      iconType: 'sun',
      color: '#EAB308',
      bgLight: '#FEF9C3',
      badgeTag: '情绪重置',
      hrZone: '日常轻松状态',
      difficulty: '极简',
      whyRecommended: '日间自然光照能促进血清素合成，帮助校准褪黑素节律，带来轻松明朗好心情。',
      instructions: [
        {
          title: '1. 沐浴自然阳光',
          description: '走到户外开阔空间，感受自然光线与微风。',
        },
        {
          title: '2. 随意漫步观察周围',
          description: '放松双眼远眺，让紧绷的思绪彻底抽离。',
        },
      ],
      tips: [
        '尽量不看手机屏幕，放松睫状肌。',
      ],
      benefits: [
        '缓解视疲劳与心理压力',
        '自然光照校准昼夜节律',
      ],
    },
  ],

  // Slot 1: 肌肉放松与呼吸调节
  1: [
    {
      id: 'stretch-5m',
      slotIndex: 1,
      categoryName: '肌肉舒缓 · 筋膜解压',
      title: '拉伸 5 分钟',
      subtitle: '放松肌肉，缓解僵硬',
      duration: '5分钟',
      targetProgress: 5,
      currentProgress: 0,
      unit: '分钟',
      calories: '20 kcal',
      rewardBait: 10,
      iconType: 'stretch',
      color: '#10B981',
      bgLight: '#ECFDF5',
      badgeTag: '筋膜解压',
      hrZone: '舒缓放松',
      difficulty: '极简',
      whyRecommended: '温和的静态拉伸能舒缓肌纤维张力，增加关节滑液循环，快速缓解久坐身体僵硬。',
      instructions: [
        {
          title: '1. 上肢与侧腰延展 (2 分钟)',
          description: '十指交叉反掌向上推起，身体分别向左右缓慢侧倾，感受腋下与侧肋充分拉长。',
        },
        {
          title: '2. 髋屈肌与腿后侧舒缓 (3 分钟)',
          description: '弓步下沉伸展髋部，随后勾起前脚尖双手触碰脚踝，感受大腿后侧温和延展。',
        },
      ],
      tips: [
        '每个拉伸动作保持深长呼吸，避免憋气。',
      ],
      benefits: [
        '释放全身僵硬感与肌肉酸痛',
        '改善血液微循环，使身体轻盈舒畅',
      ],
    },
    {
      id: 'deep-breathing-2m',
      slotIndex: 1,
      categoryName: '身心静心 · 呼吸调节',
      title: '原地深呼吸 · 2 分钟',
      subtitle: '平复心率，放松身心',
      duration: '2分钟',
      targetProgress: 2,
      currentProgress: 0,
      unit: '分钟',
      calories: '10 kcal',
      rewardBait: 10,
      iconType: 'wind',
      color: '#007AFF',
      bgLight: '#E0F2FE',
      badgeTag: '心率平复',
      hrZone: '60 - 75 bpm (静息放松)',
      difficulty: '极简',
      whyRecommended: '缓慢腹式呼吸能直接激活副交感神经，使心跳节律迅速趋于平缓稳定。',
      instructions: [
        {
          title: '1. 4 秒缓慢鼻吸气',
          description: '双肩放松下沉，吸气时感受腹部轻微隆起。',
        },
        {
          title: '2. 6 秒平稳嘴呼气',
          description: '轻柔吐出所有气息，感受压力随呼气消散。',
        },
      ],
      tips: [
        '可以闭上双眼，专注体会空气在鼻腔流动的清凉感。',
      ],
      benefits: [
        '迅速缓解急性焦虑与紧绷感',
        '提高副交感神经张力，让心绪归于平静',
      ],
    },
    {
      id: 'neck-stretch-5m',
      slotIndex: 1,
      categoryName: '办公久坐 · 肩颈舒缓',
      title: '简单拉伸操 · 5 分钟',
      subtitle: '唤醒僵硬的肩颈',
      duration: '5分钟',
      targetProgress: 5,
      currentProgress: 0,
      unit: '分钟',
      calories: '20 kcal',
      rewardBait: 10,
      iconType: 'neck',
      color: '#8B5CF6',
      bgLight: '#F3E8FF',
      badgeTag: '肩颈舒缓',
      hrZone: '舒缓放松',
      difficulty: '极简',
      whyRecommended: '久坐低头容易造成斜方肌与深层颈屈肌疲劳，简单的轻度拉伸即可快速疏通经络。',
      instructions: [
        {
          title: '1. 缓慢侧屈与仰望 (2 分钟)',
          description: '头部缓慢向右倾斜，左肩主动下沉，感受左颈拉伸；换侧重复。',
        },
        {
          title: '2. 双肩画圈环绕 (3 分钟)',
          description: '由前向后大范围转动双肩，夹紧肩胛骨，舒展胸廓。',
        },
      ],
      tips: [
        '颈部动作务必轻柔缓慢，严禁猛烈用力晃动。',
      ],
      benefits: [
        '消除头颈沉重酸胀感',
        '改善头部供血与供氧',
      ],
    },
  ],

  // Slot 2: 占位保持类型兼容
  2: [
    {
      id: 'relax-placeholder',
      slotIndex: 2,
      categoryName: '健康习惯',
      title: '身心微习惯',
      subtitle: '保持良好生活节律',
      duration: '5分钟',
      targetProgress: 5,
      currentProgress: 0,
      unit: '分钟',
      rewardBait: 5,
      iconType: 'smile',
      color: '#FF9500',
      bgLight: '#FFF4E5',
      badgeTag: '健康习惯',
      hrZone: '日常自然状态',
      difficulty: '极简',
      whyRecommended: '保持稳定的微习惯有利于长期身心健康。',
      instructions: [],
      tips: [],
      benefits: [],
    },
  ],
};
