'use client';
import LoadingPage from '@/components/shared/LoadingPage';

import { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Github, Code2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-cyan-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-600 dark:text-cyan-400" />
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl });
  };

  const handleGithubSignIn = () => {
    signIn('github', { callbackUrl });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-cyan-50 to-purple-50 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-400/10"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-400/10"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-3xl border border-gray-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl md:p-10 dark:border-gray-800/50 dark:bg-slate-900/80"
      >
        {/* Logo & Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="relative mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-purple-600 dark:from-cyan-400 dark:to-purple-500"
          >
            <Code2 className="h-8 w-8 text-white" />
            <motion.div
              className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-xl dark:bg-cyan-400/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <h1 className="mb-2 bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-gray-300">
            Welcome Chief!
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sign in to continue...
          </p>
        </div>

        {/* Social Sign In Buttons */}
        <div className="space-y-3">
          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Continue with Google
            </span>
          </motion.button>

          <motion.button
            type="button"
            onClick={handleGithubSignIn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-900 bg-gray-900 px-4 py-3 shadow-sm transition-all hover:bg-gray-800 dark:border-white dark:bg-white dark:hover:bg-gray-100"
          >
            <Github className="h-5 w-5 text-white dark:text-gray-900" />
            <span className="font-medium text-white dark:text-gray-900">
              Continue with GitHub
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
