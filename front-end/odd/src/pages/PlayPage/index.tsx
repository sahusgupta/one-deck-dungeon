import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/firebase/firebase_utils';
import { getDoc, doc, setDoc,updateDoc, onSnapshot } from 'firebase/firestore';
import PageLayout from '../../components/PageLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons'; 
import ChatModal from '../../components/Modals/chatModal';
import { Player } from '../../middle-end/RuntimeFiles/Player';
import { Hero } from '../../middle-end/Hero/Hero';
import Dice from 'react-dice-roll';

const PlayPage: React.FC = () => {
  const [gameData, setGameData] = useState<any>(null); // Store game data here
  const [userName, setUserName] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("Error");
  const [modalTitle, setModalTitle] = useState("Error");
  const [chatLog, setChatLog] = useState([])
  
  useEffect(  ()=> {
    const gameId = localStorage.getItem("gameId") || "1234";
    const gameRef = doc(db, 'games', gameId);
    const unsubscribe = onSnapshot(gameRef, (gameSnap) => {
      if(gameSnap.exists()){
        const gameData = gameSnap.data();
        if(gameData.chatLog){
          setChatLog(gameData.chatLog);
          console.log(chatLog)
        }
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);
  const navigate = useNavigate();
  const isTwoPlayer = localStorage.getItem("playerCount")
  const twoPlayerBool = (isTwoPlayer === "2P")
  const closeModal = () => {
    setModalOpen(false);
  };
  const submitChat = async (inputText:string) => {
    const gameId = localStorage.getItem("gameId") || "1234";
    const gameRef = doc(db, 'games', gameId);
    const gameSnap = await getDoc(gameRef);
    if (gameSnap.exists()) {
      const gamedata = gameSnap.data();
      console.log(gamedata.chatLog)
      if(gamedata.chatLog){
        console.log("accessing exists")
        const chatLog = gamedata.chatLog
        console.log(chatLog)
        chatLog.push((localStorage.getItem("userdata") || "undefined user")+ ": " + inputText)
        console.log(chatLog)      
        await updateDoc(doc(db, "games", gameId), {
        chatLog: chatLog
      });
      }
      else{
        const chatLog = [(localStorage.getItem("userdata") || "undefined user")+ ": " +inputText]
        await updateDoc(doc(db, "games", gameId), {
          chatLog: chatLog
        });
      }

    } else {
      console.log("No game data found");
    }
    

  }
  const showChat = async (gameId: string, title: string, message: string) => {
    setModalTitle(title);
    setModalContent(message);
    setModalOpen(true);
    const gameRef = doc(db, 'games', gameId);
      const gameSnap = await getDoc(gameRef);
      if (gameSnap.exists()) {
        const gamedata = gameSnap.data();
        console.log(gamedata)
        console.log(gamedata.boss)
      } else {
        console.log("No game data found");
      }
  }
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
    let heroKey = (localStorage.getItem('characterSelected') || '') + (localStorage.getItem('playerCount') || '');

    function isValidHeroKey(key: string): key is keyof typeof Hero {
      return key in Hero;
    }

    let hero = isValidHeroKey(heroKey) ? Hero[heroKey] : null;
    function handleBeforeUnload() {
       // let player = new Player(localStorage.getItem('credentials') || '', new Hero(new Skill(null), null, null, null, null, null)) 
      // return player;
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (!gameData) {
    return <div>Loading game...</div>; // Fallback if gameData hasn't loaded
  }
  let names: string[] = [];
  const playerCount = localStorage.getItem("PlayerCount") || "1P";
  const level = "1";
  let activeDeck: string[] = ["null", "null", "null", "null"];
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
              <h2 className="text-2xl font-bold mb-2">Information</h2>
              <div className="flex flex-col items-center">
                <img
                  src={`/${dungeon}.jpg`}
                  alt={dungeon}
                  className="w-48 h-48 object-contain rounded-md"
                />
                <img 
                src={`/Leveling/Level${level}-${playerCount}.jpg`}
                alt={level}
                className="w-48 h-48 object-contain rounded-md"
                />
              </div>
            </div>

            {/* Chat Section */}

            {twoPlayerBool &&   
            <div className="fixed left-0 top-50 h-3/4 w-1/4 bg-gray-800 p-4 shadow-md">
              <h2 className="text-xl font-bold mb-4">Chat</h2>
              <div className="flex flex-col h-3/4 overflow-y-scroll bg-gray-700 p-2 rounded-md shadow-inner">{chatLog.map((message, index) => (<div key={index} className="text-sm text-gray-200 mb-2">
                {message}
              </div>))}
              </div>
            </div>
            }
            {/* Dungeon Section */}
            <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-2">Dice</h2>
              <div className="flex flex-col items-center">
                <Dice faces= {["https://drive.google.com/thumbnail?id=1RUjbXgb1zrhzmoYPRJHqdsaS0asFj7OQ&sz=w1000"]} onRoll={(value) => console.log(value)} />
                <p className="mt-2 text-lg">{dungeon}</p>
              </div>
            </div>

            {/* Deck Section */}
            <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-2">Deck</h2>
              <div className="flex flex-wrap justify-center">
              {activeDeck.map((card: string, index: number) => (
                  <img
                    key={index}
                    src={card=== "null" ? "ClosedDoor.jpg" : `/Encounters/${card}.jpg`}
                    alt={card}
                    className="w-50 h-32 m-1 object-cover rounded-md shadow-lg"
                  />
                ))}
              </div>
              {false &&
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
              }
               <img
                    src="ClosedDoor.jpg"
                    className="w-50 h-32 m-1 object-cover rounded-md shadow-lg m-auto mt-10"
                  />
          </div>
          info
          {/* Players Section */}
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
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
          {twoPlayerBool && <div onClick={() => showChat(localStorage.getItem("gameId")|| "1234", "Chat", "Enter your message here:")} >
            <FontAwesomeIcon icon={faComment} size="5x" />
          </div>
          }
          {isModalOpen && <ChatModal
           isOpen={isModalOpen}
           onClose={closeModal}
           title={modalTitle}
           content={modalContent}
           onAction={submitChat}
           actionLabel = "Submit"/>

          }
          <div className="flex justify-center mt-8">
          </div>
        </div>
      </div>
      </div>
    </PageLayout>
  );
};

export default PlayPage;
