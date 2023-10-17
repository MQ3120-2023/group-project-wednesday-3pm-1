import React, { useState, useEffect } from "react";
import './SingleArticle.css';
function SingleArticle({singleNewsArticle}){
    console.log("Single News Article", singleNewsArticle)
    const content = singleNewsArticle.content;
    const textContent = content.replace(/<\/?[^>]+(>|$)/g, " ") // remove HTML tags in content field from Third Party API 
    return (
        <div className = "singleArticle">
            <p>Source: {singleNewsArticle.source.name}</p>
            <p>Author: {singleNewsArticle.author}</p>
            <p>Title: {singleNewsArticle.title}</p>
            <p>Descrption: {singleNewsArticle.description}</p>
            <img src={singleNewsArticle.urlToImage} alt={singleNewsArticle.body} />
           
            <p>{textContent}</p>
            <a id = "articleLink" href ={singleNewsArticle.url} > Click here to view full article</a>
            <p> ------------------------------</p>
        </div>
    )
}

export default SingleArticle;