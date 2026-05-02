import { TooltipProvider } from '@/components/ui/tooltip';
import { LoginPage } from '../features/auth/components/login_page';
import { useAuth } from '../features/auth/hooks/use_auth';
import { UsersPage } from '../features/users/components/users_page';
import { LoadingState } from '../shared/components/loading_state';
import { AppShell } from './app_shell';

export function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingState label="Checking authentication status..." />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <TooltipProvider>
      <AppShell user={user}>
        <UsersPage />
      </AppShell>
    </TooltipProvider>
  );
}
