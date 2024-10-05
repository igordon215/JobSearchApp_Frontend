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

3. Set up the backend:
   - Ensure that the backend server is running and accessible at `http://localhost:8080/api`.
   - If your backend is running on a different URL, update the `API_URL` constant in the following files:
     - `src/components/JobForm.tsx`
     - `src/components/JobList.tsx`
     - `src/components/JobDetails.tsx`

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Features

- View a list of all job applications
- Create a new job application
- View details of a specific job application
- Edit an existing job application
- Delete a job application

## Technologies Used

- React
- React Router
- Material-UI
- Axios for API calls

## Project Structure

- `src/components/`: Contains all React components
  - `JobList.tsx`: Displays the list of job applications
  - `JobForm.tsx`: Form for creating and editing job applications
  - `JobDetails.tsx`: Displays details of a specific job application
- `src/types/`: Contains TypeScript type definitions
- `src/App.tsx`: Main component with routing setup

## API Integration

This frontend application is designed to work with a RESTful API backend. Ensure that your backend provides the following endpoints:

- GET `/api/job-applications`: Fetch all job applications
- GET `/api/job-applications/:id`: Fetch a specific job application
- POST `/api/job-applications`: Create a new job application
- PUT `/api/job-applications/:id`: Update an existing job application
- DELETE `/api/job-applications/:id`: Delete a job application

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
