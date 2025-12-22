
import React from 'react';
import { motion } from 'framer-motion';
import { TimerMode, AppTheme } from '../types';

interface ModeSwitcherProps {
  currentMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
  disabled?: boolean;
  theme: AppTheme;
}

const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ currentMode, onModeChange, disabled, theme }) => {
  const modes = [
    { id: TimerMode.FOCUS, label: 'Focus' },
    { id: TimerMode.SHORT_BREAK, label: 'Break' },
    { id: TimerMode.LONG_BREAK, label: 'Rest' },
  ];

  const borderColor = theme.isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';
  const bgColor = theme.isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';

  return (
    <motion.div 
      animate={{ 
        opacity: disabled ? 0 : 1, 
        scale: disabled ? 0.92 : 1, 
        y: disabled ? -20 : 0 
      }}
      className={`flex p-1.5 rounded-full border shadow-xl relative transition-all duration-700
        ${disabled ? 'pointer-events-none' : 'pointer-events-auto'}`}
      style={{ 
        backgroundColor: bgColor,
        borderColor: borderColor
      }}
    >
      {modes.map((mode) => (
        <motion.button
          key={mode.id}
          whileHover={{ scale: currentMode === mode.id ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => !disabled && onModeChange(mode.id)}
          className={`relative px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-500 z-10 rounded-full ${
            currentMode === mode.id 
              ? (theme.isDark ? 'text-white' : 'text-black') 
              : (theme.isDark ? 'text-white/20 hover:text-white/50' : 'text-black/20 hover:text-black/50')
          }`}
        >
          {mode.label}
          {currentMode === mode.id && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 rounded-full -z-10 border shadow-lg"
              style={{ 
                backgroundColor: theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                borderColor: theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
              }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            >
              <motion.div 
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full blur-lg" 
                style={{ backgroundColor: theme.primary }} 
              />
            </motion.div>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ModeSwitcher;
