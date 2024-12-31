import React from 'react';

function Spinner({ text }) {
  
  return (
      <div className="flex flex-col w-full items-center">
        <div className="animate-spin rounded-full h-5 w-5 mt-10 border-t-4 border-b-4 border-blue-500"></div>
        <p className="text-gray-700 text-xs">
          {text}
        </p>
      </div>
  );
}

export default Spinner;