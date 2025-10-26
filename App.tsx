import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StateGrid from './components/StateGrid';
import StateDetail from './components/StateDetail';
import { INDIAN_STATES } from './constants';
import { State } from './types';

const App: React.FC = () => {
  const [selectedState, setSelectedState] = useState<State | null>(null);

  useEffect(() => {
    // Scroll to top when the view changes
    window.scrollTo(0, 0);
  }, [selectedState]);

  const handleSelectState = (state: State) => {
    setSelectedState(state);
  };

  const handleBack = () => {
    setSelectedState(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main>
        {selectedState ? (
          <StateDetail state={selectedState} onBack={handleBack} />
        ) : (
          <StateGrid states={INDIAN_STATES} onSelectState={handleSelectState} />
        )}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Torista. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;