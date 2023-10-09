// const express = require('express');
// const cors = require('cors');


// const app = express();
// app.use(cors());



// const DATA_FILE = './users.json';

// const fs = require("fs");

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// let posts = JSON.parse(fs.readFileSync("data.json")).posts;

// app.get("/api/posts", (_, response) => {
//   console.log("received request post")
//   //responds requested product data
//   //get request retrieving different parts of json file
//   response.send(posts);
// });

// // Middleware to enable CORS
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.post('/register', (req, res) => {
//   let users = [];
//   if (fs.existsSync(DATA_FILE)) {
//       users = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
//   }

//   const newUser = req.body;
//   const existingUser = users.find(user => user.email === newUser.email);

//   if (!existingUser) {
//       users.push(newUser);
//       fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
//   }

//   res.send({ status: 'success' });
// });

// app.get('/checkUser/:email', (req, res) => {
//   if (fs.existsSync(DATA_FILE)) {
//       const users = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
//       const user = users.find(u => u.email === req.params.email);
//       res.send(!!user);
//   } else {
//       res.send(false);
//   }
// });


// const port = 3001;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
