// app/components/LeaderboardCard.tsx
'use client';

import { useEffect, useState } from 'react';
import { Trophy, Clock } from 'lucide-react';

interface LeaderboardEntry {
  id: string;          // Discord ID
  balance: number;     // Current balance
  tokens: number;      // Total tokens
  last_updated: string; // Last update timestamp
  wallet?: string;     // Optional wallet address
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function truncateAddress(address: string) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function LeaderboardCard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard');
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        const data = await res.json();
        setLeaders(data.members || []);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-full">
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Points Leaderboard
            </h3>
            <p className="text-sm text-muted-foreground">
              Top Point Holders and Their Statistics
            </p>
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="text-center py-8">Loading leaderboard...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Rank</th>
                    <th className="text-left p-3">Discord ID</th>
                    <th className="text-right p-3">Balance</th>
                    <th className="text-right p-3">Total Tokens</th>
                    {leaders.some(l => l.wallet) && (
                      <th className="text-left p-3">Wallet</th>
                    )}
                    <th className="text-left p-3">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {leaders.map((entry, index) => (
                    <tr 
                      key={entry.id}
                      className="border-b hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {index === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                          {index === 1 && <Trophy className="h-4 w-4 text-gray-400" />}
                          {index === 2 && <Trophy className="h-4 w-4 text-amber-600" />}
                          #{index + 1}
                        </div>
                      </td>
                      <td className="p-3 font-medium">
                        {entry.id}
                      </td>
                      <td className="p-3 text-right font-bold">
                        {entry.balance.toLocaleString()}
                      </td>
                      <td className="p-3 text-right text-muted-foreground">
                        {entry.tokens.toLocaleString()}
                      </td>
                      {leaders.some(l => l.wallet) && (
                        <td className="p-3 font-mono text-sm">
                          {entry.wallet ? truncateAddress(entry.wallet) : '-'}
                        </td>
                      )}
                      <td className="p-3 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {formatDate(entry.last_updated)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}