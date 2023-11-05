
# DEPLOYMENT

## Deployed Application

The live version of our application can be accessed at the following URL:
[Reedmi Application](https://reedmi-test.onrender.com)

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
