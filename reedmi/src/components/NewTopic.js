import React from "react";
import '../Home.css';
import apiClient from "../apiClient";

function NewTopic({ fetchTopics, hideForm}){

    const handleSubmitNewTopic = (event) => {
        event.preventDefault();
        hideForm();

        //retrieves topic's name and description
        const topicName = event.target.elements.topicName.value;
        const topicDescription = event.target.elements.topicDescription.value;

        //debugging
        console.log("Topic Name:", topicName);
        console.log("Topic Description:", topicDescription);

        // Sends new topic to the backend server
        const newTopic = {
          topicName: topicName,
          topicDescription: topicDescription
        }

        //Sends a POST request to the server to create a new topic
        apiClient
          .post(`/api/topics/`, newTopic)
          .then(() => {
            fetchTopics(); // Makes sure that the updated topic list is displayed
          })
          .catch((error) => {
            console.error("There was an error posting the new topic:", error);
          });
    };

    
    return(
        <div>
        <form className = "newTopicForm" onSubmit={handleSubmitNewTopic}>
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