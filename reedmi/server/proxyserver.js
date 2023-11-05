require('dotenv').config()
// importing the main Express application instance from the app.js file
// `app` now holds a reference to the Express application instance that was exported from  `app.js`
const app = require('./app') 

const PORT = (process.env.NODE_ENV === 'development' ? 3001 : 3000)
// using `app` to start the express server 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV}`)
})