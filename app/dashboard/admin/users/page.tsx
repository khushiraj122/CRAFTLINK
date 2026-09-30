'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users${roleFilter ? `?role=${roleFilter}` : ''}`)
      .then(r => r.json()).then(d => { setUsers(d.users || []); setLoading(false); });
  }, [roleFilter]);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id: string) {
    if (!confirm('Delete this user?')) return;
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    setUsers(users.filter(u => u._id !== id));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">User Management</h1>
          <p className="text-[#6B6B6B] text-sm mt-1">Search, filter, and manage all platform users</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
        />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-[#E5E0D8] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]">
          <option value="">All Roles</option>
          <option value="client">Client</option>
          <option value="freelancer">Freelancer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#6B6B6B]">Loading users…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-[#6B6B6B]">No users found.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E0D8] bg-[#F8F7F4]">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">User</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Role</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Joined</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id} className="border-b border-[#E5E0D8] last:border-0 hover:bg-[#FDFCF9] transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">{u.name}</p>
                      <p className="text-xs text-[#6B6B6B]">{u.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                      style={{
                        backgroundColor: u.role === 'admin' ? '#F5F3FF' : u.role === 'freelancer' ? '#FFF7F4' : '#F0F9FF',
                        color: u.role === 'admin' ? '#7C3AED' : u.role === 'freelancer' ? '#EB5E28' : '#0EA5E9',
                      }}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-[#6B6B6B]">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => handleDelete(u._id)} className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
