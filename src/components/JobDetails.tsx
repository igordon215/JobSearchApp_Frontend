import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { JobApplication } from '../types/JobApplication';
import { getJobApplication } from '../services/jobApplicationService';

interface JobDetailsProps {
  jobId: number;
  onEdit: (job: JobApplication) => void;
  onClose: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ jobId, onEdit, onClose }) => {
  const [job, setJob] = useState<JobApplication | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobData = await getJobApplication(jobId);
        setJob(jobData);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  if (!job) {
    return <Typography>Loading...</Typography>;
  }

  return (
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
          <Button variant="contained" color="primary" onClick={() => onEdit(job)}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose} style={{ marginLeft: '8px' }}>
            Close
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobDetails;