import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, SelectChangeEvent, CircularProgress, Snackbar } from '@mui/material';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          setError('Failed to fetch job application');
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
    setLoading(true);
    setError(null);
    console.log('Submitting form data:', formData);
    try {
      let response;
      if (id) {
        console.log('Updating existing job application');
        response = await axios.put(`${API_URL}/job-applications/${id}`, formData);
      } else {
        console.log('Creating new job application');
        response = await axios.post(`${API_URL}/job-applications`, formData);
      }
      console.log('API response:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error saving job application:', error);
      setError('Failed to save job application. Please try again.');
    } finally {
      setLoading(false);
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
        required
      />
      <TextField
        name="companyName"
        label="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="position"
        label="Position"
        value={formData.position}
        onChange={handleChange}
        fullWidth
        required
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
      <FormControl fullWidth required>
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
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : (id ? 'Update' : 'Create')} Job Application
      </Button>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </Box>
  );
};

export default JobForm;