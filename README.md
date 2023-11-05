# group-project-wednesday-3pm-1
group-project-wednesday-3pm-1 created by GitHub Classroom
Calum, Ryan, Mifta, Ahmed 


ChosenPost.js

From ILearn:

our README.md should contain a description of your project along the following lines: 
- An outline of the application you were aiming to build, target users, data sources etc (similar to the proposal) (done just need to add monogo and google auth)
- A reference to your second Github repository if you used one (we dont have one soo done)
- A description of what you have been able to implement in this MVP, use your milestones to highlight what you've achieved (??)
- A guide to the project source code - where should we look for what you have done (done)
- A summary of what your next steps would be if you were to continue the project (done)
- A summary of the main roles and contributions of each team member and how you managed interaction and communication through the project (done)

## Project Description 

Our project ReedMi is a user-focused discussion platform similar to Reddit that aims to create a network for 'geeky' users to talk and gain knowledge about tech-related topics. ReedMi will help create this network by offering a forum for tech enthusiasts to propose topics and publish content. All users can access these various postings and participate by leaving comments likes or dislikes. Users can search for topics using the side panel filter, which will lead them to thier favorite posts. Users can create new posts using the Navigation bar to add to the forum. Users can fetch news from a third party API through 'Tech News'.
ReedMi uses MongoDB, as the datastore, more about this is found later in this document.


## Our Vision for the future 

If the project were to advance, the next phase of development would focus on augmenting the interactivity and user control within the ReedMi platform. This would include implementing functionality for users to express their opinions more dynamically by introducing the ability to like or dislike comments made by other users. This feature would add a layer of engagement and allow for a more nuanced reflection of user sentiment within discussions. Moreover, we would empower users with the ability to manage their digital footprint on the platform by granting them the capability to delete their own posts and any comments they have made. This step is critical for ensuring that users feel a sense of ownership and responsibility over their content and can adapt their contributions as their perspectives evolve or to correct any errors post-publication. Finally we would've enabled the reply system where users can engage with other users under posts.

## Source Code Guide
### `AppRoutes.js`
- This is the first componenent being rendered in `index.js`, which is the entry point of the REACT application.
- Handles routing and data fetching for all the other componenets in the Application, before the other componenents are rendered. This ensures that  that data is fetched before the user interacts with the app
- Sets up `Routes` that map specific paths to corresponding components, such as `Home`, `Register`, `LoginPage`, `SelectedPost`, `TechNews`, and `NewPost`.
- Includes a redirect for any undefined paths (`*`) to the login page, ensuring that users are guided to a defined route.
#### State Management 
- Manages several pieces of state:
  - `error`: Tracks any errors that occur during API calls or data fetching.
  - `username`: Stores the current user's username after successful authentication.
  - `posts`: An array of post data retrieved from the database.
  - `allTopics`: An array of topics fetched from the database, used for categorising posts.
  - `loading`: A boolean flag to indicate whether the application is in the process of fetching necessary data.
#### Data Fetching and Effects
- When this componenent is first loaded, a series of asynchronous operations are called to fetch data:
  - Fetches topics, the current user, and posts by invoking `fetchTopics`, `fetchCurrentUser`, and `fetchPosts` functions.
  - The `loading` state is set to `false` after all data fetching is completed, indicating that the application is ready to be used.
- `fetchPosts`: Retrieves a list of posts from the backend and updates the `posts` state.
- `fetchTopics`: Fetches available topics from the backend to categorize posts and updates the `allTopics` state.
- `fetchCurrentUser`: Attempts to fetch the currently authenticated user's details and set the `username`. On failure, it sets an error message.

#### Route Definitions
- Defines routes and their respective components, establishing the structure for navigating the application.
- For routes that require data, passes the relevant state data and functions as props to the components.

### `Home.js`:
- The `Home` component is primary view for users to browse posts.
- It is responsable for rendering the following Child Componenets:  `Navbar` for navigation, a `Sidebar` for topic selection, and a `PostList` that displays posts filtered by the selected topic.
- Users can filter posts by choosing a topic from the `Sidebar`, which updates the `selectedTopic` state and dynamically alters the list of displayed posts. Props like `posts` (the list of all posts), `allTopics` (available topics for filtering), and `fetchTopics` (a function to refresh topics) are passed down to child components.

### `PostList.js`:

- Allows the homepage to display all the different posts that have been uploaded to the backend by users.

