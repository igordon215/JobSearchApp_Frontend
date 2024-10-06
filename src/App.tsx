import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Container, Button, Grid, Box } from '@mui/material';
import { Add as AddIcon, Home as HomeIcon } from '@mui/icons-material';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import JobDetails from './components/JobDetails';
import theme from './theme';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
                <Grid item xs={4} container justifyContent="center" alignItems="center" spacing={2}>
                  <Grid item>
                    <Button
                      component={Link}
                      to="/new"
                      color="inherit"
                      startIcon={<AddIcon />}
                      variant="outlined"
                      sx={{ borderColor: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                    >
                      Add New Job
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      component={Link}
                      to="/"
                      color="inherit"
                      startIcon={<HomeIcon />}
                    >
                      Home
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  {/* Empty grid item for balance */}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg" className="main-content">
              <Routes>
                <Route path="/" element={<JobList />} />
                <Route path="/new" element={<JobForm />} />
                <Route path="/edit/:id" element={<JobForm />} />
                <Route path="/details/:id" element={<JobDetails />} />
              </Routes>
            </Container>
          </Box>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
