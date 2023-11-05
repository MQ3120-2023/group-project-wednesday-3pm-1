import { useState } from "react";
import PostList from './components/PostList';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { useEffect } from "react";

function Home({posts, allTopics, fetchTopics, setLoggingIn}) { 
  const [selectedTopic, setSelectedTopic] = useState("All"); 

  useEffect(() => {
    setLoggingIn(false);
  }, []);

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
