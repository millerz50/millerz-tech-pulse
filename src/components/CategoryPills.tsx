import React from 'react';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Brain, 
  Sparkles, 
  Palette, 
  LayoutGrid
} from 'lucide-react';
import { NewsCategory } from '../types';

interface CategoryPillsProps {
  activeCategory: NewsCategory;
  onSelectCategory: (cat: NewsCategory) => void;
}

const CATEGORIES: { id: NewsCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'all', label: 'All Radar Signals', icon: LayoutGrid },
  { id: 'web-dev', label: 'Web Dev & Next.js', icon: Globe },
  { id: 'mobile', label: 'Mobile Engineering', icon: Smartphone },
  { id: 'software', label: 'Software Architecture', icon: Cpu },
  { id: 'ai-cloud', label: 'AI & Cloud Systems', icon: Brain },
  { id: 'millerz-insights', label: 'Millerz Insights', icon: Sparkles },
  { id: 'design-ux', label: 'Design & UX Systems', icon: Palette }
];

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition flex items-center gap-2 shrink-0 border ${
              isActive
                ? 'bg-[#25432D] text-[#C29845] border-[#345D3F] shadow-md font-bold'
                : 'bg-[#131A15] text-gray-400 border-[#212E25] hover:text-white hover:border-[#2D5237]'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C29845]' : 'text-gray-400'}`} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
