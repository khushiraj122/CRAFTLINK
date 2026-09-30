'use client';
export default function FreelancerProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Edit Profile</h1>
      <p className="text-[#6B6B6B] mb-8">Update your public profile, skills, and portfolio</p>
      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6 max-w-2xl">
        <div className="space-y-5">
          <div><label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Profession Title</label>
            <input type="text" placeholder="e.g. Senior React Developer" className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EB5E28]" /></div>
          <div><label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Bio</label>
            <textarea rows={4} placeholder="Tell clients about yourself…" className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EB5E28] resize-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Hourly Rate ($)</label>
              <input type="number" placeholder="50" className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EB5E28]" /></div>
            <div><label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Location</label>
              <input type="text" placeholder="City, Country" className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EB5E28]" /></div>
          </div>
          <button className="w-full py-3 bg-[#EB5E28] text-white font-semibold rounded-xl hover:bg-[#d4521f] transition-colors">Save Profile</button>
        </div>
      </div>
    </div>
  );
}
