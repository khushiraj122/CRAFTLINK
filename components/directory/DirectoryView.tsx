'use client';
import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/data/mockData';
import { FreelancerCard } from '../talent/FreelancerCard';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  Star, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Grid, 
  List, 
  Check, 
  RotateCcw,
  Sparkles,
  MapPin
} from 'lucide-react';

const COMMON_SKILLS = [
  'Premiere Pro',
  'DaVinci Resolve',
  'After Effects',
  'Cinema 4D',
  'Blender',
  'React 19',
  'Next.js',
  'TypeScript',
  'SwiftUI',
  'React Native',
  'Tailwind CSS',
  'Figma'
];

export const DirectoryView: React.FC = () => {
  const { 
    freelancers, 
    searchQuery, 
    setSearchQuery, 
    selectedCategorySlug, 
    setSelectedCategorySlug 
  } = useApp();

  // Local filter states
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [maxHourlyRate, setMaxHourlyRate] = useState<number>(200);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyVerifiedPro, setOnlyVerifiedPro] = useState<boolean>(false);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [experienceLevel, setExperienceLevel] = useState<string>('all'); // all, junior (1-3), mid (4-7), senior (8+)
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'projects' | 'price_low' | 'price_high' | 'experience'>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategorySlug('all');
    setSelectedSkills([]);
    setMaxHourlyRate(200);
    setMinRating(0);
    setOnlyVerifiedPro(false);
    setOnlyAvailable(false);
    setExperienceLevel('all');
    setSortBy('recommended');
  };

  // Filtered & Sorted Freelancers
  const filteredFreelancers = useMemo(() => {
    return freelancers.filter(f => {
      // Category filter
      if (selectedCategorySlug !== 'all' && f.primaryCategory !== selectedCategorySlug) {
        return false;
      }

      // Search Query filter (name, profession, bio, skills, location)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(q);
        const matchesProfession = f.profession.toLowerCase().includes(q);
        const matchesBio = f.bio.toLowerCase().includes(q);
        const matchesSkills = f.skills.some(s => s.name.toLowerCase().includes(q));
        const matchesLocation = f.location.toLowerCase().includes(q);
        if (!matchesName && !matchesProfession && !matchesBio && !matchesSkills && !matchesLocation) {
          return false;
        }
      }

      // Hourly Rate
      if (f.hourlyRate > maxHourlyRate) {
        return false;
      }

      // Minimum Rating
      if (minRating > 0 && f.rating < minRating) {
        return false;
      }

      // Verified Pro Only
      if (onlyVerifiedPro && !f.isVerifiedPro) {
        return false;
      }

      // Availability
      if (onlyAvailable && f.availability !== 'available') {
        return false;
      }

      // Experience Level
      if (experienceLevel === 'junior' && f.experienceYears > 3) return false;
      if (experienceLevel === 'mid' && (f.experienceYears < 4 || f.experienceYears > 7)) return false;
      if (experienceLevel === 'senior' && f.experienceYears < 8) return false;

      // Selected Sub-Skills (freelancer must have at least one of selected skills if any are picked)
      if (selectedSkills.length > 0) {
        const hasSkill = f.skills.some(sk => 
          selectedSkills.some(sel => sk.name.toLowerCase().includes(sel.toLowerCase()))
        );
        if (!hasSkill) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'projects') return b.completedProjectsCount - a.completedProjectsCount;
      if (sortBy === 'price_low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price_high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      // Default: recommended (verified pros first, then highest rating)
      if (a.isVerifiedPro && !b.isVerifiedPro) return -1;
      if (!a.isVerifiedPro && b.isVerifiedPro) return 1;
      return b.rating - a.rating;
    });
  }, [
    freelancers,
    selectedCategorySlug,
    searchQuery,
    maxHourlyRate,
    minRating,
    onlyVerifiedPro,
    onlyAvailable,
    experienceLevel,
    selectedSkills,
    sortBy
  ]);

  const hasActiveFilters = 
    Boolean(searchQuery) ||
    selectedCategorySlug !== 'all' ||
    selectedSkills.length > 0 ||
    maxHourlyRate < 200 ||
    minRating > 0 ||
    onlyVerifiedPro ||
    onlyAvailable ||
    experienceLevel !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Directory Title & Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Curated Talent Index</span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[var(--text-primary)] italic">
            Artisan Directory
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-primary)]/60 mt-1">
            Discover {freelancers.length} verified video editors, motion artists, and software architects.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="w-full md:w-96 relative">
          <Search className="w-4 h-4 text-[var(--accent-primary)] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill, name, software or keyword..."
            className="w-full pl-10 pr-10 py-2.5 bg-[var(--bg-card)] border border-[var(--border-subtle)]/20 rounded-full text-xs focus:outline-none focus:border-[var(--accent-primary)] shadow-2xs text-[var(--text-primary)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-[var(--text-primary)]/40 hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid Layout: Filter Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]/10">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--text-primary)] flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Filter Artisans</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-[var(--accent-primary)] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Discipline / Category */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold mb-2">
              Discipline
            </label>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategorySlug('all')}
                className={`w-full text-left px-3 py-2 rounded-lg font-bold transition-colors flex items-center justify-between ${
                  selectedCategorySlug === 'all'
                    ? 'bg-[var(--bg-elevated)] text-white'
                    : 'text-[var(--text-primary)]/70 hover:bg-[var(--bg-secondary)]'
                }`}
              >
                <span>All Disciplines</span>
                <span className="text-[10px] font-mono opacity-60">({freelancers.length})</span>
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategorySlug(cat.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-bold transition-colors flex items-center justify-between ${
                    selectedCategorySlug === cat.slug
                      ? 'bg-[var(--bg-elevated)] text-white'
                      : 'text-[var(--text-primary)]/70 hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] font-mono opacity-60">({cat.freelancerCount})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Max Hourly Rate Slider */}
          <div>
            <div className="flex justify-between items-center text-[11px] font-mono text-[var(--text-primary)]/60 font-bold mb-2">
              <span>Max Hourly Rate</span>
              <span className="text-[var(--accent-primary)] font-bold">${maxHourlyRate}/hr</span>
            </div>
            <input
              type="range"
              min="30"
              max="200"
              step="10"
              value={maxHourlyRate}
              onChange={(e) => setMaxHourlyRate(Number(e.target.value))}
              className="w-full accent-[#EB5E28]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[var(--text-primary)]/40 mt-1">
              <span>$30/hr</span>
              <span>$200+/hr</span>
            </div>
          </div>

          {/* Verified & Availability Toggles */}
          <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]/10">
            <label className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyVerifiedPro}
                onChange={(e) => setOnlyVerifiedPro(e.target.checked)}
                className="w-4 h-4 rounded text-[var(--accent-primary)] focus:ring-[var(--accent-primary)] accent-[#EB5E28]"
              />
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>Verified Pro Artisans Only</span>
              </span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-[var(--accent-primary)] focus:ring-[var(--accent-primary)] accent-[#EB5E28]"
              />
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Available for Hire Now</span>
              </span>
            </label>
          </div>

          {/* Minimum Rating */}
          <div className="pt-2 border-t border-[var(--border-subtle)]/10">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold mb-2">
              Minimum Rating
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[0, 4.5, 4.8, 4.9].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setMinRating(rate)}
                  className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    minRating === rate
                      ? 'bg-[var(--bg-elevated)] text-white shadow-2xs'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/10'
                  }`}
                >
                  {rate === 0 ? 'Any' : `${rate}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Years */}
          <div className="pt-2 border-t border-[var(--border-subtle)]/10">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold mb-2">
              Experience Level
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'all', label: 'All Experience Levels' },
                { id: 'junior', label: '1 - 3 Years (Rising Talent)' },
                { id: 'mid', label: '4 - 7 Years (Mid-Senior)' },
                { id: 'senior', label: '8+ Years (Lead / Master)' }
              ].map(lvl => (
                <button
                  key={lvl.id}
                  onClick={() => setExperienceLevel(lvl.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    experienceLevel === lvl.id
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'text-[var(--text-primary)]/70 hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Skills Chips */}
          <div className="pt-2 border-t border-[var(--border-subtle)]/10">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold mb-2">
              Core Tooling & Tech
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_SKILLS.map(skill => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                      isSelected
                        ? 'bg-[var(--bg-elevated)] text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]/70 hover:text-[#1A1A1A]'
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Content Column */}
        <main className="lg:col-span-9 space-y-6">
          {/* Controls Bar: Mobile Filter Button, Result Count, Sort Dropdown, View Switcher */}
          <div className="bg-[var(--bg-card)] p-4 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden px-3.5 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <Filter className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              <p className="text-xs font-mono text-[var(--text-primary)]/70">
                Showing <strong className="text-[var(--text-primary)] font-bold">{filteredFreelancers.length}</strong> artisans
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-[var(--text-primary)]/50 uppercase text-[10px] font-bold">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)]/10 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                >
                  <option value="recommended">Recommended & Verified</option>
                  <option value="rating">Highest Rating (5.0★)</option>
                  <option value="projects">Most Completed Projects</option>
                  <option value="price_low">Rate: Low to High</option>
                  <option value="price_high">Rate: High to Low</option>
                  <option value="experience">Years of Experience</option>
                </select>
              </div>

              {/* Grid / List Mode */}
              <div className="hidden sm:flex items-center bg-[var(--bg-secondary)] rounded-lg p-1 border border-[var(--border-subtle)]/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-[var(--bg-card)] shadow-2xs text-[#1A1A1A]' : 'text-[var(--text-primary)]/50 hover:text-[#1A1A1A]'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-[var(--bg-card)] shadow-2xs text-[#1A1A1A]' : 'text-[var(--text-primary)]/50 hover:text-[#1A1A1A]'
                  }`}
                  title="Compact View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[10px] font-mono uppercase text-[var(--text-primary)]/50 font-bold">Active filters:</span>
              
              {selectedCategorySlug !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--bg-elevated)] text-white rounded-full text-xs font-bold">
                  <span>Category: {CATEGORIES.find(c => c.slug === selectedCategorySlug)?.name}</span>
                  <button onClick={() => setSelectedCategorySlug('all')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--bg-elevated)] text-white rounded-full text-xs font-bold">
                  <span>Query: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {onlyVerifiedPro && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--accent-primary)] text-white rounded-full text-xs font-bold">
                  <span>Verified Pro Only</span>
                  <button onClick={() => setOnlyVerifiedPro(false)}><X className="w-3 h-3" /></button>
                </span>
              )}

              {onlyAvailable && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-700 text-white rounded-full text-xs font-bold">
                  <span>Available Now</span>
                  <button onClick={() => setOnlyAvailable(false)}><X className="w-3 h-3" /></button>
                </span>
              )}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--bg-card)] border border-[var(--border-subtle)]/20 rounded-full text-xs font-bold">
                  <span>Rating: {minRating}★+</span>
                  <button onClick={() => setMinRating(0)}><X className="w-3 h-3" /></button>
                </span>
              )}

              {maxHourlyRate < 200 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--bg-card)] border border-[var(--border-subtle)]/20 rounded-full text-xs font-bold">
                  <span>Under ${maxHourlyRate}/hr</span>
                  <button onClick={() => setMaxHourlyRate(200)}><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedSkills.map(sk => (
                <span key={sk} className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--bg-card)] border border-[var(--border-subtle)]/20 rounded-full text-xs font-bold">
                  <span>{sk}</span>
                  <button onClick={() => toggleSkill(sk)}><X className="w-3 h-3" /></button>
                </span>
              ))}

              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-[var(--accent-primary)] hover:underline ml-2"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results Grid / List */}
          {filteredFreelancers.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredFreelancers.map((freelancer) => (
                <FreelancerCard key={freelancer.id} freelancer={freelancer} />
              ))}
            </div>
          ) : (
            <div className="bg-[var(--bg-card)] rounded-2xl border-2 border-dashed border-[var(--border-subtle)]/20 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">
                No matching artisans found
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-primary)]/60 max-w-md mx-auto">
                Try widening your price range, clearing specific tool filters, or searching for broader keywords like "video", "react", or "motion".
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] text-white rounded-full text-xs font-black uppercase tracking-wider transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

