
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Settings as SettingsIcon, RotateCcw, Clock, ListTodo, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimerMode, TimerSettings, Deadline, AppTheme, Task } from './types';
import { DEFAULT_SETTINGS, THEMES } from './constants';
import Timer from './components/Timer';
import ModeSwitcher from './components/ModeSwitcher';
import SessionTracker from './components/SessionTracker';
import SettingsDrawer from './components/SettingsDrawer';
import DeadlineTracker from './components/DeadlineTracker';
import TaskDrawer from './components/TaskDrawer';
import { playTick, playChime } from './utils/audio';

const App: React.FC = () => {
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const saved = localStorage.getItem('striktflow_settings');
    const parsed = saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    if (!parsed.themeId) parsed.themeId = 'graphite-focus';
    return parsed;
  });
  
  const [deadlines, setDeadlines] = useState<Deadline[]>(() => {
    const saved = localStorage.getItem('striktflow_deadlines');
    return saved ? JSON.parse(saved) : [];
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('striktflow_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [focusedTaskId, setFocusedTaskId] = useState<string | null>(() => {
    return localStorage.getItem('striktflow_focused_task_id');
  });
  
  const [mode, setMode] = useState<TimerMode>(TimerMode.FOCUS);
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDeadlineTrackerOpen, setIsDeadlineTrackerOpen] = useState(false);
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeTheme = useMemo(() => {
    return THEMES.find(t => t.id === settings.themeId) || THEMES[0];
  }, [settings.themeId]);

  const focusedTask = useMemo(() => {
    return tasks.find(t => t.id === focusedTaskId);
  }, [tasks, focusedTaskId]);

  useEffect(() => {
    localStorage.setItem('striktflow_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('striktflow_deadlines', JSON.stringify(deadlines));
  }, [deadlines]);

  useEffect(() => {
    localStorage.setItem('striktflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (focusedTaskId) {
      localStorage.setItem('striktflow_focused_task_id', focusedTaskId);
    } else {
      localStorage.removeItem('striktflow_focused_task_id');
    }
  }, [focusedTaskId]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-bg', activeTheme.background);
    root.style.setProperty('--theme-primary', activeTheme.primary);
    root.style.setProperty('--theme-ui', activeTheme.ui);
    root.style.setProperty('--theme-text', activeTheme.secondary);
  }, [activeTheme]);

  const totalTimeForMode = useCallback((currentMode: TimerMode) => {
    switch (currentMode) {
      case TimerMode.FOCUS: return settings.focusDuration * 60;
      case TimerMode.SHORT_BREAK: return settings.shortBreakDuration * 60;
      case TimerMode.LONG_BREAK: return settings.longBreakDuration * 60;
    }
  }, [settings]);

  const handleModeChange = useCallback((newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(totalTimeForMode(newMode));
    setIsActive(false);
  }, [totalTimeForMode]);

  const switchModeAutomatically = useCallback(() => {
    if (settings.soundEnabled) playChime();
    
    if (mode === TimerMode.FOCUS) {
      const nextSessionCount = completedSessions + 1;
      setCompletedSessions(nextSessionCount);
      
      if (nextSessionCount % settings.sessionsUntilLongBreak === 0) {
        handleModeChange(TimerMode.LONG_BREAK);
        if (settings.autoStartBreaks) setIsActive(true);
      } else {
        handleModeChange(TimerMode.SHORT_BREAK);
        if (settings.autoStartBreaks) setIsActive(true);
      }
    } else {
      handleModeChange(TimerMode.FOCUS);
      if (settings.autoStartFocus) setIsActive(true);
    }
  }, [mode, completedSessions, settings, handleModeChange]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      switchModeAutomatically();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft, switchModeAutomatically]);

  const toggleTimer = useCallback(() => {
    if (!isActive && settings.soundEnabled) playTick();
    setIsActive(prev => !prev);
  }, [isActive, settings.soundEnabled]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(totalTimeForMode(mode));
  }, [mode, totalTimeForMode]);

  const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      if (!isActive) {
         if (newSettings.focusDuration && mode === TimerMode.FOCUS) setTimeLeft(newSettings.focusDuration * 60);
         if (newSettings.shortBreakDuration && mode === TimerMode.SHORT_BREAK) setTimeLeft(newSettings.shortBreakDuration * 60);
         if (newSettings.longBreakDuration && mode === TimerMode.LONG_BREAK) setTimeLeft(newSettings.longBreakDuration * 60);
      }
      return updated;
    });
  }, [isActive, mode]);

  const addDeadline = useCallback((deadline: Deadline) => setDeadlines(prev => [...prev, deadline]), []);
  const deleteDeadline = useCallback((id: string) => setDeadlines(prev => prev.filter(d => d.id !== id)), []);

  const addTask = useCallback((text: string) => {
    setTasks(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), text, completed: false }]);
  }, []);
  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);
  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const filtered = prev.filter(t => t.id !== id);
      if (focusedTaskId === id) setFocusedTaskId(null);
      return filtered;
    });
  }, [focusedTaskId]);

  const isStrictActive = isActive && settings.strictFocusMode;

  return (
    <div 
      className="min-h-screen flex flex-col items-center py-8 px-8 md:py-12 md:px-12 relative overflow-hidden transition-all duration-1000"
      style={{ backgroundColor: activeTheme.background, color: activeTheme.secondary }}
    >
      {/* Background Dynamics */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.05] overflow-hidden">
        <motion.div 
          animate={{ 
            scale: mode === TimerMode.FOCUS ? [1, 1.1, 1] : [1.1, 1.2, 1.1],
            opacity: isActive ? 0.08 : 0.04
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] blur-[180px] rounded-full" 
          style={{ backgroundColor: activeTheme.primary }}
        />
        <motion.div 
          animate={{ 
            scale: mode === TimerMode.FOCUS ? [1.1, 1, 1.1] : [1.2, 1.1, 1.2],
            opacity: isActive ? 0.08 : 0.04
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] blur-[180px] rounded-full" 
          style={{ backgroundColor: activeTheme.primary }}
        />
      </div>

      <motion.header 
        animate={{ y: isStrictActive ? -100 : 0, opacity: isStrictActive ? 0 : 1 }}
        className="w-full flex justify-between items-center z-40 max-w-5xl mb-auto"
      >
        <div className="flex gap-2">
          <HeaderButton icon={<ListTodo size={16} />} label="Tasks" onClick={() => setIsTaskDrawerOpen(true)} theme={activeTheme} />
          <HeaderButton icon={<Clock size={16} />} label="Deadlines" onClick={() => setIsDeadlineTrackerOpen(true)} theme={activeTheme} />
        </div>
        
        <div className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2 cursor-default group">
          <div className="w-7 h-7 bg-current/[0.03] rounded-lg flex items-center justify-center border transition-all group-hover:border-current/20" 
            style={{ borderColor: activeTheme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
          >
            <span className="font-black text-[9px] italic opacity-40">SF</span>
          </div>
          <span className="font-bold text-[10px] tracking-[0.25em] uppercase opacity-10 group-hover:opacity-40 transition-opacity hidden sm:block">StriktFlow</span>
        </div>

        <HeaderButton icon={<SettingsIcon size={16} className="group-hover:rotate-45 transition-transform duration-700" />} onClick={() => setIsSettingsOpen(true)} theme={activeTheme} />
      </motion.header>

      <main className="flex flex-col items-center justify-center w-full max-w-lg z-30 gap-8 md:gap-12 my-auto">
        <ModeSwitcher 
          currentMode={mode} 
          onModeChange={handleModeChange} 
          disabled={isStrictActive}
          theme={activeTheme}
        />

        <div className="flex flex-col items-center gap-10 md:gap-14">
          <Timer 
            timeLeft={timeLeft} 
            totalTime={totalTimeForMode(mode)} 
            isActive={isActive} 
            onToggle={toggleTimer}
            mode={mode}
            isStrictFocus={settings.strictFocusMode}
            theme={activeTheme}
          />
          
          <div className="flex flex-col items-center gap-6">
            <motion.div 
              animate={{ y: isStrictActive ? 40 : 0, opacity: isStrictActive ? 0 : 1 }}
              className="flex flex-col items-center"
            >
              <SessionTracker 
                completed={completedSessions % settings.sessionsUntilLongBreak} 
                total={settings.sessionsUntilLongBreak} 
                theme={activeTheme}
                isActive={isActive}
              />
            </motion.div>

            <AnimatePresence mode="wait">
              {focusedTask ? (
                <motion.button
                  key={focusedTask.id}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ 
                    opacity: isStrictActive ? 0.4 : 1, 
                    y: 0, 
                    scale: 1 
                  }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  whileHover={isStrictActive ? {} : { scale: 1.02 }}
                  whileTap={isStrictActive ? {} : { scale: 0.98 }}
                  onClick={() => !isStrictActive && setIsTaskDrawerOpen(true)}
                  disabled={isStrictActive}
                  className={`flex items-center gap-3 px-6 py-3 rounded-[24px] border-2 bg-current/[0.03] transition-all group shadow-md ${isStrictActive ? 'cursor-default' : 'hover:bg-current/[0.06]'}`}
                  style={{ 
                    borderColor: activeTheme.primary,
                    color: activeTheme.secondary,
                    boxShadow: `0 8px 24px -12px ${activeTheme.primary}33`
                  }}
                >
                  <motion.div
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Target size={16} className="opacity-80 group-hover:opacity-100 transition-opacity" style={{ color: activeTheme.primary }} />
                  </motion.div>
                  <span className="text-[14px] font-bold opacity-90 group-hover:opacity-100 truncate max-w-[240px] tracking-tight">
                    {focusedTask.text}
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  key="no-focus"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isStrictActive ? 0 : 0.25 
                  }}
                  exit={{ opacity: 0 }}
                  whileHover={{ opacity: isStrictActive ? 0 : 0.5 }}
                  onClick={() => setIsTaskDrawerOpen(true)}
                  disabled={isStrictActive}
                  className="text-[10px] font-black uppercase tracking-[0.3em] cursor-pointer"
                >
                  Set Focus Goal
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <motion.footer 
        animate={{ y: isStrictActive ? 100 : 0, opacity: isStrictActive ? 0 : 1 }}
        className="w-full max-w-xs z-40 flex flex-col items-center gap-6 mt-auto"
      >
        <motion.button 
          whileHover={{ scale: 1.1, rotate: -45 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetTimer}
          className="p-4 rounded-full bg-current/[0.02] border hover:bg-current/[0.05] transition-all group shadow-sm"
          style={{ borderColor: activeTheme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
        >
          <RotateCcw size={16} className="opacity-20 group-hover:opacity-60 transition-colors" />
        </motion.button>
        <div className="text-[9px] uppercase font-black tracking-[0.4em] opacity-5 select-none">
          StriktFlow Protocol
        </div>
      </motion.footer>

      <SettingsDrawer 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        settings={settings}
        updateSettings={updateSettings}
        theme={activeTheme}
      />

      <DeadlineTracker 
        isOpen={isDeadlineTrackerOpen}
        onClose={() => setIsDeadlineTrackerOpen(false)}
        deadlines={deadlines}
        onAdd={addDeadline}
        onDelete={deleteDeadline}
        theme={activeTheme}
      />

      <TaskDrawer
        isOpen={isTaskDrawerOpen}
        onClose={() => setIsTaskDrawerOpen(false)}
        tasks={tasks}
        onAdd={addTask}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onSetFocus={setFocusedTaskId}
        focusedTaskId={focusedTaskId}
        theme={activeTheme}
      />
    </div>
  );
};

const HeaderButton = ({ icon, label, onClick, theme }: { icon: React.ReactNode, label?: string, onClick: () => void, theme: AppTheme }) => (
  <motion.button 
    whileHover={{ scale: 1.05, y: -1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="p-2.5 bg-current/[0.03] hover:bg-current/[0.08] rounded-[18px] transition-all border group flex items-center gap-2.5 px-4 shadow-sm"
    style={{ color: theme.secondary, borderColor: theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
  >
    <div className="opacity-30 group-hover:opacity-100 transition-opacity">{icon}</div>
    {label && <span className="text-[9px] font-bold uppercase tracking-[0.15em] opacity-30 group-hover:opacity-100 transition-opacity">{label}</span>}
  </motion.button>
);

export default App;
