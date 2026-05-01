import { TooltipProvider } from '@/components/ui/tooltip';
import { LoginPage } from '../features/auth/components/login_page';
import { useAuth } from '../features/auth/hooks/use_auth';
import { PeoplePage } from '../features/people/components/people_page';
import { LoadingState } from '../shared/components/loading_state';
import { AppShell } from './app_shell';

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
