import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";

import './SelectedPost.css';
import apiClient from "./apiClient";

function SelectedPost() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);

  const [commentInput, setCommentInput] = useState(""); //stores what user has inputted into the comment form
  const [reacted, setReacted] = useState(null); //Identifies if a user has liked or disliked a post
  const [likes, setLikes] = useState(0); //sets like count
  const [dislikes, setDislikes] = useState(0); //sets dislike count

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


/*Responsible for allowing user to post comments. This function posts what ever is inputted into the form to the back end, and clears the field so that the user has some feedback that it has been sent. */
const addComment = async () => {
  try {
  const response = await apiClient.post(`/api/posts/${postId}/comment`, { commentInput }, { withCredentials: true }); /*Post request sending inputted comment to backend */
  if (response.status === 200) {
    console.log("Comment saved successfully!", response.data);
    setCommentInput('');
    
    setTimeout(fetchPost, 0);
  } else {
    console.error("Error submitting comment:", response.data.error);
  }
} catch (error) {
  console.error("Network error:", error); //error checking
}

}

/*Fetches updated data regarding post, and then updates page accordingly (e.g. new likes, comments) */
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

/*Sends like to backend, and updates page accordingly */
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
  
  apiClient.post(`/api/posts/${postId}/reaction`, { reaction: 'upvote' }, { withCredentials: true })
    .then(() => setTimeout(fetchPost, 0));
};

/*Sends dislike to backend, and updates page accordingly */
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

  apiClient.post(`/api/posts/${postId}/reaction`, { reaction: 'downvote' }, { withCredentials: true })
    .then(() => setTimeout(fetchPost, 500));
};


  
  if (!post) {
    return <div className="global-background"><Navbar>  </Navbar></div>;
  }

  return (

    <div className="selectedPost global-background">

<Navbar/>

    <div className="post-container">

    <div className="postView-postTitleAndContent">
    {/* Displaying selected post details */}
    <h2 id="postList-info">
        u/{post.author ? post.author.username : "calum"}
      </h2>
      <h1 id="postView-PostTitle">{post.postTitle}</h1>
      <p className="postContent">{post.postContent}</p>
        </div>
       
          <img className="postImage" src={post.img} alt={post.postTitle} />
      

      <div>
        {/* Displays number of likes */}
        <h2>👍: {likes}</h2>
        {/* Displays number of dislikes */}
        <h2>👎: {dislikes}</h2>
        {/* Like button*/}
        <button 
        onClick={handleLike} 
        className={`${reacted === 'upvote' ? 'selectedReactButton' : 'reactButton'}`}>
        {reacted === 'upvote' ? 'Liked' : 'Like'}
        {/*Changes like button to 'liked' if it is clicked on */}
      </button>
      <button 
        onClick={handleDislike} 
        className={`${reacted === 'downvote' ? 'selectedReactButton' : 'reactButton'}`}>
        {reacted === 'downvote' ? 'Disliked' : 'Dislike'}
        {/*Changes dislike button to 'disliked' if it is clicked on */}
      </button>
      </div>
    
      <h2>Replies</h2>
        {/*Checks if comments exist on this post. If they do, map them out and display them */}
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
  {/*Comment form, allowing the user to type in a comment into the input field and post it to the comment list */}
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
