import type { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { observeAuthState } from '../services/auth_service';

type AuthState = {
  user: User | null;
  loading: boolean;
};

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    return observeAuthState((user) => {
      setState({ user, loading: false });
    });
  }, []);

  return state;
}
