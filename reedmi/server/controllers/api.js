const express = require('express') 
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
const fs = require("fs") 
const Post = require("../models/posts") // Importing the Post model

// const SECRET = process.env.SECRET

// Load data from JSON file into memory
const rawData = fs.readFileSync("server/data.json")
const data = JSON.parse(rawData)

// const getUser = (username) => {
//     return data.users.filter(u => u.username === username)[0]
// }

// const getTokenFrom = request => {
//     const authorization = request.get('authorization') 
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) { 
//            return authorization.substring(7)  
//         }  
//     return null
// }

// When you create a router using express.Router(), it's like creating a "mini-application" 
// that you can use to define routes. This router doesn't represent the whole application but rather a subset of route handlers.
// Instead of app.get(a route), we now use apiRouter.get(a route) and import const apiRouter = express.Router()
const apiRouter = express.Router()

apiRouter.get('/', (req, res) => {
  res.send('Hello World');
});

apiRouter.get('/api/posts', (req, res) => {
    // instead of returning the "posts" array from file
    // we will fetch the data from the database
    // and passing it back to our client
    Post.find({}).then(result => {
        console.log(result)
        res.json(result)
    }).catch(error => {
            console.error("Error fetching posts:", error);
            res.status(500).json({ error: 'Internal server error' });
        });
});


apiRouter.get('/api/posts/:id', (req, res) => {

    Like.findById(req.params.id)
        .then(result => {
            res.json(result)
        })
        .catch(() => {
            res.status(404).json({error: "Not found"})
        })
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

// // handle post request for login with {username, password}
// apiRouter.post('/auth/login', async (req, res) => {

//     const {username, password} = req.body

//     const user = getUser(username)

//     if (!user) {
//         return res.status(401).json({error: "invalid username or password"})
//     }

//     if (await bcrypt.compare(password, user.password)) {
        
//         const userForToken = {
//             id: user.id,
//             username: user.username            
//         }
//         let token = null
//         try {
//             token = jwt.sign(userForToken, SECRET)
//         } 
//         catch (error) {
//             return res.status(401).json({error: "invalid token"})
//         }

//         // store the token in the user session
//         req.session.token = token
//         return res.status(200).json({token, username: user.username, name: user.name})
        
//     } else {
//         return res.status(401).json({error: "invalid username or password"})
//     }

// })


// // handle post request for login with {username, password}
// apiRouter.get('/auth/refresh', async (req, res) => {

//     if (req.session.token) {
//         const decoded = jwt.verify(req.session.token, SECRET)
//         const user = getUser(decoded.username)

//         return res.status(200).json({token: req.session.token, username: user.username, name: user.name})
//     } else {
//         return res.status(401).json({error: "no or invalid cookie"})
//     }
// })

module.exports = apiRouter;
