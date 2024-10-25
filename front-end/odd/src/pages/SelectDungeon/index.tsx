import React from 'react';
import { useNavigate } from 'react-router-dom';
import DungeonTag from '../../components/Dungeon';
import { Dungeon } from '../../middle-end/Dungeon/Dungeon';
import { Game } from '../../middle-end/RuntimeFiles/Game';
import { Player } from '../../middle-end/RuntimeFiles/Player';
import { db } from '../../backend/firebase/firebase_utils';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import PageLayout from '../../components/PageLayout';
import { Hero } from '../../middle-end/Hero/Hero';

const SelectDungeon: React.FC = () => {

  const info = async () => {
    const docRef = doc(db, "users", localStorage.getItem('credentials') ? String(localStorage.getItem('credentials')) : "");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      localStorage.setItem('userdata', data.name)
    } else {
      userName = 'Couldn\'t find display name'
      // docSnap.data() will be undefined in this case
      console.log("No user");
    }
  }
  info();
  let userName = localStorage.getItem('userdata');
  const navigate = useNavigate();
  const playerCount = localStorage.getItem('playerCount')!;
  const reRoute = (playerCount: string, dungeon: string, boss: string) => {
    localStorage.setItem("dungeon", dungeon)
    localStorage.setItem("boss", boss);
    if (localStorage.getItem('characterSelected') as string != ""){
      startGame();
      navigate("/play")
    } else {
      navigate('/selectBuild')
    }
  };

  const startGame = async () => {
    const gameId = localStorage.getItem("gameId");
    const dungeon = Dungeon.getFromBossName(localStorage.getItem("boss"));
    const players = localStorage.getItem("playerCount") === "1P" ? [localStorage.getItem("credentials") || "playerDNE"] : [localStorage.getItem("credentials") || "playerDNE", "fillerID"];
    console.log(players);
    const charactersSelected : Array<string> = [localStorage.getItem("characterSelected") || "Warrior", "Aquamancer"] //need to expand for 2P somehow
    Game.createGame(gameId || undefined, dungeon, players, charactersSelected);
    const gameInstance = Game.getInstance();
    
    // no firestore for rn, just relying on existing game data

    gameInstance.printSetup();
  }

  return (
    <PageLayout>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-80"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-white">
        {/* Username Display */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-500 text-lg px-6 py-3 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105">
          {userName}
        </div>

        {/* Player Options */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full px-4">
          {/* Select Dungeon */}
          {[
            { img: 'Dragon1.jpg', dungeon: 'DragonCave', boss: 'Dragon1' },
            { img: 'Hydra1.jpg', dungeon: 'HydraReef', boss: 'Hydra1' },
            { img: 'Lich1.jpg', dungeon: 'LichTomb', boss: 'Lich1' },
            { img: 'Minotaur1.jpg', dungeon: 'MinotaurMaze', boss: 'Minotaur1' },
            { img: 'Yeti1.jpg', dungeon: 'YetiCavern', boss: 'Yeti1' },
          ].map(({ img, dungeon, boss }, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => reRoute(playerCount, dungeon, boss)}
            >
              <img
                src={img}
                alt={dungeon}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xl font-bold">{dungeon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
export default SelectDungeon