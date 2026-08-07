import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle, ShieldCheck, History, Radio, Send, Bell } from 'lucide-react';
import { SubscriptionRecord, NewsCategory } from '@/types';

interface SubscriptionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  onUpdateSubscription: (email: string, topics: NewsCategory[], frequency: 'instant' | 'daily' | 'weekly', pushEnabled: boolean) => Promise<void>;
}

export const SubscriptionDrawer: React.FC<SubscriptionDrawerProps> = ({
  isOpen,
  onClose,
  userEmail,
  onUpdateSubscription
}) => {
  if (!isOpen) return null;

  const [emailInput, setEmailInput] = useState(userEmail || 'developer@millerz.dev');
  const [selectedTopics, setSelectedTopics] = useState<NewsCategory[]>([
    'web-dev', 'mobile', 'software', 'ai-cloud', 'millerz-insights'
  ]);
  const [frequency, setFrequency] = useState<'instant' | 'daily' | 'weekly'>('instant');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionHistory, setSubscriptionHistory] = useState<SubscriptionRecord[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setSubscriptionHistory(data.subscriptions || []);
        }
      })
      .catch(e => console.warn("Failed to fetch subscriptions history:", e));
  }, []);

  const handleToggleTopic = (topic: NewsCategory) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    setIsSubmitting(true);
    try {
      await onUpdateSubscription(emailInput, selectedTopics, frequency, pushEnabled);
      setSuccessMsg('Subscription preferences updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      
      // Refresh history
      const res = await fetch('/api/subscriptions');
      const data = await res.json();
      if (data.status === 'success') {
        setSubscriptionHistory(data.subscriptions || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#0B0F17] border-l border-gray-800 h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-800 bg-gray-950 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>MILLERZ SUBSCRIPTION CENTER</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto text-xs">
          
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="font-mono text-gray-300 font-bold block uppercase text-[11px]">
                Subscription Email Address
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
                placeholder="developer@millerz.dev"
              />
            </div>

            {/* Topic Subscriptions */}
            <div className="space-y-2">
              <label className="font-mono text-gray-300 font-bold block uppercase text-[11px]">
                Target News Topics
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'web-dev', name: 'Web Dev & Edge' },
                  { id: 'mobile', name: 'Mobile Apps' },
                  { id: 'software', name: 'Software Arch' },
                  { id: 'ai-cloud', name: 'AI & Cloud' },
                  { id: 'millerz-insights', name: 'Millerz Radar' },
                  { id: 'design-ux', name: 'Quantum UI' }
                ].map((item) => {
                  const isChecked = selectedTopics.includes(item.id as NewsCategory);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => handleToggleTopic(item.id as NewsCategory)}
                      className={`p-2.5 rounded-xl font-mono text-xs border text-left transition flex items-center justify-between ${
                        isChecked ? 'bg-cyan-950/80 border-cyan-800 text-cyan-300 font-bold' : 'bg-gray-900 border-gray-800 text-gray-400'
                      }`}
                    >
                      <span>{item.name}</span>
                      {isChecked && <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Frequency Selection */}
            <div className="space-y-2">
              <label className="font-mono text-gray-300 font-bold block uppercase text-[11px]">
                Delivery Schedule
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'instant', label: 'Instant Push' },
                  { id: 'daily', label: 'Daily Digest' },
                  { id: 'weekly', label: 'Weekly Brief' }
                ].map((f) => (
                  <button
                    type="button"
                    key={f.id}
                    onClick={() => setFrequency(f.id as any)}
                    className={`py-2 rounded-xl font-mono text-xs border transition ${
                      frequency === f.id ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold' : 'bg-gray-900 border-gray-800 text-gray-400'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Push Enabled Toggle */}
            <div className="p-3.5 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-gray-200 block">Web Push Tokens</span>
                <span className="text-gray-400 text-[11px]">Send instant Web Push notifications</span>
              </div>
              <input
                type="checkbox"
                checked={pushEnabled}
                onChange={(e) => setPushEnabled(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Updating...' : 'Save & Active Subscription'}</span>
            </button>
          </form>

          {/* Subscription History Logs */}
          <div className="pt-6 border-t border-gray-800 space-y-3">
            <div className="flex items-center gap-2 font-mono text-gray-300 font-bold uppercase text-[11px]">
              <History className="w-3.5 h-3.5 text-cyan-400" />
              <span>Subscription History Log</span>
            </div>

            {subscriptionHistory.length === 0 ? (
              <p className="text-gray-500 text-xs italic font-mono">No subscription history recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {subscriptionHistory.map((sub) => (
                  <div key={sub.id} className="p-3 rounded-xl bg-gray-900/80 border border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-cyan-300 font-bold">{sub.email}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase font-mono">
                        {sub.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-400 flex items-center justify-between font-sans">
                      <span>Frequency: <strong className="text-gray-300 capitalize">{sub.frequency}</strong></span>
                      <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
