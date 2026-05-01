import { useEffect, useState } from 'react';
import { subscribeUsers } from '../services/usersService';
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
          error: 'Không đọc được users. Kiểm tra Firestore rules hoặc config.',
        }),
    );
  }, []);

  return state;
}
