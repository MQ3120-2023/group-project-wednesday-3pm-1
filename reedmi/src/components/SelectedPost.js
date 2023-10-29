import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Home.css";

function SelectedPost({ posts }) {
  const { postId } = useParams();

 
  const post = posts ? posts.find((p) => p.id === postId) : null;

 
  const [commentInput, setCommentInput] = useState("");
  const [reacted, setReacted] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

 
  useEffect(() => {
    if (post) {
      setLikes(post.likes || 0);
      setDislikes(post.dislikes || 0);
    }
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();

    
      axios
        .post(`http://localhost:3001/api/posts/${postId}/comments`, {
          id: "c" + (post.comments.length + 1).toString(),
          author: "Your Name",
          text: commentInput,
        })
        .then(() => {

          post.comments.push({
            id: "c" + (post.comments.length + 1).toString(),
            author: "Your Name",
            text: commentInput,
          });
          setCommentInput("");
        });
    };


    const handleLike = () => {
      if(reacted){
        console.log("removing a like");
        axios.post(`http://localhost:3001/api/posts/${postId}/like`, {likes:-1}).then(() => {
          setLikes(likes-1);
          setReacted(false);
        });
    }else{
        console.log("adding a like");
        axios.post(`http://localhost:3001/api/posts/${postId}/like`, {likes:1}).then(() => {
          setLikes(likes+1);
          setReacted(true);
      });
    }
    };
    

  const handleDislike = () => {
    if(reacted){
      console.log("removing a dislike")
      axios.post(`http://localhost:3001/api/posts/${postId}/dislike`, {dislikes:-1}).then(() => {
        setDislikes(dislikes-1);
        setReacted(false);
      });
    }else{
      console.log("adding a dislike");
      axios.post(`http://localhost:3001/api/posts/${postId}/dislike`, {dislikes:1}).then(() => {
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
            {comment.author}: {comment.text}
          </p>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}

export default SelectedPost;
