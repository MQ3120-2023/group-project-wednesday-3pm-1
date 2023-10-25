import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../App.css';

function NewTopic({ fetchTopics, hideForm}){

    const handleSubmitNewTopic = (event) => {
        event.preventDefault();
        hideForm();
        const topicName = event.target.elements.topicName.value;
        const topicDescription = event.target.elements.topicDescription.value;

        console.log("Topic Name:", topicName);
        console.log("Topic Description:", topicDescription);

        // Sends new topic to the backend server
        const newTopic = {
          topicName: topicName,
          topicDescription: topicDescription
        }
        axios
          .post(`http://localhost:3001/api/topics/`, newTopic)
          .then(() => {
            fetchTopics(); // To make sure that the updated topic list is displayed
          })
          .catch((error) => {
            console.error("There was an error posting the new topic:", error);
          });
    };

    
    return(
        <div>
        <form onSubmit={handleSubmitNewTopic}>
            <label>Topic Name</label>
            <input type="text" name="topicName" maxLength={25} required/>
            <br></br>
            <label>Topic Description</label>
            <textarea type="text" name="topicDescription" required/>
            <button type="submit">Submit</button>
        </form>
        </div>
      
    );
}

export default NewTopic;