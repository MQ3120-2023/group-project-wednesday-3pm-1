//import './Home.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PostList from './components/PostList';
import SelectedPost from './components/SelectedPost';
import TechNews from './components/TechNews';
import NewTopic from './components/NewTopic';
import NewPost from './components/NewPost';
import './components/SideBar.css';
import Navbar from './Navbar';


function Home({posts, allTopics, fetchTopics}) { 
  const [selectedTopic, setSelectedTopic] = useState("All"); /*Use state hooks  */
  const [showTopicForm, setShowTopicForm] = useState(false)
  const showForm = (booleanVariable) => { /*Responsible for showing add topic form when button is toggled*/
    if (booleanVariable) {
      return (<NewTopic fetchTopics = {fetchTopics} hideForm = {hideForm} />)
    }
  }

  const hideForm = () => {
    setShowTopicForm(false);
  }

  return (
    <div className="App">
      <Navbar />

      <div className="main-content">
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
            {/*This component displays only posts in correlation to what topic has been selected */}
        <div className="content-area">
          <PostList posts={posts} filter={selectedTopic} />
        </div>
      </div>
    </div>
  );
}

export default Home;
