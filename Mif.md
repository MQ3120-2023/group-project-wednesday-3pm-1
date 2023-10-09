# Using MongoDB
* So far: we have been using in memory storage, and we are moving to a real database
* MongoDB: stores JSON Documents -> which fits well with our web application as it uses JSON data 
* We will store all the array of objects in the `data.json` file in the database 
* Cluster0 -> our database store 

# Connecting to the database 
- URL format is different 
- Loaded some data to the database 

# Linking to the server Routes 
- Connect our database to the routes we have in the Express server - so we can retrieve data from it and put data into our store 



## Express Server vs. MongoDB Database

### Express Server
- **Purpose**: Handle and respond to HTTP requests from clients.
- **Key Roles**:
  - **Request Handling**: Listen and respond to incoming requests from clients.
  - **Middleware Management**: Use middleware for tasks like parsing incoming data, authentication, and logging.
  - **Routing**: Determine how the application responds based on the request's endpoint and method.
  - **Integration**: Can integrate with databases (like MongoDB) to fetch or store data based on client requests.

### MongoDB Database
- **Purpose**: Persistently store and manage application data.
- **Key Roles**:
  - **Data Storage**: Maintain application data in a structured or semi-structured format.
  - **CRUD Operations**: Offer capabilities to Create, Read, Update, and Delete data.
  - **Scalability**: Support application growth by scaling to handle larger datasets and more traffic.
  - **Data Modeling**: Allow flexible data structures and relationships to support various application needs.

### Interaction
1. A user interacts with the web application, triggering an HTTP request.
2. The Express server processes this request, parsing data, and deciding the appropriate action.
3. If needed, Express communicates with the MongoDB database to retrieve, modify, or store data.
4. After processing, Express sends an appropriate response back to the client.


