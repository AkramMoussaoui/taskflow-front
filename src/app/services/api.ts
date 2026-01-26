/**
 * API Service for TaskFlow
 * Handles communication with the backend Lambda Function URL.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export interface TaskData {
  title: string;  
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in-progress' | 'review' | 'done';
  tags?: string[];
  assignees?: any[];
  dueDate?: string;
  comments?: any[];
}

export interface TaskResponse extends TaskData {
  taskId: string;
  userId: string;
  createdAt: string;
}

/**
 * Standard fetch wrapper with error handling.
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('taskflow_id_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  if (token) {
    (headers as any)['Authorization'] = token; // API Gateway expects "Authorization: <token>" or "Bearer <token>" depending on configuration.
    // For Cognito Authorizer with "Header: Authorization", usually just the token if not standard OAuth/OIDC flow, OR "Bearer <token>".
    // AWS Cognito HTTP Authorizer typically parses the Bearer.
    (headers as any)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API Error ${response.status}: ${errorBody || response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const taskApi = {
  /**
   * Fetches all tasks for the current user.
   */
  listTasks: async (): Promise<TaskResponse[]> => {
    return apiFetch<TaskResponse[]>('/tasks');
  },

  /**
   * Creates a new task.
   */
  createTask: async (task: TaskData): Promise<TaskResponse> => {
    return apiFetch<TaskResponse>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  },

  /**
   * Updates an existing task.
   */
  updateTask: async (taskId: string, updates: Partial<TaskData>): Promise<{ message: string }> => {
    return apiFetch<{ message: string }>(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  /**
   * Deletes a task.
   */
  deleteTask: async (taskId: string): Promise<{ message: string }> => {
    return apiFetch<{ message: string }>(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Registers a new user.
   */
  signup: async (email: string, password: string, role: string, firstName: string, lastName: string): Promise<{ message: string; userSub: string }> => {
    return apiFetch<{ message: string; userSub: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, role, firstName, lastName }),
    });
  },

  /**
   * Authenticates a user.
   */
  login: async (email: string, password: string): Promise<{
    accessToken: string;
    idToken: string;
    refreshToken: string;
    expiresIn: number;
  }> => {
    return apiFetch<{
      accessToken: string;
      idToken: string;
      refreshToken: string;
      expiresIn: number;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Verifies a user's email address.
   */
  verify: async (email: string, code: string): Promise<{ message: string }> => {
    return apiFetch<{ message: string }>('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
    });
  },

  /**
   * Resends the verification code to the user's email.
   */
  resendCode: async (email: string): Promise<{ message: string }> => {
    return apiFetch<{ message: string }>('/auth/resend-code', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  /**
   * Initiates a password reset request.
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    return apiFetch<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  /**
   * Confirms a password reset with a code and new password.
   */
  resetPassword: async (email: string, code: string, newPassword: string): Promise<{ message: string }> => {
    return apiFetch<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, code, newPassword }),
    });
  },
};
