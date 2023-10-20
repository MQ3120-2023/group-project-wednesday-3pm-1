import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

function NewTopic(){
    
    return(
        <div>
            <form>
                <label>Name of Topic</label>
                <input type="text"id="topicName"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
      
    );
}

export default NewTopic;