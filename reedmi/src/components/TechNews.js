import React, { useState, useEffect } from "react";
import axios from 'axios'
import SingleArticle from "./SingleArticle";
import { v4 as uuidv4 } from 'uuid';

function TechNews() {
    const[news, setNews] = useState([])
    const [searchQuery, setSearchQuery] = useState('');  // state to store the search query
    const baseurl = `/api/techNews`

    const fetchNews = () => {
        // setNews([]); // Reset news state to empty array
        console.log("printing: ",searchQuery)
        axios.get(baseurl, {
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

    useEffect(() => {
        fetchNews() // is called when the TechNews Page is rendered 
    }, [])

    return (
        // depends on how the data we get from the Third Party Api is formatted
        <div >
            <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)} // Update state on every keystroke
                placeholder="Search for news topics..."
            />
            <button onClick={fetchNews}>Search</button>
            {news.map((singleNewsArticle) => ( // maybe this happens before the async call returns 
                <SingleArticle key={uuidv4()} singleNewsArticle={singleNewsArticle}/>
            ))}
        </div>
    )
}

export default TechNews;