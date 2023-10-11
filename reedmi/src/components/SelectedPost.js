import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

function SelectedPost({ posts }) {
  const id = useParams().postId;

  const post = posts.find((i) => i.id == id) || { comments: [] };

  const [commentInput, setCommentInput] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    // Sends  posted comment to backend server
    axios
      .post(`http://localhost:3001/api/posts/${id}/comments`, {
        id: "c" + (post.comments.length + 1).toString(), // Generates new comment id consisting of c (comment) followed by a number representing the next iteration
        author: "Your Name", // to be changed to logged in user
        text: commentInput,
      })
      .then(() => {
        // Updates local post's comment section with the newly made comment
        post.comments.push({
          id: "c" + (post.comments.length + 1).toString(),
          author: "Your Name",
          text: commentInput,
        });
        setCommentInput(""); // Resets input box to be blank after submit has been pressed
      });
  };

  const handleLike = () => {
    axios.post(`http://localhost:3001/api/posts/${id}/like`).then(() => {
      post.likes = post.likes + 1;
    });
  };
  
  const handleDislike = () => {
    axios.post(`http://localhost:3001/api/posts/${id}/dislike`).then(() => {
      post.likes = post.likes - 1;
    });
  };

  return (
    <div className="post-container">
      <h1 id="postTitle">{post.postTitle}</h1>
      <figure>
        <img className="postImage" src={post.img} alt={post.postTitle} />
      </figure>
      <div>
        <p>Likes: {post.likes}</p>
        <button onClick={handleLike} className="submitButton">Like</button>
        <button onClick={handleDislike} className="submitButton">Dislike</button>
      </div>
      <p className="postContent">{post.postContent}</p>
      <div className="formBox">
        <form onSubmit={handleSubmit}>
          <label>add comment: </label>
          <input
            type="text"
            className="comment"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
      </div>
      {post.comments.map((comment) => (
        <p key={comment.id}>
          {comment.author}: {comment.text}
        </p>
      ))}
    </div>
  );
}

export default SelectedPost;
