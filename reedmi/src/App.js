import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Splash from './Splash';
import Feed from './Feed';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/welcome" element={<Splash />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="*" element={<Navigate to="/welcome" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
