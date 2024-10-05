import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, SelectChangeEvent } from '@mui/material';
import { JobApplication } from '../types/JobApplication';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust this URL to match your backend API

interface JobFormProps {
  job?: JobApplication;
}

const JobForm: React.FC<JobFormProps> = ({ job }) => {
  const [formData, setFormData] = useState<Partial<JobApplication>>({
    dateApplied: '',
    companyName: '',
    position: '',
    jobNumber: '',
    website: '',
    status: 'APPLIED',
    contactInfoFollowUp: '',
    notes: '',
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        try {
          const response = await axios.get(`${API_URL}/job-applications/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching job application:', error);
        }
      };
      fetchJob();
    } else if (job) {
      setFormData(job);
    }
  }, [id, job]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${API_URL}/job-applications/${id}`, formData);
      } else {
        await axios.post(`${API_URL}/job-applications`, formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving job application:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1 } }}>
      <TextField
        name="dateApplied"
        label="Date Applied"
        type="date"
        value={formData.dateApplied}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        name="companyName"
        label="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="position"
        label="Position"
        value={formData.position}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="jobNumber"
        label="Job Number"
        value={formData.jobNumber}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="website"
        label="Website"
        value={formData.website}
        onChange={handleChange}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="APPLIED">Applied</MenuItem>
          <MenuItem value="INTERVIEW">Interview</MenuItem>
          <MenuItem value="FILLED">Filled</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="contactInfoFollowUp"
        label="Contact Info / Follow Up"
        value={formData.contactInfoFollowUp}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
      />
      <TextField
        name="notes"
        label="Notes"
        value={formData.notes}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update' : 'Create'} Job Application
      </Button>
    </Box>
  );
};

export default JobForm;