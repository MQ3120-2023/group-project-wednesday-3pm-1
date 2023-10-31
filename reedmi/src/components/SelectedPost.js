import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import './SelectedPost.css';
import apiClient from "../apiClient";

function SelectedPost() {
  const { postId } = useParams();

 
  // const post = ??

  const [post, setPost] = useState(null);

  const [commentInput, setCommentInput] = useState("");
  const [reacted, setReacted] = useState(null); // 'upvote' or 'downvote'
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (post) {
      setLikes(post.likes || 0);
      setDislikes(post.dislikes || 0);
      setReacted(post.userReaction || null);
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
    
    setTimeout(fetchPost, 500);
  } else {
    console.error("Error submitting comment:", response.data.error);
  }
} catch (error) {
  console.error("Network error:", error);
}

}

const fetchPost = () => {
  apiClient.get(`/api/posts/${postId}`)
    .then(response => {
      setPost(response.data);
      setLikes(response.data.likes || 0);
        setDislikes(response.data.dislikes || 0);
    })
    .catch(error => {
      console.error('Error fetching post:', error);
    });
};



    const handleLike = () => {
      console.log("Like!")
      apiClient.post(`http://localhost:3001/api/posts/${postId}/reaction`, { reaction: 'upvote' }, { withCredentials: true })
      setTimeout(fetchPost, 0);
    };
    

  const handleDislike = () => {
    apiClient.post(`http://localhost:3001/api/posts/${postId}/reaction`, { reaction: 'downvote' }, { withCredentials: true })
    setTimeout(fetchPost, 0);
  };

  
  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="post-container">
      <h1 id="postTitle">{post.postTitle}</h1>
     
      <p className="postContent">{post.postContent}</p>
      <figure>
        <img className="postImage" src={post.img} alt={post.postTitle} />
      </figure>
      <div>
        <p>Likes: {likes}</p>
        <p>Dislikes: {dislikes}</p>
        <button onClick={handleLike} className="submitButton">Like</button>
        <button onClick={handleDislike} className="submitButton">Dislike</button>
      </div>
    
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
