import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dungeon from '../../components/Dungeon';
const SelectDungeon: React.FC = () => {

    const userName = "Daniel Rupawalla" //pull from db
    const navigate = useNavigate();
    const playerUrl = localStorage.getItem('playerCount')!;
    const reRoute = (playerCount: string, dungeon: string) => {
      console.log(playerCount);
      localStorage.setItem("dungeon", dungeon)
      const url = "/play";
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
          <Dungeon
            imgURL='Dragon1.jpg'
            onClick={() => reRoute(playerUrl, "dragon")}
            />
            <Dungeon
            imgURL='Hydra1.jpg'
            onClick={() => reRoute(playerUrl, "hydra")}
            />
            <Dungeon
            imgURL='Lich1.jpg'
            onClick={() => reRoute(playerUrl, "lich")}
            />
            <Dungeon
            imgURL='Minotaur1.jpg'
            onClick={() => reRoute(playerUrl, "minotaur")}
            />
            <Dungeon
            imgURL='Yeti1.jpg'
            onClick={() => reRoute(playerUrl, "yeti")}
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
export default SelectDungeon