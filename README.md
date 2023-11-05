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
- `fetchTopics`: Fetches available topics from the backend to categorise posts and updates the `allTopics` state.
- `fetchCurrentUser`: Attempts to fetch the currently authenticated user's details and set the `username`. On failure, it sets an error message.

#### Route Definitions
- Defines routes and their respective components, establishing the structure for navigating the application.
- For routes that require data, passes the relevant state data and functions as props to the components.

### `AuthenticatedRoute.js`:

This component acts as a protective wrapper around other components, ensuring that only authenticated users can access the wrapped content.

#### **State Management**
- `username`: A string representing the username of the logged-in user.
- `error`: A string to store any error messages encountered while fetching user data.
- `loading`: A boolean indicating whether the user data is still being fetched.

#### **Functions**
- `fetchCurrentUser(setUsername, setError)`: An asynchronous function that sends a request to fetch the current user's data. Upon success, it updates `setUsername` with the fetched username. If an error occurs, it updates `setError` with an error message.

#### **Effects and Data Fetching**
- `useEffect()`: Calls the `fetchCurrentUser()` function to fetch the user data and sets `loading` to `false` once the data is fetched or an error occurs.

#### **Rendering**
- **Loading State**: If `loading` is `true`, a loading message is displayed.
- **Error or Unauthenticated State**: If `error` is not `null` or `username` is `null`, it redirects the user to the login page using the `<Navigate>` component.
- **Authenticated State**: If `username` is not `null` and there are no errors, it renders the `children` prop, allowing access to the wrapped content.


### `LoginPage.js`: Login Page
This component provides a login interface for users.

#### **State Management**
- `userData`: An object containing the user's inputted `username` and `password`.
- `error`: A string to store any error messages.

#### **Event Handlers**
- `handleInputChange()`: Updates `userData` based on user input.
- `loginUser()`: Sends a login request to the backend and navigates to the home page upon success.
- `handleSubmit()`: Prevents default form behavior and calls `loginUser()`.

#### **Rendering**
- Displays a login form, Google sign-in button, and an option to navigate to the registration page.

### `Register.js`: Registration Page
This component provides a registration interface for new users.

#### **State Management**
- `userData`: An object containing the user's inputted `email`, `username`, `password`, and `confirmPassword`.
- `error`: A string to store any error messages.

#### **Event Handlers**
- `handleInputChange()`: Updates `userData` based on user input.
- `registerUser()`: Sends a registration request to the backend, logs out any current user, and logs in the newly registered user.
- `handleSubmit()`: Prevents default form behavior and calls `registerUser()`.

#### **Rendering**
- Displays a registration form and an option to navigate to the login page.

### `Navbar.js`: Navigation Bar
This component provides navigation links across the application.

#### **State Management**
- `username`: A string representing the username of the logged-in user.
- `isLoading`: A boolean indicating whether user data is still being fetched.

#### **Effects and Data Fetching**
- `useEffect()`: Fetches the current user's data and updates `username` and `isLoading`.

#### **Rendering**
- Displays navigation links, the "Add New Post" button, and a logout option with the current `username`. If data is still loading, a loading state is shown.

### `Home.js`: Main Home Component

This component is the main page of the application. It displays a list of posts, along with a sidebar to filter the posts by topic.

#### **State Management**
- `selectedTopic`: A string representing the topic currently selected by the user. Initially set to "All", indicating that posts from all topics are displayed by default.

#### **Props**
- `posts`: An array of post objects to be displayed in the `PostList` component.
- `allTopics`: An array of all available topics that can be used to filter the posts.
- `fetchTopics`: A function to fetch the list of available topics.
- `setLoggingIn`: A function to update the logging in status.

#### **Effects**
- `useEffect()`: On component mount, it sets the `setLoggingIn` state to `false`.

#### **Rendering**
- `<Navbar />`: Renders the navigation bar at the top of the page.
- `<Sidebar />`: Renders the sidebar component, passing in the `allTopics`, `fetchTopics`, `setSelectedTopic`, and `selectedTopic` as props. The sidebar allows users to select a topic to filter the posts.
- `<PostList />`: Renders the list of posts, passing in the `posts` and `filter` as props. The `filter` prop is set to the currently `selectedTopic`, so the `PostList` will only display posts that match the selected topic.

