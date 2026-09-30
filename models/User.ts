import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: 'client' | 'freelancer' | 'admin';
  freelancerProfileId?: string;
  clientProfileId?: string;
  createdAt: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    role: { type: String, enum: ['client', 'freelancer', 'admin'], required: true },
    freelancerProfileId: { type: String },
    clientProfileId: { type: String },
  },
  { timestamps: true }
);

export default models.User || model<IUser>('User', UserSchema);
