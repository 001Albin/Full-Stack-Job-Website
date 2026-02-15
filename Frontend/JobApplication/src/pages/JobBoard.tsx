import { useEffect, useState, useMemo } from 'react';
import type { Job } from '../types/job';
import { fetchJobs } from '../services/jobService';
import { Header, Footer, SearchBar, JobCard, LoadingSpinner, EmptyState } from '../components';
import { useDebounce } from '../hooks/useDebounce';

const JobBoard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetchJobs()
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  const filteredJobs = useMemo(() => {
    const query = debouncedSearch.toLowerCase();
    return jobs.filter(job =>
      job.postProfile.toLowerCase().includes(query) ||
      job.PostDesc.toLowerCase().includes(query) ||
      job.postTechStack.some(tech => tech.toLowerCase().includes(query))
    );
  }, [jobs, debouncedSearch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50">
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Find Your <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Dream Job</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover opportunities that match your skills and aspirations. Your next career move starts here.
          </p>
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600">
            <span className="font-semibold text-slate-900">{filteredJobs.length}</span> opportunities available
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            <span>Sorted by relevance</span>
          </div>
        </div>
      </section>

      {/* Job Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        {filteredJobs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.postId} job={job} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default JobBoard;