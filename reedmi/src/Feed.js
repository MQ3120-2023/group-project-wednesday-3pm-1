import React, { useState, useEffect } from "react";
import axios from "axios";
import './Feed.css';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("effect is running");
    axios
      .get("http://localhost:3001/api/posts")
      .then((response) => {
        console.log("we have a response", response);
        setPosts(response.data);
      });
  }, []);

  return (
    <div className="Feed">
      <header className="Feed-header">
        <p>Welcome to ReedMi!</p>
        {posts.map((post) => (
          <div key={post.id} className="post-container">
            <h1>{post.postTitle}</h1>
            <figure>
              <img className="postImage" src={post.img} alt={post.postTitle} />
            </figure>
            <p className="postContent">{post.postContent}</p>
          </div>
        ))}
      </header>
    </div>
  );
}

export default Feed;

