import { useEffect, useState } from 'react';
import { subscribeUsers } from '../services/users_service';
import type { UserRecord } from '../types';

type UsersState = {
  users: UserRecord[];
  loading: boolean;
  error: string | null;
};

export function useUsers(): UsersState {
  const [state, setState] = useState<UsersState>({
    users: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    return subscribeUsers(
      (users) => setState({ users, loading: false, error: null }),
      () =>
        setState({
          users: [],
          loading: false,
          error: 'Failed to fetch users. Please check Firestore rules or configuration.',
        }),
    );
  }, []);

  return state;
}
