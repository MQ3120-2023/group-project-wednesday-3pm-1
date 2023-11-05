const express = require('express') 
const fs = require("fs") 
const axios = require('axios');
const Post = require("../models/posts") // Importing the Post model
const Topic = require("../models/topics") // Importing the Topic model
const Comment = require('../models/comment') // Importing the Comment model
const Reaction = require('../models/reaction') // Importing the Reaction model 
const multer = require('multer')
const path = require('path');
const cors = require('cors');
const ensureAuthenticated = require('../authRoutes').ensureAuthenticated;

// When you create a router using express.Router(), it's like creating a "mini-application" 
// that you can use to define routes. This router doesn't represent the whole application but rather a subset of route handlers.
// Instead of app.get(a route), we now use apiRouter.get(a route) and import const apiRouter = express.Router()
const apiRouter = express.Router()
var corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://reedmi-test.onrender.com'],
    methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
    credentials: true, 
    optionsSuccessStatus: 200 
};
apiRouter.use(cors(corsOptions));
// Middleware to parse url-encoded bodies
apiRouter.use(express.urlencoded({ extended: false }));
// Serve static images from the 'uploads' directory
apiRouter.use('/uploads', express.static('uploads'));

apiRouter.get('/', (req, res) => {
  res.send('Hello World');
});

