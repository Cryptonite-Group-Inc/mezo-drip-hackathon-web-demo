'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface UserData {
  username: string;
  balances: Record<string, number>;
}

export default function SearchUser() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) return;

    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const res = await fetch(`/api/user/${userId}`);
      if (!res.ok) throw new Error('User not found');
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      setError('User not found or error occurred');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Search className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Search User
          </h3>
          <p className="text-sm text-muted-foreground">
            Look up any user's points
          </p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !userId.trim()}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center mt-4">
          Searching...
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-4 text-center">
          {error}
        </div>
      )}

      {userData && (
        <div className="mt-6 p-4 rounded-lg bg-primary/5">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">{userData.username}</h4>
              <p className="text-sm text-muted-foreground">User ID: {userId}</p>
            </div>
            <div className="text-xl font-bold">
              {Object.values(userData.balances)[0]?.toLocaleString() || 0} Points
            </div>
          </div>
        </div>
      )}
    </div>
  );
}