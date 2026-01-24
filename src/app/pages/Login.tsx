import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

/**
 * Login component providing a premium authenticated entry point.
 * Features a clean, "Google Antigravity" light theme with subtle glassmorphism.
 * @returns {JSX.Element} The rendered Login component.
 */
export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Handles the login form submission.
   * Redirects to the dashboard on success.
   * @param {React.FormEvent} e - The form event.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate a brief delay for a premium feel
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-50">
      {/* Dynamic Background Elements - Soft Pastels */}
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
              className="mx-auto h-12 w-12 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mb-4 shadow-[0_8px_16px_rgba(var(--primary),0.2)]"
            >
              <CheckSquare className="h-7 w-7" />
            </motion.div>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</CardTitle>
            <CardDescription className="text-slate-500">
              Enter your credentials to access your workspace
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-700 text-sm font-medium ml-1">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-slate-700 text-sm font-medium">Password</Label>
                  <Button variant="link" className="px-0 font-normal text-xs text-slate-500 hover:text-slate-900 h-auto transition-colors">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 bg-white border-slate-200 text-slate-900 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-[0_8px_16px_rgba(37,99,235,0.15)] hover:shadow-[0_12px_24px_rgba(37,99,235,0.2)] transition-all duration-300 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.span 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>

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
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 h-10 rounded-xl transition-all">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="pb-8 justify-center">
            <p className="text-slate-500 text-sm">
              Don&apos;t have an account?{' '}
              <Button variant="link" className="p-0 h-auto font-medium text-primary hover:text-primary/80 transition-colors">
                Sign up for free
              </Button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
