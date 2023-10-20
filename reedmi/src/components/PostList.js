import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

function PostList({posts, filter}){
    console.log("Filter value:", filter);
    return(
      
      <div>
            {posts
              // Filter the posts based on the filter value.
              .filter(post => !filter || filter === "All" || post.topic === filter) //MIFF post.topic is undefined
              
              .map((post) => {
                  console.log("Post's topic:", post.topic)
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