import './App.css';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("effect is running");
    axios
    .get("https://clothesandco.onrender.com/api/products")
    .then((response) => {
      //get request to retrieve product information from the sampledata.json from the back end server
      console.log("we have a response", response);
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Welcome to ReedMi!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
