import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Cognito Configuration
// TODO: improvements - move these to env vars
const COGNITO_DOMAIN = 'https://taskflow-290456977869.auth.eu-west-1.amazoncognito.com';
const CLIENT_ID = '146kacf41m3gjta57snqjbvai4';
const REDIRECT_URI = `${window.location.origin}/auth/callback`;

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying authentication...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError(`Auth failed: ${searchParams.get('error_description') || errorParam}`);
      return;
    }

    if (!code) {
      setError('No authorization code found.');
      return;
    }

    const exchangeCodeForToken = async () => {
      try {
        setStatus('Exchanging code for tokens...');
        const tokenUrl = `${COGNITO_DOMAIN}/oauth2/token`;
        
        const body = new URLSearchParams();
        body.append('grant_type', 'authorization_code');
        body.append('client_id', CLIENT_ID);
        body.append('code', code);
        body.append('redirect_uri', REDIRECT_URI);

        const response = await fetch(tokenUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error_description || 'Failed to exchange token');
        }

        const data = await response.json();
        
        if (data.id_token) {
          // Store tokens in localStorage (matching api.ts logic)
          localStorage.setItem('taskflow_id_token', data.id_token);
          if (data.access_token) localStorage.setItem('taskflow_access_token', data.access_token);
          if (data.refresh_token) localStorage.setItem('taskflow_refresh_token', data.refresh_token);
          
          setStatus('Login successful! Redirecting...');
          setTimeout(() => navigate('/dashboard'), 1000);
        } else {
          throw new Error('No ID token received');
        }

      } catch (err: any) {
        console.error('Token exchange error:', err);
        setError(err.message || 'Authentication failed');
      }
    };

    exchangeCodeForToken();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center"
      >
        {error ? (
          <div className="text-red-600">
            <h3 className="text-lg font-bold mb-2">Authentication Failed</h3>
            <p className="text-sm text-slate-600 mb-4">{error}</p>
            <button 
              onClick={() => navigate('/login')}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-slate-600 font-medium">{status}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
