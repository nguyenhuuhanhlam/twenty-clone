import { SidebarProvider } from '@/components/ui/sidebar';
import type { User } from 'firebase/auth';
import type { ReactNode } from 'react';
import { AppSidebar } from '../shared/components/app_sidebar';

type AppShellProps = {
  children: ReactNode;
  user: User;
};

export function AppShell({ children, user }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="content flex-1 overflow-hidden">{children}</main>
    </SidebarProvider>
  );
}
