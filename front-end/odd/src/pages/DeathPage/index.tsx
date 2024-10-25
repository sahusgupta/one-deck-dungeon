import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import { HiOutlineRefresh, HiHome } from 'react-icons/hi';

const DeathScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate('/homepage'); // Restart game route
  };

  const handleHome = () => {
    navigate('/homepage'); // Navigate back to home
  };

  return (
    <PageLayout>
      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-black opacity-80"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-white">
        {/* Death Message */}
        <div className="bg-black bg-opacity-70 px-8 py-4 rounded-md text-center text-2xl font-bold animate-pulse">
          Game Over
        </div>

        {/* Options */}
        <div className="flex space-x-8">
          {/* Restart Button */}
          <button
            className="w-48 h-48 bg-black bg-opacity-70 flex flex-col items-center justify-center rounded-lg space-y-2 hover:bg-opacity-80 transform transition-transform duration-300 hover:scale-105"
            onClick={handleRestart}
          >
            <span className="text-xl font-bold">Restart</span>
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center">
              <HiOutlineRefresh size="24px" />
            </div>
          </button>

          {/* Home Button */}
          <button
            className="w-48 h-48 bg-black bg-opacity-70 flex flex-col items-center justify-center rounded-lg space-y-2 hover:bg-opacity-80 transform transition-transform duration-300 hover:scale-105"
            onClick={handleHome}
          >
            <span className="text-xl font-bold">Home</span>
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center">
              <HiHome size="24px" />
            </div>
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default DeathScreen;
