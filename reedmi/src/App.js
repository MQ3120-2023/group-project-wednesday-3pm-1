import './App.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PostList from './components/PostList';
import SelectedPost from './components/SelectedPost';
import TechNews from './components/TechNews';
import NewTopic from './components/NewTopic';

function App() {

  const [posts, setPosts] = useState([]);
  
  const showForm = (booleanVariable) => {
    if(booleanVariable){
      return(<NewTopic />)
    }
  }
  const [showTopicForm, setShowTopicForm] = useState(false)
  
  //const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
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
    // MIFF (Can't make axios call properly)
    //  axios 
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
          
          {/*maps through topics from data.json and displays them one after the other*/}
          <Link to="/">
          <p onClick={() => setSelectedTopic("All")}>Home</p>
          </Link>
          {topics.map((topic, index) => {
            
            return(
          <Link to="/">  
          <p key={index} onClick={() => setSelectedTopic(topic)}>{topic} </p> 
          </Link>  )
          
          })}
            <button onClick={() => setShowTopicForm(!showTopicForm)}>Add New Topic</button>

            {showForm(showTopicForm)}
          
      </aside>
      
        <Routes>
          <Route path="/SelectedPost/:postId" element={<SelectedPost posts={posts}/>}/>
          <Route path='/' element={<PostList posts={posts} filter={selectedTopic} />} />
          <Route path ="/techNews" element = {<TechNews />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
