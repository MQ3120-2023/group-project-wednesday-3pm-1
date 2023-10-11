import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Splash.css';

function Splash() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();

    const navigateToFeed = () => {
        navigate('/feed');
    };

    const temporaryButtonHandler = () => {
        // This function can be used for temporary testing purposes
        console.log('Temporary button clicked');
        navigateToFeed(); // You can navigate to the "Feed" page here
    };

    const handleAddUser = async () => {
       
    
        // Define dummy data
        const dummyData = {
          username: `user${Math.floor(Math.random() * 10000)}`, // creates a random username
          password: 'dummyPassword123'
        };
    
        try {
          const response = await axios.post('http://localhost:3001/api/auth/register', dummyData);
          console.log(response.data); // Logging the response (can be removed)
          alert('User added successfully!'); 
        } catch (error) {
          console.error("Error adding user:", error);
          alert('Failed to add user.');
        }
    
       
      };
    

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const logOut = () => {
        // Implement your logout logic here
    };

    return (
        <div className="splash-main-container">
            <h2>Welcome To ReedMi</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" className="splash-user-image" />
                    <h3>User Logged in</h3>
                    <p className="splash-user-info">Name: {profile.name}</p>
                    <p className="splash-user-info">Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button className="splash-logout-button" onClick={logOut}>Log out</button>
                </div>
            ) : (
                <div>
                    
                    <br />
                    <button className="splash-temporary-button" onClick={handleAddUser}>Add User</button>
                </div>
            )}
        </div>
    );
}

export default Splash;
