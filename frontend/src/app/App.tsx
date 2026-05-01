import { TooltipProvider } from '@/components/ui/tooltip';
import { LoginPage } from '../features/auth/components/LoginPage';
import { useAuth } from '../features/auth/hooks/useAuth';
import { PeoplePage } from '../features/people/components/PeoplePage';
import { LoadingState } from '../shared/components/LoadingState';
import { AppShell } from './AppShell';

export function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingState label="Đang kiểm tra đăng nhập" />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <TooltipProvider>
      <AppShell user={user}>
        <PeoplePage />
      </AppShell>
    </TooltipProvider>
  );
}
