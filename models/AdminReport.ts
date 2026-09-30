import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IAdminReport extends Document {
  reporterId: string;
  reporterName: string;
  reportedUserId: string;
  reportedUserName: string;
  reportedUserRole: 'client' | 'freelancer' | 'admin';
  reason: string;
  details: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  resolutionNotes?: string;
}

const AdminReportSchema = new Schema<IAdminReport>(
  {
    reporterId: { type: String, required: true },
    reporterName: { type: String, required: true },
    reportedUserId: { type: String, required: true },
    reportedUserName: { type: String, required: true },
    reportedUserRole: { type: String, enum: ['client', 'freelancer', 'admin'], required: true },
    reason: { type: String, required: true },
    details: { type: String, required: true },
    status: { type: String, enum: ['open', 'investigating', 'resolved', 'dismissed'], default: 'open' },
    resolutionNotes: { type: String },
  },
  { timestamps: true }
);

export default models.AdminReport || model<IAdminReport>('AdminReport', AdminReportSchema);
