import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IFreelancerProfile extends Document {
  userId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bannerImage: string;
  profession: string;
  primaryCategory: string;
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
  availability: 'available' | 'partially_available' | 'busy';
  isVerifiedPro: boolean;
  isTopRated: boolean;
  featured: boolean;
  videoIntroUrl?: string;
  skills: Array<{ name: string; level: string; category: string }>;
  portfolio: Array<{
    id: string; title: string; category: string; mediaType: string;
    mediaUrl?: string; videoUrl?: string; codeSnippet?: string;
    thumbnail: string; description: string; tags: string[];
    clientName?: string; liveUrl?: string; metrics?: string;
  }>;
  workExperience: Array<{
    id: string; role: string; company: string; location: string;
    startDate: string; endDate: string; isCurrent: boolean; description: string;
  }>;
  education: Array<{
    id: string; degree: string; field: string; institution: string;
    startYear: string; endYear: string;
  }>;
  pricingPackages: {
    basic: object;
    standard: object;
    premium: object;
  };
  socialLinks: object;
  earningsTotal?: number;
  inEscrow?: number;
  isBanned?: boolean;
}

const FreelancerProfileSchema = new Schema<IFreelancerProfile>(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    avatar: { type: String, default: '' },
    bannerImage: { type: String, default: '' },
    profession: { type: String, required: true },
    primaryCategory: { type: String, required: true },
    bio: { type: String, default: '' },
    aboutStory: { type: String, default: '' },
    location: { type: String, default: '' },
    timezone: { type: String, default: '' },
    hourlyRate: { type: Number, default: 0 },
    startingPrice: { type: Number, default: 0 },
    experienceYears: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    completedProjectsCount: { type: Number, default: 0 },
    onTimeDeliveryRate: { type: Number, default: 100 },
    responseTime: { type: String, default: '< 1 hour' },
    availability: { type: String, enum: ['available', 'partially_available', 'busy'], default: 'available' },
    isVerifiedPro: { type: Boolean, default: false },
    isTopRated: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    videoIntroUrl: { type: String },
    skills: { type: Schema.Types.Mixed, default: [] },
    portfolio: { type: Schema.Types.Mixed, default: [] },
    workExperience: { type: Schema.Types.Mixed, default: [] },
    education: { type: Schema.Types.Mixed, default: [] },
    pricingPackages: { type: Schema.Types.Mixed, default: {} },
    socialLinks: { type: Schema.Types.Mixed, default: {} },
    earningsTotal: { type: Number, default: 0 },
    inEscrow: { type: Number, default: 0 },
    isBanned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.FreelancerProfile || model<IFreelancerProfile>('FreelancerProfile', FreelancerProfileSchema);
