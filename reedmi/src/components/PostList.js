import React from "react";
//import { Link } from "react-router-dom";

function PostList({posts}){
    return(
        <div>
            {posts.map(post => (
            <div key={post.id} className="post-container">
              <h1>{post.postTitle}</h1>
              <figure>
                <img className="postImage" src={post.img} alt={post.postTitle} />
              </figure>
              <p className="postContent">{post.postContent}</p>
            </div>
            ))}
        </div>
    )
}

export default PostList;