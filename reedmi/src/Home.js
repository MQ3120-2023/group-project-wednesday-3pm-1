import './Home.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PostList from './components/PostList';
import SelectedPost from './components/SelectedPost';
import TechNews from './components/TechNews';
import NewTopic from './components/NewTopic';
import NewPost from './components/NewPost';

function Home() {

  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const [posts, setPosts] = useState([]);
  const [allTopics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [showTopicForm, setShowTopicForm] = useState(false)
  
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/auth/current_user', { withCredentials: true });
      setUsername(response.data.username);
    } catch (err) {
      setError('Could not fetch user data');
    }
  };

  useEffect(() => {
    console.log("effect is running");
    fetchPosts();
    fetchTopics();
    fetchCurrentUser(); // Fetch the current user's data
  }, []);

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
    fetchCurrentUser(); 
  }, []);


  const addNewPost = (newPost) => {

  }
  return (
    <div className="App">
      
        <header className="App-header">
          <p><Link to={"/"}> ReedMi </Link></p>
          <Link to="/techNews">TechNews</Link>
          {error && <p>{error}</p>}
        {username && <p>Logged in as: {username}</p>} {/* Display the username */}
        </header>
        <aside id='sideBar'>
          Topics:
          {/*maps through topics from data.json and displays them one after the other*/}
          <Link to="/"> <p onClick={() => setSelectedTopic("All")}>Home</p> </Link>
          {allTopics.map((currentTopic, index) => {
            return (
              <Link to="/"> <p key={index} onClick={() => setSelectedTopic(currentTopic.topicName)}>{currentTopic.topicName} </p></Link>)
          })}
          <button onClick={() => setShowTopicForm(!showTopicForm)}>Add New Topic</button>
          {showForm(showTopicForm)}
        </aside>
        <div>
          <Link id="add-new-post" to="/createNewPost">Add New Post + </Link>
        </div>
    </div>
  );
}

export default Home;
