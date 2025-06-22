import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetail from './pages/ProblemDetail';
import LeaderboardPage from './pages/LeaderboardPage';
import SubmissionsPage from './pages/SubmissionsPage';


export function App() {
 
  return(
       <Router>
        <Routes>
           <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
       </Router>
  )
}

export default App;
