import Link from "next/link";
import { Button } from "../components/ui/button";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Authentication Error</h1>
        <p className="text-muted-foreground">
          There was an error signing in with Discord.
        </p>
      </div>
      
      <Button>
        <Link href="/login">Try Again</Link>
      </Button>
    </div>
  );
}