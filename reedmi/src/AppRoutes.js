// AppRoutes.js
import axios from "axios";
import { useState, useEffect } from "react";
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
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [allTopics, setTopics] = useState([]);


  useEffect(() => {
    console.log("effect is running");
    fetchPosts();
    fetchTopics();
    fetchCurrentUser();
  }, []);

  const fetchPosts = () => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching products:", error);
      });
  }

  const fetchTopics = () => {
    axios
      .get("/api/topics")
      .then((response) => {
        setTopics(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching topics:", error);
      });
  }


  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('/api/auth/current_user', { withCredentials: true });
      setUsername(response.data.username);
    } catch (err) {
      setError('Could not fetch user data');
    }
  };

  
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<Home posts = {posts} allTopics = {allTopics} fetchTopics={fetchTopics}/>} /> 
        <Route path="/SelectedPost/:postId" element={<SelectedPost posts = {posts}/>} />
        <Route path="/techNews" element={<TechNews />} />
        <Route path="/createNewPost" element={<NewPost fetchPosts = {fetchPosts} allTopics = {allTopics} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
