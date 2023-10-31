import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

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
  // If already liked, then undo the like
  if (reacted === 'upvote') {
    setReacted(null);
    setLikes(prevLikes => prevLikes - 1);
  } else {
    setReacted('upvote');
    setLikes(prevLikes => prevLikes + 1);

    // If previously disliked, then also undo the dislike
    if (reacted === 'downvote') {
      setDislikes(prevDislikes => prevDislikes - 1);
    }
  }
  
  apiClient.post(`http://localhost:3001/api/posts/${postId}/reaction`, { reaction: 'upvote' }, { withCredentials: true })
    .then(() => setTimeout(fetchPost, 500));
};

const handleDislike = () => {
  // If already disliked, then undo the dislike
  if (reacted === 'downvote') {
    setReacted(null);
    setDislikes(prevDislikes => prevDislikes - 1);
  } else {
    setReacted('downvote');
    setDislikes(prevDislikes => prevDislikes + 1);

    // If previously liked, then also undo the like
    if (reacted === 'upvote') {
      setLikes(prevLikes => prevLikes - 1);
    }
  }

  apiClient.post(`http://localhost:3001/api/posts/${postId}/reaction`, { reaction: 'downvote' }, { withCredentials: true })
    .then(() => setTimeout(fetchPost, 500));
};


  
  if (!post) {
    return <div><Navbar>  </Navbar></div>;
  }

  return (

    <div className="selectedPost">

<Navbar/>

    <div className="post-container">

    <div className="postView-postTitleAndContent">

      <h1 id="postView-PostTitle">{post.postTitle}</h1>
      <p className="postContent">{post.postContent}</p>
        </div>
        <figure>
          <img className="postImage" src={post.img} alt={post.postTitle} />
        </figure>

      <div>
        <h2>👍: {likes}</h2>
        <h2>👎: {dislikes}</h2>
        <button 
        onClick={handleLike} 
        className={`${reacted === 'upvote' ? 'selectedReactButton' : 'reactButton'}`}>
        {reacted === 'upvote' ? 'Liked' : 'Like'}
      </button>
      <button 
        onClick={handleDislike} 
        className={`${reacted === 'downvote' ? 'selectedReactButton' : 'reactButton'}`}>
        {reacted === 'downvote' ? 'Disliked' : 'Dislike'}
      </button>
      </div>
    
      <h2>Replies</h2>

        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <p key={comment.id}>
          <span className="comment-username">{comment.author.username}:</span>
          <span className="comment-text">{comment.content}</span>
            </p>
          ))
        ) : (
          <p>No comments yet.</p>
        )}

  <div className="formBox">
          <form onSubmit={handleSubmit}>
            <h3>New Reply</h3>
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

        </div>

        

      </div>
  );
}

export default SelectedPost;
