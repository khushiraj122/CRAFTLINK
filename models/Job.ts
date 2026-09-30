import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IJob extends Document {
  clientId: string;
  clientName: string;
  clientAvatar: string;
  clientCompany?: string;
  title: string;
  description: string;
  requiredSkills: string[];
  budget: string;
  deadline: string;
  jobType: string;
  category: string;
  status: 'open' | 'closed' | 'filled' | 'draft';
  postedAt: string;
  updatedAt: string;
  applicantsCount: number;
}

const JobSchema = new Schema<IJob>(
  {
    clientId: { type: String, required: true },
    clientName: { type: String, required: true },
    clientAvatar: { type: String, default: '' },
    clientCompany: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: { type: [String], default: [] },
    budget: { type: String, required: true },
    deadline: { type: String, required: true },
    jobType: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['open', 'closed', 'filled', 'draft'], default: 'open' },
    postedAt: { type: String },
    applicantsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Job || model<IJob>('Job', JobSchema);
