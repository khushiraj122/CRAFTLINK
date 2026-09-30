'use client';
export default function ClientSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Account Settings</h1>
      <p className="text-[#6B6B6B] mb-8">Manage your profile and preferences</p>
      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6 max-w-lg">
        <div className="space-y-5">
          <div><label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Full Name</label>
            <input type="text" placeholder="Your name" className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]" /></div>
          <div><label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Company Name</label>
            <input type="text" placeholder="Your company" className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]" /></div>
          <div><label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Bio</label>
            <textarea rows={3} placeholder="Tell freelancers about your company…" className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] resize-none" /></div>
          <button className="w-full py-3 bg-[#0EA5E9] text-white font-semibold rounded-xl hover:bg-[#0284C7] transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
