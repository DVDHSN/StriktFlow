
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Timer, Coffee, Zap, Target, Check, Repeat, Palette } from 'lucide-react';
import { TimerSettings, AppTheme } from '../types';
import { THEMES } from '../constants';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: TimerSettings;
  updateSettings: (newSettings: Partial<TimerSettings>) => void;
  theme: AppTheme;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ isOpen, onClose, settings, updateSettings, theme }) => {
  const textColor = theme.secondary;
  const panelBg = theme.background;
  const itemBg = theme.ui;
  const borderColor = theme.isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] backdrop-blur-3xl"
            style={{ backgroundColor: `${panelBg}cc` }}
          />
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 35, stiffness: 250 }}
            className="fixed inset-0 z-[70] flex flex-col overflow-hidden"
            style={{ backgroundColor: panelBg, color: textColor }}
          >
            {/* Header Area */}
            <div className="w-full max-w-6xl mx-auto px-8 pt-12 pb-8 flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-2">Settings</h2>
                <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-30">Configure your flow</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-4 rounded-full transition-all border shadow-sm"
                style={{ backgroundColor: itemBg, borderColor: borderColor }}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scroll pb-32">
              <div className="max-w-6xl mx-auto px-8 space-y-16">
                
                {/* Theme Section */}
                <section>
                  <div className="flex items-center gap-3 mb-8 opacity-40 ml-2">
                    <Palette size={16} />
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.3em]">Aesthetic Accents</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {THEMES.map((t) => (
                      <motion.button
                        key={t.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateSettings({ themeId: t.id })}
                        className={`relative flex flex-col items-start gap-4 p-5 rounded-[32px] border transition-all ${settings.themeId === t.id ? 'ring-2 ring-offset-4' : 'shadow-sm'}`}
                        style={{ 
                          backgroundColor: t.ui, 
                          borderColor: settings.themeId === t.id ? t.primary : borderColor,
                          // Use the theme's own background for the ring offset to avoid white rings on dark mode
                          '--tw-ring-offset-color': theme.background,
                          '--tw-ring-color': t.primary
                        } as any}
                      >
                        <div className="w-full flex justify-between items-center">
                          <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: t.primary }} />
                          {settings.themeId === t.id && <Check size={16} className="opacity-80" />}
                        </div>
                        <span className="text-[12px] font-black uppercase tracking-widest truncate w-full text-left opacity-60">
                          {t.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  {/* Intervals Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-8 opacity-40 ml-2">
                      <Timer size={16} />
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.3em]">Focus Intervals</h3>
                    </div>
                    <div className="space-y-4">
                      <DurationItem icon={<Timer size={18} />} label="Focus Work" value={settings.focusDuration} onChange={(val) => updateSettings({ focusDuration: val })} theme={theme} />
                      <DurationItem icon={<Coffee size={18} />} label="Short Break" value={settings.shortBreakDuration} onChange={(val) => updateSettings({ shortBreakDuration: val })} theme={theme} />
                      <DurationItem icon={<Repeat size={18} />} label="Long Break" value={settings.longBreakDuration} onChange={(val) => updateSettings({ longBreakDuration: val })} theme={theme} />
                      <DurationItem icon={<Zap size={18} />} label="Session Loop" value={settings.sessionsUntilLongBreak} onChange={(val) => updateSettings({ sessionsUntilLongBreak: val })} theme={theme} />
                    </div>
                  </section>

                  {/* Behavior Section */}
                  <section>
                    <div className="flex items-center gap-3 mb-8 opacity-40 ml-2">
                      <Target size={16} />
                      <h3 className="text-[11px] font-bold uppercase tracking-[0.3em]">System Behavior</h3>
                    </div>
                    <div className="rounded-[48px] overflow-hidden border shadow-sm divide-y" 
                         style={{ 
                           backgroundColor: itemBg, 
                           borderColor: borderColor, 
                           divideColor: theme.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' 
                         }}>
                      <ToggleItem icon={<Target size={18} />} label="Strict Mode" isOn={settings.strictFocusMode} onToggle={() => updateSettings({ strictFocusMode: !settings.strictFocusMode })} theme={theme} />
                      <ToggleItem icon={<Bell size={18} />} label="Haptic Sounds" isOn={settings.soundEnabled} onToggle={() => updateSettings({ soundEnabled: !settings.soundEnabled })} theme={theme} />
                      <ToggleItem icon={<Zap size={18} />} label="Auto-start Breaks" isOn={settings.autoStartBreaks} onToggle={() => updateSettings({ autoStartBreaks: !settings.autoStartBreaks })} theme={theme} />
                      <ToggleItem icon={<Timer size={18} />} label="Auto-start Focus" isOn={settings.autoStartFocus} onToggle={() => updateSettings({ autoStartFocus: !settings.autoStartFocus })} theme={theme} />
                    </div>
                  </section>
                </div>
              </div>
            </div>
            
            {/* Footer gradient for smooth scroll fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" 
                 style={{ background: `linear-gradient(to top, ${panelBg}, transparent)` }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DurationItem = React.memo(({ icon, label, value, onChange, theme }: { icon: React.ReactNode, label: string, value: number, onChange: (val: number) => void, theme: AppTheme }) => (
  <div className="flex items-center justify-between p-8 rounded-[40px] border shadow-sm transition-all" 
       style={{ backgroundColor: theme.ui, borderColor: theme.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
    <div className="flex items-center gap-5">
      <div className="opacity-40">{icon}</div>
      <span className="text-[15px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex items-center gap-8">
      <motion.button 
        whileTap={{ scale: 0.8 }}
        onClick={() => onChange(Math.max(1, value - 1))} 
        className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-current/10 border transition-all text-xl font-medium" 
        style={{ borderColor: theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
      >
        -
      </motion.button>
      <span className="w-10 text-center tabular-nums font-black text-2xl">{value}</span>
      <motion.button 
        whileTap={{ scale: 0.8 }}
        onClick={() => onChange(value + 1)} 
        className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-current/10 border transition-all text-xl font-medium" 
        style={{ borderColor: theme.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
      >
        +
      </motion.button>
    </div>
  </div>
));

const ToggleItem = React.memo(({ icon, label, isOn, onToggle, theme }: { icon: React.ReactNode, label: string, isOn: boolean, onToggle: () => void, theme: AppTheme }) => (
  <button onClick={onToggle} className="flex items-center justify-between w-full p-8 hover:bg-current/[0.02] transition-colors border-b last:border-0 group" 
          style={{ borderColor: theme.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}>
    <div className="flex items-center gap-5">
      <div className="opacity-40 transition-opacity group-hover:opacity-100">{icon}</div>
      <span className="text-[15px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <div className={`w-14 h-8.5 rounded-full p-1 transition-all duration-400 relative shadow-inner ${isOn ? '' : (theme.isDark ? 'bg-white/10' : 'bg-black/10')}`} 
         style={{ backgroundColor: isOn ? theme.primary : undefined }}>
      <motion.div 
        animate={{ x: isOn ? 22 : 0 }} 
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-6.5 h-6.5 bg-white rounded-full shadow-lg" 
      />
    </div>
  </button>
));

export default React.memo(SettingsDrawer);
