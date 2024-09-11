import React from 'react';
import { useNavigate } from 'react-router-dom';
import DungeonTag from '../../components/Dungeon';
import { Dungeon } from '../../middle-end/Dungeon/Dungeon';
import { Game } from '../../middle-end/RuntimeFiles/Game';
import { Player } from '../../middle-end/RuntimeFiles/Player';
const SelectDungeon: React.FC = () => {

  const userName = "Daniel Rupawalla" //pull from db
  const navigate = useNavigate();
  const playerUrl = localStorage.getItem('playerCount')!;
  const reRoute = (playerCount: string, dungeon: string) => {
    console.log(playerCount);
    localStorage.setItem("dungeon", dungeon)
    const url = "/" + playerCount;
    navigate(url)
  };

  const startGame = () => {
    let game = new Game("testId", Dungeon.getFromBossName(localStorage.getItem("dungeon")), ["testId, testId"], localStorage.getItem("playerCount") == "1P" ? 1 : 2);
  }

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
          <DungeonTag
            imgURL='Dragon1.jpg'
            onClick={() => reRoute(playerUrl, "Dragon1")}
            />
            <DungeonTag
            imgURL='Hydra1.jpg'
            onClick={() => reRoute(playerUrl, "Hydra1")}
            />
            <DungeonTag
            imgURL='Lich1.jpg'
            onClick={() => reRoute(playerUrl, "Lich1")}
            />
            <DungeonTag
            imgURL='Minotaur1.jpg'
            onClick={() => reRoute(playerUrl, "Minotaur1")}
            />
            <DungeonTag
            imgURL='Yeti1.jpg'
            onClick={() => reRoute(playerUrl, "Yeti1")}
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