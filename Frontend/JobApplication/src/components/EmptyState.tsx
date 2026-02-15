const EmptyState = () => {
  return (
    <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
      <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-xl font-semibold text-slate-700 mb-2">No jobs found</h3>
      <p className="text-slate-500">Try adjusting your search criteria</p>
    </div>
  );
};

export default EmptyState;
