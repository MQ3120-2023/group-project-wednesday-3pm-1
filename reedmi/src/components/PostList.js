import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../Home.css';
import './PostList.css';

function PostList({posts, filter}) {
  const navigate = useNavigate(); // Hook from react-router
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    console.log(`Filtering posts with filter ${filter}!`);
    console.log(JSON.stringify(posts));

    if (!filter || filter === "All") {
      setFilteredPosts(posts);
    } else {
      const newFilteredPosts = posts.filter(post => post.category.toLowerCase() === filter.toLowerCase());
      setFilteredPosts(newFilteredPosts);
    }
  }, [posts, filter]);

  const handlePostClick = (postId) => {
    navigate(`/SelectedPost/${postId}`);
  };

  return (
    
    <div className = 'allPosts'>
      <h1 style={{ textAlign: 'center' }}>{filter === "All" ? "All Posts" : filter}</h1>
      {filteredPosts.map((post) => {
        return (
          <div 
            key={post.id} 
            className="postlist-post-container" 
            onClick={() => handlePostClick(post.id)}
          >

            
            <h1 id="postList-title">{post.postTitle}</h1>
    
              <img className="postlist-postImage" src={post.img} alt={post.postTitle} />
            
          </div>
        );
      })}
    </div>
  );
}

export default PostList;
