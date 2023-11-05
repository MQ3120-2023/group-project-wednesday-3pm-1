import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../Home.css';
import './PostList.css';
import ImageWithCheck from "./ImageWithCheck";

function PostList({posts, filter}) {
  const navigate = useNavigate(); 
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    console.log(`Filtering posts with filter ${filter}!`); /*For debugging purposes, to check if post filtering is working correctly */
    console.log(JSON.stringify(posts));

    //Shows all posts without filtering if 'all' button is clicked
    if (!filter || filter === "All") {
      setFilteredPosts(posts);
    } else {
    //Otherwise, filter posts based of what category (topic) has been selected
      const newFilteredPosts = posts.filter(post => post.category.toLowerCase() === filter.toLowerCase());
      setFilteredPosts(newFilteredPosts);
    }
  }, [posts, filter]);

  //Navigates to SelectedPost.js page of specified post that the user has clicked on
  const handlePostClick = (postId) => {
    navigate(`/SelectedPost/${postId}`);
  };

  return (
    
    <div className = 'allPosts'>
      <h1 className="topicTitle" style={{ textAlign: 'center' }}>{filter === "All" ? "All Posts" : filter}</h1>
      {filteredPosts.map((post) => {
  return (
    <div 
      key={post.id} 
      className="postlist-post-container" 
      onClick={() => handlePostClick(post.id)} //On clicked, navigates to post's detail page
    >
      <div className="postList-infoContainer">
        
        {/* Displays authors user name or default name if user name isn't retrieved */}
        <h2 id="postList-info">
          u/{post.author ? post.author.username : "calum"}
        </h2>
        <h1 id="postList-title">{post.postTitle}</h1>
        <div className="postList-bodyPreview">{post.postContent}</div>
        </div>
        {post.img && <ImageWithCheck className="postlist-postImage" src={post.img} alt={post.postTitle} />}      
    </div>
  );
})}

    </div>
  );
}


export default PostList;
