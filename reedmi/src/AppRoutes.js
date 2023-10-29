// AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import Splash from './Splash';
import SelectedPost from './components/SelectedPost';
import TechNews from './components/TechNews';
import NewPost from './components/NewPost';
import Register from './Register';
import LoginPage from './LoginPage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<Home />} /> 
        <Route path="/SelectedPost/:postId" element={<SelectedPost />} />
        <Route path="/techNews" element={<TechNews />} />
        <Route path="/createNewPost" element={<NewPost />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