apiRouter.get('/api/posts', (req, res) => {
    // Instead of returning the "posts" array from file
    // We will fetch the data from the database
    // And passing it back to our client
    Post.find({})
    .populate('author')
    .then(result => {
        console.log(result)
        res.json(result)
    }).catch(error => {
            console.error("Error fetching posts:", error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

apiRouter.get('/api/posts/:id', async (req, res) => {
    const postId = req.params.id;
    const userId = req.user ? req.user._id : null;
    try {
      const post = await Post.findById(postId)
        .populate({
          path: 'comments', // First level field to populate
          populate: {
            path: 'author', // Second level field to populate within comments
          }
        })
        .populate('author');
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Query the Reaction collection based on postId
      // Calculate the number of likes and dislikes of this post
      // based on the Reaction object of this post
      const reactions = await Reaction.find({ postId: postId });
  
      let likes = 0;
      let dislikes = 0;
      let userReaction = null;
      reactions.forEach(reaction => {
        if (reaction.reaction === 'upvote') likes++;
        else if (reaction.reaction === 'downvote') dislikes++;

        if (userId && reaction.userId.toString() === userId.toString()) {
            console.log("User reaction found:", reaction.reaction);
            userReaction = reaction.reaction;
          }
      });

  
        if (userReaction === null) {
            console.log("User reaction not found");
        }
      // Convert the mongoose document to a plain JavaScript object
      const postObject = post.toObject(); 
      
      // Add data for the frontend to use
      postObject.likes = likes;
      postObject.dislikes = dislikes;
      postObject.userReaction = userReaction;
  
      res.json(postObject);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

apiRouter.post('/api/posts/:postId/comment', ensureAuthenticated, (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id; // Assuming the user's ID is stored in req.user._id after authentication
    const content = req.body.commentInput; // The comment content

    console.log(`Make a comment with ${JSON.stringify(req.body)}`)

    const newComment = new Comment({
        content: content,
        author: userId,
        post: postId
    });

    newComment.save()
        .then(savedComment => {
            // Update the post's comments array
            Post.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } }, { new: true })
                .then(updatedPost => {
                    res.json(savedComment);
                })
                .catch(error => {
                    console.error("Error updating post's comments:", error);
                    res.status(500).json({ error: 'Internal server error' });
                });
        })
        .catch(error => {
            console.error("Error saving comment:", error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Add a reaction to a post
apiRouter.post('/api/posts/:postId/reaction', ensureAuthenticated, async (req, res) => {

    console.log(`Make a reaction with ${JSON.stringify(req.body)}`)

    const postId = req.params.postId;
    const userId = req.user._id; 
    const reactionType = req.body.reaction;
  
    if (['upvote', 'downvote'].indexOf(reactionType) === -1) {
      return res.status(400).json({ error: 'Invalid reaction type' });
    }
  
    try {
      const existingReaction = await Reaction.findOne({ postId, userId });
      
      if (existingReaction) {
        if (existingReaction.reaction === reactionType) {
          // Toggle - Remove existing reaction
          await Reaction.findByIdAndDelete(existingReaction._id);
          await Post.findByIdAndUpdate(postId, { $pull: { reactions: existingReaction._id } }, { new: true });
          return res.json({ message: 'Reaction removed' });
        } else {
          // Update - Change the existing reaction to the opposite type
          existingReaction.reaction = reactionType;
          await existingReaction.save();
          return res.json({ message: 'Reaction updated' });
        }
      }
    
      // Create a new Reaction object
      const newReaction = new Reaction({ postId, userId, reaction: reactionType });
    
      const savedReaction = await newReaction.save();
    
      // Update the post's reactions array
      await Post.findByIdAndUpdate(postId, { $push: { reactions: savedReaction._id } }, { new: true });
    
      res.json({ message: 'Reaction added successfully' });
      
    } catch (error) {
      console.error("Error saving reaction or updating post's reactions:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
apiRouter.get('/api/posts/:postId/comments', (req, res) => {
    const postId = req.params.postId;

    // Find the post by its ID and populate its 'comments' field
    Post.findById(postId)
    .populate({
        path: 'comments', // First level field to populate
        populate: {
          path: 'author', // Second level field to populate within comments
        }
      })
        .then(post => {
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json(post.comments); // Sending only comments part of the post
        })
        .catch(error => {
            console.error("Error fetching comments:", error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

apiRouter.post('/api/createNewPost', ensureAuthenticated, upload.single('postImage'), (req, res) => {
    const body = req.body;
    // Prepare image URL for local storage
    let imgUrl = '';
    if (req.file) {
        imgUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    const newPost = new Post({
        postTitle: body.postTitle,
        postContent: body.postContent,
        img: imgUrl,
        category: body.postTopic,
        author: req.user._id,
        comments: [],
        likes: 0,
        dislikes: 0
    });

    newPost.save().then(result => {
        res.json(result)
        console.log("New Post by User saved")
    })
})


apiRouter.get('/api/topics', (req, res) => {
    // Instead of returning the "posts" array from file
    // We will fetch the data from the database
    // And passing it back to our client
    Topic.find({}).then(result => {
        console.log(result)
        res.json(result)
    }).catch(error => {
        console.error("Error fetching Topics:", error);
        res.status(500).json({ error: 'Internal server error' });
    });
});

apiRouter.post('/api/topics', (req, res)  => {
    const body = req.body;
    Topic.findOne({ topicName: body.topicName }).then(existingTopic => {
        if (!existingTopic) {
            // Only create a new topic if it doesn't exist
            const newTopic = new Topic({
                topicName: body.topicName,
                topicDescription: body.topicDescription
            })

            newTopic.save().then(result => {
                res.json(result)
                console.log("New Topic saved")
            })
        } else {
            console.log("Topic already exists");
        }
    });
})

const apiURL = 'https://newsapi.org/v2/everything'
const apiKey = process.env.API_KEY;

// Fetching Latest News from a third party API
apiRouter.get('/api/techNews', (req, res) => {
  const userQuery = req.query.q;
  // the server is making the request to the third party API using Axios 
  axios.get(apiURL, {
    params: {
      q: userQuery,
      apiKey: apiKey
    }
  }).then(newsArray => { // once the newsArray is received from API, send it to the Client
    res.json(newsArray.data);
    console.log("Received news data from third party API successfully")
  }).catch(error => {
    console.error(error);  // Add this line
    res.status(404);
    console.log("API Key:", process.env.API_KEY)
    res.send("Server could not fetch data from third-party API")
  });
});

module.exports = apiRouter;
