import { taskApi } from '../services/api';

/**
 * Initiates the Google Sign-In flow by fetching the secure URL from the backend
 * and redirecting the user.
 * 
 * @param onError Callback function to handle errors (e.g., setting an error state).
 */
export const handleGoogleSignIn = async (onError: (message: string) => void) => {
  try {
    const redirectUri = `${window.location.origin}/auth/callback`;
    const response = await taskApi.getGoogleAuthUrl(redirectUri);
    window.location.href = response.url;
  } catch (err) {
    console.error('Failed to get Google Auth URL:', err);
    const errorMsg = err instanceof Error ? err.message : 'Failed to initialize Google Sign-In';
    onError(errorMsg);
  }
};

/**
 * Signs the user out by clearing all authentication tokens from local storage
 * and redirecting to the login page.
 */
export const handleSignOut = () => {
  localStorage.removeItem('taskflow_access_token');
  localStorage.removeItem('taskflow_id_token');
  localStorage.removeItem('taskflow_refresh_token');
  localStorage.removeItem('taskflow_email');
  window.location.href = '/login'; // Force reload/navigation to ensure clean state
};
