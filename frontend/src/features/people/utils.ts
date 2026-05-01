import type { Timestamp } from 'firebase/firestore';
import type { UserRecord } from './types';

const fallbackColors = ['#111827', '#0f766e', '#7c2d12', '#4338ca', '#be123c', '#1d4ed8'];

export function getInitial(value: string) {
  return value.trim().slice(0, 1).toUpperCase() || 'U';
}

export function getUserColor(user: UserRecord) {
  const seed = user.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return fallbackColors[seed % fallbackColors.length];
}

export function formatDate(value?: Timestamp) {
  if (!value) return 'Chưa có';

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(value.toDate());
}
