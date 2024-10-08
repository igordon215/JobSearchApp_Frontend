import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Snackbar, Alert, Grid, Chip, Divider } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { JobApplication } from '../types/JobApplication';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust this URL to match your backend API

const JobDetails: React.FC = () => {
  const [job, setJob] = useState<JobApplication | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/job-applications/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/job-applications/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting job application:', error);
      setError('Failed to delete job application. Please try again.');
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return 'primary';
      case 'INTERVIEW':
        return 'secondary';
      case 'FILLED':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!job) {
    return <Typography>Job application not found.</Typography>;
  }

  return (
    <>
      <Paper elevation={3} sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 4 }} className="job-details fade-in">
        <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
          {job.position}
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {job.companyName}
        </Typography>
        <Chip
          label={job.status}
          color={getStatusColor(job.status)}
          sx={{ mt: 1, mb: 3 }}
        />
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Date Applied:</strong> {new Date(job.dateApplied).toLocaleDateString()}
            </Typography>
          </Grid>
          {job.jobNumber && (
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Job Number:</strong> {job.jobNumber}
              </Typography>
            </Grid>
          )}
          {job.website && (
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Website:</strong> <a href={job.website} target="_blank" rel="noopener noreferrer">{job.website}</a>
              </Typography>
            </Grid>
          )}
        </Grid>
        {job.contactInfoFollowUp && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Contact Info / Follow Up
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{job.contactInfoFollowUp}</Typography>
          </Box>
        )}
        {job.notes && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{job.notes}</Typography>
          </Box>
        )}
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleEdit} startIcon={<EditIcon />} sx={{ mr: 1 }}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose} startIcon={<ArrowBackIcon />} sx={{ mr: 1 }}>
            Back to List
          </Button>
          <Button variant="outlined" color="error" onClick={handleOpenDialog} startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the job application for {job.position} at {job.companyName}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default JobDetails;