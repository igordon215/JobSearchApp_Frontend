import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
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

  return (
    <TableContainer component={Paper} className="job-list">
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
                <Button variant="contained" color="primary" size="small" onClick={() => handleView(job.id)}>
                  View
                </Button>
                <Button variant="contained" color="secondary" size="small" onClick={() => handleEdit(job.id)} style={{ marginLeft: '8px' }}>
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