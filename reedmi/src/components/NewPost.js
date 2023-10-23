import React, { useState, useEffect } from "react";
import axios from 'axios'
import './NewPost.css'
import { v4 as uuidv4 } from 'uuid';

function NewPost({fetchPosts, allTopics}) {
    // states for each entry in the form
    const [postTitle, setTitle] = useState('');
    const [postContent, setContent] = useState('');
    const [postImage, setImage] = useState(null)
    const [postTopic, setTopic] = useState('Hardware');
    
    const baseurl = `http://localhost:3001/api/createNewPost`

    const addPostToBackEnd = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('postTitle', postTitle);
        formData.append('postContent', postContent);
        formData.append('postTopic', postTopic);

        if (postImage) {
            formData.append('postImage', postImage);
        }
    //     const newPost ={
    //         postTitle: postTitle,
    //         postContent: postContent,
    //         img: postImage? URL.createObjectURL(postImage): null, // Converting the File Object to a data URL
    //         topic: postTopic,
    //         comments: [],
    //         likes: 0,
    //         dislikes: 0
    //    };
        // axios.post(baseurl, newPost)
        axios.post(baseurl, formData, {
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
        <form id="newPostForm" onSubmit={addPostToBackEnd}>
            <input id="postTitle" type="text" value={postTitle} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" required />
            <input id="postImage"  type="file" onChange={(e) => setImage(e.target.files[0])} />
            <textarea id="postContent" value={postContent} onChange={(e) => setContent(e.target.value)} placeholder="Content" required></textarea>
            <select id="postTopic" value={postTopic} onChange={(e) => setTopic(e.target.value)} required>
                <option value="" disabled>Select a Topic</option>
                {allTopics.map((t) => (
                    <option value={t.topicName}>
                        {t.topicName}
                    </option>
                ))}
                <option value="other">Other</option>
            </select>
            <button id="submitButton" type="submit">Post</button>
        </form>
    )
}

export default NewPost;