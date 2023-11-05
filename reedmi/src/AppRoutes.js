import { useState, useEffect } from "react";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import SelectedPost from './components/SelectedPost';
import TechNews from './components/TechNews';
import NewPost from './components/NewPost';
import Register from './Register';
import LoginPage from './LoginPage';
import apiClient from "./apiClient";


function AppRoutes() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [allTopics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTopics();
        await fetchCurrentUser();
        await fetchPosts();
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const fetchPosts = () => {
    apiClient
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching products:", error);
      });
  }

  const fetchTopics = () => {
    apiClient
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
      const response = await apiClient.get('/api/auth/current_user', { withCredentials: true });
      setUsername(response.data.username);
      console.log(username)
    } catch (err) {
      setError('Could not fetch user data');
      console.log(error)
    }
  };

  if (loading) {
    return <div></div>;
  }
  

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
