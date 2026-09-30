import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IPortfolioProject extends Document {
  creatorId: string;
  title: string;
  coverImage: string;
  description: string;
  category: string;
  tools: string[];
  images: string[];
  projectLink?: string;
  isPublished: boolean;
}

const PortfolioProjectSchema = new Schema<IPortfolioProject>(
  {
    creatorId: { type: String, required: true },
    title: { type: String, required: true },
    coverImage: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tools: { type: [String], default: [] },
    images: { type: [String], default: [] },
    projectLink: { type: String },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.PortfolioProject || model<IPortfolioProject>('PortfolioProject', PortfolioProjectSchema);
