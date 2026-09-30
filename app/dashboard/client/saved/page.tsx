'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function ClientSavedPage() {
  const { data: session } = useSession();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [freelancers, setFreelancers] = useState<any[]>([]);
  const userId = (session?.user as any)?.clientProfileId;

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/users/${(session?.user as any)?.id}`)
      .then(r => r.json()).then(d => {
        const ids = d.user?.savedFreelancerIds || [];
        setSavedIds(ids);
        if (ids.length > 0) {
          fetch('/api/freelancers').then(r => r.json()).then(d2 => {
            setFreelancers((d2.freelancers || []).filter((f: any) => ids.includes(f._id)));
          });
        }
      });
  }, [userId]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Saved Talent</h1>
      <p className="text-[#6B6B6B] mb-6">Your bookmarked freelancers</p>
      {freelancers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-12 text-center">
          <span className="text-4xl mb-4 block">❤️</span>
          <p className="font-semibold text-[#1A1A1A]">No saved freelancers yet</p>
          <p className="text-[#6B6B6B] text-sm mt-1">Browse the directory and save freelancers you love.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {freelancers.map(f => (
            <div key={f._id} className="bg-white rounded-2xl border border-[#E5E0D8] p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F6F3EC] flex items-center justify-center text-xl font-bold text-[#EB5E28]">
                {f.name[0]}
              </div>
              <div>
                <p className="font-semibold text-[#1A1A1A]">{f.name}</p>
                <p className="text-sm text-[#6B6B6B]">{f.profession}</p>
                <p className="text-xs text-[#EB5E28] font-medium">${f.hourlyRate}/hr</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
