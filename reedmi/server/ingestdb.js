// ingest the sample data in data.json into our database
// posts array is the Collection
// each object in the posts array is a Document
// we can have multiple arrays/Collections in our database 
require("dotenv").config()
const mongoose = require("mongoose")
const Post = require("./models/posts")
const fs = require("fs") // fs module used to read the data from the json file 

// Load data from JSON file into memory
const rawData = fs.readFileSync("server/data.json")
const data = JSON.parse(rawData)

// going through each "object" in the posts array using map
data.posts.map(record => {

    Post.findOne({ postTitle: record.postTitle }).then(existingPost => {
    if (!existingPost) {
        // Only create a new post if it doesn't exist
        const newPost = new Post({
            postTitle: record.postTitle,
            postContent: record.postContent,
            img: record.img,
            category: record.category
        });
        newPost.save().then(result => {
            console.log("post record saved");
        });
    } else {
        console.log("post record already exists");
    }
    });
})

// mongoose.connection.close() 
// but we might close the connection before the new post is saved in the database
// as the save method is async 
