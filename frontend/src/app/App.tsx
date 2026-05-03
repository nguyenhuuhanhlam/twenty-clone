import { useEffect, useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LoginPage } from '../features/auth/components/login_page';
import { useAuth } from '../features/auth/hooks/use_auth';
import { LoadingState } from '../shared/components/loading_state';
import { AppShell } from './app_shell';
import { routes } from './router';

export function App() {
  const { user, loading } = useAuth();
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (loading) {
    return <LoadingState label="Checking authentication status..." />;
  }

  if (!user) {
    return <LoginPage />;
  }

  const routeKey = currentHash.replace('#', '') as keyof typeof routes;
  const { Component, group, title } = routes[routeKey] || routes['home'];

  return (
    <TooltipProvider>
      <AppShell user={user}>
        <Component group={group} title={title} />
      </AppShell>
    </TooltipProvider>
  );
}
