
import React from 'react';
import { State } from '../types';
import { LocationPinIcon, CalendarIcon } from './icons';

interface StateCardProps {
  state: State;
  onSelect: (state: State) => void;
}

const StateCard: React.FC<StateCardProps> = ({ state, onSelect }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => onSelect(state)}
    >
      <img className="h-48 w-full object-cover" src={state.imageUrl} alt={`Scenery of ${state.name}`} />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-2">
            <LocationPinIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
            <h3 className="font-bold text-xl text-gray-800 tracking-wide">{state.name}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{state.description}</p>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-gray-500 text-sm">
            <CalendarIcon className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>Best Time: {state.bestTimeToVisit}</span>
        </div>
      </div>
    </div>
  );
};

export default StateCard;
