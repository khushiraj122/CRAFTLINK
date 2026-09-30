export type UserRole = 'client' | 'freelancer' | 'admin';

export type AvailabilityStatus = 'available' | 'partially_available' | 'busy';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Expert' | 'Master';

export interface Skill {
  name: string;
  level: SkillLevel;
  category: 'Video & Motion' | 'Development' | 'Design' | '3D & VFX' | 'AI & Tools';
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  mediaType: 'video' | 'image' | 'code' | 'interactive';
  mediaUrl?: string;
  videoUrl?: string;
  codeSnippet?: string;
  thumbnail: string;
  description: string;
  tags: string[];
  clientName?: string;
  liveUrl?: string;
  metrics?: string;
}

/* ─── NEW: Creator Portfolio Project ─── */
export type PortfolioCategory =
  | 'Graphic Design'
  | 'Branding'
  | 'UI/UX'
  | 'Video Editing'
  | 'Motion Graphics'
  | 'Web Development'
  | 'Mobile Development'
  | 'Illustration'
  | 'Photography'
  | '3D & VFX'
  | 'Other';

export interface PortfolioProject {
  id: string;
  creatorId: string; // freelancer profile id
  title: string;
  coverImage: string;
  description: string;
  category: PortfolioCategory;
  tools: string[];        // e.g. ['Figma', 'After Effects']
  images: string[];       // additional image URLs
  projectLink?: string;
  createdAt: string;
  updatedAt: string;
}

/* ─── NEW: Job Post ─── */
export type JobType = 'Full-Time' | 'Part-Time' | 'Contract' | 'Freelance' | 'One-time';
export type JobStatus = 'open' | 'closed' | 'filled' | 'draft';

export interface Job {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  clientCompany?: string;
  title: string;
  description: string;
  requiredSkills: string[];
  budget: string;           // e.g. "$500 - $1500" or "Negotiable"
  deadline: string;         // ISO date string
  jobType: JobType;
  category: PortfolioCategory | string;
  status: JobStatus;
  postedAt: string;
  updatedAt: string;
  applicantsCount: number;
}

/* ─── NEW: Job Application ─── */
export type ApplicationStatus =
  | 'Pending'
  | 'Under Review'
  | 'Shortlisted'
  | 'Accepted'
  | 'Rejected';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  clientId: string;
  clientName: string;
  creatorId: string;       // freelancer profile id
  creatorName: string;
  creatorAvatar: string;

  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  location: string;

  // Professional Info
  professionalTitle: string;
  skills: string[];
  experience: string;
  portfolioLink: string;
  resumeUrl: string;        // stored as URL / file name

  // Project Info
  proposedBudget: string;
  estimatedDelivery: string;
  coverLetter: string;
  additionalMessage?: string;

  // Other Links
  behance?: string;
  dribbble?: string;
  linkedin?: string;
  otherPortfolioLink?: string;

  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
}

export interface PricingPackage {
  name: 'Basic' | 'Standard' | 'Premium';
  title: string;
  price: number;
  deliveryTimeDays: number;
  revisions: number | 'Unlimited';
  description: string;
  features: string[];
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  startYear: string;
  endYear: string;
}

export interface Review {
  id: string;
  freelancerId: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  clientCompany?: string;
  rating: number;
  date: string;
  projectTitle: string;
  comment: string;
  freelancerReply?: string;
}

export interface FreelancerProfile {
  id: string;
  userId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bannerImage: string;
  profession: string;
  primaryCategory: 'video_editing' | 'web_development' | 'motion_graphics' | 'mobile_development' | 'ai_engineering' | 'ui_ux_design' | '3d_vfx';
  bio: string;
  aboutStory: string;
  location: string;
  timezone: string;
  hourlyRate: number;
  startingPrice: number;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  completedProjectsCount: number;
  onTimeDeliveryRate: number;
  responseTime: string;
  availability: AvailabilityStatus;
  isVerifiedPro: boolean;
  isTopRated: boolean;
  featured: boolean;
  videoIntroUrl?: string;
  skills: Skill[];
  portfolio: PortfolioItem[];
  workExperience: WorkExperience[];
  education: Education[];
  pricingPackages: {
    basic: PricingPackage;
    standard: PricingPackage;
    premium: PricingPackage;
  };
  socialLinks: {
    github?: string;
    youtube?: string;
    behance?: string;
    linkedin?: string;
    website?: string;
    twitter?: string;
    instagram?: string;
    dribbble?: string;
  };
  earningsTotal?: number;
  inEscrow?: number;
  isBanned?: boolean;
}

export interface ClientProfile {
  id: string;
  userId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  companyName: string;
  industry: string;
  location: string;
  bio: string;
  totalHires: number;
  totalSpent: number;
  savedFreelancerIds: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  freelancerProfileId?: string;
  clientProfileId?: string;
  createdAt: string;
}

export type ContractStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'in_progress'
  | 'in_review'
  | 'completed'
  | 'cancelled';

export interface Milestone {
  id: string;
  title: string;
  amount: number;
  completed: boolean;
  dueDate?: string;
}

export interface Attachment {
  name: string;
  url: string;
  size: string;
  type?: string;
}

export interface HiringRequest {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  clientCompany?: string;
  clientEmail: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerProfession: string;
  projectTitle: string;
  category: string;
  description: string;
  budgetType: 'fixed' | 'hourly';
  budgetAmount: number;
  hourlyHoursEstimated?: number;
  deadline: string;
  status: ContractStatus;
  createdAt: string;
  updatedAt: string;
  selectedPackage?: 'Basic' | 'Standard' | 'Premium' | 'Custom';
  attachments: Attachment[];
  milestones: Milestone[];
  deliverables?: {
    notes: string;
    fileUrls: string[];
    submittedAt: string;
  };
  rejectionReason?: string;
  clientFeedback?: {
    rating: number;
    comment: string;
    submittedAt: string;
  };
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: UserRole;
  recipientId: string;
  content: string;
  createdAt: string;
  attachments?: Attachment[];
  quoteProposal?: {
    projectTitle: string;
    amount: number;
    deliveryDays: number;
    status: 'pending' | 'accepted' | 'declined';
  };
}

export interface Conversation {
  id: string;
  participantIds: string[];
  clientId: string;
  clientName: string;
  clientAvatar: string;
  clientCompany?: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerProfession: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCountClient: number;
  unreadCountFreelancer: number;
}

export interface AppNotification {
  id: string;
  userId: string;
  type: 'hiring_request' | 'message' | 'contract_update' | 'review' | 'system' | 'verification' | 'job_application';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  linkType?: 'messages' | 'hiring' | 'profile' | 'admin' | 'jobs';
  targetId?: string;
}

export interface AdminReport {
  id: string;
  reporterId: string;
  reporterName: string;
  reportedUserId: string;
  reportedUserName: string;
  reportedUserRole: UserRole;
  reason: 'Spam/Fake Account' | 'Payment Dispute' | 'Inappropriate Content' | 'Missed Deadline' | 'Quality Issue';
  details: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  createdAt: string;
  resolutionNotes?: string;
}

export interface VerificationRequest {
  id: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  profession: string;
  idDocumentType: string;
  portfolioProofUrl: string;
  experienceSummary: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewerNotes?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  tagline: string;
  freelancersCount: number;
  avgHourlyRate: number;
  popularSkills: string[];
  gradient: string;
}
