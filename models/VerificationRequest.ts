import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IVerificationRequest extends Document {
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

const VerificationRequestSchema = new Schema<IVerificationRequest>(
  {
    freelancerId: { type: String, required: true, unique: true },
    freelancerName: { type: String, required: true },
    freelancerAvatar: { type: String, default: '' },
    profession: { type: String, required: true },
    idDocumentType: { type: String, required: true },
    portfolioProofUrl: { type: String, required: true },
    experienceSummary: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    submittedAt: { type: String, required: true },
    reviewerNotes: { type: String },
  },
  { timestamps: true }
);

export default models.VerificationRequest ||
  model<IVerificationRequest>('VerificationRequest', VerificationRequestSchema);
