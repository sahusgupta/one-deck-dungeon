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
import { heroes } from '../../backend/mappings';

const PlayPage: React.FC = () => {
  const [gameData, setGameData] = useState<any>(null); // Store game data here
  const [userName, setUserName] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("Error");
  const [modalTitle, setModalTitle] = useState("Error");
  const [chatLog, setChatLog] = useState([])
  const [discardNum, setDiscard] = useState<number>(0);
  const [activeDeck, updateDeck] = useState(["empty", "empty", "empty", "empty"]); //empty means no card, "name-null" means flipped over, "name" is text of encounter
  const yellowDice = ["https://drive.google.com/thumbnail?id=1RUjbXgb1zrhzmoYPRJHqdsaS0asFj7OQ&sz=w1000","https://drive.google.com/thumbnail?id=1ugPUVuORGHQgYy6kn-izilERyBQ75ANT&sz=w1000", "https://drive.google.com/thumbnail?id=1j6g5qu_GjariWl9w9TupE7DeBUWIJs0z&sz=w1000", "https://drive.google.com/thumbnail?id=12BRJ3Eo36JPrXHY1ia0FZq1aaAefXDda&sz=w1000", "https://drive.google.com/thumbnail?id=1q6ZyyyhgmBOX54nOhVV8Sl02Or6fgO-h&sz=w1000","https://drive.google.com/thumbnail?id=1NzQnTTtwFxKxw4DmUkAUch6QZEo0KP2U&sz=w1000"]
  const blueDice = ["https://drive.google.com/thumbnail?id=1NygZkS2sL8dtnTpStxIipgNQnh1rPMrQ&sz=w1000","https://drive.google.com/thumbnail?id=1JqpZte8HBp9S0neVRdE5Gk6B8p7292-B&sz=w1000", "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000", "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000", "https://drive.google.com/thumbnail?id=1lP6_SvegGwqzY7ZCdpdtObGjzt4Isi1F&sz=w1000","https://drive.google.com/thumbnail?id=10dqi-GNHPodNPmiZ0V_IflLdXVVth3Ue&sz=w1000"];
  const blackDice = ["https://drive.google.com/thumbnail?id=1dmxTGOmw6cW6wjsWo1xWhK503xvEW6Wc&sz=w1000","https://drive.google.com/thumbnail?id=1mQC_Bv_m2nx_qdNics6bFDm2cDFevhOo&sz=w1000", "https://drive.google.com/thumbnail?id=16MpNbd-mWyFc4lyre6BdhRUt_1ia-NAr&sz=w1000", "https://drive.google.com/thumbnail?id=1FzGXlI3ae612fxp3PT4sJYkB9mJCYdGx&sz=w1000", "https://drive.google.com/thumbnail?id=1r9v3ftIlrTMuPlcMP2zFdLeLeoxfFp0j&sz=w1000","https://drive.google.com/thumbnail?id=1yfnrTeFMirQWuSMc9r8cowUWDKsNJI_J&sz=w1000"];
  const pinkDice = ["https://drive.google.com/thumbnail?id=17LTXwJjXjN4rFzA0P827J50lvdP7HOMQ&sz=w1000","https://drive.google.com/thumbnail?id=1UK-lCu66p_t_9zTp_PjmQsTLFW4CGv-q&sz=w1000", "https://drive.google.com/thumbnail?id=1mml53cxpKcj8EegETGdBmmHVYwJgsoMi&sz=w1000", "https://drive.google.com/thumbnail?id=1gVxmrRN_Cjc2Aq_whiEzFChsBpmBk8sH&sz=w1000", "https://drive.google.com/thumbnail?id=13VseXMQbnHZf3jnHXOSU4L2yH8AsTy6o&sz=w1000","https://drive.google.com/thumbnail?id=1K2IP4g_GxA5EmkFWUeEAS0B4Df55KkEU&sz=w1000"];
  
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

  const exploreDeck = () => {
    burnCards(2);
    console.log("full deck: " + fullDeck.toLocaleString());
    activeDeck.map((card : string, index : number) => {
      if (card == "empty") {
        activeDeck[index] = fullDeck.splice(fullDeck.length - 1)[0] + "-null";
      }
    })

    updateDeck(activeDeck);
  }

  const activeClick = (index : number) => {
    console.log("got here active deck: " + activeDeck.toLocaleString());
    burnCards(2);
    if (activeDeck[index].includes("null")) {
      activeDeck[index] = activeDeck[index].substring(activeDeck[index].length - 5);
      updateDeck(activeDeck);
    }
  }

  const burnCards = (num : number) => {
    setDiscard(discardNum + num);
    fullDeck.splice(fullDeck.length - num);
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

    function isValidHeroKey(key: string) {
      return key in heroes;
    }

    
    async function handleBeforeUnload(event: Event) {
      if (isValidHeroKey(localStorage.getItem('characterSelected') as string + localStorage.getItem('playerCount') as string)){ 
        let player = new Player(localStorage.getItem('credentials') || '', heroes[localStorage.getItem('') as string]);
        console.log(player)
        await player.saveToStore(event);
      }
    }
    window.onbeforeunload = (event) => {
      handleBeforeUnload(event);
    }
  }, []);

  if (!gameData) {
    return <div>Loading game...</div>; // Fallback if gameData hasn't loaded
  }
  let names: string[] = [];
  const playerCount = localStorage.getItem("PlayerCount") || "1P";
  const level = "1";
  const { deck, dungeon, players } = gameData;
  const fullDeck : string[] = Array.from(deck);
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
                <Dice faces= {yellowDice} onRoll={(value) => console.log(value)} />
                <Dice faces= {blueDice} onRoll={(value) => console.log(value)} />
                  <Dice faces={blackDice} onRoll={(value) => console.log(value)} />
                  <Dice faces={pinkDice} onRoll={(value) => console.log(value)} />
                <p className="mt-2 text-lg">{dungeon}</p>
              </div>
            </div>

            {/* Deck Section */}
            <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-2">Deck - Discard: {discardNum}</h2>
              <div className="flex flex-wrap justify-center">
              {activeDeck.map((card: string, index: number) => (
                  <img
                    key={index}
                    src={card=== "empty" ? "Empty.jpg" : card.includes("null") ? "ClosedDoor.jpg" : `/Encounters/${card}.jpg`}
                    alt={card}
                    className="w-50 h-32 m-1 object-cover rounded-md shadow-lg"
                    onClick={() => activeClick(index)}
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
              <div onClick={exploreDeck}>
              <img
                    src="ClosedDoor.jpg"
                    className="w-50 h-32 m-1 object-cover rounded-md shadow-lg m-auto mt-10"
                  />
              </div>
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
