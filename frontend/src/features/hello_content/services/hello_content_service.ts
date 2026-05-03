import type { HelloContent } from '../types';

export function getHelloMessages(): HelloContent[] {
  return Array.from({ length: 25 }, (_, i) => ({
    id: `${i + 1}`,
    message: `Hello message #${i + 1} from the new module!`,
    timestamp: Date.now() - i * 1000 * 60 * 60, // Each message 1 hour apart
  }));
}

export function getHelloMessage(): HelloContent {
  return getHelloMessages()[0];
}
