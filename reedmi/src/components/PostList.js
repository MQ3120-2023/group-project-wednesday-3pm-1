import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

function PostList({posts}){
    return(
        <div>
            {posts.map(post => (
            <Link to={"/ChosenPost/" + post.id} key={post.id} className="post-container">
              <h1 id="postTitle" >{post.postTitle}</h1>
              <figure>
                <img className="postImage" src={post.img} alt={post.postTitle} />
              </figure>
              
            </Link>
            ))}
        </div>
    )
}

export default PostList;