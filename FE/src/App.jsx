import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventPage from './pages/EventPage';
import AdminDashboard from './pages/AdminDashboard';
import RegisteredStudents from './pages/RegisteredStudents';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<EventPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/registrations" element={<RegisteredStudents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
