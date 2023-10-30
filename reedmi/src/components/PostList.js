import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../Home.css';

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
    <div>
      {filteredPosts.map((post) => {
        return (
          <div 
            key={post.id} 
            className="post-container" 
            onClick={() => handlePostClick(post.id)}
          >
            <h1 id="postTitle">{post.postTitle}</h1>
            <figure>
              <img className="postImage" src={post.img} alt={post.postTitle} />
            </figure>
          </div>
        );
      })}
    </div>
  );
}

export default PostList;
