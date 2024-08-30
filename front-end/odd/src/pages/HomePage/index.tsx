import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("backgroundforODD2.jpeg")',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-white">
        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="bg-black bg-opacity-70 text-lg px-4 py-2 rounded-md text-center focus:outline-none"
        />

        {/* Player Options */}
        <div className="flex space-x-4">
          {/* 1 Player Button */}
          <button className="bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80">
            <span className="text-xl font-bold">1 Player</span>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-6.187 3.52c-.677.385-1.565-.008-1.565-.841V9.153c0-.833.888-1.226 1.565-.841l6.187 3.52a1 1 0 010 1.682z"
                />
              </svg>
            </div>
          </button>

          {/* 2 Player Button */}
          <button className="bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80">
            <span className="text-xl font-bold">2 Player</span>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-6.187 3.52c-.677.385-1.565-.008-1.565-.841V9.153c0-.833.888-1.226 1.565-.841l6.187 3.52a1 1 0 010 1.682z"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Profile Icons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="w-10 h-10 rounded-full bg-gray-500"></div> {/* Replace with actual profile image */}
          <div className="w-10 h-10 rounded-full bg-gray-500"></div> {/* Replace with actual profile image */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
