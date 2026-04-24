import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiseaseDashboard from './DiseaseDashboard';
import AdminPanel from './AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DiseaseDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
