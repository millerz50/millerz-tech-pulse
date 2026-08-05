import React, { useEffect } from 'react';
import { Bell, Flame, X, ArrowRight, Zap } from 'lucide-react';
import { NotificationItem } from '../types';

interface PushToastProps {
  notification: NotificationItem | null;
  onDismiss: () => void;
  onClickToast: (articleId?: string) => void;
}

export const PushToast: React.FC<PushToastProps> = ({
  notification,
  onDismiss,
  onClickToast
}) => {
  if (!notification) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 6000);
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-[#0B0F17] border border-cyan-500/80 rounded-2xl shadow-2xl shadow-cyan-500/20 p-4 animate-slideUp">
      <div className="flex items-start justify-between gap-3">
        
        <div 
          onClick={() => {
            onClickToast(notification.linkArticleId);
            onDismiss();
          }}
          className="flex gap-3 cursor-pointer flex-1"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-700/80 flex items-center justify-center text-cyan-400 shrink-0 shadow-md">
            {notification.priority === 'breaking' ? (
              <Flame className="w-5 h-5 text-red-400 animate-pulse" />
            ) : (
              <Zap className="w-5 h-5 text-cyan-400" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-white uppercase tracking-wider">
                {notification.title}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[9px] uppercase">
                PUSH ALERT
              </span>
            </div>
            <p className="text-xs text-gray-300 line-clamp-2 leading-snug">
              {notification.message}
            </p>
            <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1 hover:underline">
              <span>Read breaking story</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 h-1 rounded-full mt-3 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full animate-shrinkWidth"></div>
      </div>
    </div>
  );
};
