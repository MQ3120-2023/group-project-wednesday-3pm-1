// All the logic for connecting to the database and defining the schema
// Using the mongoose - a node library that interfaces to mongodb
require("dotenv").config()
const mongoose = require('mongoose')

const url = process.env.MONGO_URL;

// We want the database connection to happen synchronously so we define
// This async function and use await on the connect call
const doConnect = async () => {
    // A global connection
    // Exists as long as the application is running
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }) 
      .catch((error) => {    
          console.log('error connecting to MongoDB:', error.message)
      })
  }
// Call the connection function
// Opens a connection to the database, we can then talk to the database
doConnect()

// Define a schema 
  // Defines a Collection (posts) in our database  
  // Defines what each Document/Object in that Collection will look like (fields)
  // Defining the type of fields in each Document/Object in the "posts" Collection/Array
const posts = new mongoose.Schema({
    // no need to define id field, as database autogenerates for us
    postTitle: String,
    postContent: String,
    img: String,
    category: String
})

posts.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Post = mongoose.model("Post", posts)

module.exports = Post