#### **Functionality**
- **Topic Selection**: When a topic is selected from the sidebar, `setSelectedTopic` updates the `selectedTopic` state to the chosen topic, which in turn filters the posts displayed in the `PostList`.

### `PostList.js`: Displaying and Filtering Posts

This component renders a list of posts, allowing users to click on a post to navigate to its detailed view.

#### **Props**
- `posts`: An array of post objects.
- `filter`: A string representing the category or topic used to filter posts.

#### **State Management**
- `filteredPosts`: An array representing the posts that match the selected filter.

#### **Effects**
- `useEffect()`: When the `posts` or `filter` prop changes, this effect filters the posts based on the selected topic and updates the `filteredPosts` state.

#### **Functionality**
- **Post Filtering**: If the `filter` prop is "All", all posts are displayed. Otherwise, posts are filtered based on the selected topic.
- **Navigation**: When a post is clicked, the `handlePostClick` function navigates the user to the detailed view of the selected post.

#### **Rendering**
- The component maps through `filteredPosts` and renders each post with its author, title, content preview, and image. Each post is clickable and redirects to its detailed view.

### `Sidebar.js`: Sidebar Component

This component displays a sidebar containing buttons for different topics and allows users to add new topics.

#### **Props**
- `allTopics`: An array of all available topics.
- `fetchTopics`: A function to fetch the list of available topics.
- `selectedTopic`: The currently selected topic.
- `setSelectedTopic`: A function to update the selected topic.

#### **State Management**
- `showTopicForm`: A boolean indicating whether the form to create a new topic is displayed.

#### **Functionality**
- **Topic Selection**: When a topic button is clicked, `setSelectedTopic` updates the `selectedTopic` state to the chosen topic.
- **Show/Hide Form**: The `showForm` function conditionally renders the `NewTopic` component based on the `showTopicForm` state. The `hideForm` function sets `showTopicForm` to `false`.

#### **Rendering**
- The component renders a button for each topic in `allTopics`, highlighting the button corresponding to the `selectedTopic`.
- A "Create New Topic +" button toggles the display of the `NewTopic` form component.
- The `NewTopic` component is conditionally rendered based on `showTopicForm`.

### `SelectedPost.js`: Selected Post View
This component is responsible for fetching and displaying a single post based on the `postId` parameter from the URL. Users can interact with the post by liking, disliking, or commenting.

#### **State Management**
- `post`: An object containing the details of the selected post.
- `commentInput`: A string representing the user's comment input.
- `reacted`: A string indicating whether the user has liked or disliked the post.
- `likes` and `dislikes`: Integers tracking the number of likes and dislikes for the post.

#### **Effects and Data Fetching**
- `fetchPost()`: Fetches the post data from the backend and updates the `post`, `likes`, and `dislikes` states.
- `useEffect()`: Calls `fetchPost()` whenever `postId` changes and updates `likes`, `dislikes`, and `reacted` when `post` changes.

#### **Interaction Handlers**
- `handleLike()` and `handleDislike()`: Manages the user's likes and dislikes, updating the UI and sending the reaction to the backend.
- `addComment()`: Sends the user's comment to the backend and updates the post to display the new comment.
- `handleSubmit()`: Prevents the default form submission behavior and calls `addComment()`.

#### **Rendering**
- Displays post details, reactions, and comments. If no post data is available, a loading state is shown.

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
Categorises posts:
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


## Authentication Routes


### 1. **Google Authentication**
#### `GET /google`
- **Description**: Initiates the Google authentication process.
- **Middleware**: Uses Passport to authenticate using the 'google' strategy and requests the user's Google login and email information.
- **Response**: Redirects to Google's consent page for authentication.

#### `GET /google/callback`
- **Description**: Callback URL for Google to call after authentication.
- **Middleware**: Uses Passport to authenticate using the 'google' strategy.
- **Response**: On success, redirects the user to the home page (`/home`). On failure, redirects to the root URL (`/`).

#### `GET /oauth2/redirect/google`
- **Description**: An alternate callback URL for Google authentication.
- **Middleware**: Uses Passport to authenticate using the 'google' strategy.
- **Response**: Redirects the user to the root URL (`/`) on both success and failure.

