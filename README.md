# Job Search Application

This is a React-based frontend application for managing job applications. It allows users to create, view, edit, and delete job applications.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd job_front
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Backend Configuration

The backend has been updated to allow CORS requests from the frontend. After making changes to the backend:

1. Restart the backend server:
   - If you're using Maven, run:
     ```
     ./mvnw
     ```
   - If you're using Gradle, run:
     ```
     ./gradlew bootRun
     ```

2. Once the backend server has restarted, refresh your frontend application in the browser.

3. Try creating a new job application. If you encounter any issues, check the browser console for error messages and ensure that the backend server is running correctly.

## Features

- View a list of all job applications
- Create a new job application
- View details of a specific job application
- Edit an existing job application
- Delete a job application

## Troubleshooting

If you encounter any issues:

1. Ensure both frontend and backend servers are running.
2. Check the browser console for any error messages.
3. Verify that the backend server is accessible at `http://localhost:8080/api`.
4. If you make any changes to the backend, remember to restart the backend server.

## Project Structure

- `src/components/`: Contains all React components
  - `JobList.tsx`: Displays the list of job applications
  - `JobForm.tsx`: Form for creating and editing job applications
  - `JobDetails.tsx`: Displays details of a specific job application
- `src/types/`: Contains TypeScript type definitions
- `src/App.tsx`: Main component with routing setup

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
