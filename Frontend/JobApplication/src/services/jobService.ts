import type { Job } from '../types/job';

const API_URL = 'http://localhost:8080/jobPosts'; // Replace with your actual URL
const POST_API_URL = 'http://localhost:8080/jobPost';

export const fetchJobs = async (): Promise<Job[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const createJob = async (job: Job): Promise<Job> => {
  const response = await fetch(POST_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  });
  if (!response.ok) {
    throw new Error('Failed to create job');
  }
  return response.json();
};