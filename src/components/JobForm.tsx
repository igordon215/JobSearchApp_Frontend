import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, SelectChangeEvent, CircularProgress, Snackbar, Card, CardContent, Typography, Grid, Alert } from '@mui/material';
import { JobApplication } from '../types/JobApplication';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust this URL to match your backend API

interface JobFormProps {
  job?: JobApplication;
}

const JobForm: React.FC<JobFormProps> = ({ job }) => {
  const [formData, setFormData] = useState<Partial<JobApplication>>({
    dateApplied: new Date().toISOString().split('T')[0], // Set default date to today
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
  const [success, setSuccess] = useState(false);

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
    setSuccess(false);
    try {
      if (id) {
        await axios.put(`${API_URL}/job-applications/${id}`, formData);
      } else {
        await axios.post(`${API_URL}/job-applications`, formData);
      }
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error saving job application:', error);
      setError('Failed to save job application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="job-form fade-in">
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {id ? 'Edit Job Application' : 'Create New Job Application'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="companyName"
                label="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="position"
                label="Position"
                value={formData.position}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="jobNumber"
                label="Job Number"
                value={formData.jobNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="website"
                label="Website"
                value={formData.website}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required sx={{ '& .MuiInputLabel-root': { position: 'relative', transform: 'none', marginBottom: '4px', fontSize: '0.8rem' } }}>
                <InputLabel id="status-label" shrink={false}>Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="APPLIED">Applied</MenuItem>
                  <MenuItem value="INTERVIEW">Interview</MenuItem>
                  <MenuItem value="FILLED">Filled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="contactInfoFollowUp"
                label="Contact Info / Follow Up"
                value={formData.contactInfoFollowUp}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="notes"
                label="Notes"
                value={formData.notes}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              {loading ? <CircularProgress size={24} /> : (id ? 'Update' : 'Create')}
            </Button>
          </Box>
        </Box>
      </CardContent>
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
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Job application {id ? 'updated' : 'created'} successfully!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default JobForm;