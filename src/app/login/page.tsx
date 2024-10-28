// app/components/LoginButton.tsx
'use client';

import { Button } from "../components/ui/button";

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      window.location.href = '/api/auth/signin/discord';
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleLogin}
      className="gap-2"
    >
      {/* <Discord className="w-5 h-5" /> */}
      Continue with Discord
    </Button>
  );
}