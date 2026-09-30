'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  FreelancerProfile, 
  ClientProfile, 
  HiringRequest, 
  Conversation, 
  Message, 
  AppNotification, 
  AdminReport, 
  VerificationRequest, 
  CategoryInfo,
  UserRole,
  Review,
  Job,
  JobApplication,
  PortfolioProject,
} from '@/types';
import { 
  INITIAL_FREELANCERS, 
  INITIAL_CLIENTS, 
  INITIAL_USERS, 
  INITIAL_HIRING_REQUESTS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_ADMIN_REPORTS, 
  INITIAL_VERIFICATIONS, 
  INITIAL_CATEGORIES,
  INITIAL_REVIEWS
} from '@/data/mockData';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  currentUser: User | null;
  currentRole: UserRole | 'guest';
  currentFreelancerProfile: FreelancerProfile | null;
  currentClientProfile: ClientProfile | null;
  users: User[];
  freelancers: FreelancerProfile[];
  clients: ClientProfile[];
  hiringRequests: HiringRequest[];
  conversations: Conversation[];
  messages: Message[];
  notifications: AppNotification[];
  adminReports: AdminReport[];
  verifications: VerificationRequest[];
  categories: CategoryInfo[];
  reviews: Review[];

  // Jobs
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  createJob: (job: Omit<Job, 'id' | 'postedAt' | 'updatedAt' | 'applicantsCount' | 'status'>) => void;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  deleteJob: (jobId: string) => void;
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;

  // Applications
  applications: JobApplication[];
  submitApplication: (app: Omit<JobApplication, 'id' | 'appliedAt' | 'updatedAt' | 'status'>) => Promise<boolean>;
  updateApplicationStatus: (appId: string, status: JobApplication['status']) => void;
  deleteApplication: (appId: string) => void;

  // Portfolio Projects
  portfolioProjects: PortfolioProject[];
  createPortfolioProject: (project: Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePortfolioProject: (id: string, updates: Partial<PortfolioProject>) => void;
  deletePortfolioProject: (id: string) => void;
  
  // Navigation & View State
  activeView: string;
  setActiveView: (view: string) => void;
  selectedFreelancerId: string | null;
  setSelectedFreelancerId: (id: string | null) => void;
  selectedConversationId: string | null;
  setSelectedConversationId: (id: string | null) => void;
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals state
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isHireModalOpen: boolean;
  setIsHireModalOpen: (open: boolean) => void;
  hiringTargetFreelancer: FreelancerProfile | null;
  setHiringTargetFreelancer: (fl: FreelancerProfile | null) => void;
  isProfileEditorOpen: boolean;
  setIsProfileEditorOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  shareData: { title: string; url: string; text: string } | null;
  setShareData: (data: { title: string; url: string; text: string } | null) => void;

  // Actions
  switchUser: (role: UserRole | 'guest', customUserId?: string) => void;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  updateFreelancerProfile: (profile: Partial<FreelancerProfile>) => void;
  updateClientProfile: (profile: Partial<ClientProfile>) => void;
  toggleSaveFreelancer: (freelancerId: string) => void;
  isFreelancerSaved: (freelancerId: string) => boolean;
  createHiringRequest: (request: Omit<HiringRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateHiringRequestStatus: (requestId: string, status: HiringRequest['status'], reason?: string) => void;
  toggleMilestoneComplete: (requestId: string, milestoneId: string) => void;
  submitMilestoneDeliverable: (requestId: string, notes: string, fileUrls: string[]) => void;
  submitClientReview: (requestId: string, freelancerId: string, rating: number, comment: string) => void;
  addFreelancerReviewReply: (reviewId: string, replyText: string) => void;
  
  // Messaging Actions
  sendMessage: (conversationId: string, content: string, attachments?: any[], quoteProposal?: any) => void;
  startOrOpenConversation: (freelancerId: string) => void;
  acceptQuoteProposal: (messageId: string, conversationId: string) => void;

  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;

  // Admin Actions
  verifyFreelancer: (freelancerId: string, approved: boolean, notes?: string) => void;
  toggleBanUser: (freelancerId: string) => void;
  resolveReport: (reportId: string, resolutionNotes: string) => void;
  addCategory: (category: Omit<CategoryInfo, 'id' | 'freelancersCount'>) => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'info' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // SSR-safe: use mock data as default, hydrate from localStorage on client via useEffect
  const safeLS = (key: string) => {
    if (typeof window === 'undefined') return null;
    try { return localStorage.getItem(key); } catch { return null; }
  };

  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [freelancers, setFreelancers] = useState<FreelancerProfile[]>(INITIAL_FREELANCERS);
  const [clients, setClients] = useState<ClientProfile[]>(INITIAL_CLIENTS);
  const [hiringRequests, setHiringRequests] = useState<HiringRequest[]>(INITIAL_HIRING_REQUESTS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [adminReports, setAdminReports] = useState<AdminReport[]>(INITIAL_ADMIN_REPORTS);
  const [verifications, setVerifications] = useState<VerificationRequest[]>(INITIAL_VERIFICATIONS);
  const [categories, setCategories] = useState<CategoryInfo[]>(INITIAL_CATEGORIES);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[0]);

  // Jobs, Applications, Portfolio Projects
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Hydrate from localStorage after mount (client-only)
  useEffect(() => {
    const ls = (key: string, fallback: any) => { const s = safeLS(key); return s ? JSON.parse(s) : fallback; };
    setUsers(ls('craftlink_users', INITIAL_USERS));
    setFreelancers(ls('craftlink_freelancers', INITIAL_FREELANCERS));
    setClients(ls('craftlink_clients', INITIAL_CLIENTS));
    setHiringRequests(ls('craftlink_hiring_requests', INITIAL_HIRING_REQUESTS));
    setConversations(ls('craftlink_conversations', INITIAL_CONVERSATIONS));
    setMessages(ls('craftlink_messages', INITIAL_MESSAGES));
    setNotifications(ls('craftlink_notifications', INITIAL_NOTIFICATIONS));
    setAdminReports(ls('craftlink_admin_reports', INITIAL_ADMIN_REPORTS));
    setVerifications(ls('craftlink_verifications', INITIAL_VERIFICATIONS));
    setCategories(ls('craftlink_categories', INITIAL_CATEGORIES));
    setReviews(ls('craftlink_reviews', INITIAL_REVIEWS));
    setCurrentUser(ls('craftlink_current_user', INITIAL_USERS[0]));
    setJobs(ls('craftlink_jobs', []));
    setApplications(ls('craftlink_applications', []));
    setPortfolioProjects(ls('craftlink_portfolio_projects', []));
  }, []);


  // View Routing State
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedFreelancerId, setSelectedFreelancerId] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [hiringTargetFreelancer, setHiringTargetFreelancer] = useState<FreelancerProfile | null>(null);
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareData, setShareData] = useState<{ title: string; url: string; text: string } | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('craftlink_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('craftlink_freelancers', JSON.stringify(freelancers));
  }, [freelancers]);

  useEffect(() => {
    localStorage.setItem('craftlink_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('craftlink_hiring_requests', JSON.stringify(hiringRequests));
  }, [hiringRequests]);

  useEffect(() => {
    localStorage.setItem('craftlink_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('craftlink_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('craftlink_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('craftlink_admin_reports', JSON.stringify(adminReports));
  }, [adminReports]);

  useEffect(() => {
    localStorage.setItem('craftlink_verifications', JSON.stringify(verifications));
  }, [verifications]);

  useEffect(() => {
    localStorage.setItem('craftlink_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('craftlink_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('craftlink_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('craftlink_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('craftlink_portfolio_projects', JSON.stringify(portfolioProjects));
  }, [portfolioProjects]);

  // Derived profiles
  const currentRole: UserRole | 'guest' = currentUser?.role || 'guest';
  const currentFreelancerProfile = currentUser?.freelancerProfileId 
    ? freelancers.find(f => f.id === currentUser.freelancerProfileId) || null 
    : null;
  const currentClientProfile = currentUser?.clientProfileId 
    ? clients.find(c => c.id === currentUser.clientProfileId) || null 
    : null;

  const unreadNotificationsCount = currentUser 
    ? notifications.filter(n => n.userId === currentUser.id && !n.read).length 
    : 0;

  // Role / User Switcher helper
  const switchUser = (role: UserRole | 'guest', customUserId?: string) => {
    if (role === 'guest') {
      setCurrentUser(null);
      addToast('info', 'Logged Out', 'You are now viewing CraftLink as a visitor.');
      return;
    }

    let targetUser: User | undefined;
    if (customUserId) {
      targetUser = users.find(u => u.id === customUserId);
    } else if (role === 'client') {
      targetUser = users.find(u => u.role === 'client');
    } else if (role === 'freelancer') {
      targetUser = users.find(u => u.role === 'freelancer');
    } else if (role === 'admin') {
      targetUser = users.find(u => u.role === 'admin');
    }

    if (targetUser) {
      setCurrentUser(targetUser);
      addToast('success', `Switched Role`, `Now operating as ${targetUser.name} (${targetUser.role.toUpperCase()})`);
    }
  };

  const login = (email: string, role: UserRole) => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      addToast('success', 'Welcome Back', `Logged in as ${existing.name}`);
      setIsAuthModalOpen(false);
      return;
    }

    // Create new demo user
    const newUserId = 'usr-' + Date.now();
    let freelancerProfileId: string | undefined;
    let clientProfileId: string | undefined;

    if (role === 'freelancer') {
      freelancerProfileId = 'fl-' + Date.now();
      const newFl: FreelancerProfile = {
        id: freelancerProfileId,
        userId: newUserId,
        name: email.split('@')[0],
        username: email.split('@')[0].toLowerCase(),
        email: email,
        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${email}`,
        bannerImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
        profession: 'Video Editor & Creative Developer',
        primaryCategory: 'video_editing',
        bio: 'Passionate creative dedicated to narrative craft and high-impact digital output.',
        aboutStory: 'Ready to collaborate on visionary projects.',
        location: 'Remote',
        timezone: 'UTC',
        hourlyRate: 75,
        startingPrice: 300,
        experienceYears: 4,
        rating: 5.0,
        reviewsCount: 0,
        completedProjectsCount: 0,
        onTimeDeliveryRate: 100,
        responseTime: '< 30 mins',
        availability: 'available',
        isVerifiedPro: false,
        isTopRated: false,
        featured: false,
        skills: [
          { name: 'Premiere Pro', level: 'Expert', category: 'Video & Motion' },
          { name: 'React', level: 'Expert', category: 'Development' }
        ],
        portfolio: [],
        workExperience: [],
        education: [],
        pricingPackages: {
          basic: {
            name: 'Basic',
            title: 'Starter Package',
            price: 300,
            deliveryTimeDays: 3,
            revisions: 2,
            description: 'Core project deliverable with professional finish.',
            features: ['Initial concept', 'High quality export', '2 Revisions']
          },
          standard: {
            name: 'Standard',
            title: 'Complete Production Package',
            price: 750,
            deliveryTimeDays: 6,
            revisions: 3,
            description: 'Comprehensive deliverable with sound design and polishing.',
            features: ['Full timeline mastering', 'Source files', 'Priority support']
          },
          premium: {
            name: 'Premium',
            title: 'Elite Brand Tier',
            price: 1500,
            deliveryTimeDays: 10,
            revisions: 'Unlimited',
            description: 'Top-of-the-line deliverable with dedicated communication and all cutdowns.',
            features: ['Commercial licensing', 'Unlimited revisions', 'Omni-channel exports']
          }
        },
        socialLinks: {}
      };
      setFreelancers(prev => [newFl, ...prev]);
    } else {
      clientProfileId = 'cli-' + Date.now();
      const newCli: ClientProfile = {
        id: clientProfileId,
        userId: newUserId,
        name: email.split('@')[0],
        username: email.split('@')[0].toLowerCase(),
        email: email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
        companyName: 'Creator & Co.',
        industry: 'Digital Media',
        location: 'Remote',
        bio: 'Hiring verified talent for digital creative projects.',
        totalHires: 0,
        totalSpent: 0,
        savedFreelancerIds: []
      };
      setClients(prev => [newCli, ...prev]);
    }

    const newUser: User = {
      id: newUserId,
      name: email.split('@')[0],
      email: email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
      role: role,
      freelancerProfileId,
      clientProfileId,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    addToast('success', 'Account Created', `Welcome to CraftLink as a ${role}!`);
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('home');
    addToast('info', 'Logged Out', 'You have been securely signed out.');
  };

  // Freelancer Profile Updates
  const updateFreelancerProfile = (updated: Partial<FreelancerProfile>) => {
    if (!currentFreelancerProfile) return;
    setFreelancers(prev => prev.map(f => {
      if (f.id === currentFreelancerProfile.id) {
        return { ...f, ...updated };
      }
      return f;
    }));
    addToast('success', 'Profile Updated', 'Your changes have been saved to your public portfolio.');
  };

  // Client Profile Updates
  const updateClientProfile = (updated: Partial<ClientProfile>) => {
    if (!currentClientProfile) return;
    setClients(prev => prev.map(c => {
      if (c.id === currentClientProfile.id) {
        return { ...c, ...updated };
      }
      return c;
    }));
    addToast('success', 'Profile Updated', 'Client profile updated successfully.');
  };

  // Save / Bookmark Freelancer
  const toggleSaveFreelancer = (freelancerId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      addToast('info', 'Sign in Required', 'Please sign in to save talent to your shortlist.');
      return;
    }
    if (!currentClientProfile) {
      addToast('info', 'Client Action', 'Switch to a Client profile to bookmark talent.');
      return;
    }

    const isSaved = currentClientProfile.savedFreelancerIds.includes(freelancerId);
    const newSaved = isSaved 
      ? currentClientProfile.savedFreelancerIds.filter(id => id !== freelancerId)
      : [...currentClientProfile.savedFreelancerIds, freelancerId];

    updateClientProfile({ savedFreelancerIds: newSaved });

    if (!isSaved) {
      addToast('success', 'Saved to Shortlist', 'Talent added to your favorite creators list.');
    } else {
      addToast('info', 'Removed', 'Talent removed from your shortlist.');
    }
  };

  const isFreelancerSaved = (freelancerId: string) => {
    return currentClientProfile?.savedFreelancerIds.includes(freelancerId) || false;
  };

  // Create Hiring Request
  const createHiringRequest = (requestData: Omit<HiringRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newRequest: HiringRequest = {
      ...requestData,
      id: 'req-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setHiringRequests(prev => [newRequest, ...prev]);

    // Send a notification to the target freelancer
    const targetFl = freelancers.find(f => f.id === requestData.freelancerId);
    if (targetFl) {
      const newNotif: AppNotification = {
        id: 'notif-' + Date.now(),
        userId: targetFl.userId,
        type: 'hiring_request',
        title: `New Hiring Proposal from ${requestData.clientName}`,
        description: `Project: "${requestData.projectTitle}" ($${requestData.budgetAmount})`,
        timestamp: 'Just now',
        read: false,
        linkType: 'hiring',
        targetId: newRequest.id
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EB5E28', '#1A1A1A', '#FDFCF9', '#F4A261']
      });
    } catch {
      // ignore
    }

    addToast('success', 'Hiring Proposal Sent!', `Proposal sent to ${requestData.freelancerName}. Funds held securely in CraftLink Escrow.`);
    setIsHireModalOpen(false);
  };

  // Update Contract Status
  const updateHiringRequestStatus = (requestId: string, status: HiringRequest['status'], reason?: string) => {
    setHiringRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status,
          rejectionReason: reason || req.rejectionReason,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return req;
    }));

    const req = hiringRequests.find(r => r.id === requestId);
    if (!req) return;

    if (status === 'accepted') {
      addToast('success', 'Project Accepted', `You have accepted "${req.projectTitle}". Escrow is active!`);
      // Notify client
      const client = users.find(u => u.clientProfileId === req.clientId);
      if (client) {
        setNotifications(prev => [{
          id: 'notif-' + Date.now(),
          userId: client.id,
          type: 'contract_update',
          title: `Proposal Accepted!`,
          description: `${req.freelancerName} accepted your project "${req.projectTitle}".`,
          timestamp: 'Just now',
          read: false,
          linkType: 'hiring',
          targetId: req.id
        }, ...prev]);
      }
    } else if (status === 'rejected') {
      addToast('info', 'Project Declined', `You declined "${req.projectTitle}". Funds returned to client.`);
    } else if (status === 'completed') {
      addToast('success', 'Project Completed!', `Escrow funds of $${req.budgetAmount} released to ${req.freelancerName}.`);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#EB5E28', '#2A9D8F', '#E76F51']
        });
      } catch {}
    }
  };

  // Toggle milestone completion
  const toggleMilestoneComplete = (requestId: string, milestoneId: string) => {
    setHiringRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        const updatedMilestones = req.milestones.map(m => {
          if (m.id === milestoneId) {
            return { ...m, completed: !m.completed };
          }
          return m;
        });
        return { ...req, milestones: updatedMilestones };
      }
      return req;
    }));
    addToast('success', 'Milestone Updated', 'Milestone status updated.');
  };

  // Submit Milestone Deliverables
  const submitMilestoneDeliverable = (requestId: string, notes: string, fileUrls: string[]) => {
    setHiringRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'in_review',
          deliverables: {
            notes,
            fileUrls,
            submittedAt: new Date().toISOString()
          },
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return req;
    }));

    addToast('success', 'Deliverables Submitted!', 'Client has been notified to review and approve.');
  };

  // Client Review submission
  const submitClientReview = (requestId: string, freelancerId: string, rating: number, comment: string) => {
    if (!currentUser || !currentClientProfile) return;

    const newReview: Review = {
      id: 'rev-' + Date.now(),
      freelancerId,
      clientId: currentClientProfile.id,
      clientName: currentClientProfile.name,
      clientAvatar: currentClientProfile.avatar,
      clientCompany: currentClientProfile.companyName,
      rating,
      date: 'Just now',
      projectTitle: hiringRequests.find(r => r.id === requestId)?.projectTitle || 'Commissioned Project',
      comment
    };

    setReviews(prev => [newReview, ...prev]);

    // Update freelancer's aggregate rating
    setFreelancers(prev => prev.map(fl => {
      if (fl.id === freelancerId) {
        const currentCount = fl.reviewsCount || 1;
        const newRating = Number(((fl.rating * currentCount + rating) / (currentCount + 1)).toFixed(2));
        return {
          ...fl,
          rating: newRating,
          reviewsCount: currentCount + 1
        };
      }
      return fl;
    }));

    // Update request with client feedback
    setHiringRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'completed',
          clientFeedback: {
            rating,
            comment,
            submittedAt: new Date().toISOString()
          }
        };
      }
      return r;
    }));

    addToast('success', 'Review Published', 'Thank you for rating your creator!');
  };

  const addFreelancerReviewReply = (reviewId: string, replyText: string) => {
    setReviews(prev => prev.map(r => {
      if (r.id === reviewId) {
        return { ...r, freelancerReply: replyText };
      }
      return r;
    }));
    addToast('success', 'Reply Added', 'Your public reply to this review was posted.');
  };

  // Messaging Functions
  const sendMessage = (conversationId: string, content: string, attachments?: any[], quoteProposal?: any) => {
    if (!currentUser) return;

    const conv = conversations.find(c => c.id === conversationId);
    if (!conv) return;

    const recipientId = conv.participantIds.find(p => p !== currentUser.id) || '';

    const newMsg: Message = {
      id: 'msg-' + Date.now(),
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      senderRole: currentUser.role,
      recipientId,
      content,
      createdAt: new Date().toISOString(),
      attachments,
      quoteProposal
    };

    setMessages(prev => [...prev, newMsg]);

    // Update conversation snippet
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: content || (quoteProposal ? `Quote Proposal: $${quoteProposal.amount}` : 'Sent an attachment'),
          lastMessageTime: 'Just now'
        };
      }
      return c;
    }));

    // Automated human-like reply simulation if client messages Julian Ross
    if (currentUser.role === 'client' && conv.freelancerId === 'fl-1') {
      setTimeout(() => {
        const autoReply: Message = {
          id: 'msg-auto-' + Date.now(),
          conversationId,
          senderId: 'usr-fl-1',
          senderName: 'Julian Ross',
          senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
          senderRole: 'freelancer',
          recipientId: currentUser.id,
          content: 'Got it! I am reviewing your notes and timeline now. Let me know if you need any specific video codecs or frame rates for the final exports.',
          createdAt: new Date().toISOString()
        };
        setMessages(prev => [...prev, autoReply]);
        setConversations(prev => prev.map(c => {
          if (c.id === conversationId) {
            return {
              ...c,
              lastMessage: autoReply.content,
              lastMessageTime: 'Just now'
            };
          }
          return c;
        }));
      }, 1800);
    }
  };

  const startOrOpenConversation = (freelancerId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const fl = freelancers.find(f => f.id === freelancerId);
    if (!fl) return;

    // Check if conversation exists
    let conv = conversations.find(c => 
      c.freelancerId === freelancerId && (currentUser.clientProfileId ? c.clientId === currentUser.clientProfileId : true)
    );

    if (!conv) {
      const newConvId = 'conv-' + Date.now();
      const newConv: Conversation = {
        id: newConvId,
        participantIds: [currentUser.id, fl.userId],
        clientId: currentClientProfile?.id || 'cli-guest',
        clientName: currentUser.name,
        clientAvatar: currentUser.avatar,
        clientCompany: currentClientProfile?.companyName,
        freelancerId: fl.id,
        freelancerName: fl.name,
        freelancerAvatar: fl.avatar,
        freelancerProfession: fl.profession,
        lastMessage: 'Direct conversation started.',
        lastMessageTime: 'Just now',
        unreadCountClient: 0,
        unreadCountFreelancer: 0
      };
      setConversations(prev => [newConv, ...prev]);
      setSelectedConversationId(newConvId);
    } else {
      setSelectedConversationId(conv.id);
    }

    setActiveView('messages');
  };

  const acceptQuoteProposal = (messageId: string, conversationId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === messageId && m.quoteProposal) {
        return {
          ...m,
          quoteProposal: {
            ...m.quoteProposal,
            status: 'accepted'
          }
        };
      }
      return m;
    }));

    addToast('success', 'Quote Accepted!', 'Direct proposal accepted. Escrow initialized.');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    if (!currentUser) return;
    setNotifications(prev => prev.map(n => n.userId === currentUser.id ? { ...n, read: true } : n));
    addToast('info', 'Notifications', 'All notifications marked as read.');
  };

  // Admin Operations
  const verifyFreelancer = (freelancerId: string, approved: boolean, notes?: string) => {
    setFreelancers(prev => prev.map(f => {
      if (f.id === freelancerId) {
        return { ...f, isVerifiedPro: approved };
      }
      return f;
    }));

    setVerifications(prev => prev.map(v => {
      if (v.freelancerId === freelancerId) {
        return {
          ...v,
          status: approved ? 'approved' : 'rejected',
          reviewerNotes: notes
        };
      }
      return v;
    }));

    addToast(
      approved ? 'success' : 'info', 
      approved ? 'Pro Badge Granted' : 'Verification Rejected',
      `Freelancer ${approved ? 'verified with Pro Artisan badge' : 'verification request declined'}.`
    );
  };

  const toggleBanUser = (freelancerId: string) => {
    setFreelancers(prev => prev.map(f => {
      if (f.id === freelancerId) {
        const newStatus = !f.isBanned;
        return { ...f, isBanned: newStatus };
      }
      return f;
    }));
    addToast('info', 'User Status Updated', 'Account access flag updated in admin ledger.');
  };

  const resolveReport = (reportId: string, resolutionNotes: string) => {
    setAdminReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: 'resolved',
          resolutionNotes
        };
      }
      return r;
    }));
    addToast('success', 'Dispute Resolved', 'Report updated with resolution record.');
  };

  const addCategory = (categoryData: Omit<CategoryInfo, 'id' | 'freelancersCount'>) => {
    const newCat: CategoryInfo = {
      ...categoryData,
      id: 'cat-' + Date.now(),
      freelancersCount: 0
    };
    setCategories(prev => [...prev, newCat]);
    addToast('success', 'Category Created', `Added "${categoryData.name}" to directory.`);
  };

  /* ─────────────────────────────────────────────
     JOB ACTIONS
  ───────────────────────────────────────────── */
  const createJob = (jobData: Omit<Job, 'id' | 'postedAt' | 'updatedAt' | 'applicantsCount' | 'status'>) => {
    const now = new Date().toISOString();
    const newJob: Job = {
      ...jobData,
      id: 'job-' + Date.now(),
      status: 'open',
      postedAt: now,
      updatedAt: now,
      applicantsCount: 0,
    };
    setJobs(prev => [newJob, ...prev]);
    addToast('success', 'Job Posted', `"${newJob.title}" is now live.`);
  };

  const updateJob = (jobId: string, updates: Partial<Job>) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, ...updates, updatedAt: new Date().toISOString() } : j));
    addToast('success', 'Job Updated', 'Job listing has been updated.');
  };

  const deleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
    setApplications(prev => prev.filter(a => a.jobId !== jobId));
    addToast('info', 'Job Deleted', 'Job and all related applications removed.');
  };

  /* ─────────────────────────────────────────────
     APPLICATION ACTIONS
  ───────────────────────────────────────────── */
  const submitApplication = async (appData: Omit<JobApplication, 'id' | 'appliedAt' | 'updatedAt' | 'status'>): Promise<boolean> => {
    // Check duplicate
    const alreadyApplied = applications.some(a => a.jobId === appData.jobId && a.creatorId === appData.creatorId);
    if (alreadyApplied) {
      addToast('error', 'Already Applied', 'You have already applied to this job.');
      return false;
    }
    const now = new Date().toISOString();
    const newApp: JobApplication = {
      ...appData,
      id: 'app-' + Date.now(),
      status: 'Pending',
      appliedAt: now,
      updatedAt: now,
    };
    setApplications(prev => [newApp, ...prev]);
    // Increment job applicants count
    setJobs(prev => prev.map(j => j.id === appData.jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j));
    // Notify the client
    const clientUser = users.find(u => u.clientProfileId === appData.clientId);
    if (clientUser) {
      const notif: AppNotification = {
        id: 'notif-' + Date.now(),
        userId: clientUser.id,
        type: 'job_application',
        title: 'New Job Application',
        description: `${appData.creatorName} applied to "${appData.jobTitle}".`,
        timestamp: 'Just now',
        read: false,
        linkType: 'jobs',
      };
      setNotifications(prev => [notif, ...prev]);
    }
    addToast('success', 'Application Submitted!', 'Your application has been sent to the client.');
    return true;
  };

  const updateApplicationStatus = (appId: string, status: JobApplication['status']) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status, updatedAt: new Date().toISOString() } : a));
    addToast('success', 'Status Updated', `Application marked as ${status}.`);
  };

  const deleteApplication = (appId: string) => {
    const app = applications.find(a => a.id === appId);
    if (app) {
      setJobs(prev => prev.map(j => j.id === app.jobId ? { ...j, applicantsCount: Math.max(0, j.applicantsCount - 1) } : j));
    }
    setApplications(prev => prev.filter(a => a.id !== appId));
    addToast('info', 'Application Withdrawn', 'Application removed.');
  };

  /* ─────────────────────────────────────────────
     PORTFOLIO PROJECT ACTIONS
  ───────────────────────────────────────────── */
  const createPortfolioProject = (projectData: Omit<PortfolioProject, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProject: PortfolioProject = {
      ...projectData,
      id: 'proj-' + Date.now(),
      createdAt: now,
      updatedAt: now,
    };
    setPortfolioProjects(prev => [newProject, ...prev]);
    addToast('success', 'Project Added', `"${newProject.title}" added to your portfolio.`);
  };

  const updatePortfolioProject = (id: string, updates: Partial<PortfolioProject>) => {
    setPortfolioProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
    addToast('success', 'Project Updated', 'Portfolio project updated successfully.');
  };

  const deletePortfolioProject = (id: string) => {
    setPortfolioProjects(prev => prev.filter(p => p.id !== id));
    addToast('info', 'Project Deleted', 'Portfolio project removed.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentFreelancerProfile,
        currentClientProfile,
        users,
        freelancers,
        clients,
        hiringRequests,
        conversations,
        messages,
        notifications,
        adminReports,
        verifications,
        categories,
        reviews,

        jobs,
        setJobs,
        createJob,
        updateJob,
        deleteJob,
        selectedJobId,
        setSelectedJobId,

        applications,
        submitApplication,
        updateApplicationStatus,
        deleteApplication,

        portfolioProjects,
        createPortfolioProject,
        updatePortfolioProject,
        deletePortfolioProject,

        activeView,
        setActiveView,
        selectedFreelancerId,
        setSelectedFreelancerId,
        selectedConversationId,
        setSelectedConversationId,
        selectedCategorySlug,
        setSelectedCategorySlug,
        searchQuery,
        setSearchQuery,

        isAuthModalOpen,
        setIsAuthModalOpen,
        isHireModalOpen,
        setIsHireModalOpen,
        hiringTargetFreelancer,
        setHiringTargetFreelancer,
        isProfileEditorOpen,
        setIsProfileEditorOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        shareData,
        setShareData,

        switchUser,
        login,
        logout,
        updateFreelancerProfile,
        updateClientProfile,
        toggleSaveFreelancer,
        isFreelancerSaved,
        createHiringRequest,
        updateHiringRequestStatus,
        toggleMilestoneComplete,
        submitMilestoneDeliverable,
        submitClientReview,
        addFreelancerReviewReply,

        sendMessage,
        startOrOpenConversation,
        acceptQuoteProposal,

        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,

        verifyFreelancer,
        toggleBanUser,
        resolveReport,
        addCategory,

        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
