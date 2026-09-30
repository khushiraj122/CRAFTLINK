import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IMessage extends Document {
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: 'client' | 'freelancer' | 'admin';
  recipientId: string;
  content: string;
  attachments?: Array<{ name: string; url: string; size: string; type?: string }>;
  quoteProposal?: {
    projectTitle: string;
    amount: number;
    deliveryDays: number;
    status: 'pending' | 'accepted' | 'declined';
  };
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: { type: String, required: true, index: true },
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    senderAvatar: { type: String, default: '' },
    senderRole: { type: String, enum: ['client', 'freelancer', 'admin'], required: true },
    recipientId: { type: String, required: true },
    content: { type: String, required: true },
    attachments: { type: Schema.Types.Mixed },
    quoteProposal: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default models.Message || model<IMessage>('Message', MessageSchema);
