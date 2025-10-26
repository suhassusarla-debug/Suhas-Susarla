import React from 'react';
import { CompassIcon, UserCircleIcon, SignOutIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
               <div className="flex items-center space-x-2">
                 <CompassIcon className="h-8 w-8 text-indigo-600" />
                 <span className="text-2xl font-bold text-gray-800">Torista</span>
               </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              <CompassIcon className="h-5 w-5 mr-1" />
              Explore States
            </a>
            <a href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              <UserCircleIcon className="h-5 w-5 mr-1" />
              Profile
            </a>
            <a href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              <SignOutIcon className="h-5 w-5 mr-1" />
              Sign Out
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;