import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function ChosenPost({posts}){
    const id = useParams().postId;

    const post = posts.find(i => i.id == id) || {};

    return(
        <div className="post-container">
              <h1 id="postTitle" >{post.postTitle}</h1>
              <figure>
                <img className="postImage" src={post.img} alt={post.postTitle} />
              </figure>
              <p className="postContent">{post.postContent}</p>
            </div>
    );
}

export default ChosenPost;