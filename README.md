# group-project-wednesday-3pm-1
group-project-wednesday-3pm-1 created by GitHub Classroom
Calum, Ryan, Mifta, Ahmed 


ChosenPost.js

From ILearn:

our README.md should contain a description of your project along the following lines: 
- An outline of the application you were aiming to build, target users, data sources etc (similar to the proposal)
- A reference to your second Github repository if you used one
- A description of what you have been able to implement in this MVP, use your milestones to highlight what you've achieved
- A guide to the project source code - where should we look for what you have done
- A summary of what your next steps would be if you were to continue the project
- A summary of the main roles and contributions of each team member and how you managed interaction and communication through the project

## Project Description 

Our project ReedMi is a user-focused discussion platform similar to Reddit that aims to create a network for 'geeky' users to talk and gain knowledge about tech-related topics. ReedMi will help create this network by offering a forum for tech enthusiasts to propose topics and publish content. All users can access these various postings and participate by leaving comments likes or dislikes. Users can search for topics using the side panel filter, which will lead them to thier favorite posts. Users can create new posts using the Navigation bar to add to the forum. Users can fetch news from a third party API through 'Tech News'.

ReedMi uses MongoDB, a server that retrieves and transfesr data to and from a database that houses user-generated content.
ReedMi uses Google authentication 

## Our Vision for the future 

If the project were to advance, the next phase of development would focus on augmenting the interactivity and user control within the ReedMi platform. This would include implementing functionality for users to express their opinions more dynamically by introducing the ability to like or dislike comments made by other users. This feature would add a layer of engagement and allow for a more nuanced reflection of user sentiment within discussions. Moreover, we would empower users with the ability to manage their digital footprint on the platform by granting them the capability to delete their own posts and any comments they have made. This step is critical for ensuring that users feel a sense of ownership and responsibility over their content and can adapt their contributions as their perspectives evolve or to correct any errors post-publication. Finally we would've enabled teh reply system where users can engage with other users under posts.

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

    





