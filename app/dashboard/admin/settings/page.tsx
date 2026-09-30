'use client';
export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Platform Settings</h1>
      <p className="text-[#6B6B6B] mb-8">Configure global platform settings.</p>
      <div className="bg-white rounded-2xl border border-[#E5E0D8] p-6 max-w-lg">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">Platform Fee (%)</label>
            <input type="number" defaultValue={10} min={0} max={50}
              className="w-full px-4 py-3 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" />
          </div>
          <div className="flex items-center justify-between py-3 border-t border-[#E5E0D8]">
            <div><p className="text-sm font-medium text-[#1A1A1A]">Allow New Registrations</p><p className="text-xs text-[#6B6B6B]">Toggle sign-up availability</p></div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#7C3AED]" />
          </div>
          <div className="flex items-center justify-between py-3 border-t border-[#E5E0D8]">
            <div><p className="text-sm font-medium text-[#1A1A1A]">Maintenance Mode</p><p className="text-xs text-[#6B6B6B]">Disable public access</p></div>
            <input type="checkbox" className="w-5 h-5 accent-[#7C3AED]" />
          </div>
          <button className="w-full py-3 bg-[#7C3AED] text-white font-semibold rounded-xl hover:bg-[#6D28D9] transition-colors">Save Settings</button>
        </div>
      </div>
    </div>
  );
}
