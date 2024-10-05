import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { JobApplication } from '../types/JobApplication';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust this URL to match your backend API

const JobDetails: React.FC = () => {
  const [job, setJob] = useState<JobApplication | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/job-applications/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
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
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (!job) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {job.position} at {job.companyName}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Date Applied: {job.dateApplied}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Status: {job.status}
          </Typography>
          {job.jobNumber && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Job Number: {job.jobNumber}
            </Typography>
          )}
          {job.website && (
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Website: {job.website}
            </Typography>
          )}
          {job.contactInfoFollowUp && (
            <Typography variant="body2" gutterBottom>
              Contact Info / Follow Up: {job.contactInfoFollowUp}
            </Typography>
          )}
          {job.notes && (
            <Typography variant="body2" gutterBottom>
              Notes: {job.notes}
            </Typography>
          )}
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose} style={{ marginLeft: '8px' }}>
              Close
            </Button>
            <Button variant="outlined" color="error" onClick={handleOpenDialog} style={{ marginLeft: '8px' }}>
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this job application? This action cannot be undone.
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
    </>
  );
};

export default JobDetails;