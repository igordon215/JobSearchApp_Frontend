import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import JobDetails from './components/JobDetails';
import { JobApplication } from './types/JobApplication';

const App: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);

  const handleEditJob = (job: JobApplication) => {
    setSelectedJob(job);
  };

  const handleCloseJob = () => {
    setSelectedJob(null);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Job Search Board
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/new">
            Add New Job
          </Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<JobList />} />
          <Route path="/new" element={<JobForm onSubmit={handleCloseJob} />} />
          <Route
            path="/edit/:id"
            element={
              selectedJob ? (
                <JobForm job={selectedJob} onSubmit={handleCloseJob} />
              ) : (
                <Typography>No job selected</Typography>
              )
            }
          />
          <Route
            path="/details/:id"
            element={
              <JobDetails
                jobId={selectedJob?.id || 0}
                onEdit={handleEditJob}
                onClose={handleCloseJob}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
