import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from '../components/ui/input-otp';
import { Logo } from '../components/icons/Logo';
import { taskApi } from '../services/api';
import { handleGoogleSignIn } from '../utils/auth';

/**
 * Login component providing a premium authenticated entry point.
 * Features a clean, "Google Antigravity" light theme with subtle glassmorphism.
 * Now includes a full Forgot Password flow.
 * @returns {JSX.Element} The rendered Login component.
 */
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { initialView?: 'login' | 'forgot' | 'reset'; email?: string } | null;

  const [view, setView] = React.useState<'login' | 'forgot' | 'reset'>(state?.initialView || 'login');
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState(state?.email || '');
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [resetCode, setResetCode] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  // Auto-login check
  React.useEffect(() => {
    const checkSession = async () => {
      // Only run auto-login on initial view
      if (state?.initialView) return;

      const accessToken = localStorage.getItem('taskflow_access_token');
      const refreshToken = localStorage.getItem('taskflow_refresh_token');
      const idToken = localStorage.getItem('taskflow_id_token') || '';

      if (!accessToken || !refreshToken) return;

      try {
        // Simple JWT expiration check
        const payload = JSON.parse(atob(idToken.split('.')[1]));
        const exp = payload.exp * 1000;
        
        if (Date.now() < exp) {
           // Token is valid
           navigate('/dashboard');
        } else {
           // Token expired, try refresh
           console.log('Session expired, refreshing token...');
           const response = await taskApi.refreshToken(refreshToken);
           
           localStorage.setItem('taskflow_access_token', response.accessToken);
           localStorage.setItem('taskflow_id_token', response.idToken);
           // Refresh token might be rotated, but assuming the old one is still valid or we got a new one if Cognito returns it. 
           // Standard response from InitiateAuth REFRESH_TOKEN_AUTH might not include a new refresh token unless rotated.
           
           navigate('/dashboard');
        }
      } catch (err) {
        console.error('Auto-login failed:', err);
        // Clear invalid tokens
        localStorage.removeItem('taskflow_access_token');
        localStorage.removeItem('taskflow_id_token');
        localStorage.removeItem('taskflow_refresh_token');
        localStorage.removeItem('taskflow_email');
      }
    };

    checkSession();
  }, [navigate]);

  // Update view if state changes (e.g., navigating from Signup)
  React.useEffect(() => {
    if (state?.initialView) {
      setView(state.initialView);
    }
    if (state?.email) {
      setEmail(state.email);
    }
  }, [state]);

  /**
   * Handles the login form submission.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await taskApi.login(email, password);
      
      localStorage.setItem('taskflow_access_token', response.accessToken);
      localStorage.setItem('taskflow_id_token', response.idToken);
      localStorage.setItem('taskflow_refresh_token', response.refreshToken);
      localStorage.setItem('taskflow_email', email);
      
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the forgot password request.
   */
  const handleForgotPasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await taskApi.forgotPassword(email);
      setSuccess(response.message);
      setView('reset');
    } catch (err: any) {
      console.error('Password reset request failed:', err);
      setError(err.message || 'Failed to send reset code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the password reset confirmation.
   */
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resetCode.length < 6) return;
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await taskApi.resetPassword(email, resetCode, newPassword);
      setSuccess(response.message);
      setTimeout(() => {
        setSuccess(null);
        setView('login');
      }, 2000);
    } catch (err: any) {
      console.error('Password reset failed:', err);
      setError(err.message || 'Invalid code or failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-50">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 w-full max-w-md px-4"
      >
        <Card className="border-slate-200 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <CardHeader className="space-y-1 pb-8 text-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto h-12 w-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-4 shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
            >
              <Logo className="h-7 w-7" />
            </motion.div>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
              {view === 'login' ? 'Sign In' : view === 'forgot' ? 'Reset Password' : 'Confirm Reset'}
            </CardTitle>
            <CardDescription className="text-slate-500">
              {view === 'login' 
                ? 'Welcome back! Please sign in to your workspace'
                : view === 'forgot'
                ? 'Enter your email to receive a password reset code'
                : `We've sent a code to ${email}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg text-sm font-medium"
              >
                {success}
              </motion.div>
            )}

            {view === 'login' && (
              <form onSubmit={handleLogin} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-slate-700 text-sm font-medium ml-1">Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between ml-1">
                    <Label htmlFor="password" className="text-slate-700 text-sm font-medium ml-1">Password</Label>
                    <Button 
                      variant="link" 
                      type="button" 
                      className="px-0 font-medium text-xs text-primary hover:text-primary/80 h-auto"
                      onClick={() => setView('forgot')}
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-white border-slate-200 text-slate-900 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 mt-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            )}

            {view === 'forgot' && (
              <form onSubmit={handleForgotPasswordRequest} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-slate-700 text-sm font-medium ml-1">Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 mt-2 bg-primary text-white font-semibold rounded-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending Code...' : 'Send Reset Code'}
                </Button>
                <Button 
                  variant="ghost" 
                  type="button" 
                  className="text-slate-500 text-sm"
                  onClick={() => setView('login')}
                >
                  Back to login
                </Button>
              </form>
            )}

            {view === 'reset' && (
              <form onSubmit={handleResetPassword} className="grid gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Label className="text-slate-700 text-sm font-medium">Reset Code</Label>
                  <InputOTP 
                    maxLength={6} 
                    value={resetCode} 
                    onChange={setResetCode}
                    autoFocus
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPassword" className="text-slate-700 text-sm font-medium ml-1">New Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 bg-white border-slate-200 text-slate-900 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-primary text-white font-semibold rounded-xl transition-all duration-300"
                    disabled={isLoading || resetCode.length < 6}
                  >
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    type="button" 
                    className="w-full text-slate-500 text-sm"
                    onClick={() => setView('forgot')}
                  >
                    Resend code
                  </Button>
                </div>
              </form>
            )}

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 h-10 rounded-xl transition-all">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.05-.8 3.23-.74 2.08.09 3.14 1.25 3.53 1.94-3.13 2.1-2.43 6.38 1.14 7.76-.66 2.09-1.95 4.09-3.02 5.09-1.25 1.09-2.05.95-2.96.18zm-2.96-13.43c-1.35 1.5-3.32 2.37-4.38 1.48-1.55-1.57-1.12-3.82.26-5.32 1.34-1.29 3.53-2.31 4.58-1.46.99 1.48.57 3.93-.46 5.3z" />
                </svg>
                Apple
              </Button>
              <Button 
                variant="outline" 
                className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 h-10 rounded-xl transition-all"
                onClick={() => handleGoogleSignIn(setError)}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="pb-8 justify-center border-t border-slate-100 bg-slate-50/50 pt-6">
            <p className="text-slate-500 text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Sign up for free
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
