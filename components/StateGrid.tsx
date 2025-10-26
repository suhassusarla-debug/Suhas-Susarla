import React from 'react';
import { State } from '../types';
import StateCard from './StateCard';

interface StateGridProps {
  states: State[];
  onSelectState: (state: State) => void;
}

const StateGrid: React.FC<StateGridProps> = ({ states, onSelectState }) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 tracking-tight">Explore India's States & UTs</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
          Discover the diverse beauty and rich culture across India.
        </p>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {states.map((state) => (
          <StateCard key={state.id} state={state} onSelect={onSelectState} />
        ))}
      </div>
    </div>
  );
};

export default StateGrid;