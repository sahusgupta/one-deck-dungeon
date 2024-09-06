import React from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import PlayerCard from '../../components/PlayerCard';

const SelectPlayerPage: React.FC = () => {
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
        {/* Username Input */}
        <div className="bg-black bg-opacity-70 text-lg px-4 py-2 rounded-md text-center focus:outline-none"> {userName} </div>

        {/* Player Options */}
        <div className="flex space-x-4 w-250">
          {/* Select Char */}
          <PlayerCard
            imgURL='Aquamancer1P.jpg'
            onClick={() => reRoute("one-player")}
            />
            <PlayerCard
            imgURL='Archer1P.jpg'
            onClick={() => reRoute("one-player")}
            />
            <PlayerCard
            imgURL='Dragoon1P.jpg'
            onClick={() => reRoute("one-player")}
            />
            <PlayerCard
            imgURL='Mage1P.jpg'
            onClick={() => reRoute("one-player")}
            />
            <PlayerCard
            imgURL='Paladin1P.jpg'
            onClick={() => reRoute("one-player")}
            />
            <PlayerCard
            imgURL='Rogue1P.jpg'
            onClick={() => reRoute("one-player")}
            />
            <PlayerCard
            imgURL='Warrior1P.jpg'
            onClick={() => reRoute("one-player")}
            />
            <PlayerCard
            imgURL='Witch1P.jpg'
            onClick={() => reRoute("one-player")}
            />
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

export default SelectPlayerPage;
