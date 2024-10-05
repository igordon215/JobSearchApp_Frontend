# Job Application Tracking System

This is a full-stack application for tracking job applications. It allows users to manage and monitor their job application process efficiently.

## Project Structure

- `job_back/`: Backend application (Spring Boot)
https://github.com/igordon215/JobSearchApp_Backend
- `job_front/`: Frontend application (React)
https://github.com/igordon215/JobSearchApp_Frontend

## Technologies Used

### Backend
- Java
- Spring Boot
- JHipster
- H2 Database (Development)
- MySQL (Production)
- Hibernate
- Ehcache
- Cucumber (for testing)
- OpenAPI (for API-first development)

### Frontend
- React
- TypeScript
- npm

## Setup and Installation

### Backend

1. Ensure you have Java 11 or later installed.
2. Install Node.js and npm.
3. Install JHipster: `npm install -g generator-jhipster`
4. Navigate to the backend directory: `cd job_back`
5. Run `./mvnw` (for Maven) or `./gradlew` (for Gradle) to start the application.

### Frontend

1. Ensure you have Node.js (v14 or later) and npm (v6 or later) installed.
2. Navigate to the frontend directory: `cd job_front`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## Usage

1. Start the backend server (it will run on `http://localhost:8080`)
2. Start the frontend development server (it will run on `http://localhost:3000`)
3. Open your browser and navigate to `http://localhost:3000` to use the application

## Features

- View a list of all job applications
- Create a new job application
- View details of a specific job application
- Edit an existing job application
- Delete a job application

## API Documentation

API documentation is automatically generated using OpenAPI. You can access the Swagger UI at `http://localhost:8080/swagger-ui.html` when the backend application is running.

## Database

- H2 (Development): The H2 console is available at `http://localhost:8080/h2-console` when running in development mode.
- MySQL (Production): Ensure you have MySQL installed and update the `application-prod.yml` with your database configuration.

## Testing

### Backend
This project uses Cucumber for behavior-driven development (BDD) testing. To run the tests:

```
./mvnw clean test
```

### Frontend
To run frontend tests:

```
npm test
```

## Troubleshooting

If you encounter any issues:

1. Ensure both frontend and backend servers are running.
2. Check the browser console for any error messages.
3. Verify that the backend server is accessible at `http://localhost:8080/api`.
4. If you make any changes to the backend, remember to restart the backend server.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

For more information on using JHipster, refer to the [JHipster documentation](https://www.jhipster.tech/documentation-archive/v8.7.1).
