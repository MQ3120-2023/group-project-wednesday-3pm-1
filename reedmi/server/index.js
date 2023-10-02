const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const fs = require("fs");

app.get('/', (req, res) => {
  res.send('Hello World');
});

let posts = JSON.parse(fs.readFileSync("data.json")).posts;

app.get("/api/posts", (_, response) => {
  console.log("received request post")
  //responds requested product data
  //get request retrieving different parts of json file
  response.send(posts);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
