import React from 'react';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Brain, 
  Sparkles, 
  Palette, 
  LayoutGrid, 
  List, 
  AlignJustify, 
  BookOpen,
  Sliders,
  Filter
} from 'lucide-react';
import { NewsCategory, ViewMode } from '../types';

interface CategoryNavProps {
  activeCategory: NewsCategory;
  onSelectCategory: (cat: NewsCategory) => void;
  categoryCounts: Record<string, number>;
  viewMode: ViewMode;
  onSelectViewMode: (vm: ViewMode) => void;
  minImpactScore: number;
  setMinImpactScore: (score: number) => void;
}

export const CATEGORIES_CONFIG: { id: NewsCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'all', label: 'All Radar Signals', icon: Globe },
  { id: 'web-dev', label: 'Web Dev & Edge', icon: Globe },
  { id: 'mobile', label: 'Mobile Engineering', icon: Smartphone },
  { id: 'software', label: 'Software Arch', icon: Cpu },
  { id: 'ai-cloud', label: 'AI & Cloud Tech', icon: Brain },
  { id: 'millerz-insights', label: 'Millerz Insights', icon: Sparkles },
  { id: 'design-ux', label: 'Design & UX Systems', icon: Palette }
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
  viewMode,
  onSelectViewMode,
  minImpactScore,
  setMinImpactScore
}) => {
  return (
    <div className="bg-[#0B0F17]/95 border-b border-gray-800/80 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
          {CATEGORIES_CONFIG.map((cat) => {
            const Icon = cat.icon;
            const count = categoryCounts[cat.id] || 0;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-500/60 text-cyan-300 shadow-md shadow-cyan-500/10 font-semibold'
                    : 'bg-gray-900/80 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-gray-500'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-cyan-400/20 text-cyan-300' : 'bg-gray-800 text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode & Impact Score Filter */}
        <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-800/60 pt-2 md:pt-0">
          
          {/* Impact Score Slider Filter */}
          <div className="flex items-center gap-2 bg-gray-900/90 border border-gray-800 px-3 py-1 rounded-xl text-xs">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-gray-400 text-[11px] font-mono">Impact &ge; {minImpactScore}</span>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minImpactScore}
              onChange={(e) => setMinImpactScore(Number(e.target.value))}
              className="w-16 h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* View Mode Icons */}
          <div className="flex items-center bg-gray-900/90 border border-gray-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => onSelectViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-500 hover:text-gray-300'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectViewMode('list')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-500 hover:text-gray-300'
              }`}
              title="Detailed List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectViewMode('compact')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'compact' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-500 hover:text-gray-300'
              }`}
              title="Compact View"
            >
              <AlignJustify className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectViewMode('magazine')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'magazine' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-500 hover:text-gray-300'
              }`}
              title="Magazine Showcase View"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
