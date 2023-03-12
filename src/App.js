import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<ActivityList />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
