'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function AdminLoginPage() {
  const { user, loading, configured, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace('/admin');
    }
  }, [loading, user, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(email, password);
      router.replace('/admin');
    } catch (err: any) {
      const code = err?.code as string | undefined;
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setError('Incorrect email or password.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait a moment and try again.');
      } else {
        setError(err?.message || 'Something went wrong signing in.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-auth">
      <div className="admin-auth-card">
        <div className="admin-auth-logo">
          <span className="mark">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M3 11L12 4l9 7M5 10v9h14v-9"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>Ridgeline</span>
        </div>
        <h1>Admin sign in</h1>
        <p className="sub">Sign in to manage leads, reviews, and site content.</p>

        {!configured && (
          <div className="admin-notice">
            Firebase isn&rsquo;t connected yet. Add your Firebase project
            credentials as environment variables (<code>NEXT_PUBLIC_FIREBASE_*</code>)
            and create a user in the Firebase Console under Authentication
            → Users. See <code>README.md</code> for the full setup steps.
          </div>
        )}

        {error && <div className="admin-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label>Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="admin-btn admin-btn-primary admin-submit"
            disabled={submitting}
          >
            {submitting ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        <div className="admin-auth-foot">
          <a href="/">← Back to the public site</a>
        </div>
      </div>
    </div>
  );
}
