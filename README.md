# group-project-wednesday-3pm-1
group-project-wednesday-3pm-1 created by GitHub Classroom
Calum, Ryan, Mifta, Ahmed 


ChosenPost.js

From ILearn:

our README.md should contain a description of your project along the following lines: 
- An outline of the application you were aiming to build, target users, data sources etc (similar to the proposal) (done just need to add monogo and google auth)
- A reference to your second Github repository if you used one (we dont have one soo done)
- A description of what you have been able to implement in this MVP, use your milestones to highlight what you've achieved
- A guide to the project source code - where should we look for what you have done 
- A summary of what your next steps would be if you were to continue the project (done)
- A summary of the main roles and contributions of each team member and how you managed interaction and communication through the project

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



