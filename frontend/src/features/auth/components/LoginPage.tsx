import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { signInWithGoogle } from '../services/authService';

export function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  async function handleLogin() {
    setError(null);
    setIsSigningIn(true);

    try {
      await signInWithGoogle();
    } catch {
      setError('Không thể đăng nhập. Kiểm tra Firebase config.');
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="workspace-mark large">A</div>
        <h1>People</h1>
        <p>Xem users từ Firebase.</p>
        <button className="primary-button" type="button" onClick={handleLogin} disabled={isSigningIn}>
          <LogIn size={16} />
          {isSigningIn ? 'Đang đăng nhập' : 'Đăng nhập Google'}
        </button>
        {error ? <p className="error-text">{error}</p> : null}
      </section>
    </main>
  );
}
