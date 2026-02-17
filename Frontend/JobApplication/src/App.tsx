import { useState } from 'react'
import './App.css'
import JobBoard from './pages/JobBoard'
import AddJob from './pages/AddJob'

function App() {
  const [currentPage, setCurrentPage] = useState<'board' | 'add'>('board')
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const handleJobSuccess = () => {
    setCurrentPage('board')
    setShowSuccessPopup(true)
    setTimeout(() => setShowSuccessPopup(false), 3000)
  }

  return (
    <div className="App">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Job posted successfully!</span>
          </div>
        </div>
      )}

      {currentPage === 'board' ? (
        <JobBoard onAddJob={() => setCurrentPage('add')} />
      ) : (
        <AddJob onBack={() => setCurrentPage('board')} onSuccess={handleJobSuccess} />
      )}
    </div>
  )
}

export default App
