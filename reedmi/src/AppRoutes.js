import { useState, useEffect } from "react";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import SelectedPost from './SelectedPost';
import TechNews from './TechNews';
import NewPost from './components/NewPost';
import Register from './Register';
import LoginPage from './LoginPage';
import apiClient from "./apiClient";
import AuthenticatedRoute from './AuthenticatedRoute';

function AppRoutes() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  const [allTopics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await fetchCurrentUser();
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [loggingIn]);

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
      console.log("Fetching current user")
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
        <Route path='/register' element={<Register setLoggingIn={setLoggingIn} />} />
        <Route path='/login' element={<LoginPage setLoggingIn={setLoggingIn} />} />
        <Route path='/home' element={
          <AuthenticatedRoute username={username} setLoggingIn={setLoggingIn}>
            <Home posts={posts} allTopics={allTopics} fetchTopics={fetchTopics} setLoggingIn={setLoggingIn}/>
          </AuthenticatedRoute>
        } />
        <Route path="/SelectedPost/:postId" element={
          <AuthenticatedRoute username={username} loggingIn={loggingIn}>
            <SelectedPost posts={posts}/>
          </AuthenticatedRoute>
        } />
        <Route path="/techNews" element={
          <AuthenticatedRoute username={username} loggingIn={loggingIn}>
            <TechNews />
          </AuthenticatedRoute>
        } />
        <Route path="/createNewPost" element={
         <AuthenticatedRoute username={username} loggingIn={loggingIn}>
            <NewPost fetchPosts={fetchPosts} allTopics={allTopics} />
          </AuthenticatedRoute>
        } />
       <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;