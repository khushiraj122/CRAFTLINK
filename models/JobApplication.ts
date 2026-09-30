import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IJobApplication extends Document {
  jobId: string;
  jobTitle: string;
  clientId: string;
  clientName: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  professionalTitle: string;
  skills: string[];
  experience: string;
  portfolioLink: string;
  resumeUrl: string;
  proposedBudget: string;
  estimatedDelivery: string;
  coverLetter: string;
  additionalMessage?: string;
  behance?: string;
  dribbble?: string;
  linkedin?: string;
  otherPortfolioLink?: string;
  status: 'Pending' | 'Under Review' | 'Shortlisted' | 'Accepted' | 'Rejected';
  appliedAt: string;
}

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    clientId: { type: String, required: true },
    clientName: { type: String, required: true },
    creatorId: { type: String, required: true },
    creatorName: { type: String, required: true },
    creatorAvatar: { type: String, default: '' },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    professionalTitle: { type: String, required: true },
    skills: { type: [String], default: [] },
    experience: { type: String, required: true },
    portfolioLink: { type: String, required: true },
    resumeUrl: { type: String, default: '' },
    proposedBudget: { type: String, required: true },
    estimatedDelivery: { type: String, required: true },
    coverLetter: { type: String, required: true },
    additionalMessage: { type: String },
    behance: { type: String },
    dribbble: { type: String },
    linkedin: { type: String },
    otherPortfolioLink: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Under Review', 'Shortlisted', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
    appliedAt: { type: String },
  },
  { timestamps: true }
);

export default models.JobApplication || model<IJobApplication>('JobApplication', JobApplicationSchema);
