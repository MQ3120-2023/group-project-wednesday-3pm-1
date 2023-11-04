//import './Home.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PostList from './components/PostList';
import Sidebar from './components/Sidebar';
import SelectedPost from './components/SelectedPost';
import TechNews from './components/TechNews';
import NewTopic from './components/NewTopic';
import NewPost from './components/NewPost';

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
        
        <Sidebar 
          allTopics={allTopics} 
          fetchTopics={fetchTopics} 
          setSelectedTopic={setSelectedTopic}
          selectedTopic={selectedTopic}
          />

            <div className="content-area">
                <PostList posts={posts} filter={selectedTopic} />
            </div>
        </div>
    </div>
);
}

export default Home;
