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
    const charactersSelected : Array<string> = [localStorage.getItem("characterSelected") || "Warrior", "Aquamancer"] //need to expand for 2P somehow
    Game.createGame(gameId, dungeon, players, charactersSelected);
    const gameInstance = Game.getInstance();
    
    // no firestore for rn, just relying on existing game data

    gameInstance.printSetup();
  }

  return (
    <PageLayout>
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
            onClick={() => reRoute(playerCount, "DragonCave", "Dragon1")}
          />
          <DungeonTag
            imgURL='Hydra1.jpg'
            onClick={() => reRoute(playerCount, "HydraReef", "Hydra1")}
          />
          <DungeonTag
            imgURL='Lich1.jpg'
            onClick={() => reRoute(playerCount, "LichTomb", "Lich1")}
          />
          <DungeonTag
            imgURL='Minotaur1.jpg'
            onClick={() => reRoute(playerCount, "MinotaurMaze", "Minotaur1")}
          />
          <DungeonTag
            imgURL='Yeti1.jpg'
            onClick={() => reRoute(playerCount, "YetiCavern", "Yeti1")}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default SelectDungeon