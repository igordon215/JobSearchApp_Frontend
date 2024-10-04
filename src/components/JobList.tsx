import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { JobApplication } from '../types/JobApplication';
import { fetchJobApplications } from '../services/jobApplicationService';

const JobList: React.FC = () => {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    const getJobApplications = async () => {
      const applications = await fetchJobApplications();
      setJobApplications(applications);
    };
    getJobApplications();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date Applied</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobApplications.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.dateApplied}</TableCell>
              <TableCell>{job.companyName}</TableCell>
              <TableCell>{job.position}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" size="small">
                  View
                </Button>
                <Button variant="contained" color="secondary" size="small">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobList;