import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IReview extends Document {
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

const ReviewSchema = new Schema<IReview>(
  {
    freelancerId: { type: String, required: true, index: true },
    clientId: { type: String, required: true },
    clientName: { type: String, required: true },
    clientAvatar: { type: String, default: '' },
    clientCompany: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: String, required: true },
    projectTitle: { type: String, required: true },
    comment: { type: String, required: true },
    freelancerReply: { type: String },
  },
  { timestamps: true }
);

export default models.Review || model<IReview>('Review', ReviewSchema);
