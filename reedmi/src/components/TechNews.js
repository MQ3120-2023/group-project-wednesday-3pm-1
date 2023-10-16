import React, { useState, useEffect } from "react";
import axios from 'axios'

function TechNews() {
    const[news, setNews] = useState([])
    const baseurl = `/api/techNews`

    const fetchNews = () => {
        axios.get(baseurl)
        .then((response) => {
            console.log("news received: " , response)
            setNews(response.data)
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
        <div>
        
        </div>



    )
}



export default TechNews;