### 2. **User Registration**
#### `POST /register`
- **Description**: Registers a new user.
- **Request Body**: Contains `email`, `username`, `password`, and `confirm`.
- **Response**: 
  - **400**: If not all fields are provided or the user already exists.
  - **500**: For server errors during registration.
  - On success, returns a message and the user's ID and username.

### 3. **User Login**
#### `POST /login`
- **Description**: Logs in a user.
- **Middleware**: Uses Passport's local strategy to authenticate.
- **Response**:
  - **400**: If the user is not found.
  - **500**: For server errors during login.
  - On success, returns a message and the logged-in user's details.

### 4. **User Logout**
#### `GET /logout`
- **Description**: Logs out the current user.
- **Response**:
  - **500**: For errors during logout.
  - On success, clears the session and cookie, and redirects to the login page (`/login`).

### 5. **Fetch Current User**
#### `GET /current_user`
- **Description**: Fetches the details of the currently logged-in user.
- **Middleware**: `ensureAuthenticated` checks if the user is authenticated.
- **Response**:
  - **401**: If the user is not authenticated.
  - On success, returns the user's username.

### 6. **Middleware**: `ensureAuthenticated`
- **Description**: Middleware function to check if the user is authenticated.
- **Response**: 
  - **401**: If the user is not authenticated.
  - Calls `next()` if the user is authenticated, allowing the request to proceed.

## API Routes

### 1. **Fetch All Posts**
#### `GET /api/posts`
- **Description**: Fetches all posts from the database.
- **Response**:
  - **200**: Returns an array of posts.
  - **500**: Internal server error.

### 2. **Fetch Single Post**
#### `GET /api/posts/:id`
- **Description**: Fetches a single post identified by `:id`, along with its comments, reactions, and author details.
- **Response**:
  - **200**: Returns the post details.
  - **404**: Post not found.
  - **500**: Internal server error.

### 3. **Comment on a Post**
#### `POST /api/posts/:postId/comment`
- **Description**: Adds a comment to a post identified by `:postId`.
- **Middleware**: `ensureAuthenticated` checks if the user is authenticated.
- **Request Body**: Contains the comment content.
- **Response**:
  - **200**: Returns the saved comment.
  - **500**: Internal server error.

### 4. **React to a Post**
#### `POST /api/posts/:postId/reaction`
- **Description**: Adds or updates a reaction (like or dislike) to a post identified by `:postId`.
- **Middleware**: `ensureAuthenticated` checks if the user is authenticated.
- **Request Body**: Contains the reaction type.
- **Response**:
  - **200**: Returns a success message.
  - **400**: Invalid reaction type.
  - **500**: Internal server error.

### 5. **Fetch Comments for a Post**
#### `GET /api/posts/:postId/comments`
- **Description**: Fetches all comments for a post identified by `:postId`.
- **Response**:
  - **200**: Returns an array of comments.
  - **404**: Post not found.
  - **500**: Internal server error.

### 6. **Create a New Post**
#### `POST /api/createNewPost`
- **Description**: Creates a new post with an optional image.
- **Middleware**: `ensureAuthenticated` checks if the user is authenticated, and `multer` handles file uploads.
- **Request Body**: Contains post details.
- **Response**:
  - **200**: Returns the created post.
  - **500**: Internal server error.

### 7. **Fetch All Topics**
#### `GET /api/topics`
- **Description**: Fetches all topics from the database.
- **Response**:
  - **200**: Returns an array of topics.
  - **500**: Internal server error.

### 8. **Create a New Topic**
#### `POST /api/topics`
- **Description**: Creates a new topic if it doesn't already exist.
- **Request Body**: Contains topic details.
- **Response**:
  - **200**: Returns the created topic.
  - **500**: Internal server error.

### 9. **Fetch Tech News**
#### `GET /api/techNews`
- **Description**: Fetches news data related to a query from a third-party API.
- **Query Parameters**: `q` specifies the user query.
- **Response**:
  - **200**: Returns news data.
  - **404**: Data not found.
  - **500**: Internal server error.

### Middleware
- **cors**: Handles Cross-Origin Resource Sharing (CORS).
- **express.json** and **express.urlencoded**: Parse incoming request bodies.
- **express.static**: Serves static files (images) from the 'uploads' directory.
- **ensureAuthenticated**: Middleware function to check if the user is authenticated.
- **multer**: Middleware for handling multipart/form-data, used for file uploads.

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



