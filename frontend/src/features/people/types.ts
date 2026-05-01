import type { Timestamp } from 'firebase/firestore';

export type UserRecord = {
  id: string;
  displayName: string;
  email: string;
  role?: string;
  authProvider: 'password' | 'google' | string;
  isActive: boolean;
  createdAt?: Timestamp;
};