### `SelectedPost.js`:

- Responsible for displaying post data for the respective post that the user has clicked on.
- Displays all information relevant to the post, including the image, title, and description.
- Provides like and dislike button for the user to interact with. If user likes or dislikes, the respective like or dislike counter is updated by one. Checks also if user has already liked or disliked, In which they will unlike or dislike if they click again. User can like or dislike no more than once, unless they unlike or dislike. User like or dislike input is sent to backend.
- Provides comment feature, displaying existing comments, and allowing user to add their own comments using a form.

### `Navbar.js`:

- Serves as the primary navigation component of the ReedMi app.
- Provides a consistent top header across different views with the "ReedMi" logo that links to the home page.
- Contains navigation links that allow the user to access the main areas of the app such as the home page, the TechNews section, and the functionality to create a new post.

### `NewTopic.js`:
- Allows users to create new topics, by sending inputted topic to the database and updating the topic list accordingly.

### `NewPost.js`: Creating a New Post Feature:

1. **User Interaction**: The user enters information into the new post form on the front end, which includes a title, image, content, topic and optionally includes an image file.
2. **Form Submission**: Upon submitting the form, the `addPostToBackEnd` function triggers, which prepares the form data to be sent to the express server. This function creates a `FormData` object containing the user's inputs and the image file, if provided.
3. **Making a POST Request to the Server**: The front end sends the `FormData` to the server's `/api/createNewPost` endpoint via a POST request.
4. **Server Handling with Multer**:
   - The server employs Multer as a middleware to handle the incoming file. Multer processes the file, storing it in the designated 'uploads' directory with a unique filename.
   - Alongside file handling, Multer makes the text fields available in `req.body` and the file information in `req.file`.
5. **Database Update**:
   - **New Post Creation**: The server constructs a new post object with the received text data and generates an image URL using the stored file's path, if an image was uploaded.
   - **Save Operation**: This new post object is then saved to the database, which involves creating a new document in the posts collection.
6. **Server Response**: The server sends back a JSON response containing the details of the newly created post to the front end.
7. **Frontend Update**:
   - **User Notification**: The front end uses the server's response to display a success message, informing the user that the post has been added.
   - **PostList Update**: The list of posts is updated whenever a new post has been added successfully, by calling the `fetchPosts()` function.


### `TechNews.js` & `SingleArticle.js`: TechNews Feature & Data Flow Documentation
The TechNews feature allows users to interact with a web application interface to request and display technology news articles. Here's the data flow detailed with state names and application behavior:

#### 1. TechNews.js
- The `TechNews` component loads when the user visits the TechNews section of the application.
- The initial state `news` is an empty array, and `searchQuery` is an empty string.
- A function `fetchNews` is defined to handle the retrieval of news articles.

#### 2. User Interaction and Input
- The user types a search term into the input field of the search bar, which updates the `searchQuery` state with the current input value.

#### 3. GET Request to the Backend Server in ./reedmi/server/controllers/api.js
- Upon clicking the "Search" button, the `fetchNews` function is called.
- This function uses the `apiClient` to make a GET request to the backend server, including `searchQuery` as a query parameter.
- The backend server has an endpoint `/api/techNews` designed to receive GET requests from the Front-End Client.
- It extracts the `searchQuery` from the incoming request for processing.

#### 5. GET Request to Third-party API
**API Details:**
`URL: https://newsapi.org/v2/everything`
Provides a list of news articles based on the supplied search parameters.
- The server sends a GET request to the third-party News API, incorporating the `searchQuery` received from the frontend along with the necessary API key for authentication.

#### 6. Receiving News Data from the Third-Party API
- The News API processes the request and sends back a list of articles that match the `searchQuery` to the express server.
- The server then relays this list of articles in JSON format back to the requesting frontend client.

#### 7. Frontend Data Handling
- The response from the backend is received by the `fetchNews` function.
- The function then updates the `news` state with the array of articles contained in the response, which prompts a re-render of the `TechNews` component to display the new data.

#### 8. Display of Articles
- The `TechNews` component takes the `news` state (now filled with articles) and uses it to render a list of `SingleArticle` components, each displaying the content of one news article.

#### 9. Error Management
- If there is an issue with the request to the backend server or the third-party API, an error is caught in the `fetchNews` function.
- The error triggers a console error message indicating the failure to retrieve the news. 

