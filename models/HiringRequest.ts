import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IHiringRequest extends Document {
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
  status: 'pending' | 'accepted' | 'rejected' | 'in_progress' | 'in_review' | 'completed' | 'cancelled';
  selectedPackage?: 'Basic' | 'Standard' | 'Premium' | 'Custom';
  attachments: Array<{ name: string; url: string; size: string; type?: string }>;
  milestones: Array<{ id: string; title: string; amount: number; completed: boolean; dueDate?: string }>;
  deliverables?: { notes: string; fileUrls: string[]; submittedAt: string };
  rejectionReason?: string;
  clientFeedback?: { rating: number; comment: string; submittedAt: string };
}

const HiringRequestSchema = new Schema<IHiringRequest>(
  {
    clientId: { type: String, required: true },
    clientName: { type: String, required: true },
    clientAvatar: { type: String, default: '' },
    clientCompany: { type: String },
    clientEmail: { type: String, required: true },
    freelancerId: { type: String, required: true },
    freelancerName: { type: String, required: true },
    freelancerAvatar: { type: String, default: '' },
    freelancerProfession: { type: String, default: '' },
    projectTitle: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    budgetType: { type: String, enum: ['fixed', 'hourly'], required: true },
    budgetAmount: { type: Number, required: true },
    hourlyHoursEstimated: { type: Number },
    deadline: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'in_progress', 'in_review', 'completed', 'cancelled'],
      default: 'pending',
    },
    selectedPackage: { type: String, enum: ['Basic', 'Standard', 'Premium', 'Custom'] },
    attachments: { type: Schema.Types.Mixed, default: [] },
    milestones: { type: Schema.Types.Mixed, default: [] },
    deliverables: { type: Schema.Types.Mixed },
    rejectionReason: { type: String },
    clientFeedback: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default models.HiringRequest || model<IHiringRequest>('HiringRequest', HiringRequestSchema);
