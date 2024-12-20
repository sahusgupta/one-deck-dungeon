import React from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import PlayerCard from '../../components/PlayerCard';
import { db } from '../../backend/firebase/firebase_utils';
import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import PageLayout from '../../components/PageLayout';
import { heroes as h } from '../../backend/mappings';
import { Dungeon } from '../../middle-end/Dungeon/Dungeon';
import { Game } from '../../middle-end/RuntimeFiles/Game';
const SelectPlayerPage: React.FC = () => {
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
  const startGame = async () => {
    const gameId = localStorage.getItem("gameId");
    const dungeon = Dungeon.getFromBossName(localStorage.getItem("boss"));
    const players = localStorage.getItem("playerCount") === "1P" ? [localStorage.getItem("credentials") || "playerDNE"] : [localStorage.getItem("credentials") || "playerDNE", "fillerID"];
    const charactersSelected : Array<string> = [localStorage.getItem("characterSelected") || "Warrior", "Aquamancer"] //need to expand for 2P somehow
    Game.createGame(gameId || undefined, dungeon, players, charactersSelected);
    const gameInstance = Game.getInstance();
    
    // no firestore for rn, just relying on existing game data

    gameInstance.printSetup();
  }
  let userName = localStorage.getItem('userdata');
  const navigate = useNavigate();
  const nextUrl = "/dungeon-select";
  const reRoute = async (characterSelected: string) => {
    localStorage.setItem('characterSelected', characterSelected)
    // startGame();
    navigate(nextUrl)
  };
  
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
          <PlayerCard
            imgURL='Characters/Aquamancer1P.jpg'
            onClick={() => reRoute("Aquamancer")}
            />
            <PlayerCard
            imgURL='Characters/Archer1P.jpg'
            onClick={() => reRoute("Archer")}
            />
            <PlayerCard
            imgURL='Characters/Dragoon1P.jpg'
            onClick={() => reRoute("Dragoon")}
            />
            <PlayerCard
            imgURL='Characters/Mage1P.jpg'
            onClick={() => reRoute("Mage")}
            />
            <PlayerCard
            imgURL='Characters/Paladin1P.jpg'
            onClick={() => reRoute("Paladin")}
            />
            <PlayerCard
            imgURL='Characters/Rogue1P.jpg'
            onClick={() => reRoute("Rogue")}
            />
            <PlayerCard
            imgURL='Characters/Warrior1P.jpg'
            onClick={() => reRoute("Warrior")}
            />
            <PlayerCard
            imgURL='Characters/Witch1P.jpg'
            onClick={() => reRoute("Witch")}
            />
        </div>

      </div>
    </PageLayout>
  );
};

export default SelectPlayerPage;
