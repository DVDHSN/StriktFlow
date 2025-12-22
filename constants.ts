
import { TimerSettings, AppTheme } from './types';

export const THEMES: AppTheme[] = [
  // All themes now use Graphite Focus base (#222222 bg, #303030 ui) with distinct accents
  { id: 'strikt-noir', name: 'Strikt Noir', background: '#222222', primary: '#E57373', secondary: '#E0E0E0', ui: '#303030', isDark: true },
  { id: 'obsidian-pulse', name: 'Obsidian Pulse', background: '#222222', primary: '#D32F2F', secondary: '#E0E0E0', ui: '#303030', isDark: true },
  { id: 'carbon-zen', name: 'Carbon Zen', background: '#222222', primary: '#66BB6A', secondary: '#E0E0E0', ui: '#303030', isDark: true },
  { id: 'slate-discipline', name: 'Slate Discipline', background: '#222222', primary: '#EF5350', secondary: '#E0E0E0', ui: '#303030', isDark: true },
  { id: 'midnight-signal', name: 'Midnight Signal', background: '#222222', primary: '#4FC3F7', secondary: '#E0E0E0', ui: '#303030', isDark: true },
  { id: 'graphite-focus', name: 'Graphite Focus', background: '#222222', primary: '#FFB74D', secondary: '#E0E0E0', ui: '#303030', isDark: true },
  { id: 'void-rhythm', name: 'Void Rhythm', background: '#222222', primary: '#9575CD', secondary: '#E0E0E0', ui: '#303030', isDark: true },
  { id: 'iron-tempo', name: 'Iron Tempo', background: '#222222', primary: '#FDD835', secondary: '#E0E0E0', ui: '#303030', isDark: true },
  { id: 'nightframe', name: 'Nightframe', background: '#222222', primary: '#4DB6AC', secondary: '#E0E0E0', ui: '#303030', isDark: true },
  { id: 'monolith-redline', name: 'Monolith Redline', background: '#222222', primary: '#F06292', secondary: '#E0E0E0', ui: '#303030', isDark: true },
  
  // Light variants are also shifted to a "Cool Graphite" light palette (#F2F2F2 bg, #EAEAEA ui)
  { id: 'ivory-focus', name: 'Ivory Focus', background: '#F2F2F2', primary: '#E57373', secondary: '#333333', ui: '#EAEAEA', isDark: false },
  { id: 'pearl-discipline', name: 'Pearl Discipline', background: '#F2F2F2', primary: '#EF5350', secondary: '#333333', ui: '#EAEAEA', isDark: false },
  { id: 'cloudline', name: 'Cloudline', background: '#F2F2F2', primary: '#64B5F6', secondary: '#333333', ui: '#EAEAEA', isDark: false },
  { id: 'alpine-signal', name: 'Alpine Signal', background: '#F2F2F2', primary: '#4FC3F7', secondary: '#333333', ui: '#EAEAEA', isDark: false },
  { id: 'sandstone', name: 'Sandstone', background: '#F2F2F2', primary: '#FFB74D', secondary: '#333333', ui: '#EAEAEA', isDark: false },
  { id: 'frostline', name: 'Frostline', background: '#F2F2F2', primary: '#4DB6AC', secondary: '#333333', ui: '#EAEAEA', isDark: false },
  { id: 'aurora-plain', name: 'Aurora Plain', background: '#F2F2F2', primary: '#9575CD', secondary: '#333333', ui: '#EAEAEA', isDark: false },
  { id: 'solar-crisp', name: 'Solar Crisp', background: '#F2F2F2', primary: '#FBC02D', secondary: '#333333', ui: '#EAEAEA', isDark: false },
  { id: 'mistframe', name: 'Mistframe', background: '#F2F2F2', primary: '#81C784', secondary: '#333333', ui: '#EAEAEA', isDark: false },
  { id: 'porcelain-redline', name: 'Porcelain Redline', background: '#F2F2F2', primary: '#F06292', secondary: '#333333', ui: '#EAEAEA', isDark: false },
];

export const DEFAULT_SETTINGS: TimerSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsUntilLongBreak: 4,
  soundEnabled: true,
  autoStartBreaks: false,
  autoStartFocus: false,
  strictFocusMode: false,
  themeId: 'graphite-focus'
};

export const COLORS = {
  bg: '#222222',
  primary: '#FFB74D',
  secondary: '#E0E0E0',
  highlight: '#0A84FF',
  muted: 'rgba(255, 255, 255, 0.2)',
  overlay: 'rgba(0, 0, 0, 0.4)'
};
