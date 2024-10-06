import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { JobApplication } from '../types/JobApplication';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust this URL to match your backend API

const JobList: React.FC = () => {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        const response = await axios.get(`${API_URL}/job-applications`);
        setJobApplications(response.data);
      } catch (error) {
        console.error('Error fetching job applications:', error);
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

  // Updated getStatusColor function with new color scheme
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return '#4caf50'; // Green
      case 'INTERVIEW':
        return '#ff9800'; // Yellow-orange
      case 'FILLED':
        return '#d32f2f'; // Red (unchanged)
      default:
        return '#757575'; // Default gray color
    }
  };

  return (
    <Box sx={{ padding: '24px' }}>
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center', marginBottom: '24px', color: '#2196f3' }}>
        Job Applications
      </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '16px',
        justifyContent: 'center'
      }}>
        {jobApplications.map((job) => (
          <Card key={job.id} sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                  sx={{ fontSize: '0.8rem', minWidth: '80px' }}
                >
                  VIEW
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => handleEdit(job.id)}
                  sx={{
                    fontSize: '0.8rem',
                    minWidth: '80px',
                    fontWeight: 'bold',
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px',
                      backgroundColor: 'rgba(156, 39, 176, 0.04)'
                    }
                  }}
                >
                  EDIT
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default JobList;