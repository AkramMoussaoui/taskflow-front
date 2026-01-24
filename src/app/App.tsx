import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/app/pages/Login';
import Dashboard from '@/app/pages/Dashboard';

/**
 * Main App component that handles overall routing and layout.
 * @returns {JSX.Element} The rendered App component with routes.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route: Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Protected Route: Dashboard (for now just a direct route) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Catch-all: Redirect to login or show 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
