require('dotenv').config()
const app = require('./app') // importing the main Express application instance from the app.js file
// `app` now holds a reference to the Express application instance that was exported from  `app.js`

const PORT = 3000
// using `app` to start the express server 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})