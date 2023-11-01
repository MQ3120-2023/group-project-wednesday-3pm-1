import React, { useState, useEffect } from "react";
import apiClient from "../apiClient";
import './NewPost.css'
import Navbar from "../Navbar.js";
import { v4 as uuidv4 } from 'uuid';

function NewPost({fetchPosts, allTopics}) {
    // states for each entry in the form
    const [postTitle, setTitle] = useState('');
    const [postContent, setContent] = useState('');
    const [postImage, setImage] = useState(null)
    const [postTopic, setTopic] = useState('Hardware');
    const [showMessage, setShowMessage] = useState(false);
    const baseurl = `/api/createNewPost`

    // will be run whenever the showMessage state changes 
    useEffect(() => {
        if (showMessage) {
            // if showMessage is true, wait for 2 seconds and turn it to false 
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [showMessage]);

    const addPostToBackEnd = (e) => {
        setShowMessage(true)
        e.preventDefault();
        const formData = new FormData();
        formData.append('postTitle', postTitle);
        formData.append('postContent', postContent);
        formData.append('postTopic', postTopic);

        if (postImage) {
            formData.append('postImage', postImage);
        }
        apiClient.post(baseurl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
                fetchPosts(); // PostList Rerendered whenever a new Post is added
                console.log('Post successfully added: ', response.data);
        }).catch(error => {
                // Handle error
                console.log('An error occured while adding the new post: ', error);
        });
    }


    return (
       // We make it optional for the user to insert an image, all the other fields need to be compulsory
       // Hence have the "required" attribute to enforce that certain fields MUST be filled out
       // Before submitting the form
    <div>
        <Navbar />
        <form id="newPostForm" onSubmit={addPostToBackEnd}>
            <input id="postTitleForm" type="text" value={postTitle} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" required />
            <input id="postImageForm"  type="file" onChange={(e) => setImage(e.target.files[0])} />
            <textarea id="postContentForm" value={postContent} onChange={(e) => setContent(e.target.value)} placeholder="Content" required></textarea>
            <select id="postTopicForm" value={postTopic} onChange={(e) => setTopic(e.target.value)} required>
                <option value="" disabled>Select a Topic</option>
                {allTopics.map((t) => (
                    <option value={t.topicName}>
                        {t.topicName}
                    </option>
                ))}
                <option value="other">Other</option>
            </select>
            <button id="submitButtonPostForm" type="submit">Post</button>
            {(showMessage ? <div className="newPostAddedMessage">Post Successfully added!</div> : null)}
        </form>
    </div>
    )
}

export default NewPost;