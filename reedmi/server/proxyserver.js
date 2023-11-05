require('dotenv').config()
// importing the main Express application instance from the app.js file
// `app` now holds a reference to the Express application instance that was exported from  `app.js`
const app = require('./app') 
const path = require('path');
const express = require('express')

const PORT = (process.env.NODE_ENV === 'development' ? 3001 : 3000)
// using `app` to start the express server 


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// Only in production mode because in development mode, we have two servers running

if (PORT === 3000) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  }); 
  
}


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV}`)
})