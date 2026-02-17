import { useState } from 'react';
import { createJob } from '../services/jobService';
import type { Job } from '../types/job';
import { Header, Footer } from '../components';

// Predefined tech options
const TECH_OPTIONS = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Kotlin', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Dart'],
  frontend: ['React', 'Angular', 'Vue.js', 'Next.js', 'Svelte', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'SASS'],
  backend: ['Node.js', 'Express.js', 'Spring Boot', 'Django', 'Flask', 'FastAPI', '.NET', 'Laravel', 'Ruby on Rails'],
  mobile: ['React Native', 'Flutter', 'Android SDK', 'iOS SDK', 'Kotlin Multiplatform'],
  database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'Firebase', 'Supabase'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Jenkins', 'GitHub Actions', 'Terraform'],
  tools: ['Git', 'REST API', 'GraphQL', 'Hibernate', 'Prisma', 'Webpack', 'Vite'],
};

interface AddJobProps {
  onBack: () => void;
  onSuccess: () => void;
}

const AddJob = ({ onBack, onSuccess }: AddJobProps) => {
  const [formData, setFormData] = useState({
    postId: '',
    postProfile: '',
    PostDesc: '',
    reqExperience: '',
  });
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [customTech, setCustomTech] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const addCustomTech = () => {
    const trimmed = customTech.trim();
    if (trimmed && !selectedTech.includes(trimmed)) {
      setSelectedTech(prev => [...prev, trimmed]);
      setCustomTech('');
    }
  };

  const handleCustomKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomTech();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    try {
      const jobData: Job = {
        postId: parseInt(formData.postId),
        postProfile: formData.postProfile,
        PostDesc: formData.PostDesc,
        reqExperience: parseInt(formData.reqExperience),
        postTechStack: selectedTech,
      };

      await createJob(jobData);
      onSuccess();
    } catch (error) {
      setMessage({ type: 'error', text: 'Error posting job. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50">
      <Header />

      <section className="max-w-2xl mx-auto px-6 pt-12 pb-20">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors mb-8 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Job Board
        </button>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Post a <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">New Job</span>
          </h1>
          <p className="text-slate-600">Fill in the details below to create a new job listing</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {message.type === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="space-y-6">
            {/* Post ID */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Post ID</label>
              <input
                type="number"
                name="postId"
                value={formData.postId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter unique post ID"
              />
            </div>

            {/* Job Profile */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Job Profile</label>
              <input
                type="text"
                name="postProfile"
                value={formData.postProfile}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g., Android Developer"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description</label>
              <textarea
                name="PostDesc"
                value={formData.PostDesc}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe the role, responsibilities, and requirements..."
              />
            </div>

            {/* Required Experience */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Required Experience (years)</label>
              <input
                type="number"
                name="reqExperience"
                value={formData.reqExperience}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g., 4"
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Tech Stack</label>
              
              {/* Selected Technologies */}
              {selectedTech.length > 0 && (
                <div className="mb-4 p-3 bg-indigo-50 rounded-xl">
                  <p className="text-xs font-medium text-indigo-600 mb-2">Selected ({selectedTech.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTech.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg flex items-center gap-1"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => toggleTech(tech)}
                          className="ml-1 hover:bg-indigo-700 rounded-full p-0.5"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Categories */}
              {Object.entries(TECH_OPTIONS).map(([category, techs]) => (
                <div key={category} className="mb-4">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techs.map(tech => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => toggleTech(tech)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                          selectedTech.includes(tech)
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-indigo-100 hover:text-indigo-700'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Add Custom Tech */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Add Custom</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customTech}
                    onChange={(e) => setCustomTech(e.target.value)}
                    onKeyDown={handleCustomKeyPress}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                    placeholder="Type custom technology..."
                  />
                  <button
                    type="button"
                    onClick={addCustomTech}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-indigo-100 hover:text-indigo-700 transition-all flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </>
              ) : (
                <>
                  Post Job
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default AddJob;
