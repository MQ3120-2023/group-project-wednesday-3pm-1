const express = require('express') 
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
const fs = require("fs") 
const Post = require("../models/posts") // Importing the Post model
const Topic = require("../models/topics") // Importing the Topic model
const multer = require('multer')
const path = require('path');

// Load data from JSON file into memory
const rawData = fs.readFileSync("server/data.json")
const data = JSON.parse(rawData)

// When you create a router using express.Router(), it's like creating a "mini-application" 
// that you can use to define routes. This router doesn't represent the whole application but rather a subset of route handlers.
// Instead of app.get(a route), we now use apiRouter.get(a route) and import const apiRouter = express.Router()
const apiRouter = express.Router()
// Middleware to parse url-encoded bodies
apiRouter.use(express.urlencoded({ extended: false }));
// Serve static images from the 'uploads' directory
apiRouter.use('/uploads', express.static('uploads'));

// Configure multer storage
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });


apiRouter.get('/', (req, res) => {
  res.send('Hello World');
});

apiRouter.get('/api/posts', (req, res) => {
    // Instead of returning the "posts" array from file
    // We will fetch the data from the database
    // And passing it back to our client
    Post.find({}).then(result => {
        console.log(result)
        res.json(result)
    }).catch(error => {
            console.error("Error fetching posts:", error);
            res.status(500).json({ error: 'Internal server error' });
        });
});

apiRouter.post('/api/createNewPost', upload.single('postImage'), (req, res) => {
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

// apiRouter.post('/api/posts', (req, res) => {

//     // const token = getTokenFrom(req)
//     // let decodedToken = null

//     // try {
//     //     decodedToken = jwt.verify(token, SECRET)
//     // }
//     // catch (error) {
//     //     decodedToken = {id: null}
//     // }

//     // if (!token || !decodedToken.id) {
//     //     return res.status(401).json({error: "invalid token"})
//     // }

//     const body = req.body

//     const newPost = new Post({
//         postTitle: body.postTitle,
//         postContent: body.postContent,
//         img: body.img,
//         category: body.category
//     })
//     newPost.save().then(result => {
//         res.json(result)
//         console.log("post record saved")
//     })
// })

// apiRouter.put('/api/posts/:id', (req, res) => {

//     const body = req.body

//     const newPost = new Post({
//         postTitle: body.postTitle,
//         postContent: body.postContent,
//         img: body.img,
//         category: body.category
//     })
    
//     Post.findByIdAndUpdate(req.params.id, newPost, {new: true})
//     .then(result => {
//         res.json(result)
//     })   
// })


module.exports = apiRouter;
