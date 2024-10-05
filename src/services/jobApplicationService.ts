import axios from 'axios';
import { JobApplication } from '../types/JobApplication';

const API_URL = 'http://localhost:8080/api'; // Adjust this URL to match your backend API

export const fetchJobApplications = async (): Promise<JobApplication[]> => {
  const response = await axios.get(`${API_URL}/job-applications`);
  return response.data;
};

export const createJobApplication = async (jobApplication: Omit<JobApplication, 'id'>): Promise<JobApplication> => {
  const response = await axios.post(`${API_URL}/job-applications`, jobApplication);
  return response.data;
};

export const updateJobApplication = async (jobApplication: JobApplication): Promise<JobApplication> => {
  const response = await axios.put(`${API_URL}/job-applications/${jobApplication.id}`, jobApplication);
  return response.data;
};

export const deleteJobApplication = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/job-applications/${id}`);
};

export const getJobApplication = async (id: number): Promise<JobApplication> => {
  const response = await axios.get(`${API_URL}/job-applications/${id}`);
  return response.data;
};