import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../backend/firebase/firebase_utils";
import { getDoc, doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import PageLayout from "../../components/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import ChatModal from "../../components/Modals/chatModal";
import { Player } from "../../middle-end/RuntimeFiles/Player";
import { Hero } from "../../middle-end/Hero/Hero";
import Dice from "react-dice-roll";
import { heroes } from "../../backend/mappings";
import { Game } from "../../middle-end/RuntimeFiles/Game";
import { Encounter } from "../../middle-end/Encounter/Encounter";
import { Util } from "../../middle-end/Util/Util";
import EncounterModal from "../../components/Modals/encounterModal";
import { encounters } from "../../backend/mappings";
import { HiChevronDoubleRight, HiChevronLeft } from "react-icons/hi";
import EncounterCard from "../../components/Encounter";

const PlayPage: React.FC = () => {
  const [gameData, setGameData] = useState<any>(null); // Store game data here
  const [userName, setUserName] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("Error");
  const [modalTitle, setModalTitle] = useState("Error");
  const [chatLog, setChatLog] = useState([]);
  const [discardNum, setDiscard] = useState<number>(0);
  const [isEncounterModalOpen, setEncounterModalOpen] = useState(false);
  const [isEncounterFacing, setEncounterFacing] = useState(false);
  const yellowDice = ["https://drive.google.com/thumbnail?id=1RUjbXgb1zrhzmoYPRJHqdsaS0asFj7OQ&sz=w1000","https://drive.google.com/thumbnail?id=1ugPUVuORGHQgYy6kn-izilERyBQ75ANT&sz=w1000", "https://drive.google.com/thumbnail?id=1j6g5qu_GjariWl9w9TupE7DeBUWIJs0z&sz=w1000", "https://drive.google.com/thumbnail?id=12BRJ3Eo36JPrXHY1ia0FZq1aaAefXDda&sz=w1000", "https://drive.google.com/thumbnail?id=1q6ZyyyhgmBOX54nOhVV8Sl02Or6fgO-h&sz=w1000","https://drive.google.com/thumbnail?id=1NzQnTTtwFxKxw4DmUkAUch6QZEo0KP2U&sz=w1000"]
  const blueDice = ["https://drive.google.com/thumbnail?id=1NygZkS2sL8dtnTpStxIipgNQnh1rPMrQ&sz=w1000","https://drive.google.com/thumbnail?id=1JqpZte8HBp9S0neVRdE5Gk6B8p7292-B&sz=w1000", "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000", "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000", "https://drive.google.com/thumbnail?id=1lP6_SvegGwqzY7ZCdpdtObGjzt4Isi1F&sz=w1000","https://drive.google.com/thumbnail?id=10dqi-GNHPodNPmiZ0V_IflLdXVVth3Ue&sz=w1000"];
  const blackDice = ["https://drive.google.com/thumbnail?id=1dmxTGOmw6cW6wjsWo1xWhK503xvEW6Wc&sz=w1000","https://drive.google.com/thumbnail?id=1mQC_Bv_m2nx_qdNics6bFDm2cDFevhOo&sz=w1000", "https://drive.google.com/thumbnail?id=16MpNbd-mWyFc4lyre6BdhRUt_1ia-NAr&sz=w1000", "https://drive.google.com/thumbnail?id=1FzGXlI3ae612fxp3PT4sJYkB9mJCYdGx&sz=w1000", "https://drive.google.com/thumbnail?id=1r9v3ftIlrTMuPlcMP2zFdLeLeoxfFp0j&sz=w1000","https://drive.google.com/thumbnail?id=1yfnrTeFMirQWuSMc9r8cowUWDKsNJI_J&sz=w1000"];
  const pinkDice = ["https://drive.google.com/thumbnail?id=17LTXwJjXjN4rFzA0P827J50lvdP7HOMQ&sz=w1000","https://drive.google.com/thumbnail?id=1UK-lCu66p_t_9zTp_PjmQsTLFW4CGv-q&sz=w1000", "https://drive.google.com/thumbnail?id=1mml53cxpKcj8EegETGdBmmHVYwJgsoMi&sz=w1000", "https://drive.google.com/thumbnail?id=1gVxmrRN_Cjc2Aq_whiEzFChsBpmBk8sH&sz=w1000", "https://drive.google.com/thumbnail?id=13VseXMQbnHZf3jnHXOSU4L2yH8AsTy6o&sz=w1000","https://drive.google.com/thumbnail?id=1K2IP4g_GxA5EmkFWUeEAS0B4Df55KkEU&sz=w1000"];
  const yellowDiceAmount  = 3; 
  const blueDiceAmount = 4; 
  const blackDiceAmount = 0;
  const pinkDiceAmount = 2;
  let [activeEncounter, updateActiveEncounter] = useState<Encounter | null>(null);
  let [turn, setTurn] = useState(false);  
  const [fullDeck, setFullDeck] = useState<Encounter[]>([]);
  const [workspace, updateWorkspace] = useState(
    new Array<[Encounter, boolean]>(
      [Encounter.EmptyEncounter, false],
      [Encounter.EmptyEncounter, false],
      [Encounter.EmptyEncounter, false],
      [Encounter.EmptyEncounter, false]
    )
  );
  // console.log(workspace)
  useEffect(() => {
    const gameId = localStorage.getItem("gameId") || "1234";
    const gameRef = doc(db, "games", gameId);
    const unsubscribe = onSnapshot(gameRef, (gameSnap) => {
      if (gameSnap.exists()) {
        const gameData = gameSnap.data();
        if (gameData.chatLog) {
          setChatLog(gameData.chatLog);
          // console.log(chatLog);
          }
          if(gameData){
            const activeDeck = gameData.activeDeck;
            for(let i = 0; i < activeDeck.length; i++){
              const stringRep = activeDeck[i].split("-");
              // console.log(stringRep);
              const mob = encounters[stringRep[0]]()
              var mobBoolean = JSON.parse(stringRep[1])
              workspace[i] = [mob, mobBoolean];
              // console.log(mob)
            }
            updateWorkspace(workspace)
          }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const updateActiveDeck = async () => {
    const gameId = localStorage.getItem("gameId") || "1234";
    const gameRef = doc(db, "games", gameId);
    const gameSnap = await getDoc(gameRef);
    if (gameSnap.exists()) {
      const gamedata = gameSnap.data();
      // console.log(gamedata);
      if (gamedata) {
        let arr: string[] = new Array<string>();
        for(let i = 0; i < workspace.length;i++ ){
          arr.push(workspace[i][0].name + "-" + workspace[i][1])
        }
        await updateDoc(doc(db, 'games', gameId),{
          activeDeck: arr
        })
      } else {
        
      }
    } else {
      console.log("No game data found");
    }
    updateWorkspace(workspace);
  }

  const isTwoPlayer = localStorage.getItem("playerCount");
  const onDefeat = () => {
    setEncounterFacing(false);
  }
  const twoPlayerBool = isTwoPlayer === "2P";
  const closeModal = () => {
    setModalOpen(false);
  };
  const encounterStay = () => {
    activeEncounter = null;
    setEncounterModalOpen(false);
  }
  const encounterAccepted = () => {
    //insert functionality to create the encounter
    workspace.map((a : [Encounter, boolean], index : number) => {
      // console.log(a[0].name);
      // console.log(activeEncounter?.name + " -active");
      if (activeEncounter?.name == a[0].name) {
        setEncounterFacing(true);
        workspace[index][0] = Encounter.EmptyEncounter;
        workspace[index][1] = false;
      }
    });
    activeEncounter = null;
    updateWorkspace(workspace);
    updateActiveDeck();
    setEncounterModalOpen(false);
  }
  const submitChat = async (inputText: string) => {
    const gameId = localStorage.getItem("gameId") || "1234";
    const gameRef = doc(db, "games", gameId);
    const gameSnap = await getDoc(gameRef);
    if (gameSnap.exists()) {
      const gamedata = gameSnap.data();
      if (gamedata.chatLog) {
        const chatLog = gamedata.chatLog;
        chatLog.push(
          (localStorage.getItem("userdata") || "undefined user") +
            ": " +
            inputText
        );
        await updateDoc(doc(db, "games", gameId), {
          chatLog: chatLog,
        });
      } else {
        const chatLog = [
          (localStorage.getItem("userdata") || "undefined user") +
            ": " +
            inputText,
        ];
        await updateDoc(doc(db, "games", gameId), {
          chatLog: chatLog,
        });
      }
    } else {
      console.log("No game data found");
    }
  };

  const exploreDeck = async () => {
    let hasEmpty : boolean = false;
    workspace.forEach((w: [Encounter, boolean]) => {
      if (w[0].name == Encounter.EmptyEncounter.name) {
        hasEmpty = true;
      }
    })

    if (!hasEmpty) {
      return;
    }

    burnCards(2, true);

    workspace.map((encounterOptional: [Encounter, boolean], index: number) => {
      if (!encounterOptional[1]) {
        encounterOptional[0] = burnCards(1, false)[0];
        encounterOptional[1] = false;
      }
    })
    console.log("test workspace print");
    console.log(workspace);
    const gameId = localStorage.getItem("gameId") || "1234";
    const gameRef = doc(db, "games", gameId);
    const gameSnap = await getDoc(gameRef);
    if (gameSnap.exists()) {
      const gameData = gameSnap.data();
      if (gameData) {
        let arr: string[] = new Array<string>();
        for(let i = 0; i < workspace.length;i++ ){
          arr.push(workspace[i][0].name + "-" + workspace[i][1])
        }
        console.log(arr)
        await updateDoc(doc(db, 'games', gameId),{
          activeDeck: arr,
          deck: fullDeck.map(card => card.name).join(", ")
        })
      } else {
        
      }

    } else {
      console.log("No game data found");
    }
    updateWorkspace(workspace);
    // console.log(workspace)
    updateActiveDeck();
  };

  const activeClick = (index: number) => {
    if (!workspace[index][1] && workspace[index][0] != Encounter.EmptyEncounter) {
      workspace[index][1] = true; //cards active now
      burnCards(2, true);
    }

    if (workspace[index][0] == Encounter.EmptyEncounter || !workspace[index][1]) {
      activeEncounter = null;
    } else {
      activeEncounter = workspace[index][0];
      setEncounterModalOpen(true);
    }
    updateActiveEncounter(activeEncounter);
    updateWorkspace(workspace);
    // console.log(workspace)
    updateActiveDeck();
  };

  const burnCards = (num: number, updateDiscard : boolean) : Encounter[] => {
    if (updateDiscard) {
      setDiscard(discardNum + num);
    }
    let ret : Encounter[] = fullDeck.splice(fullDeck.length - num);

    const gameId = localStorage.getItem("gameId");
    if (gameId) {
      updateDoc(doc(db, "games", gameId), {
        deck: fullDeck.map(card => card.name).join(", ")
      });
    } else {
      console.error("gameId is null");
    }
    return ret;
  };

  const showChat = async (gameId: string, title: string, message: string) => {
    setModalTitle(title);
    setModalContent(message);
    setModalOpen(true);
    const gameRef = doc(db, "games", gameId);
    const gameSnap = await getDoc(gameRef);
    if (gameSnap.exists()) {
      const gamedata = gameSnap.data();
      // console.log(gamedata);
      // console.log(gamedata.boss);
    } else {
      console.log("No game data found");
    }
  };
  useEffect(() => {
    // Fetch game data based on gameId from localStorage
    const fetchGameData = async () => {
      const gameId = localStorage.getItem("gameId");
      if (!gameId) return;

      const gameRef = doc(db, "games", gameId);
      const gameSnap = await getDoc(gameRef);
      if (gameSnap.exists()) {
        setGameData(gameSnap.data());
      } else {
        console.log("No game data found");
      }
    };

    const fetchUserData = async () => {
      const userId = localStorage.getItem("credentials") || "";
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserName(userSnap.data().name);
      }
    };

    fetchGameData();
    fetchUserData();
    let heroKey =
      (localStorage.getItem("characterSelected") || "") +
      (localStorage.getItem("playerCount") || "");

    function isValidHeroKey(key: string) {
      return key in heroes;
    }

    async function handleBeforeUnload(event: Event) {
      if (
        isValidHeroKey(
          ((localStorage.getItem("characterSelected") as string) +
            localStorage.getItem("playerCount")) as string
        )
      ) {
        let player = new Player(
          localStorage.getItem("credentials") || "",
          heroes[localStorage.getItem("heroName") as string]()
        );
        // console.log(player);
        await player.saveToStore(event);
      }
    }
    
  }, [turn]);

  if (!gameData) {
    return <div>Loading game...</div>; // Fallback if gameData hasn't loaded
  }
  let names: string[] = [];
  const playerCount = localStorage.getItem("PlayerCount") || "1P";
  const level = "1";
  const { deck, dungeon, players } = gameData;
  const acquiredDeck: Encounter[] = Encounter.returnEncounterDeck(Util.parseArrayAsStrings(deck));
  if (fullDeck.length == 0) {
    acquiredDeck.forEach(card => {
      fullDeck.push(card);
    });
  }
  // console.log(fullDeck.toLocaleString());
  let playerName1 = "";
  let playerName2 = "";
  const boss = localStorage.getItem("boss") || "Dragon1.jpg";

  const info = async () => {
    let playerIDs: string[] = JSON.parse(
      localStorage.getItem("players") || "[]"
    );
    let i = 0;
    for (let id of playerIDs) {
      if (id != "") {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let data = docSnap.data();
          // console.log("Player name:", data.name);
          if (i == 0) {
            playerName1 = data.name;
            i++;
          } else {
            playerName2 = data.name;
          }
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No user");
        }
      } else {
        throw new Error("No players found");
      }
    }
  };
  info();

  let exit = () => {
    let gameInfo = ['boss', 'characterSelected', 'dungeon', 'gameId', 'playerCount']
    for (let key in gameInfo){
      localStorage.removeItem(key);
    }
  }
  return (
    <PageLayout>
      <div className="p-6 bg-gray-900 text-white min-h-screen">
          <button className="w-10 h-10 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80" onClick={() =>exit()}>
            <span className="text-xl font-bold">Exit</span>
          </button>
        <div className="container mx-auto">
          {/* Game Title and Player Info */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Game: {gameData.gameId}</h1>
            <div className="text-xl">
              Player:{" "}
              <span className="font-semibold">{userName || "Unknown"}</span>
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
            {twoPlayerBool && (
              <div className="fixed left-0 top-50 h-3/4 w-1/4 bg-gray-800 p-4 shadow-md">
                <h2 className="text-xl font-bold mb-4">Chat</h2>
                <div className="flex flex-col h-3/4 overflow-y-scroll bg-gray-700 p-2 rounded-md shadow-inner">
                  {chatLog.map((message, index) => (
                    <div key={index} className="text-sm text-gray-200 mb-2">
                      {message}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Dice Section */}
            <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-2">Dice</h2>
              <div className="flex flex-col items-center">
                <div className="flex space-x-2">
              {Array.from({length:yellowDiceAmount}, (_, index) => (
                    <Dice key={index} size={50} faces= {yellowDice} onRoll={(value:number) => console.log(value)} />
                  ))}
                  </div>
                  <div className="flex space-x-2">
                  {Array.from({length:blueDiceAmount}, (_, index) => (
                    <Dice key={index} size={50} faces= {blueDice} onRoll={(value:number) => console.log(value)} />
                  ))}
                  </div>
                  <div className="flex space-x-2">
                  {Array.from({length:blackDiceAmount}, (_, index) => (
                    <Dice key={index} size={50} faces= {blackDice} onRoll={(value:number) => console.log(value)} />
                  ))} 
                  </div>
                  <div className="flex space-x-2">
                  {Array.from({length:pinkDiceAmount}, (_, index) => (
                    <Dice key={index} size={50} faces= {pinkDice} onRoll={(value:number) => console.log(value)} />
                  ))}
                  </div>
                <p className="mt-2 text-lg">{dungeon}</p>
              </div>
            </div>
            {/* Deck Section */}
            <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-2">
                Deck - Discard: {discardNum}
              </h2>
              <div className="flex flex-wrap justify-center">
                {workspace.map((encounterOptional: [Encounter, boolean], index: number) => (
                  <img
                    key={index}
                    src={
                      encounterOptional[1]
                        ? `/Encounters/${encounterOptional[0].name}.jpg`
                        : encounterOptional[0].name == Encounter.EmptyEncounter.name
                        ? "Empty.jpg"
                        : "ClosedDoor.jpg"
                    }
                    alt=""
                    className="w-50 h-32 m-1 object-cover rounded-md shadow-lg"
                    onClick={() => activeClick(index)}
                  />
                ))}
              </div>
              <div onClick={exploreDeck}>
                <img
                  src="ClosedDoor.jpg"
                  className="w-50 h-32 m-1 object-cover rounded-md shadow-lg m-auto mt-10"
                />
              </div>
            </div>
            {/* Players Section */}
            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-4">Players</h2>
              <div className="grid grid-cols-2 gap-4">
                {players.map((playerId: string, index: number) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-700 rounded-lg text-center"
                  >
                    <p className="text-lg font-semibold">Player {index + 1}</p>
                    <p className="text-lg font-semibold">
                      {" "}
                      Name: {playerName1}
                    </p>
                    <p className="text-sm text-gray-400">{playerId}</p>
                  </div>
                ))}
              </div>
            </div>
            {isEncounterFacing && (
              <EncounterCard
              encounter={activeEncounter || workspace[0][0]}
              onClick= {() => console.log("running the encounter")}
              onDefeat={() => onDefeat()}
              yellowDiceAmount
              blueDiceAmount
              blackDiceAmount 
              pinkDiceAmount
              />
            )

            }
            {twoPlayerBool && (
              <div
                onClick={() =>
                  showChat(
                    localStorage.getItem("gameId") || "1234",
                    "Chat",
                    "Enter your message here:"
                  )
                }
              >~~
                <FontAwesomeIcon icon={faComment} size="5x" />
              </div>
            )}
            {isModalOpen && (
              <ChatModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={modalTitle}
                content={modalContent}
                onAction={submitChat}
                actionLabel="Submit"
              />
            )}
            {isEncounterModalOpen &&(
              <EncounterModal
              isOpen={isEncounterModalOpen}
              onClose={encounterStay}
                title={"You have encountered"}
                content={activeEncounter? Util.convertEncounterNameToShowName(activeEncounter.name) : "NULL ENCOUNTER ERROR"}
                onAction={encounterAccepted}
                actionLabel="Encounter"
              />
            )}
            <div className="flex justify-center mt-8"></div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PlayPage;