
# DEPLOYMENT

## Deployed Application

The live version of our application can be accessed at the following URL:
[Reedmi Application](https://reedmi-test.onrender.com)
### Deployment Steps Explained:

1. **Static Files in Express**: Added `app.use(express.static('build'))` in the Express server file to serve static files from the 'build' directory.

2. **Serving React Build through Express**: The compiled React code from the 'build' directory is served by the Express server. This means there's no need to run the frontend server separately in production.

3. **Building and Running the Server**: The commands `npm install && npm run build` are used to install dependencies and build the React application, and `npm run server` is used to start the server.

4. **Environment-Dependent Port Selection**: A conditional ternary operator is used to choose the server port. It runs on port 3000 in production and on port 3001 in development.

5. **Frontend Axios Calls**: The frontend makes Axios calls to the domain hosting the application. This is where both the server and frontend are operational together.

6. **Server Hosting**: The server is hosted at the specified website.

7. **Port Handling in Different Environments**: Previously, for local development, requests were made to 'localhost:3001'. In production, requests are directed to the hosting website's domain.

## Running and Building the Project Locally

If you wish to run the application locally for development or testing purposes, you can do so by following these steps:

1. **Clone the repository:** 
   Clone the project repository to your local machine.

   ```bash
   git clone https://github.com/MQ3120-2023/group-project-wednesday-3pm-1
   ```

2. **Navigate to the project directory:** 
   Change into the project directory using the command line.

   ```bash
   cd <project-directory>
   ```

3. **Install dependencies:** 
   Install the necessary dependencies for the project.

   ```bash
   npm install
   ```

4. **Start the application:** 
   Start the application and the server using the following commands in separate terminal instances:

   - In the first terminal, run:
     ```bash
     npm start
     ```
     This will start the frontend of the application.

   - In a second terminal, run:
     ```bash
     npm run server
     ```
     This will start the backend server.

   The application can then be accessed via your web browser at `http://localhost:3000`.

## Continuous Integration

We have implemented Continuous Integration (CI) to automate the process of deploying our application. The application is automatically built and deployed to [Render](https://render.com) whenever changes are pushed to the main branch of the repository.
