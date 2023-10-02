import './App.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("effect is running");
    axios
    .get("http://localhost:3001/api/posts")
    .then((response) => {
      //get request to retrieve product information from the sampledata.json from the back end server
      console.log("we have a response", response);
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Welcome to ReedMi!
        </p>
        {posts.map(post => (
        <div key={post.id} className="post-container">
          <h1>{post.postTitle}</h1>
          <img src={post.img} alt={post.postTitle} />
          <p>{post.postContent}</p>
        </div>
        ))}
      </header>
    </div>
  );
}

export default App;
