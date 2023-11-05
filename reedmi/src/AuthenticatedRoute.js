import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import apiClient from './apiClient';

const fetchCurrentUser = async (setUsername, setError) => {
  try {
    console.log("Fetching current user");
    const response = await apiClient.get('/api/auth/current_user', { withCredentials: true });
    setUsername(response.data.username);
    console.log(response.data.username);
  } catch (err) {
    setError('Could not fetch user data');
    console.log(err);
  }
};

function AuthenticatedRoute({ children }) {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await fetchCurrentUser(setUsername, setError);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    console.log("Checking user...");
    return <div>Loading...</div>;
  }

  if (error || !username) {
    console.log("Forcing to login page...");
    return <Navigate to="/login" />;
  }

  return children;
}

export default AuthenticatedRoute;
