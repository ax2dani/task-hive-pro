import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';

export function AppHeader() {
  const { logout } = useAuth();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex w-full flex-1 items-center justify-end">
        <Button variant="ghost" onClick={logout}>
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </Button>
      </div>
    </header>
  );
}
