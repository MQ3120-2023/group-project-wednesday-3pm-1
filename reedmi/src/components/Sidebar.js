import React, { useState } from 'react';
import NewTopic from './NewTopic';
import './SideBar.css';

function Sidebar({ allTopics, fetchTopics, selectedTopic, setSelectedTopic }) {
    const [showTopicForm, setShowTopicForm] = useState(false);

    const showForm = (booleanVariable) => {
        if (booleanVariable) {
            return (<NewTopic fetchTopics={fetchTopics} hideForm={hideForm} />);
        }
    };

    const hideForm = () => {
        setShowTopicForm(false);
    };

    return (
        <div id='sideBar'> 
          `Topics;`
       
          <button className="eachTopicButton" onClick={() => setSelectedTopic("All")}> {/*this button shows all posts when clicked */}
              <p className="eachTopicText">All</p> 
            </button>
          
          {/*Iterates over each topic in the array, and creates and assigns every topic to their own button */}
          {allTopics.map((currentTopic, index) => ( 
            <button className="eachTopicButton" onClick={() => setSelectedTopic(currentTopic.topicName)}>
              <p className="eachTopicText" key={index}>{currentTopic.topicName}</p>
            </button>
          ))}
          {/*This button uses the showForm constant to display the form responsible for adding a new topic to the topic list */}
          <button className="newTopicButton" onClick={() => setShowTopicForm(!showTopicForm)}>Create New Topic +</button>
          {showForm(showTopicForm)}
        </div>
    );
}

export default Sidebar;
