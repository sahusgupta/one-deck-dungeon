import React from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/firebase/firebase_utils';

const PlayPage: React.FC = () => {
  const userName = "Daniel Rupawalla" //pull from db
  const navigate = useNavigate();
  const reRoute = (playerCount: string) => {
    console.log(playerCount);
    const url = "/" + playerCount;
    navigate(url)
  };
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("dragonwallpaper.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-white">
        </div>
    </div>
  );
};

export default PlayPage;
