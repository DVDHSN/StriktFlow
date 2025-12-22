
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppTheme } from '../types';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
  isActive: boolean;
  onToggle: () => void;
  mode: string;
  isStrictFocus?: boolean;
  theme: AppTheme;
}

const DigitColumn = React.memo(({ value, color }: { value: string; color: string }) => {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const digitHeight = 76;
  
  return (
    <div className="relative h-[76px] w-[0.55em] overflow-hidden flex justify-center">
      <motion.div
        key={value}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 pointer-events-none"
      />
      <motion.div
        animate={{ y: `-${parseInt(value) * digitHeight}px` }}
        transition={{ 
          type: "spring", 
          stiffness: 220, 
          damping: 28, 
          mass: 0.6,
          restDelta: 0.001 
        }}
        className="flex flex-col items-center"
      >
        {digits.map((digit, i) => (
          <span
            key={i}
            className="h-[76px] flex items-center justify-center leading-none select-none font-bold"
            style={{ color }}
          >
            {digit}
          </span>
        ))}
      </motion.div>
    </div>
  );
});

const Timer: React.FC<TimerProps> = ({ timeLeft, totalTime, isActive, onToggle, mode, isStrictFocus, theme }) => {
  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0').split('');
  const secs = (timeLeft % 60).toString().padStart(2, '0').split('');

  const radius = 132;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalTime) * circumference;

  const timerColor = theme.primary;
  const textColor = theme.secondary;

  return (
    <motion.div 
      animate={{ 
        scale: (isActive && isStrictFocus) ? 1.15 : 1,
      }}
      transition={{ type: "spring", damping: 40, stiffness: 80 }}
      className="relative flex items-center justify-center w-80 h-80 z-50"
    >
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.15, 0.25, 0.15],
              scale: [0.95, 1.05, 0.95]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full blur-[60px]"
            style={{ backgroundColor: theme.primary }}
          />
        )}
      </AnimatePresence>

      <div 
        className="absolute w-[270px] h-[270px] rounded-full border border-current shadow-inner opacity-5" 
        style={{ color: theme.secondary }}
      />
      
      <svg className="absolute w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 320 320">
        <circle
          cx="160"
          cy="160"
          r={radius}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="transparent"
          className="opacity-[0.03]"
          style={{ color: theme.secondary }}
        />
        
        <motion.circle
          cx="160"
          cy="160"
          r={radius}
          stroke={timerColor}
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          animate={{ 
            strokeDashoffset: circumference - progress,
            opacity: isActive ? 1 : 0.6,
            strokeWidth: isActive ? 5 : 4
          }}
          transition={{ 
            strokeDashoffset: { duration: 1, ease: "linear" },
            opacity: { duration: 0.5 },
            strokeWidth: { type: "spring", stiffness: 100 }
          }}
          strokeLinecap="round"
        />
      </svg>

      <motion.button 
        whileHover={{ scale: (isActive && isStrictFocus) ? 1 : 1.06 }}
        whileTap={{ scale: (isActive && isStrictFocus) ? 1 : 0.9 }}
        onClick={onToggle}
        disabled={isActive && isStrictFocus}
        className={`z-10 flex flex-col items-center justify-center focus:outline-none group relative w-68 h-68 rounded-full transition-all duration-700
          ${isActive && isStrictFocus ? 'cursor-default' : 'hover:bg-current/[0.015] cursor-pointer'}`}
      >
        <motion.div
          animate={{ 
            y: isActive ? 0 : 2
          }}
          className="text-center"
        >
          <div className="flex items-center justify-center text-[80px] font-bold tracking-[-0.05em] tabular-nums leading-none h-[80px]">
             <DigitColumn value={mins[0]} color={textColor} />
             <DigitColumn value={mins[1]} color={textColor} />
             <span className="relative -top-[0.03em] px-0.5 select-none opacity-20" style={{ color: textColor }}>:</span>
             <DigitColumn value={secs[0]} color={textColor} />
             <DigitColumn value={secs[1]} color={textColor} />
          </div>
          
          <AnimatePresence mode="wait">
            {!(isActive && isStrictFocus) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 0.6, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="mt-8 flex flex-col items-center"
              >
                <span className="text-[11px] uppercase tracking-[0.5em] font-black" style={{ color: textColor }}>
                  {isActive ? 'Pause' : 'Start'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default React.memo(Timer);
