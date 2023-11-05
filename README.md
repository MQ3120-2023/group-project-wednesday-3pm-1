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

ReedMi uses MongoDB, a server that retrieves and transfesr data to and from a database that houses user-generated content.
ReedMi uses Google authentication 

## Our Vision for the future 

If the project were to advance, the next phase of development would focus on augmenting the interactivity and user control within the ReedMi platform. This would include implementing functionality for users to express their opinions more dynamically by introducing the ability to like or dislike comments made by other users. This feature would add a layer of engagement and allow for a more nuanced reflection of user sentiment within discussions. Moreover, we would empower users with the ability to manage their digital footprint on the platform by granting them the capability to delete their own posts and any comments they have made. This step is critical for ensuring that users feel a sense of ownership and responsibility over their content and can adapt their contributions as their perspectives evolve or to correct any errors post-publication. Finally we would've enabled the reply system where users can engage with other users under posts.

## Source Code Guide

Home.js:
    Responsible for displaying all elements relating to the main page. This involves, the side bar containing topic selection, user posts, Reedmi logo, tech news button, and create post button.

SelectedPost.js:
    -Responsible for displaying post data for the respective post that the user has clicked on.
    -Displays all information relevant to the post, including the image, title, and description.
    -Provides like and dislike button for the user to interact with. If user likes or dislikes, the respective like or dislike counter is updated by one. Checks also if user has already liked or disliked, In which they will unlike or dislike if they click again. User can like or dislike no more than once, unless they unlike or dislike. User like or dislike input is sent to backend.
    -Provides comment feature, displaying existing comments, and allowing user to add their own comments using a form.

Navbar.js:
    - Serves as the primary navigation component of the ReedMi app.
    - Provides a consistent top header across different views with the "ReedMi" logo that links to the home page.
    - Contains navigation links that allow the user to access the main areas of the app such as the home page, the TechNews section, and the functionality to create a new post.
    - Offers a sign-out option for user session termination, enhancing the security and personalized experience of the app.

PostList.js
    -Allows the homepage to display all the different posts that have been uploaded to the backend by users.

NewTopic.js
    -Allows users to create new topics, by sending inputted topic to backend server and updating the topic list accordingly.
    
NewPost.js
    -Allows user to create posts which are then stored in the backend. When creating a post, the user is required to add a title, image, content, and topic. This post is then able to be viewed by other users who log into the website.


### TechNews Feature & Data Flow Documentation 
`TechNews.js` & `SingleArticle.js`
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

## Summary of Main Roles

Mifta
- TechNews and use of third party api
- Creating new topics 
- Creating new posts 
- Use of multer to enable users to upload images 
- Use of MongoDB

Ryan
- Authentication, Registration and Login using Passport
- Connecting comments and likes to a user and making sure it's saved
- The schemas used to save Reactions from users 
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



