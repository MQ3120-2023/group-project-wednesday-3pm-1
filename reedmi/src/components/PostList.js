import React from "react";
import { Link } from "react-router-dom";
import '../App.css';
import { useState, useEffect } from "react";

function PostList({posts, filter}){
    
  const [filteredPosts, setFilteredPosts] = useState(posts);

    useEffect(() => {
      
      console.log(`Filtering posts with filter ${filter}!`)

      console.log(JSON.stringify(posts))

      if (!filter || filter === "All") {
        setFilteredPosts(posts);
      } else {
        const newFilteredPosts = posts.filter(post => post.category.toLowerCase() === filter.toLowerCase());
        setFilteredPosts(newFilteredPosts);
      }
    }, [posts, filter]);

    return(
      
      <div>
            {filteredPosts.map((post) => {
                return(<Link to={"/SelectedPost/" + post.id} key={post.id} className="post-container">
                  <h1 id="postTitle" >{post.postTitle}</h1>
                  <figure>
                    <img className="postImage" src={post.img} alt={post.postTitle} />
                  </figure>
                </Link>)
              })}
        </div>
    )
}

export default PostList;