import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, SelectChangeEvent } from '@mui/material';
import { JobApplication } from '../types/JobApplication';
import { createJobApplication, updateJobApplication } from '../services/jobApplicationService';

interface JobFormProps {
  job?: JobApplication;
  onSubmit: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ job, onSubmit }) => {
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

  useEffect(() => {
    if (job) {
      setFormData(job);
    }
  }, [job]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (job) {
      await updateJobApplication({ ...formData, id: job.id } as JobApplication);
    } else {
      await createJobApplication(formData as Omit<JobApplication, 'id'>);
    }
    onSubmit();
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
        {job ? 'Update' : 'Create'} Job Application
      </Button>
    </Box>
  );
};

export default JobForm;