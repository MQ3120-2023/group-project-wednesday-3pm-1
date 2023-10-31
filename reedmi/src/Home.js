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
import Navbar from "./Navbar";


function Home({posts, allTopics, fetchTopics}) {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [showTopicForm, setShowTopicForm] = useState(false)
  const showForm = (booleanVariable) => {
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
          {/* <button className="newTopicButton" onClick={() => setShowTopicForm(!showTopicForm)}>Create Topic +</button>
          {showForm(showTopicForm)} */}
          {allTopics.map((currentTopic, index) => (
            <button className="eachTopicButton" onClick={() => setSelectedTopic(currentTopic.topicName)}>
              <p className="eachTopicText" key={index}>{currentTopic.topicName}</p>
            </button>
          ))}
          <button className="newTopicButton" onClick={() => setShowTopicForm(!showTopicForm)}>Create New Topic +</button>
          {showForm(showTopicForm)}
        </div>

        <div className="content-area">
          <PostList posts={posts} filter={selectedTopic} />
        </div>
      </div>
    </div>
  );
}

export default Home;
