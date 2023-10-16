import './App.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PostList from './components/PostList';
import SelectedPost from './components/SelectedPost';

function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("effect is running");
    axios
    .get("http://localhost:3001/api/posts")
    .then((response) => {
      //get request to retrieve product information from the sampledata.json from the back end server
      console.log("we have a response", response);
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        
      <Router>
        
        <p><Link to={"/"}>
          Welcome to ReedMi!
        </Link></p>
        <Link to="/techNews">TechNews</Link>
        <Routes>
          <Route path="/SelectedPost/:postId" element={<SelectedPost posts={posts}/>}/>
          <Route path='/' element={<PostList posts={posts}/>}/>
          <Route path ="/techNews" element = {<TechNews />} />
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
