import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/firebase/firebase_utils';
import { getDoc, doc } from 'firebase/firestore';
import PageLayout from '../../components/PageLayout';

const PlayPage: React.FC = () => {
  const [gameData, setGameData] = useState<any>(null); // Store game data here
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch game data based on gameId from localStorage
    const fetchGameData = async () => {
      const gameId = localStorage.getItem('gameId');
      if (!gameId) return;

      const gameRef = doc(db, 'games', gameId);
      const gameSnap = await getDoc(gameRef);
      if (gameSnap.exists()) {
        setGameData(gameSnap.data());
      } else {
        console.log("No game data found");
      }
    };

    const fetchUserData = async () => {
      const userId = localStorage.getItem('credentials') || '';
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserName(userSnap.data().name);
      }
    };

    fetchGameData();
    fetchUserData();
  }, []);

  if (!gameData) {
    return <div>Loading game...</div>; // Fallback if gameData hasn't loaded
  }
  let names: string[] = [];
  const { deck, dungeon, players } = gameData;
  let playerName1 = ""
  let playerName2 = ""
  const boss = localStorage.getItem("boss") || "Dragon1.jpg"
  const info = async () => {
    let playerIDs: string[] = JSON.parse(localStorage.getItem('players') || '[]');
    let i = 0;
    for (let id of playerIDs){
      if (id != ""){
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let data = docSnap.data();
          console.log("Player name:", data.name)
          if(i ==0){
            playerName1 = data.name;
            i++;
          }
          else{
            playerName2 = data.name;
          }
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No user");
        }
      } else {
        throw new Error('No players found')
      }
    }
  }
  info();
  console.log(playerName2)
  console.log(playerName1)
  return (
    <PageLayout>
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto">
          {/* Game Title and Player Info */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Game: {gameData.gameId}</h1>
            <div className="text-xl">
              Player: <span className="font-semibold">{userName || 'Unknown'}</span>
            </div>
          </div>

          {/* Game Content Section */}
          <div className="mt-8 grid grid-cols-3 gap-6">
            {/* Boss Section */}
            <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-2">Boss</h2>
              <div className="flex flex-col items-center">
                <img
                  src={`/${boss}.jpg`}
                  alt={boss}
                  className="w-48 h-48 object-contain rounded-md"
                />
              </div>
            </div>

            {/* Dungeon Section */}
            <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-2">Dungeon</h2>
              <div className="flex flex-col items-center">
                <img
                  src={`/${dungeon}.jpg`}
                  alt={dungeon}
                  className="w-48 h-48 object-contain rounded-md"
                />
                <p className="mt-2 text-lg">{dungeon}</p>
              </div>
            </div>

            {/* Deck Section */}
            <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-2">Deck</h2>
              <div className="flex flex-wrap justify-center">
                {deck.split(', ').map((card: string, index: number) => (
                  <img
                    key={index}
                    src={`/Encounters/${card}.jpg`}
                    alt={card}
                    className="w-20 h-32 m-1 object-cover rounded-md shadow-lg"
                  />
                ))}
              </div>
            </div>
          </div>
          info
          {/* Players Section */}
          <div className="mt-8 bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Players</h2>
            <div className="grid grid-cols-2 gap-4">
              {players.map((playerId: string, index: number) => (
                <div key={index} className="p-4 bg-gray-700 rounded-lg text-center">
                  <p className="text-lg font-semibold">Player {index + 1}</p>
                  <p className="text-lg font-semibold"> Name: {playerName1}</p>
                  <p className="text-sm text-gray-400">{playerId}</p>
                </div>
              ))}
            </div>
          </div>


          <div className="flex justify-center mt-8">
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PlayPage;
