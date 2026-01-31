import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserCircle, ArrowRight, Github } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from '../components/ui/input-otp';
import { Logo } from '../components/icons/Logo';
import { taskApi } from '../services/api';

/**
 * Signup component for creating new accounts.
 * Features a role selection dropdown and a premium light theme.
 * @returns {JSX.Element} The rendered Signup component.
 */
export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = React.useState<1 | 2>(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [role, setRole] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');
  const [error, setError] = React.useState<React.ReactNode>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = React.useState(0);
  const [isResending, setIsResending] = React.useState(false);

  // Handle resend countdown
  React.useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const constraints = [
    { label: '8 characters minimum', test: (pwd: string) => pwd.length >= 8 },
    { label: 'Uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'Number', test: (pwd: string) => /[0-9]/.test(pwd) },
    { label: 'Special character', test: (pwd: string) => /[^A-Za-z0-9]/.test(pwd) },
  ];

  const isPasswordValid = constraints.every(c => c.test(password));

  /**
   * Handles the signup form submission.
   * Redirects to the dashboard on success.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) return;
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await taskApi.signup(email, password, role, firstName, lastName);
      setSuccess(response.message);
      setStep(2); // Move to verification step
    } catch (err: any) {
      console.error('Signup failed:', err);
      const errorCode = err.response?.code || (err.message?.includes('USER_ALREADY_CONFIRMED') ? 'USER_ALREADY_CONFIRMED' : err.message?.includes('USER_ALREADY_EXISTS') ? 'USER_ALREADY_EXISTS' : null);
      
      if (errorCode === 'USER_ALREADY_CONFIRMED') {
        setError(
          <div className="flex flex-col gap-1">
            <span>Account already active.</span>
            <div className="flex gap-2">
              <Link to="/login" className="underline font-bold hover:text-red-700">Sign in</Link>
              <span>or</span>
              <Link 
                to="/login" 
                state={{ initialView: 'forgot', email }} 
                className="underline font-bold hover:text-red-700"
              >
                Reset password
              </Link>
            </div>
          </div>
        );
      } else if (errorCode === 'USER_ALREADY_EXISTS') {
        setError(
          <div className="flex flex-col gap-1">
            <span>Account already exists but unverified.</span>
            <button 
              type="button" 
              onClick={() => setStep(2)}
              className="text-left underline font-bold hover:text-red-700"
            >
              Click here to verify your email
            </button>
          </div>
        );
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the email verification.
   */
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length < 6) return;
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await taskApi.verify(email, verificationCode);
      setSuccess('Email verified successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      console.error('Verification failed:', err);
      setError(err.message || 'Invalid verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles resending the verification code.
   */
  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setIsResending(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await taskApi.resendCode(email);
      setSuccess(response.message);
      setResendCooldown(60); // 60 seconds cooldown
    } catch (err: any) {
      console.error('Resend failed:', err);
      setError(err.message || 'Failed to resend code. Please try again later.');
    } finally {
      setIsResending(false);
    }
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
          <CardHeader className="space-y-1 pb-6 text-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto h-12 w-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-4 shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
            >
              <Logo className="h-7 w-7" />
            </motion.div>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
              {step === 1 ? 'Create account' : 'Verify email'}
            </CardTitle>
            <CardDescription className="text-slate-500">
              {step === 1 
                ? 'Join TaskFlow and start managing your workspace'
                : `We've sent a code to ${email}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium overflow-hidden"
              >
                {typeof error === 'string' ? error : error}
              </motion.div>
            )}
            {success && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm font-medium"
              >
                {success}
              </motion.div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSignup} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName" className="text-slate-700 text-sm font-medium ml-1">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane"
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName" className="text-slate-700 text-sm font-medium ml-1">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
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
                  <Label htmlFor="password" className="text-slate-700 text-sm font-medium ml-1">Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      className="pl-10 bg-white border-slate-200 text-slate-900 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {/* Password Constraints Checklist */}
                  <div className="grid grid-cols-2 gap-2 mt-1 px-1">
                    {constraints.map((c, i) => {
                      const isMet = c.test(password);
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${isMet ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-300'}`} />
                          <span className={`text-[11px] transition-colors duration-300 ${isMet ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                            {c.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role" className="text-slate-700 text-sm font-medium ml-1">Workspace Role</Label>
                  <Select required value={role} onValueChange={setRole}>
                    <SelectTrigger id="role" className="bg-white border-slate-200 text-slate-900 focus:border-primary/50 focus:ring-primary/20 h-10">
                      <div className="flex items-center gap-3">
                        <UserCircle className="h-4 w-4 text-slate-400" />
                        <SelectValue placeholder="Select your role" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pm">Project Manager</SelectItem>
                      <SelectItem value="frontend">Frontend Developer</SelectItem>
                      <SelectItem value="backend">Backend Developer</SelectItem>
                      <SelectItem value="fullstack">Fullstack Developer</SelectItem>
                      <SelectItem value="designer">UI/UX Designer</SelectItem>
                      <SelectItem value="qa">QA Engineer</SelectItem>
                      <SelectItem value="devops">DevOps Engineer</SelectItem>
                      <SelectItem value="stakeholder">Stakeholder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-[0_8px_16px_rgba(37,99,235,0.15)] hover:shadow-[0_12px_24px_rgba(37,99,235,0.2)] transition-all duration-300 group disabled:opacity-50 disabled:shadow-none"
                  disabled={isLoading || !isPasswordValid}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.span 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="grid gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Label className="text-slate-700 text-sm font-medium">Verification Code</Label>
                  <InputOTP 
                    maxLength={6} 
                    value={verificationCode} 
                    onChange={setVerificationCode}
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
                  <p className="text-xs text-slate-500 text-center px-4">
                    Enter the 6-digit code sent to your inbox.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-[0_8px_16px_rgba(37,99,235,0.15)] transition-all duration-300"
                    disabled={isLoading || isResending || verificationCode.length < 6}
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                  </Button>
                  
                  <div className="flex flex-col items-center gap-2">
                    <Button 
                      variant="link" 
                      type="button"
                      className="text-primary font-semibold text-sm h-auto p-0"
                      onClick={handleResend}
                      disabled={resendCooldown > 0 || isResending}
                    >
                      {isResending ? (
                        <motion.span 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full mr-2"
                        />
                      ) : null}
                      {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Didn\'t receive the code? Resend'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      type="button"
                      className="w-full text-slate-400 text-xs h-auto p-0 hover:bg-transparent"
                      onClick={() => setStep(1)}
                    >
                      Edit email address
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {step === 1 && (
              <>
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500">Or sign up with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 h-10 rounded-xl transition-all">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 h-10 rounded-xl transition-all"
                    onClick={() => {
                        // Cognito Hosted UI URL
                        const domain = 'https://taskflow-290456977869.auth.eu-west-1.amazoncognito.com';
                        const clientId = '146kacf41m3gjta57snqjbvai4';
                        const redirectUri = `${window.location.origin}/auth/callback`;
                        const responseType = 'code';
                        const scope = 'email+openid+profile';
                        
                        window.location.href = `${domain}/oauth2/authorize?client_id=${clientId}&response_type=${responseType}&scope=${scope}&redirect_uri=${redirectUri}&identity_provider=Google`;
                    }}
                  >
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
              </>
            )}
          </CardContent>
          <CardFooter className="pb-8 justify-center border-t border-slate-100 bg-slate-50/50 pt-6">
            <p className="text-slate-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
