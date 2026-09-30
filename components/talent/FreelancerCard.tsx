'use client';
import React, { useState } from 'react';
import { FreelancerProfile, PortfolioItem } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  Star, 
  ShieldCheck, 
  Bookmark, 
  ArrowUpRight, 
  MessageSquare, 
  Play, 
  Clock, 
  MapPin, 
  Sparkles,
  Share2
} from 'lucide-react';
import { PortfolioLightbox } from '../common/PortfolioLightbox';

interface FreelancerCardProps {
  freelancer: FreelancerProfile;
  compact?: boolean;
}

export const FreelancerCard: React.FC<FreelancerCardProps> = ({ freelancer, compact = false }) => {
  const { 
    setSelectedFreelancerId, 
    setActiveView, 
    toggleSaveFreelancer, 
    isFreelancerSaved, 
    setHiringTargetFreelancer, 
    setIsHireModalOpen,
    startOrOpenConversation,
    setShareData,
    setIsShareModalOpen
  } = useApp();

  const [activePreviewItem, setActivePreviewItem] = useState<PortfolioItem | null>(null);

  const isSaved = isFreelancerSaved(freelancer.id);

  const handleCardClick = () => {
    setSelectedFreelancerId(freelancer.id);
    setActiveView('freelancer-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHireClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHiringTargetFreelancer(freelancer);
    setIsHireModalOpen(true);
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    startOrOpenConversation(freelancer.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShareData({
      title: `${freelancer.name} — ${freelancer.profession}`,
      url: window.location.origin,
      text: `Check out ${freelancer.name} on CraftLink: ${freelancer.profession}. Verified artisan rating ${freelancer.rating}★`
    });
    setIsShareModalOpen(true);
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="group bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)]/10 hover:border-[var(--accent-primary)] transition-all duration-300 shadow-sm hover:shadow-xl p-5 sm:p-6 flex flex-col justify-between relative cursor-pointer overflow-hidden paper-card-hover"
      >
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[var(--accent-primary)] transition-colors"></div>

        <div>
          {/* Header Row: Avatar, Name, Rates, Bookmark */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[var(--border-subtle)]/10 group-hover:border-[var(--accent-primary)] transition-colors shadow-sm"
                />
                {freelancer.availability === 'available' && (
                  <span 
                    title="Available for immediate hiring" 
                    className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
                  />
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-black text-lg text-[var(--text-primary)] italic group-hover:text-[var(--accent-primary)] transition-colors">
                    {freelancer.name}
                  </h3>
                  {freelancer.isVerifiedPro && (
                    <span title="Verified Pro Artisan">
                      <ShieldCheck className="w-4 h-4 text-[var(--accent-primary)]" />
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-[var(--accent-primary)] line-clamp-1">{freelancer.profession}</p>
                <p className="text-[11px] text-[var(--text-primary)]/50 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{freelancer.location}</span>
                </p>
              </div>
            </div>

            {/* Rates */}
            <div className="text-right shrink-0">
              <div className="flex items-baseline justify-end gap-0.5">
                <span className="font-display font-black text-xl text-[var(--text-primary)] italic">${freelancer.hourlyRate}</span>
                <span className="text-[10px] font-mono text-[var(--text-primary)]/50 uppercase font-bold">/hr</span>
              </div>
              <span className="block text-[10px] text-[var(--text-primary)]/60 font-mono">
                From ${freelancer.startingPrice}
              </span>
            </div>
          </div>

          {/* Bio snippet */}
          <p className="text-xs text-[var(--text-primary)]/70 line-clamp-2 leading-relaxed mb-4 font-sans">
            "{freelancer.bio}"
          </p>

          {/* Portfolio Thumbnail Preview Carousel / Strip */}
          {freelancer.portfolio && freelancer.portfolio.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-[10px] uppercase font-mono font-bold text-[var(--text-primary)]/50 mb-1.5">
                <span>Selected Portfolio:</span>
                <span className="text-[var(--accent-primary)] group-hover:underline">Preview Clip →</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {freelancer.portfolio.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePreviewItem(item);
                    }}
                    className="relative aspect-video rounded-lg overflow-hidden border border-[var(--border-subtle)]/10 bg-black group/thumb cursor-zoom-in"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-85 group-hover/thumb:opacity-100 group-hover/thumb:scale-105 transition-all duration-300"
                    />
                    {item.mediaType === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/thumb:bg-black/10 transition-colors">
                        <Play className="w-3.5 h-3.5 text-white fill-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skill Badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {freelancer.skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-full text-[10px] font-bold border border-[var(--border-subtle)]/5"
              >
                {skill.name}
              </span>
            ))}
            {freelancer.skills.length > 4 && (
              <span className="px-2 py-0.5 bg-[var(--bg-card)] text-[var(--text-primary)]/60 rounded-full text-[10px] font-mono border border-[var(--border-subtle)]/10">
                +{freelancer.skills.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer Meta & Action Buttons */}
        <div>
          <div className="flex items-center justify-between py-3 border-t border-[var(--border-subtle)]/10 text-xs">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[var(--accent-primary)] fill-[var(--accent-primary)]" />
              <span className="font-bold text-[var(--text-primary)]">{freelancer.rating}</span>
              <span className="text-[var(--text-primary)]/40 text-[11px]">({freelancer.reviewsCount} reviews)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShareClick}
                className="p-1.5 text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] rounded-full hover:bg-black/5 transition-colors"
                title="Share Profile"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaveFreelancer(freelancer.id);
                }}
                className={`p-1.5 rounded-full transition-colors ${
                  isSaved 
                    ? 'text-[var(--accent-primary)] bg-[var(--accent-primary)]/10' 
                    : 'text-[var(--text-primary)]/40 hover:text-[var(--text-primary)] hover:bg-black/5'
                }`}
                title={isSaved ? 'Remove from Shortlist' : 'Save to Shortlist'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[var(--accent-primary)]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Action Button Row */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={handleMessageClick}
              className="py-2.5 px-3 bg-[var(--bg-card)] border border-[var(--border-subtle)]/20 hover:border-[var(--border-subtle)] text-[var(--text-primary)] rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Message</span>
            </button>

            <button
              onClick={handleHireClick}
              className="py-2.5 px-3 bg-[var(--bg-elevated)] hover:bg-[var(--accent-primary)] text-white rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <span>Hire Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Lightbox when clicking a preview */}
      <PortfolioLightbox
        item={activePreviewItem}
        onClose={() => setActivePreviewItem(null)}
        onHireCreator={() => {
          setHiringTargetFreelancer(freelancer);
          setIsHireModalOpen(true);
        }}
      />
    </>
  );
};

