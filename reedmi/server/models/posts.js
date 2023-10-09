// all the logic for connecting to the database and defining the schema
// using the mongoose - a node library that interfaces to mongodb
require("dotenv").config()
const mongoose = require('mongoose')
// THE ENV version is not working
const url = process.env.MONGO_URL

// we want the database connection to happen synchronously so we define
// this async function and use await on the connect call
const doConnect = async () => {
    // A global connection
    // exists as long as the application is running
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }) 
      .catch((error) => {    
          console.log('error connecting to MongoDB:', error.message)
      })
  }
// call the connection function
// opens a connection to the database, we can then talk to the database
doConnect()

// define a schema - defines the kind of objects we can store in our database 
// defining the type of fields in each object in the "posts" array
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

// setting up connection w database
// defining a schema that we will use to interact w it/store data