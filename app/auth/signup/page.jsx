'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUp } from '@/lib/supabase';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    const { data, error: signUpError } = await signUp(
      formData.email,
      formData.password,
      { full_name: formData.fullName }
    );

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data?.user) {
      setMessage('Account created! Please check your email to verify your account.');
      setTimeout(() => {
        router.push('/auth/signin');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-lg opacity-75"></div>
                <div className="relative bg-white rounded-lg p-3">
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-white/70">Join PromptCraft and start creating amazing prompts</p>
          </div>

          {/* Sign Up Card */}
          <div className="glass-card rounded-2xl p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg animate-shake">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
                <p className="text-green-400 text-sm">{message}</p>
              </div>
            )}

            {/* Sign Up Form */}
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 transition-all-base"
                  placeholder="John Doe"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 transition-all-base"
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 transition-all-base"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={8}
                />
                <p className="text-white/50 text-xs mt-1">At least 8 characters</p>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-white/50 transition-all-base"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 mr-2 rounded"
                  required
                  disabled={loading}
                />
                <label htmlFor="terms" className="text-white/70 text-sm">
                  I agree to the{' '}
                  <Link href="/terms" className="text-purple-300 hover:text-purple-200">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-purple-300 hover:text-purple-200">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full relative group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-all-base"></div>
                <div className="relative bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:scale-105 transition-all-fast flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </div>
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-white/70 text-sm">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-purple-300 hover:text-purple-200 font-medium transition-all-fast">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-white/70 hover:text-white text-sm transition-all-fast inline-flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
