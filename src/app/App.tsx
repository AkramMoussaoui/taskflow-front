import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Showcase from './pages/Showcase';
import Signup from './pages/Signup';

/**
 * Main App component that handles overall routing and layout.
 * @returns {JSX.Element} The rendered App component with routes.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route: Dashboard (for now just a direct route) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Design System Showcase */}
        <Route path="/showcase" element={<Showcase />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Catch-all: Redirect to login or show 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
