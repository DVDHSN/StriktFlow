
export enum TimerMode {
  FOCUS = 'FOCUS',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK'
}

export interface AppTheme {
  id: string;
  name: string;
  background: string;
  primary: string;
  secondary: string;
  ui: string;
  isDark: boolean;
}

export interface TimerSettings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  soundEnabled: boolean;
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
  strictFocusMode: boolean;
  themeId: string;
}

export interface Deadline {
  id: string;
  name: string;
  date: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface SessionHistory {
  id: string;
  type: TimerMode;
  startTime: number;
  endTime: number;
}
