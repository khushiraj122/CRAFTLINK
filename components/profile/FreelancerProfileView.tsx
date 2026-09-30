// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { PortfolioItem, Review } from '@/types';
import { PortfolioLightbox } from '../common/PortfolioLightbox';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Star, 
  Clock, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Play, 
  Code2, 
  Bookmark, 
  Share2, 
  MessageSquare, 
  Sparkles, 
  ExternalLink, 
  DollarSign, 
  Briefcase, 
  GraduationCap, 
  Send, 
  UserCheck,
  Check,
  Flame,
  Award
} from 'lucide-react';

export const FreelancerProfileView: React.FC = () => {
  const { 
    selectedFreelancerId, 
    freelancers, 
    setActiveView, 
    setHiringTargetFreelancer, 
    setIsHireModalOpen, 
    startOrOpenConversation, 
    toggleSaveFreelancer, 
    isFreelancerSaved,
    setShareData,
    setIsShareModalOpen,
    currentUser,
    addReview,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'portfolio' | 'pricing' | 'manifesto' | 'reviews'>('portfolio');
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  // Review Form State
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewProject, setNewReviewProject] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const freelancer = freelancers.find(f => f.id === selectedFreelancerId) || freelancers[0];
  const isSaved = isFreelancerSaved(freelancer?.id || '');

  if (!freelancer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="text-sm font-mono text-[var(--text-primary)]/60">Artisan profile not found.</p>
        <button
          onClick={() => setActiveView('directory')}
          className="px-6 py-2.5 bg-[var(--accent-primary)] text-white rounded-full text-xs font-bold uppercase"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  const handleHireClick = () => {
    setHiringTargetFreelancer(freelancer);
    setIsHireModalOpen(true);
  };

  const handleHirePackage = (pkgName: 'Basic' | 'Standard' | 'Premium') => {
    setHiringTargetFreelancer(freelancer);
    setIsHireModalOpen(true);
  };

  const handleMessageClick = () => {
    startOrOpenConversation(freelancer.id);
  };

  const handleShareClick = () => {
    setShareData({
      title: `${freelancer.name} — ${freelancer.profession}`,
      url: window.location.href,
      text: `Hire ${freelancer.name} on CraftLink: ${freelancer.profession}. Verified artisan rating ${freelancer.rating}★`
    });
    setIsShareModalOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      addToast('error', 'Authentication Required', 'Please sign in as a client to leave a review.');
      return;
    }
    if (!newReviewProject || !newReviewComment) {
      addToast('error', 'Missing Information', 'Please provide project title and feedback.');
      return;
    }

    setIsSubmittingReview(true);
    setTimeout(() => {
      addReview({
        freelancerId: freelancer.id,
        clientId: currentUser.id,
        clientName: currentUser.name,
        clientAvatar: currentUser.avatar,
        clientCompany: 'Verified Client',
        rating: newReviewRating,
        comment: newReviewComment,
        projectTitle: newReviewProject,
        date: 'Just now'
      });
      setNewReviewComment('');
      setNewReviewProject('');
      setIsSubmittingReview(false);
      addToast('success', 'Review Published', 'Thank you for endorsing this artisan.');
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Breadcrumb / Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveView('directory')}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]/60 hover:text-[var(--accent-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Artisan Directory</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareClick}
            className="p-2 bg-[var(--bg-card)] border border-[var(--border-subtle)]/10 hover:border-[var(--border-subtle)] rounded-full text-xs font-bold text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
            title="Share Profile"
          >
            <Share2 className="w-4 h-4 text-[var(--accent-primary)]" />
          </button>
          <button
            onClick={() => toggleSaveFreelancer(freelancer.id)}
            className={`p-2 rounded-full border transition-colors ${
              isSaved
                ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
                : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-subtle)]/10 hover:border-[#1A1A1A]'
            }`}
            title={isSaved ? 'Remove from Shortlist' : 'Save to Shortlist'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Profile Header Banner */}
      <div className="bg-[var(--bg-card)] rounded-3xl border-2 border-[var(--border-subtle)] p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Editorial Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[var(--accent-primary)]"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Avatar and Badges */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
            <div className="relative">
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-4 border-[var(--border-subtle)] shadow-md"
              />
              {freelancer.availability === 'available' && (
                <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border-2 border-white flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--bg-card)] animate-pulse"></span>
                  <span>Available</span>
                </div>
              )}
            </div>

            <div className="space-y-1 w-full">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                {freelancer.isVerifiedPro && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--bg-elevated)] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>Verified Pro Artisan</span>
                  </span>
                )}
                {freelancer.isTopRated && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--accent-primary)] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    <Award className="w-3.5 h-3.5" />
                    <span>Top Rated 1%</span>
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-[var(--text-primary)]/70 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span>{freelancer.location}</span>
                </span>
                <span>•</span>
                <span>{freelancer.timezone}</span>
              </div>
            </div>
          </div>

          {/* Profile Identity & Core Metrics */}
          <div className="lg:col-span-5 space-y-4 text-center sm:text-left">
            <div>
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)] italic tracking-tight">
                {freelancer.name}
              </h1>
              <p className="text-sm sm:text-base font-bold text-[var(--accent-primary)] mt-1 font-sans">
                {freelancer.profession}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-primary)]/80 leading-relaxed font-sans">
              "{freelancer.bio}"
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[var(--border-subtle)]/10 text-center">
              <div className="bg-[var(--bg-secondary)] p-2.5 rounded-xl border border-[var(--border-subtle)]/5">
                <div className="flex items-center justify-center gap-1 text-[var(--accent-primary)] font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-[var(--accent-primary)]" />
                  <span>{freelancer.rating}</span>
                </div>
                <span className="text-[10px] text-[var(--text-primary)]/60 font-mono">({freelancer.reviewsCount} reviews)</span>
              </div>

              <div className="bg-[var(--bg-secondary)] p-2.5 rounded-xl border border-[var(--border-subtle)]/5">
                <p className="font-display font-bold text-xs text-[var(--text-primary)]">{freelancer.completedProjectsCount}+</p>
                <span className="text-[10px] text-[var(--text-primary)]/60 font-mono">Jobs Completed</span>
              </div>

              <div className="bg-[var(--bg-secondary)] p-2.5 rounded-xl border border-[var(--border-subtle)]/5">
                <p className="font-display font-bold text-xs text-emerald-600">{freelancer.onTimeDeliveryRate}%</p>
                <span className="text-[10px] text-[var(--text-primary)]/60 font-mono">On-Time Rate</span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Card */}
          <div className="lg:col-span-3 bg-[var(--bg-elevated)] text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Standard Rates</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-display font-black text-3xl italic">${freelancer.hourlyRate}</span>
                <span className="text-xs font-mono text-white/50">/ hour</span>
              </div>
              <p className="text-[11px] text-white/70 font-mono mt-1">
                Starting package: <strong className="text-white">${freelancer.startingPrice}</strong>
              </p>
              <p className="text-[10px] text-white/50 font-mono mt-0.5">
                Avg Response: {freelancer.responseTime}
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleHireClick}
                className="w-full py-3.5 bg-[var(--accent-primary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] text-white rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hire Artisan</span>
              </button>

              <button
                onClick={handleMessageClick}
                className="w-full py-3 bg-[var(--bg-card)]/10 hover:bg-[var(--bg-card)]/20 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Direct Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex border-b-2 border-[var(--border-subtle)]/10 gap-2 sm:gap-6 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('portfolio')}
          className={`pb-4 px-2 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'portfolio'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>Portfolio & Works ({freelancer.portfolio.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`pb-4 px-2 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'pricing'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Pricing Packages</span>
        </button>

        <button
          onClick={() => setActiveTab('manifesto')}
          className={`pb-4 px-2 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'manifesto'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Story & Verified Skills</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-4 px-2 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
              : 'border-transparent text-[var(--text-primary)]/60 hover:text-[#1A1A1A]'
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          <span>Verified Client Reviews ({freelancer.reviews?.length || 0})</span>
        </button>
      </div>

      {/* Tab 1: Interactive Portfolio Showcase */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">
              Verified Production Works & Case Studies
            </h3>
            <span className="text-xs text-[var(--text-primary)]/50 font-mono">
              Click any project to inspect live cut / architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelancer.portfolio.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPortfolioItem(item)}
                className="group bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)]/10 hover:border-[var(--accent-primary)] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
                      {item.mediaType === 'video' ? (
                        <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      ) : item.mediaType === 'code' ? (
                        <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] text-emerald-400 border border-emerald-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Code2 className="w-5 h-5" />
                        </div>
                      ) : null}
                    </div>

                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono font-bold uppercase rounded-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-display font-black text-lg text-[var(--text-primary)] italic group-hover:text-[var(--accent-primary)] transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[var(--text-primary)]/70 line-clamp-2 leading-relaxed font-sans">
                      {item.description}
                    </p>

                    {item.metrics && (
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>{item.metrics}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[var(--border-subtle)]/5 flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono text-[var(--text-primary)]/50 bg-[var(--bg-secondary)] px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="font-bold text-[var(--accent-primary)] group-hover:underline flex items-center gap-1">
                    Inspect Deliverable →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Pricing Packages Comparison Table */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[var(--text-primary)] italic">
              Standard Service Packages
            </h3>
            <p className="text-xs text-[var(--text-primary)]/60">
              Select a standardized package or hire directly with custom escrow milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Tier */}
            <div className="bg-[var(--bg-card)] rounded-2xl border-2 border-[var(--border-subtle)]/10 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:border-[var(--border-subtle)] transition-colors">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-primary)]/50 font-bold">Tier 01</span>
                  <h4 className="font-display font-black text-2xl text-[var(--text-primary)] italic">{freelancer.pricingPackages.basic.title}</h4>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-display font-black text-3xl text-[var(--text-primary)]">${freelancer.pricingPackages.basic.price}</span>
                    <span className="text-xs text-[var(--text-primary)]/50 font-mono">USD</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed font-sans">
                  {freelancer.pricingPackages.basic.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono py-3 border-y border-[var(--border-subtle)]/10 text-[var(--text-primary)]/80">
                  <div>
                    <span className="text-[10px] text-[var(--text-primary)]/50 block">Delivery</span>
                    <span className="font-bold">{freelancer.pricingPackages.basic.deliveryDays} Days</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-primary)]/50 block">Revisions</span>
                    <span className="font-bold">{freelancer.pricingPackages.basic.revisions} Rounds</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold">Included Deliverables:</p>
                  <ul className="space-y-2 text-xs text-[var(--text-primary)]/80">
                    {freelancer.pricingPackages.basic.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => handleHirePackage('Basic')}
                className="w-full py-3 bg-[var(--bg-elevated)] hover:bg-[var(--accent-primary)] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Select Basic Package
              </button>
            </div>

            {/* Standard Tier (Highlighted) */}
            <div className="bg-[var(--bg-elevated)] text-white rounded-2xl border-4 border-[var(--accent-primary)] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--accent-primary)] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
                Most Popular
              </span>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Tier 02</span>
                  <h4 className="font-display font-black text-2xl text-white italic">{freelancer.pricingPackages.standard.title}</h4>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-display font-black text-3xl text-white">${freelancer.pricingPackages.standard.price}</span>
                    <span className="text-xs text-white/50 font-mono">USD</span>
                  </div>
                </div>

                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  {freelancer.pricingPackages.standard.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono py-3 border-y border-white/15 text-white/90">
                  <div>
                    <span className="text-[10px] text-white/50 block">Delivery</span>
                    <span className="font-bold text-[var(--accent-primary)]">{freelancer.pricingPackages.standard.deliveryDays} Days</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block">Revisions</span>
                    <span className="font-bold text-[var(--accent-primary)]">{freelancer.pricingPackages.standard.revisions} Rounds</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent-primary)] font-bold">Included Deliverables:</p>
                  <ul className="space-y-2 text-xs text-white/80">
                    {freelancer.pricingPackages.standard.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => handleHirePackage('Standard')}
                className="w-full py-3.5 bg-[var(--accent-primary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] text-white rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
              >
                Select Standard Package
              </button>
            </div>

            {/* Premium Tier */}
            <div className="bg-[var(--bg-card)] rounded-2xl border-2 border-[var(--border-subtle)]/10 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:border-[var(--border-subtle)] transition-colors">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-primary)]/50 font-bold">Tier 03</span>
                  <h4 className="font-display font-black text-2xl text-[var(--text-primary)] italic">{freelancer.pricingPackages.premium.title}</h4>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-display font-black text-3xl text-[var(--text-primary)]">${freelancer.pricingPackages.premium.price}</span>
                    <span className="text-xs text-[var(--text-primary)]/50 font-mono">USD</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed font-sans">
                  {freelancer.pricingPackages.premium.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono py-3 border-y border-[var(--border-subtle)]/10 text-[var(--text-primary)]/80">
                  <div>
                    <span className="text-[10px] text-[var(--text-primary)]/50 block">Delivery</span>
                    <span className="font-bold">{freelancer.pricingPackages.premium.deliveryDays} Days</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-primary)]/50 block">Revisions</span>
                    <span className="font-bold">{freelancer.pricingPackages.premium.revisions} Rounds</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold">Included Deliverables:</p>
                  <ul className="space-y-2 text-xs text-[var(--text-primary)]/80">
                    {freelancer.pricingPackages.premium.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => handleHirePackage('Premium')}
                className="w-full py-3 bg-[var(--bg-elevated)] hover:bg-[var(--accent-primary)] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Select Premium Tier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Story, Skills & Work History */}
      {activeTab === 'manifesto' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            {/* Story */}
            <div className="bg-[var(--bg-card)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-4">
              <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">
                Artisan Story & Creative Manifesto
              </h3>
              <div className="text-xs sm:text-sm text-[var(--text-primary)]/80 leading-relaxed font-sans space-y-3">
                <p>{freelancer.aboutStory || freelancer.bio}</p>
              </div>
            </div>

            {/* Work History */}
            <div className="bg-[var(--bg-card)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-6">
              <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[var(--accent-primary)]" />
                <span>Production & Engineering Experience</span>
              </h3>

              <div className="space-y-6">
                {freelancer.workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-[var(--accent-primary)] space-y-1.5">
                    <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-[var(--bg-elevated)] border-2 border-white"></span>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-[var(--text-primary)]">{exp.role}</h4>
                      <span className="text-[11px] font-mono text-[var(--accent-primary)] font-bold">
                        {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-primary)]/60 font-mono">{exp.company} • {exp.location}</p>
                    <p className="text-xs text-[var(--text-primary)]/80 leading-relaxed font-sans pt-1">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Skills Matrix & Education */}
          <div className="lg:col-span-5 space-y-8">
            {/* Verified Skills */}
            <div className="bg-[var(--bg-card)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-4">
              <h3 className="font-display font-black text-xl text-[var(--text-primary)] italic flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--accent-primary)]" />
                <span>Verified Skills & Competencies</span>
              </h3>

              <div className="space-y-3">
                {freelancer.skills.map((skill, idx) => (
                  <div key={idx} className="p-3 bg-[var(--bg-secondary)] rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[var(--text-primary)]">{skill.name}</p>
                      <span className="text-[10px] text-[var(--text-primary)]/50 font-mono">{skill.category}</span>
                    </div>
                    <span className="px-2.5 py-1 bg-[var(--bg-elevated)] text-white text-[10px] font-mono font-bold uppercase rounded-md">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-[var(--bg-card)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-4">
              <h3 className="font-display font-black text-xl text-[var(--text-primary)] italic flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[var(--accent-primary)]" />
                <span>Education & Certification</span>
              </h3>

              <div className="space-y-4">
                {freelancer.education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <p className="text-xs font-bold text-[var(--text-primary)]">{edu.degree}</p>
                    <p className="text-xs text-[var(--accent-primary)] font-mono">{edu.institution}</p>
                    <p className="text-[11px] text-[var(--text-primary)]/50 font-mono">
                      {edu.field} • {edu.startYear} - {edu.endYear}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Verified Client Reviews */}
      {activeTab === 'reviews' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-black text-2xl text-[var(--text-primary)] italic">
              Verified Project Reviews ({freelancer.reviews?.length || 0})
            </h3>

            <div className="space-y-4">
              {freelancer.reviews && freelancer.reviews.length > 0 ? (
                freelancer.reviews.map((rev) => (
                  <div key={rev.id} className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.clientAvatar}
                          alt={rev.clientName}
                          className="w-10 h-10 rounded-full object-cover border border-[var(--border-subtle)]/10"
                        />
                        <div>
                          <p className="text-xs font-bold text-[var(--text-primary)]">{rev.clientName}</p>
                          <p className="text-[10px] text-[var(--text-primary)]/50 font-mono">{rev.clientCompany}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[var(--accent-primary)]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[var(--accent-primary)]" />
                        ))}
                      </div>
                    </div>

                    <p className="text-[11px] font-mono font-bold text-[var(--accent-primary)]">
                      Project: {rev.projectTitle}
                    </p>

                    <p className="text-xs text-[var(--text-primary)]/80 leading-relaxed font-sans italic">
                      "{rev.comment}"
                    </p>

                    {rev.reply && (
                      <div className="mt-3 pl-4 border-l-2 border-[var(--accent-primary)] bg-[var(--bg-secondary)] p-3 rounded-r-xl space-y-1">
                        <p className="text-[10px] font-mono font-bold text-[var(--text-primary)] flex items-center gap-1">
                          <span>{freelancer.name}</span>
                          <span className="text-[var(--text-primary)]/40">(Artisan Response):</span>
                        </p>
                        <p className="text-xs text-[var(--text-primary)]/70 font-sans">{rev.reply}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-[var(--text-primary)]/60 font-mono">No reviews recorded yet.</p>
              )}
            </div>
          </div>

          {/* Right Column: Leave a Review Form */}
          <div className="lg:col-span-5 bg-[var(--bg-card)] p-6 sm:p-8 rounded-2xl border border-[var(--border-subtle)]/10 shadow-2xs space-y-4">
            <h3 className="font-display font-black text-xl text-[var(--text-primary)] italic">
              Leave a Verified Client Review
            </h3>
            <p className="text-xs text-[var(--text-primary)]/60 font-sans">
              Have you worked with {freelancer.name}? Share your feedback on delivery speed, communication, and craft quality.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 text-[var(--accent-primary)]"
                    >
                      <Star className={`w-6 h-6 ${star <= newReviewRating ? 'fill-[var(--accent-primary)]' : 'text-[var(--text-primary)]/20'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-mono font-bold ml-2">{newReviewRating}.0 / 5.0</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold mb-1">
                  Project Title / Scope
                </label>
                <input
                  type="text"
                  required
                  value={newReviewProject}
                  onChange={(e) => setNewReviewProject(e.target.value)}
                  placeholder="e.g. YouTube 20-min Mini-Doc or Next.js Architecture"
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/15 rounded-xl text-xs focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold mb-1">
                  Your Review & Experience
                </label>
                <textarea
                  rows={4}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe your satisfaction with the deliverable quality, turnaround time, and communication..."
                  className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/15 rounded-xl text-xs focus:outline-none focus:border-[var(--accent-primary)] leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full py-3 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] text-white rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Endorsement</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Portfolio Lightbox Modal */}
      <PortfolioLightbox
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
        onHireCreator={handleHireClick}
      />
    </div>
  );
};

