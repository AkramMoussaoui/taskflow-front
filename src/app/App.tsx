import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Showcase from './pages/Showcase';
import Signup from './pages/Signup';
import Landing from './pages/Landing';

/**
 * Main App component that handles overall routing and layout.
 * @returns {JSX.Element} The rendered App component with routes.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route: Dashboard (for now just a direct route) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Design System Showcase */}
        <Route path="/showcase" element={<Showcase />} />

        {/* Catch-all: Redirect to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
