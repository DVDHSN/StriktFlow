
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, CheckCircle2, Circle, Trash2, ListTodo, Target } from 'lucide-react';
import { Task, AppTheme } from '../types';

interface TaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onSetFocus: (id: string | null) => void;
  focusedTaskId: string | null;
  theme: AppTheme;
}

const TaskDrawer: React.FC<TaskDrawerProps> = ({ 
  isOpen, onClose, tasks, onAdd, onToggle, onDelete, onSetFocus, focusedTaskId, theme 
}) => {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    onAdd(newTask.trim());
    setNewTask('');
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed left-0 top-0 bottom-0 w-full max-w-md z-[70] p-8 shadow-2xl border-r overflow-hidden"
            style={{ backgroundColor: panelBg, borderColor: borderColor, color: textColor }}
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <ListTodo size={24} className="opacity-40" />
                <h2 className="text-2xl font-bold tracking-tight">Focus Goals</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 rounded-full hover:bg-current/10 transition-colors border shadow-sm" 
                style={{ backgroundColor: itemBg, borderColor: borderColor }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mb-10 relative">
              <input
                type="text"
                placeholder="What are we working on?"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full border rounded-[28px] pl-6 pr-16 py-4 focus:outline-none focus:ring-2 transition-all shadow-sm"
                style={{ 
                  backgroundColor: itemBg, 
                  borderColor: borderColor, 
                  color: textColor,
                  outlineColor: theme.primary
                }}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-2 bottom-2 aspect-square text-white rounded-full font-bold active:scale-95 transition-all shadow-md flex items-center justify-center"
                style={{ backgroundColor: theme.primary }}
              >
                <Plus size={20} />
              </button>
            </form>

            <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-280px)] pr-2 custom-scroll">
              {tasks.length === 0 && (
                <div className="text-center py-24 italic opacity-20 font-medium">
                  Add a task to set your intention.
                </div>
              )}
              <AnimatePresence initial={false}>
                {tasks.map((task) => {
                  const isFocused = focusedTaskId === task.id;
                  return (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        // Use inset box shadow for the border highlight to avoid shifting layout
                        boxShadow: isFocused 
                          ? `inset 0 0 0 2px ${theme.primary}` 
                          : 'inset 0 0 0 0px transparent'
                      }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group p-5 rounded-[28px] flex items-center gap-4 hover:bg-current/[0.01] transition-all relative overflow-hidden border"
                      style={{ 
                        backgroundColor: itemBg,
                        borderColor: isFocused ? theme.primary : borderColor
                      }}
                    >
                      <button 
                        onClick={() => onToggle(task.id)}
                        className="transition-transform active:scale-75 flex items-center justify-center w-6 h-6 z-10"
                        style={{ color: task.completed ? theme.primary : 'currentColor' }}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {task.completed ? (
                            <motion.div
                              key="completed"
                              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <CheckCircle2 size={22} className="opacity-100" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="incomplete"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 0.2 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              className="hover:opacity-100 transition-opacity"
                            >
                              <Circle size={22} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                      
                      <motion.span 
                        animate={{ 
                          opacity: task.completed ? 0.3 : 0.8,
                        }}
                        className={`flex-1 text-[15px] font-medium transition-all ${task.completed ? 'line-through decoration-current decoration-2' : ''}`}
                      >
                        {task.text}
                      </motion.span>

                      <div className="flex items-center gap-1 z-10">
                        <button 
                          onClick={() => onSetFocus(isFocused ? null : task.id)}
                          className={`p-2 rounded-full transition-all ${isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-40 hover:opacity-100 hover:bg-current/10'}`}
                          style={{ color: isFocused ? theme.primary : 'currentColor' }}
                          title="Focus on this task"
                        >
                          <Target size={18} />
                        </button>
                        
                        <button 
                          onClick={() => onDelete(task.id)}
                          className="p-2 rounded-full opacity-0 group-hover:opacity-40 hover:opacity-100 hover:text-red-500 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskDrawer;
