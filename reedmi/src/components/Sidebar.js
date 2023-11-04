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

          {/*this button shows all posts when clicked */}
          <button 
              className={`topicButton ${selectedTopic === "All" ? 'topicButton-selected' : 'topicButton-unselected'}`} 
              onClick={() => setSelectedTopic("All")}
          >
              <p className="eachTopicText">All</p> 
          </button>
          
          {/*Iterates over each topic in the array, creates and assigns every topic to their own button */}
          {allTopics.map((currentTopic, index) => ( 
            <button 
                className={`topicButton ${selectedTopic === currentTopic.topicName ? 'topicButton-selected' : 'topicButton-unselected'}`} 
                onClick={() => setSelectedTopic(currentTopic.topicName)}
                key={index}
            >
              <p className="eachTopicText">{currentTopic.topicName}</p>
            </button>
          ))}
          
          {/*This button uses the showForm constant to display the form responsible for adding a new topic to the topic list */}
          <button 
              className={`newTopicButton ${showTopicForm ? 'topicButton-selected' : 'topicButton-unselected'}`} 
              onClick={() => setShowTopicForm(!showTopicForm)}
          >
              Create New Topic +
          </button>
          
          {showForm(showTopicForm)}
        </div>
    );
}

export default Sidebar;
