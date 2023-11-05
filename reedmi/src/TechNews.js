import React, { useState, useEffect } from "react";

import SingleArticle from "./components/SingleArticle";
import { v4 as uuidv4 } from 'uuid';
import apiClient from "./apiClient";
import './TechNews.css';
import Navbar from "./components/Navbar";

function TechNews() {
    const[news, setNews] = useState([])
    const [searchQuery, setSearchQuery] = useState('');  // state to store the search query
    const baseurl = `/api/techNews`

    const fetchNews = () => {
        console.log("printing: ",searchQuery)
        apiClient.get(baseurl, {
            params: {
                q: searchQuery  // pass the search query as a parameter in the request we are sending to the server 
            }
        })
        .then((response) => {
            console.log("news received: " , response)
            setNews(response.data.articles)
        })
        .catch((error) =>{
            console.error("Failed to get latest news from Intermediate Express Server")
        })
    }

    return (

        <div>
            <Navbar />
            <div className="techNewsSearchBar" >
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)} // Update state on every keystroke
                    placeholder="Search for news topics..."
                />
                <button className="techNewsSearchButton" onClick={fetchNews}>Search</button>
            </div>
            <div>
                {news.map((singleNewsArticle) => ( // maybe this happens before the async call returns 
                    <SingleArticle key={uuidv4()} singleNewsArticle={singleNewsArticle} />
                ))}
            </div>
        </div>
    )
}

export default TechNews;