import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../App.css';

function NewTopic(){

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("event", event)
        console.log("value", event.target[0].value)
        //MIFF, please add this to backend 
        // Sends  posted comment to backend server
        axios
          .post(`http://localhost:3001/api/topics/`, {
            newTopic: event.target[0].value
          })
          .then(() => {
            window.reload()
          });
      };
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name of Topic</label>
                <input type="text"id="topicName" maxLength={25}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
      
    );
}

export default NewTopic;