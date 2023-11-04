From ILearn:

A file DEPLOYMENT.md with the following details: 

A link to a deployed version of your application if available
Information on how to run and build the project, eg. if someone were to take over development
Information about any use of Continuous Integration you have implemented.



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