### Use of MongoDB as our Data Store:
This part outlines how MongoDB is being used as the database for oue React application. It includes details on the initial setup, data ingestion, and all the schemas used in our database.
#### Initial Setup
- **Database Connection**: The application connects to MongoDB using Mongoose. Environment variables are utilised to store the connection URl securely.

#### Data Ingestion
- **Dummy Data**: Before user interaction, the database is populated with dummy data from a `data.json` file. This ensures that the application has content to display upon initial load.
- **Data Ingestion Script**: The script reads the JSON file, parses the content, and uses Mongoose models to insert data into the MongoDB database only if it does not already exist.

#### Schemas Used: (Can be found at /reedmi/server/models)
##### Post Schema
- `postTitle`: String representing the title.
- `postContent`: String for the body content.
- `img`: String URL for related imagery.
- `category`: String indicating the post's category.
- `createdAt`: Date marking the creation time.
- `author`: Holds an ObjectId that references a User document. This creates a relationship between the Post and the User who created it.
- `comments`: An array holding ObjectIds, each referencing a Comment document. This links the Post to all associated comments.
- `reactions`: An array of ObjectIds referencing Reaction documents to represent user reactions to the post.

##### User Schema
Holds user information:
- `username`: Unique string for the user's name.
- `email`: String for the user's email, unique to each user.
- `password`: Encrypted string for the user's password.

##### Comment Schema
Represents comments on posts:
- `content`: String for the comment text.
- `author`: ObjectId referencing a User document to denote the commenter's identity.
- `post`: ObjectId referencing the related Post document. This establishes a connection between the comment and the specific post it belongs to.
- `createdAt`: Date of comment creation.

##### Reaction Schema
Tracks reactions to posts:
- `postId`: ObjectId referencing a Post document to associate the reaction with a particular post.
- `userId`: ObjectId referencing a User document to attribute the reaction to a specific user.
- `reaction`: String indicating the type of reaction, with limited options (e.g., 'upvote', 'downvote').

##### Topic Schema
Categorizes posts:
- `topicName`: String for the topic title.
- `topicDescription`: String detailing the topic.

## Authentication and Security

ReedMi places an emphasis on user authentication and security. Here's how we've implemented these features:

Google Authentication:

OAuth 2.0: We use Google's OAuth 2.0 for user authentication.
Passport.js: Passport.js, along with the GoogleStrategy, is used for authenticating users via Google.
User Creation: On a user's first Google login, a new user profile is created using the email received from Google. A unique username is generated by appending a random four-digit number to the part of the email before '@'.
Session Management: Passport.js serialises and deserialises user data to and from the session.

Local Authentication:

Username and Password: Users can also register and log in using a combination of username and email.
Password Security: User passwords are hashed using bcrypt before being stored in the database.
Passport.js: We use Passport.js with the LocalStrategy to authenticate users using a username and password.
Authorisation Middleware:

ensureAuthenticated: This middleware function ensures that certain routes are protected and only accessible by authenticated users.

Logout:

Session Destruction: Upon logout, the user's session is destroyed and cookies are cleared, ensuring a secure logout.
Cross-Origin Resource Sharing (CORS):

Security: Our application is configured to handle CORS, ensuring that only trusted domains have access to our APIs.

## Summary of Main Roles

Mifta
- TechNews and use of third party api
- Creating new topics 
- Creating new posts 
- Use of multer to enable users to upload images 
- Use of MongoDB

Ryan
- Authentication, Registration and Login using Passport.js
- Routing system
- Log in with Google
- Connecting comments and likes to a user and making sure it's saved
- The schemas used to save Reactions and Comments from users 
- Use of MongoDB

Calum 
- Displaying all Posts
- Selected Post Display 
- Initial use of a dummy json server (data.json) before the transition to mongodb 
- creating like and dislike button
- creating new comments 

Ahmed:
- Filtering all Posts based on topics 
- Creating new topics
- Main CSS

Everyone:
- Overall Design 
- Documentation

## Communications

- We were kept up to date through checking the github to do list, in which our progress could be measured based on what status we selected on each task requirement.
- We also had quick meetings every day using discord to discuss what work needed to be done and how we were tracking with tasks.
- Additionally, we had weekly meetings in person during class, where we had to report to the tutor on our progress. Based off their feedback, we had discussions after this in
which we assigned new goals for the following week.
- If we ran into issues, we used the discord chat to express this to the rest of team, in which all members would try their best to help.



