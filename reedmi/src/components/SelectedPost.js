import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import './SelectedPost.css';
import apiClient from "../apiClient";

function SelectedPost() {
  const { postId } = useParams();

 
  // const post = ??

  const [post, setPost] = useState(null);

  const [commentInput, setCommentInput] = useState("");
  const [reacted, setReacted] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    apiClient.get(`/api/posts/${postId}`)
      .then(response => {
        setPost(response.data);
        setLikes(response.data.likes || 0);
        setDislikes(response.data.dislikes || 0);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  useEffect(() => {
    if (post) {
      setLikes(post.likes || 0);
      setDislikes(post.dislikes || 0);
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    addComment()
};


const addComment = async () => {
  try {
  const response = await apiClient.post(`/api/posts/${postId}/comment`, { commentInput }, { withCredentials: true });
  if (response.status === 200) {
    console.log("Comment saved successfully!", response.data);
    setCommentInput('');
    
    setTimeout(() => {
      apiClient.get(`/api/posts/${postId}`)
        .then(response => {
          setPost(response.data);
        })
        .catch(error => {
          console.error('Error fetching post:', error);
        });
    }, 500);
  } else {
    console.error("Error submitting comment:", response.data.error);
  }
} catch (error) {
  console.error("Network error:", error);
}

}

    const handleLike = () => {
      if(reacted){
        console.log("removing a like");
        apiClient.post(`http://localhost:3001/api/posts/${postId}/like`, {likes:-1}).then(() => {
          setLikes(likes-1);
          setReacted(false);
        });
    }else{
        console.log("adding a like");
        apiClient.post(`http://localhost:3001/api/posts/${postId}/like`, {likes:1}).then(() => {
          setLikes(likes+1);
          setReacted(true);
      });
    }
    };
    

  const handleDislike = () => {
    if(reacted){
      console.log("removing a dislike")
      apiClient.post(`http://localhost:3001/api/posts/${postId}/dislike`, {dislikes:-1}).then(() => {
        setDislikes(dislikes-1);
        setReacted(false);
      });
    }else{
      console.log("adding a dislike");
      apiClient.post(`http://localhost:3001/api/posts/${postId}/dislike`, {dislikes:1}).then(() => {
        setDislikes(dislikes+1);
        setReacted(true);
    });

    }
  };

  
  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="post-container">
      <h1 id="postTitle">{post.postTitle}</h1>
      <figure>
        <img className="postImage" src={post.img} alt={post.postTitle} />
      </figure>
      <div>
        <p>Likes: {likes}</p>
        <p>Dislikes: {dislikes}</p>
        <button onClick={handleLike} className="submitButton">Like</button>
        <button onClick={handleDislike} className="submitButton">Dislike</button>
      </div>
      <p className="postContent">{post.postContent}</p>
      <div className="formBox">
        <form onSubmit={handleSubmit}>
          <label>Add comment: </label>
          <div className="comment-container">
            <textarea
              className="comment"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              rows="1"
            />
          </div>
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
        </div>

        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <p key={comment.id}>
          <span className="comment-text"> {comment.author.username}: {comment.content}</span>
            </p>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
  );
}

export default SelectedPost;
