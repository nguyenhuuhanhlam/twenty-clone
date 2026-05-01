import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../../../config/firebase';

const googleProvider = new GoogleAuthProvider();

export function observeAuthState(onChange: (user: User | null) => void) {
  return onAuthStateChanged(auth, onChange);
}

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function logout() {
  return signOut(auth);
}
