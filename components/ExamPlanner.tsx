
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Plus, Trash2 } from 'lucide-react';
// Use the Deadline type from types.ts as Exam is not exported
import { Deadline, AppTheme } from '../types';

interface ExamPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  exams: Deadline[];
  onAdd: (exam: Deadline) => void;
  onDelete: (id: string) => void;
  theme: AppTheme;
}

const ExamPlanner: React.FC<ExamPlannerProps> = ({ isOpen, onClose, exams, onAdd, onDelete, theme }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date) return;
    onAdd({ id: Math.random().toString(36).substr(2, 9), name, date });
    setName('');
    setDate('');
  };

  const calculateDaysLeft = (examDate: string) => {
    const diff = new Date(examDate).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days < 0 ? 0 : days;
  };

  const textColor = theme.isDark ? '#FFFFFF' : '#000000';
  const panelBg = theme.background;
  const itemBg = theme.ui;
  const borderColor = theme.isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 p-8 shadow-2xl border-l overflow-hidden"
            style={{ backgroundColor: panelBg, borderColor: borderColor, color: textColor }}
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold tracking-tight">Focus Planner</h2>
              <button 
                onClick={onClose} 
                className="p-3 rounded-full hover:bg-current/10 transition-colors border shadow-sm" 
                style={{ backgroundColor: itemBg, borderColor: borderColor }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mb-12 space-y-4">
              <input
                type="text"
                placeholder="What's your goal?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-[28px] px-6 py-4 focus:outline-none focus:ring-2 transition-all shadow-sm"
                style={{ 
                  backgroundColor: itemBg, 
                  borderColor: borderColor, 
                  color: textColor,
                  outlineColor: theme.primary
                }}
              />
              <div className="flex gap-3">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex-1 border rounded-[28px] px-6 py-4 focus:outline-none focus:ring-2 transition-all shadow-sm"
                  style={{ 
                    backgroundColor: itemBg, 
                    borderColor: borderColor, 
                    color: textColor,
                    outlineColor: theme.primary
                  }}
                />
                <button 
                  type="submit" 
                  className="text-white px-8 rounded-full font-bold active:scale-95 transition-all shadow-md flex items-center justify-center"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Plus size={24} />
                </button>
              </div>
            </form>

            <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-380px)] pr-2 custom-scroll">
              {exams.length === 0 && (
                <div className="text-center py-24 italic opacity-20 font-medium">
                  Add a target to stay focused.
                </div>
              )}
              {exams.map((exam) => (
                <motion.div
                  key={exam.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="border p-6 rounded-[36px] flex items-center justify-between group hover:bg-current/[0.02] transition-colors shadow-sm"
                  style={{ backgroundColor: itemBg, borderColor: borderColor }}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-[22px] flex items-center justify-center shadow-inner" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}>
                      <Calendar size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[16px]">{exam.name}</h4>
                      <p className="text-[11px] font-bold uppercase tracking-widest opacity-30">{new Date(exam.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="block text-2xl font-black tabular-nums leading-none">{calculateDaysLeft(exam.date)}</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">Days</span>
                    </div>
                    <button 
                      onClick={() => onDelete(exam.id)}
                      className="p-2.5 rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExamPlanner;
