import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IClientProfile extends Document {
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

const ClientProfileSchema = new Schema<IClientProfile>(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    avatar: { type: String, default: '' },
    companyName: { type: String, default: '' },
    industry: { type: String, default: '' },
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    totalHires: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    savedFreelancerIds: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default models.ClientProfile || model<IClientProfile>('ClientProfile', ClientProfileSchema);
