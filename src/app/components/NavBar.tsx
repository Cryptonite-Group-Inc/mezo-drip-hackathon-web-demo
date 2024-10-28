import Image from "next/image";
import Link from "next/link";

export default function Navbar({ user }: { user: any }) {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/drip-logo.png"
            alt="DRIP Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-semibold">DRIP Points Demo</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {user.image && (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <span className="font-medium">{user.name}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}