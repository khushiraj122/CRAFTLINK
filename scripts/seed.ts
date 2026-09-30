/**
 * MongoDB Seed Script
 * Run: npx tsx scripts/seed.ts
 *
 * Seeds the database with an admin user, sample client, and sample freelancer.
 * IMPORTANT: Only run this once on a fresh database.
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/craftlink';

// Inline schemas for the seed script
const UserSchema = new mongoose.Schema({ name: String, email: String, password: String, avatar: String, role: String, freelancerProfileId: String, clientProfileId: String }, { timestamps: true });
const FreelancerSchema = new mongoose.Schema({ userId: String, name: String, username: String, email: String, avatar: String, profession: String, primaryCategory: String, bio: String, aboutStory: String, location: String, hourlyRate: Number, startingPrice: Number, experienceYears: Number, rating: Number, reviewsCount: Number, completedProjectsCount: Number, availability: String, isVerifiedPro: Boolean, isTopRated: Boolean, featured: Boolean, skills: mongoose.Schema.Types.Mixed, portfolio: mongoose.Schema.Types.Mixed, pricingPackages: mongoose.Schema.Types.Mixed, socialLinks: mongoose.Schema.Types.Mixed, earningsTotal: Number }, { timestamps: true });
const ClientSchema = new mongoose.Schema({ userId: String, name: String, username: String, email: String, avatar: String, companyName: String, industry: String, location: String, bio: String, totalHires: Number, totalSpent: Number, savedFreelancerIds: [String] }, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const FreelancerProfile = mongoose.models.FreelancerProfile || mongoose.model('FreelancerProfile', FreelancerSchema);
const ClientProfile = mongoose.models.ClientProfile || mongoose.model('ClientProfile', ClientSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB:', MONGODB_URI);

  // Clear existing seed users
  await User.deleteMany({ email: { $in: ['admin@craftlink.com', 'client@craftlink.com', 'freelancer@craftlink.com'] } });

  const adminPass = await bcrypt.hash('Admin@123', 12);
  const clientPass = await bcrypt.hash('Client@123', 12);
  const freelancerPass = await bcrypt.hash('Freelancer@123', 12);

  // Create admin
  const admin = await User.create({ name: 'Admin User', email: 'admin@craftlink.com', password: adminPass, role: 'admin', avatar: '' });
  console.log('✅ Admin created:', admin.email);

  // Create client + profile
  const client = await User.create({ name: 'Sarah Chen', email: 'client@craftlink.com', password: clientPass, role: 'client', avatar: '' });
  const clientProfile = await ClientProfile.create({ userId: client._id.toString(), name: 'Sarah Chen', username: 'sarah-chen', email: 'client@craftlink.com', companyName: 'Stellar Studios', industry: 'Media & Entertainment', location: 'San Francisco, CA', bio: 'We create award-winning digital experiences.', totalHires: 5, totalSpent: 4200, savedFreelancerIds: [] });
  await User.findByIdAndUpdate(client._id, { clientProfileId: clientProfile._id.toString() });
  console.log('✅ Client created:', client.email);

  // Create freelancer + profile
  const freelancer = await User.create({ name: 'Alex Rivera', email: 'freelancer@craftlink.com', password: freelancerPass, role: 'freelancer', avatar: '' });
  const freelancerProfile = await FreelancerProfile.create({
    userId: freelancer._id.toString(), name: 'Alex Rivera', username: 'alex-rivera', email: 'freelancer@craftlink.com',
    profession: 'Senior Full-Stack Developer & React Specialist', primaryCategory: 'web_development',
    bio: 'I craft high-performance web applications with React, Next.js and Node.js.',
    aboutStory: '8+ years building products for startups and Fortune 500 companies.',
    location: 'Austin, TX', hourlyRate: 95, startingPrice: 500, experienceYears: 8,
    rating: 4.9, reviewsCount: 47, completedProjectsCount: 63, availability: 'available',
    isVerifiedPro: true, isTopRated: true, featured: true, earningsTotal: 38500,
    skills: [{ name: 'React', level: 'Expert', category: 'Development' }, { name: 'Next.js', level: 'Expert', category: 'Development' }, { name: 'TypeScript', level: 'Master', category: 'Development' }],
    portfolio: [], pricingPackages: { basic: { name: 'Basic', title: 'Starter', price: 500, deliveryTimeDays: 7, revisions: 2, description: 'Landing page', features: ['Responsive design', 'SEO optimized'] }, standard: { name: 'Standard', title: 'Pro', price: 1500, deliveryTimeDays: 14, revisions: 5, description: 'Full web app', features: ['React app', 'API integration', 'Auth'] }, premium: { name: 'Premium', title: 'Enterprise', price: 4000, deliveryTimeDays: 30, revisions: 'Unlimited', description: 'Full platform', features: ['Full-stack', 'CI/CD', 'Testing', 'Deployment'] } },
    socialLinks: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
  });
  await User.findByIdAndUpdate(freelancer._id, { freelancerProfileId: freelancerProfile._id.toString() });
  console.log('✅ Freelancer created:', freelancer.email);

  console.log('\n🎉 Seed complete! Login credentials:');
  console.log('  Admin:      admin@craftlink.com     / Admin@123');
  console.log('  Client:     client@craftlink.com    / Client@123');
  console.log('  Freelancer: freelancer@craftlink.com / Freelancer@123');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => { console.error('❌ Seed failed:', err); process.exit(1); });
