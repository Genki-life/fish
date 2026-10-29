export interface FishPetData {
  id: 'solo' | 'coop';
  name: string;
  species: string;
  avatarIcon: string;
  level: number;
  currentGrowth: number;
  maxGrowth: number;
  coopBadge?: string;
  glowColor: string;
}

export interface FishState {
  id: 'solo' | 'coop' | 'sluggish';
  name: string;
  partner?: string;
  level: number;
  xp: number;
  maxXp: number;
  status: 'healthy' | 'supercharged' | 'low_energy';
  color: string;
}

export interface FocusTask {
  id: string;
  category: 'exercise' | 'mindfulness' | 'mood';
  title: string;
  duration?: string;
  currentProgress?: number;
  targetProgress?: number;
  progressText?: string;
  source?: string;
  isCompleted?: boolean;
}

export interface HealthMetric {
  id: string;
  title: string;
  value: string;
  unit: string;
  barPercent: number;
  iconName: 'moon' | 'heart' | 'flame';
  color: string;
  insightTitle: string;
  insightDesc: string;
  statusTag: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  time: string;
  duration: string;
  calories?: string;
  icon: string;
  color: string;
}

export type TabType = 'home';
