import './Home.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PostList from './components/PostList';
import SelectedPost from './components/SelectedPost';
import TechNews from './components/TechNews';
import NewTopic from './components/NewTopic';
import NewPost from './components/NewPost';
import './components/SideBar.css';
import './components/SelectedPost.css';
import './components/HomePosts.css';

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
     
      <header className="App-header">
        <p className="header-title"><Link className="header-link" to={"/home"}> ReedMi </Link></p>
        <div className="navOptions">
        <Link to="/"><p onClick={() => setSelectedTopic("All")}>Home</p></Link>
        <Link className="header-link" to="/techNews">TechNews</Link>
        <div>
        <div className="navbar-links">
          <Link id="add-new-post" to="/createNewPost">Add New Post + </Link>
          </div>
          </div>
          </div>
      </header>
      <div className="main-content">  {/* to wrap all the content */}
        <aside id='sideBar'>
        Topics:
          {/*maps through topics from data.json and displays them one after the other*/}
          {allTopics.map((currentTopic, index) => {
            return (
              <button className="sideBarLink" onClick={() => setSelectedTopic(currentTopic.topicName)}>
  <p className="sideBarP" key={index}>{currentTopic.topicName}</p>
</button>)
          })}
          <button className="sideBarButton" onClick={() => setShowTopicForm(!showTopicForm)}>Add New Topic</button>
          {showForm(showTopicForm)}
        </aside>
        <div className="content-area">
        <PostList posts={posts} filter={selectedTopic} />
       </div>
       </div>
    </div>
  );
}

export default Home;
