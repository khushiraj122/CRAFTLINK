import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IConversation extends Document {
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

const ConversationSchema = new Schema<IConversation>(
  {
    participantIds: { type: [String], required: true },
    clientId: { type: String, required: true },
    clientName: { type: String, required: true },
    clientAvatar: { type: String, default: '' },
    clientCompany: { type: String },
    freelancerId: { type: String, required: true },
    freelancerName: { type: String, required: true },
    freelancerAvatar: { type: String, default: '' },
    freelancerProfession: { type: String, default: '' },
    lastMessage: { type: String, default: '' },
    lastMessageTime: { type: String, default: '' },
    unreadCountClient: { type: Number, default: 0 },
    unreadCountFreelancer: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Conversation || model<IConversation>('Conversation', ConversationSchema);
