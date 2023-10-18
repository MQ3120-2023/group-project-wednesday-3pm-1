import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Splash from './Splash.js';
import Feed from './Feed.js';
import Register from './Register.js';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/welcome" element={<Splash />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/welcome" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
