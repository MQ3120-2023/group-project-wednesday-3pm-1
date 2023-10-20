import './App.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PostList from './components/PostList';
import SelectedPost from './components/SelectedPost';
import TechNews from './components/TechNews';

function App() {

  const [posts, setPosts] = useState([]);
  //const [topics, setTopics] = useState([]);
  const topics= [
      "Languages",
      "Solutions",
      "Hardware"
  ]

  useEffect(() => {
    console.log("effect is running");
    axios
    .get("http://localhost:3001/api/posts")
    .then((response) => {
      //get request to retrieve product information from the sampledata.json from the back end server
      console.log("we have a response", response);
      setPosts(response.data);
    });
    // axios
    // .get("https://localhost:3001/api/topics")
    // .then((response) => {
    //   setTopics(response.data);
    // })
  }, []);

  return (
    <div className="App">
      <Router>  
      <header className="App-header">
        <p><Link to={"/"}>
          ReedMi
        </Link></p>
        <Link to="/techNews">TechNews</Link>
      </header>
      <aside id='sideBar'>
          
          Topics:

          {topics.map((topic, index) => (
          <p key={index}>{topic}</p>
          ))}
      </aside>
        <Routes>
          <Route path="/SelectedPost/:postId" element={<SelectedPost posts={posts}/>}/>
          <Route path='/' element={<PostList posts={posts}/>}/>
          <Route path ="/techNews" element = {<TechNews />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
