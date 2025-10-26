import React from 'react';
import { State } from '../types';
import { ArrowLeftIcon } from './icons';

interface StateDetailProps {
  state: State;
  onBack: () => void;
}

const StateDetail: React.FC<StateDetailProps> = ({ state, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <button
            onClick={onBack}
            className="inline-flex items-center mb-8 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Destinations
        </button>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <img className="h-96 w-full object-cover" src={state.imageUrl.replace('/400/300', '/800/600')} alt={`Beautiful landscape of ${state.name}`} />
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">{state.name}</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {state.longDescription}
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Top 10 Tourist Places</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {state.topTouristPlaces.map((place, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col h-full">
                  <h3 className="font-semibold text-gray-900 text-base mb-2">{place.name}</h3>
                  <p className="text-gray-600 text-sm flex-grow">{place.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-4">
            <h2 className="font-semibold text-indigo-800">Best Time to Visit</h2>
            <p className="text-indigo-700">{state.bestTimeToVisit}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateDetail;