import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import type { UserRecord } from '../types';

function toUserRecord(doc: QueryDocumentSnapshot): UserRecord {
  const data = doc.data();

  return {
    id: doc.id,
    displayName: String(data.display_name ?? data.displayName ?? 'Chưa có tên'),
    email: String(data.email ?? ''),
    role: data.role ? String(data.role) : undefined,
    authProvider: String(data.auth_provider ?? 'password'),
    isActive: Boolean(data.is_active),
    createdAt: data.created_at,
  };
}

export function subscribeUsers(
  onChange: (users: UserRecord[]) => void,
  onError: (error: Error) => void,
) {
  const usersQuery = query(collection(db, 'users'), orderBy('created_at', 'desc'));

  return onSnapshot(
    usersQuery,
    (snapshot) => {
      onChange(snapshot.docs.map(toUserRecord));
    },
    (error) => {
      onError(error);
    },
  );
}
