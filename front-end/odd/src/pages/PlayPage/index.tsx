import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../backend/firebase/firebase_utils";
import { getDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import PageLayout from "../../components/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import ChatModal from "../../components/Modals/chatModal";
import { Hero } from "../../middle-end/Hero/Hero";
import Dice from "react-dice-roll";
import { encounters } from "../../backend/mappings";
import { Encounter } from "../../middle-end/Encounter/Encounter";
import { Util } from "../../middle-end/Util/Util";
import EncounterModal from "../../components/Modals/encounterModal";
import EncounterCard from "../../components/Encounter";

const PlayPage: React.FC = () => {
  const [gameData, setGameData] = useState<any>(null);
  const [hero, setActiveHero] = useState<Hero | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [discardNum, setDiscard] = useState<number>(0);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("Error");
  const [modalTitle, setModalTitle] = useState<string>("Error");
  const [isEncounterModalOpen, setEncounterModalOpen] = useState<boolean>(false);
  const [isEncounterFacing, setEncounterFacing] = useState<boolean>(false);
  const [yellowDiceAmount, setYellowDiceAmount] = useState<number>(0);
  const [blueDiceAmount, setBlueDiceAmount] = useState<number>(0);
  const [blackDiceAmount, setBlackDiceAmount] = useState<number>(0);
  const [pinkDiceAmount, setPinkDiceAmount] = useState<number>(0);
  const [fullDeck, setFullDeck] = useState<Encounter[]>([]);
  const [activeEncounter, setActiveEncounter] = useState<Encounter | null>(null);
  const [workspace, setWorkspace] = useState<[Encounter, boolean][]>(
    Array(4).fill([Encounter.EmptyEncounter, false])
  );

  const navigate = useNavigate();

  const playerCount = localStorage.getItem("PlayerCount") || "1P";
  const isTwoPlayer = localStorage.getItem("playerCount") === "2P";

  // Dice faces
  const yellowDice = [
    "https://drive.google.com/thumbnail?id=1RUjbXgb1zrhzmoYPRJHqdsaS0asFj7OQ&sz=w1000",
    "https://drive.google.com/thumbnail?id=1ugPUVuORGHQgYy6kn-izilERyBQ75ANT&sz=w1000",
    "https://drive.google.com/thumbnail?id=1j6g5qu_GjariWl9w9TupE7DeBUWIJs0z&sz=w1000",
    "https://drive.google.com/thumbnail?id=12BRJ3Eo36JPrXHY1ia0FZq1aaAefXDda&sz=w1000",
    "https://drive.google.com/thumbnail?id=1q6ZyyyhgmBOX54nOhVV8Sl02Or6fgO-h&sz=w1000",
    "https://drive.google.com/thumbnail?id=1NzQnTTtwFxKxw4DmUkAUch6QZEo0KP2U&sz=w1000",
  ];

  const blueDice = [
    "https://drive.google.com/thumbnail?id=1NygZkS2sL8dtnTpStxIipgNQnh1rPMrQ&sz=w1000",
    "https://drive.google.com/thumbnail?id=1JqpZte8HBp9S0neVRdE5Gk6B8p7292-B&sz=w1000",
    "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000",
    "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000",
    "https://drive.google.com/thumbnail?id=1lP6_SvegGwqzY7ZCdpdtObGjzt4Isi1F&sz=w1000",
    "https://drive.google.com/thumbnail?id=10dqi-GNHPodNPmiZ0V_IflLdXVVth3Ue&sz=w1000",
  ];

  const blackDice = [
    "https://drive.google.com/thumbnail?id=1dmxTGOmw6cW6wjsWo1xWhK503xvEW6Wc&sz=w1000",
    "https://drive.google.com/thumbnail?id=1mQC_Bv_m2nx_qdNics6bFDm2cDFevhOo&sz=w1000",
    "https://drive.google.com/thumbnail?id=16MpNbd-mWyFc4lyre6BdhRUt_1ia-NAr&sz=w1000",
    "https://drive.google.com/thumbnail?id=1FzGXlI3ae612fxp3PT4sJYkB9mJCYdGx&sz=w1000",
    "https://drive.google.com/thumbnail?id=1r9v3ftIlrTMuPlcMP2zFdLeLeoxfFp0j&sz=w1000",
    "https://drive.google.com/thumbnail?id=1yfnrTeFMirQWuSMc9r8cowUWDKsNJI_J&sz=w1000",
  ];

  const pinkDice = [
    "https://drive.google.com/thumbnail?id=17LTXwJjXjN4rFzA0P827J50lvdP7HOMQ&sz=w1000",
    "https://drive.google.com/thumbnail?id=1UK-lCu66p_t_9zTp_PjmQsTLFW4CGv-q&sz=w1000",
    "https://drive.google.com/thumbnail?id=1mml53cxpKcj8EegETGdBmmHVYwJgsoMi&sz=w1000",
    "https://drive.google.com/thumbnail?id=1gVxmrRN_Cjc2Aq_whiEzFChsBpmBk8sH&sz=w1000",
    "https://drive.google.com/thumbnail?id=13VseXMQbnHZf3jnHXOSU4L2yH8AsTy6o&sz=w1000",
    "https://drive.google.com/thumbnail?id=1K2IP4g_GxA5EmkFWUeEAS0B4Df55KkEU&sz=w1000",
  ];

  // Fetch game data and user data
  useEffect(() => {
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

    // Call both fetch functions on component mount
    fetchGameData();
    fetchUserData();
  }, []); // Empty dependency array ensures this runs once on mount

  // Initialize hero and dice amounts
  useEffect(() => {
    if (gameData?.hero1 && !hero) {
      const foundHero = Hero.findHero(gameData.hero1, playerCount);
      if (foundHero) {
        setActiveHero(foundHero);
        const { values } = foundHero.basicItem;
        setYellowDiceAmount(values[0]);
        setBlueDiceAmount(values[1]);
        setBlackDiceAmount(values[2]);
        setPinkDiceAmount(values[3]);
      }
    }
  }, [gameData, hero, playerCount]);

  // Initialize fullDeck
  useEffect(() => {
    if (gameData && fullDeck.length === 0) {
      const { deck } = gameData;
      const acquiredDeck: Encounter[] = Encounter.returnEncounterDeck(Util.parseArrayAsStrings(deck));
      setFullDeck(acquiredDeck);
    }
  }, [gameData, fullDeck.length]);

  // Handle chat and workspace updates via onSnapshot
  useEffect(() => {
    const gameId = localStorage.getItem("gameId") || "1234";
    const gameRef = doc(db, "games", gameId);

    const unsubscribe = onSnapshot(gameRef, (gameSnap) => {
      if (gameSnap.exists()) {
        const gameData = gameSnap.data();
        if (gameData.chatLog) {
          setChatLog(gameData.chatLog);
        }
        if (gameData.activeDeck) {
          const newWorkspace: [Encounter, boolean][] = [];
          for (let i = 0; i < gameData.activeDeck.length; i++) {
            const stringRep = gameData.activeDeck[i].split("-");
            const mobName = stringRep[0];
            const mobBoolean = JSON.parse(stringRep[1]);
            const mob = encounters[mobName]();
            newWorkspace[i] = [mob, mobBoolean];
          }
          setWorkspace(newWorkspace);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Fetch player names
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlayerNames = async () => {
      const playerIDs: string[] = JSON.parse(localStorage.getItem("players") || "[]");
      const names: string[] = [];
      for (let id of playerIDs) {
        if (id !== "") {
          const docRef = doc(db, "users", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            names.push(data.name);
          } else {
            console.log("No user");
          }
        }
      }
      setPlayerNames(names);
    };
    fetchPlayerNames();
  }, []);

  // Utility functions
  const updateActiveDeck = async () => {
    const gameId = localStorage.getItem("gameId") || "1234";
    const arr: string[] = workspace.map(
      (item) => `${item[0].name}-${item[1]}`
    );
    await updateDoc(doc(db, "games", gameId), {
      activeDeck: arr,
      deck: fullDeck.map((card) => card.name).join(", "),
    });
  };

  const burnCards = (num: number, updateDiscard: boolean): Encounter[] => {
    if (updateDiscard) {
      setDiscard((prev) => prev + num);
    }
    const ret: Encounter[] = fullDeck.slice(-num);
    setFullDeck((prev) => prev.slice(0, -num));

    const gameId = localStorage.getItem("gameId");
    if (gameId) {
      updateDoc(doc(db, "games", gameId), {
        deck: fullDeck.map((card) => card.name).join(", "),
      });
    } else {
      console.error("gameId is null");
    }
    return ret;
  };

  // Event handlers
  const onDefeat = () => {
    setEncounterFacing(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const encounterStay = () => {
    setActiveEncounter(null);
    setEncounterModalOpen(false);
  };

  const encounterAccepted = () => {
    // Insert functionality to create the encounter
    setWorkspace((prevWorkspace) =>
      prevWorkspace.map((item) => {
        if (activeEncounter && item[0].name === activeEncounter.name) {
          setEncounterFacing(true);
          return [Encounter.EmptyEncounter, false];
        }
        return item;
      })
    );
    updateActiveDeck();
    setActiveEncounter(null);
    setEncounterModalOpen(false);
  };

  const submitChat = async (inputText: string) => {
    const gameId = localStorage.getItem("gameId") || "1234";
    const gameRef = doc(db, "games", gameId);
    const gameSnap = await getDoc(gameRef);
    if (gameSnap.exists()) {
      const gamedata = gameSnap.data();
      const newChatLog = gamedata.chatLog ? [...gamedata.chatLog] : [];
      newChatLog.push(
        `${localStorage.getItem("userdata") || "undefined user"}: ${inputText}`
      );
      await updateDoc(doc(db, "games", gameId), {
        chatLog: newChatLog,
      });
    } else {
      console.log("No game data found");
    }
  };

  const exploreDeck = async () => {
    const hasEmpty = workspace.some(
      (w) => w[0].name === Encounter.EmptyEncounter.name
    );

    if (!hasEmpty) {
      return;
    }

    burnCards(2, true);

    setWorkspace((prevWorkspace) =>
      prevWorkspace.map((item) => {
        if (item[0].name === Encounter.EmptyEncounter.name) {
          const newEncounter = burnCards(1, false)[0];
          return [newEncounter, false];
        }
        return item;
      })
    );
    updateActiveDeck();
  };

  const activeClick = (index: number) => {
    const currentEncounter = workspace[index];
    if (
      !currentEncounter[1] &&
      currentEncounter[0] !== Encounter.EmptyEncounter
    ) {
      burnCards(2, true);
      setWorkspace((prevWorkspace) =>
        prevWorkspace.map((item, idx) =>
          idx === index ? [item[0], true] : item
        )
      );
    }

    if (currentEncounter[0] === Encounter.EmptyEncounter) {
      setActiveEncounter(null);
    } else {
      setActiveEncounter(currentEncounter[0]);
      setEncounterModalOpen(true);
    }
    updateActiveDeck();
  };

  const showChat = (title: string, message: string) => {
    setModalTitle(title);
    setModalContent(message);
    setModalOpen(true);
  };

  const level = "1";
  const dungeon = gameData?.dungeon || "default_dungeon";
  const players = gameData?.players || [];

  const exit = () => {
    const gameInfo = [
      "boss",
      "characterSelected",
      "dungeon",
      "gameId",
      "playerCount",
    ];
    for (let key of gameInfo) {
      localStorage.removeItem(key);
    }
    navigate("/"); // Navigate to home or appropriate page
  };

  // Handle loading state properly
  if (!gameData) {
    return <div>Loading game...</div>; // Render loading screen until game data is available
  }

  return (
    <PageLayout>
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <button
          className="w-10 h-10 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80"
          onClick={exit}
        >
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
                <iframe
                  src="https://drive.google.com/file/d/1XR1kNiGFQH-u8CV4cU42KvZEquhRNqGW/preview"
                  width="480"
                  height="360"
                  allow="autoplay"
                  className="w-full h-full object-contain rounded-md"
                ></iframe>
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
            {isTwoPlayer && (
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
                  {Array.from({ length: yellowDiceAmount }, (_, index) => (
                    <Dice
                      key={index}
                      size={50}
                      faces={yellowDice}
                      onRoll={(value: number) => console.log(value)}
                    />
                  ))}
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: blueDiceAmount }, (_, index) => (
                    <Dice
                      key={index}
                      size={50}
                      faces={blueDice}
                      onRoll={(value: number) => console.log(value)}
                    />
                  ))}
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: blackDiceAmount }, (_, index) => (
                    <Dice
                      key={index}
                      size={50}
                      faces={blackDice}
                      onRoll={(value: number) => console.log(value)}
                    />
                  ))}
                </div>
                <div className="flex space-x-2">
                  {Array.from({ length: pinkDiceAmount }, (_, index) => (
                    <Dice
                      key={index}
                      size={50}
                      faces={pinkDice}
                      onRoll={(value: number) => console.log(value)}
                    />
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
                {workspace.map(
                  (encounterOptional: [Encounter, boolean], index: number) => (
                    <img
                      key={index}
                      src={
                        encounterOptional[1]
                          ? `/Encounters/${encounterOptional[0].name}.jpg`
                          : encounterOptional[0].name ===
                            Encounter.EmptyEncounter.name
                          ? "Empty.jpg"
                          : "ClosedDoor.jpg"
                      }
                      alt=""
                      className="w-50 h-32 m-1 object-cover rounded-md shadow-lg"
                      onClick={() => activeClick(index)}
                    />
                  )
                )}
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
                    <p className="text-lg font-semibold">
                      Player {index + 1}
                    </p>
                    <p className="text-lg font-semibold">
                      Name: {playerNames[index] || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-400">{playerId}</p>
                  </div>
                ))}
              </div>
            </div>
            {isEncounterFacing && (
              <EncounterCard
                encounter={activeEncounter || workspace[0][0]}
                onClick={() => console.log("running the encounter")}
                onDefeat={onDefeat}
                yellowDiceAmount={yellowDiceAmount}
                blueDiceAmount={blueDiceAmount}
                blackDiceAmount={blackDiceAmount}
                pinkDiceAmount={pinkDiceAmount}
              />
            )}
            {isTwoPlayer && (
              <div
                onClick={() =>
                  showChat("Chat", "Enter your message here:")
                }
              >
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
            {isEncounterModalOpen && (
              <EncounterModal
                isOpen={isEncounterModalOpen}
                onClose={encounterStay}
                title={"You have encountered"}
                content={
                  activeEncounter
                    ? Util.convertEncounterNameToShowName(
                        activeEncounter.name
                      )
                    : "NULL ENCOUNTER ERROR"
                }
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
