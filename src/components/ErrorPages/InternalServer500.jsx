import React from 'react';

const InternalServerError500 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <img
        src="/500_Error.gif"
        alt="500 Internal Server Error"
        className="w-96 max-w-full mb-8"
        draggable="false"
      />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">500 - Internal Server Error</h1>
      <p className="text-lg text-gray-600 mb-6">Oops! Something went wrong on our end. Please try again later.</p>
      <a
        href="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
      >
        Go to Home
      </a>
    </div>
  );
};

export default InternalServerError500;
