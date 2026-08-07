import React from 'react';
import { X, Bell, CheckCheck, Trash2, Flame, ExternalLink, Radio } from 'lucide-react';
import { NotificationItem, NewsArticle } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClearAll: () => void;
  onSelectNotificationArticle: (articleId?: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClearAll,
  onSelectNotificationArticle
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#0B0F17] border-l border-gray-800 h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-800 bg-gray-950 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
            <Bell className="w-4 h-4 text-cyan-400" />
            <span>REAL-TIME PUSH INBOX</span>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-black font-extrabold text-[10px]">
                {unreadCount} NEW
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="px-5 py-2.5 bg-gray-900/60 border-b border-gray-800 flex items-center justify-between text-xs font-mono">
          <button
            onClick={onMarkAllRead}
            className="text-cyan-400 hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={onClearAll}
            className="text-gray-500 hover:text-red-400 transition flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>

        {/* Notifications Stream */}
        <div className="p-5 space-y-3 flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-mono text-xs space-y-2">
              <Radio className="w-8 h-8 text-gray-700 mx-auto" />
              <p>No real-time push notifications received yet.</p>
              <p className="text-[11px] text-gray-600">Click the radio button on top bar to trigger a live push simulation!</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  onSelectNotificationArticle(notif.linkArticleId);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer space-y-1.5 ${
                  notif.read 
                    ? 'bg-gray-950/60 border-gray-900 opacity-70' 
                    : 'bg-gray-900/90 border-cyan-800/60 hover:border-cyan-500 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {notif.priority === 'breaking' && (
                      <span className="p-1 rounded bg-red-950 text-red-400 border border-red-800">
                        <Flame className="w-3 h-3" />
                      </span>
                    )}
                    <span className="font-mono text-xs font-bold text-white">{notif.title}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">{notif.timestamp}</span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  {notif.message}
                </p>

                <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-cyan-400">
                  <span className="uppercase text-gray-500">#{notif.category}</span>
                  <span className="flex items-center gap-1 hover:underline">
                    <span>View Pulse Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
