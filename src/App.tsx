import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Grid } from '@mui/material';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import JobDetails from './components/JobDetails';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Typography variant="h6" component="div" className="app-title">
                  Job Search Board
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <Button component={Link} to="/" color="inherit">
                      Home
                    </Button>
                  </Grid>
                  <Grid item xs={4} style={{ textAlign: 'center' }}>
                    <Button component={Link} to="/new" color="inherit">
                      ADD NEW JOB
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    {/* Empty grid item for balance */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" className="main-content fade-in">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/new" element={<JobForm />} />
            <Route path="/edit/:id" element={<JobForm />} />
            <Route path="/details/:id" element={<JobDetails />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
