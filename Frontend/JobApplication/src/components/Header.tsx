const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              JobHub
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">Find Jobs</a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">Companies</a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">Resources</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
