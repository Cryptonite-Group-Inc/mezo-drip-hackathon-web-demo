// app/components/UserCard.tsx
'use client';

import { useEffect, useState } from 'react';
import { User } from 'lucide-react';

interface UserData {
  username: string;
  balances: Record<string, number>;
}

export default function UserCard({ userId }: { userId: string }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch(`/api/user/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch user data');
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [userId]);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              {loading ? 'Loading...' : userData?.username || 'User Not Found'}
            </h3>
            <p className="text-sm text-muted-foreground">
              User Balance
            </p>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-3xl font-bold">
            {loading ? (
              'Loading...'
            ) : userData ? (
              `${Object.values(userData.balances)[0]?.toLocaleString() || 0} Points`
            ) : (
              '0 Points'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}