import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { signInWithGoogle } from '../services/auth_service';

export function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  async function handleLogin() {
    setError(null);
    setIsSigningIn(true);

    try {
      await signInWithGoogle();
    } catch {
      setError('Unable to sign in. Please check Firebase configuration.');
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="workspace-mark large">A</div>
        <h1>Users</h1>
        <p>View users from Firebase.</p>
        <button className="primary-button" type="button" onClick={handleLogin} disabled={isSigningIn}>
          <LogIn size={16} />
          {isSigningIn ? 'Signing in...' : 'Sign in with Google'}
        </button>
        {error ? <p className="error-text">{error}</p> : null}
      </section>
    </main>
  );
}
