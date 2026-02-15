import type { Job } from '../types/job';

const API_URL = 'http://localhost:8080/jobPosts'; // Replace with your actual URL

export const fetchJobs = async (): Promise<Job[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};