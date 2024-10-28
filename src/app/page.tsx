import LeaderboardCard from './components/LeaderboardCard';
import SearchUser from './components/SearchUser';
import UserCard from './components/UserCard';

export default function Home() {
  return (
    <div className="grid gap-8">
      <SearchUser />
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        <LeaderboardCard />
      </div>
    </div>
  );
}