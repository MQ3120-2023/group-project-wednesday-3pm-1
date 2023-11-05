import { useState } from "react";
import PostList from './components/PostList';
import Sidebar from './components/Sidebar';
import Navbar from './Navbar';

function Home({posts, allTopics, fetchTopics}) { 
  const [selectedTopic, setSelectedTopic] = useState("All"); 
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
