import './App.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PostList from './components/PostList';
import SelectedPost from './components/SelectedPost';
import TechNews from './components/TechNews';
import NewTopic from './components/NewTopic';
import NewPost from './components/NewPost';

function App() {

  const [posts, setPosts] = useState([]);
  const [allTopics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [showTopicForm, setShowTopicForm] = useState(false)
  
  const fetchPosts = () => {
    axios
      .get("http://localhost:3001/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching products:", error);
      });
  }

  const fetchTopics = () => {
    axios
      .get("http://localhost:3001/api/topics")  // Changed https to http for consistency
      .then((response) => {
        setTopics(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching topics:", error);
      });
  }

  const showForm = (booleanVariable) => {
    if (booleanVariable) {
      return (<NewTopic fetchTopics = {fetchTopics} hideForm = {hideForm} />)
    }
  }

  const hideForm = () => {
    setShowTopicForm(false);
  }

  useEffect(() => {
    console.log("effect is running");
    fetchPosts();
    fetchTopics();
  }, []);


  const addNewPost = (newPost) => {

  }
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <p><Link to={"/"}> ReedMi </Link></p>
          <Link to="/techNews">TechNews</Link>
        </header>
        <aside id='sideBar'>
        Topics:
          {/*maps through topics from data.json and displays them one after the other*/}
          <Link className="sideBarLink" to="/"> <p className="sideBarP" onClick={() => setSelectedTopic("All")}>Home</p> </Link>
          {allTopics.map((currentTopic, index) => {
            return (
              <Link className="sideBarLink" to="/"> <p className="sideBarP" key={index} onClick={() => setSelectedTopic(currentTopic.topicName)}>{currentTopic.topicName} </p></Link>)
          })}
          <button className="sideBarButton" onClick={() => setShowTopicForm(!showTopicForm)}>Add New Topic</button>
          {showForm(showTopicForm)}
        </aside>
        <div>
          <Link id="add-new-post" to="/createNewPost">Add New Post + </Link>
        </div>
        <Routes>
          <Route path="/SelectedPost/:postId" element={<SelectedPost posts={posts} />} />
          <Route path='/' element={<PostList posts={posts} filter={selectedTopic} />} />
          <Route path="/techNews" element={<TechNews />} />
          <Route path="/createNewPost" element={<NewPost fetchPosts = {fetchPosts} allTopics={allTopics} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
