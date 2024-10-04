export interface JobApplication {
  id: number;
  dateApplied: string;
  companyName: string;
  position: string;
  jobNumber?: string;
  website?: string;
  status: 'APPLIED' | 'INTERVIEW' | 'FILLED';
  contactInfoFollowUp?: string;
  notes?: string;
}