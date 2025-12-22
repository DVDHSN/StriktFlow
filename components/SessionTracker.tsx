
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppTheme } from '../types';

interface SessionTrackerProps {
  completed: number;
  total: number;
  theme: AppTheme;
  isActive?: boolean;
}

const SessionTracker: React.FC<SessionTrackerProps> = ({ completed, total, theme, isActive }) => {
  return (
    <div 
      className="flex gap-4 items-center justify-center px-8 py-3 rounded-full border"
      style={{ 
        backgroundColor: theme.isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        borderColor: theme.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="relative">
          <motion.div
            initial={false}
            animate={{
              scale: i === completed ? (isActive ? 1.5 : 1.1) : 1,
              opacity: i < completed ? 1 : (i === completed ? 0.7 : 0.1),
              backgroundColor: i < completed ? theme.primary : (theme.isDark ? '#FFFFFF' : '#000000')
            }}
            transition={{ 
              scale: i === completed ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 },
              opacity: { duration: 0.4 },
              backgroundColor: { duration: 0.6 }
            }}
            className={`w-2.5 h-2.5 rounded-full ${i < completed ? 'shadow-lg' : ''}`}
            style={{ 
              boxShadow: i < completed ? `0 0 12px ${theme.primary}88` : 'none'
            }}
          />
          
          <AnimatePresence>
            {i < completed && (
              <motion.div
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: theme.primary }}
              />
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default SessionTracker;
