import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Chip, Grid, Fade, CircularProgress } from '@mui/material';
import { Visibility as VisibilityIcon, Edit as EditIcon } from '@mui/icons-material';
import { JobApplication } from '../types/JobApplication';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust this URL to match your backend API

const JobList: React.FC = () => {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get(`${API_URL}/job-applications`);
        setJobApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job applications:', error);
        setLoading(false);
      }
    };
    fetchJobApplications();
  }, []);

  const handleView = (id: number) => {
    navigate(`/details/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return '#4caf50';
      case 'INTERVIEW':
        return '#ff9800';
      case 'FILLED':
        return '#d32f2f';
      default:
        return '#757575';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '24px' }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ marginBottom: '48px', fontWeight: 'bold', color: 'primary.main' }}
      >
        Job Applications
      </Typography>
      <Grid container spacing={3}>
        {jobApplications.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Fade in={true} timeout={500 + index * 100}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <Typography variant="h6" component="h2" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      {job.position}
                    </Typography>
                    <Chip
                      label={job.status}
                      sx={{
                        backgroundColor: getStatusColor(job.status),
                        color: 'white',
                        fontSize: '0.75rem',
                        height: '24px'
                      }}
                    />
                  </Box>
                  <Typography variant="body1" sx={{ fontSize: '0.9rem', marginBottom: '4px' }}>
                    {job.companyName}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', marginBottom: '16px' }}>
                    Applied: {new Date(job.dateApplied).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleView(job.id)}
                      startIcon={<VisibilityIcon />}
                      sx={{ fontSize: '0.8rem', minWidth: '100px' }}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => handleEdit(job.id)}
                      startIcon={<EditIcon />}
                      sx={{
                        fontSize: '0.8rem',
                        minWidth: '100px',
                        fontWeight: 'bold',
                        borderWidth: '2px',
                        '&:hover': {
                          borderWidth: '2px',
                          backgroundColor: 'rgba(156, 39, 176, 0.04)'
                        }
                      }}
                    >
                      Edit
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JobList;