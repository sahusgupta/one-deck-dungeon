//playpage 
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import ChatModal from "../../components/Modals/chatModal";
import { Player } from "../../middle-end/RuntimeFiles/Player";
import Dice from "react-dice-roll";
import { Game } from "../../middle-end/RuntimeFiles/Game";
import { Encounter } from "../../middle-end/Encounter/Encounter";
import { Util } from "../../middle-end/Util/Util";
import EncounterModal from "../../components/Modals/encounterModal";
import EncounterCard from "../../components/Encounter";
import cloneDeep from "lodash/cloneDeep";
import { EncounterRuntime } from "../../middle-end/RuntimeFiles/EncounterRuntime";
import { DiceBox } from "../../middle-end/Dice/DiceBox";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../backend/firebase/firebase_utils";
import PostEncounterModal from "../../components/Encounter/postEncounter";
import { Dungeon } from "../../middle-end/Dungeon/Dungeon";

const PlayPage: React.FC = () => {
  const [gameInstance, updateGameInstance] = useState<Game | undefined>(undefined);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("Error");
  const [modalTitle, setModalTitle] = useState("Error");
  const [isEncounterModalOpen, setEncounterModalOpen] = useState(false);
  const [isEncounterFacing, setEncounterFacing] = useState(false);
  const [isPostEncounterModalOpen, setPostEncounterModalOpen] = useState(false);
  const gameRef = doc(db, 'games', localStorage.getItem("gameId") ?? "");
  const isLocalUpdate = useRef(false);
  const isGameCreated = useRef(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      gameRef,
      (snapshot) => {
        if (!isLocalUpdate.current) {
          if (snapshot.exists()) {
            const gameData = snapshot.data();
            if (gameInstance) {
              gameInstance.updateGame(gameData);
              updateGameInstance(cloneDeep(gameInstance)); // Avoids calling updateGameEasy to prevent loop
            } else {
              const newGameInstance = Game.initializeFromGameData(gameData);
              updateGameInstance(newGameInstance); // Set the new game instance in state
            }
            isGameCreated.current = true; // Set game as created after loading initial data
          }
        }
        isLocalUpdate.current = false; // Reset the flag after processing
      },
      (error) => {
        console.log("Error in onSnapshot listener", error);
      }
    );
  
    return () => unsubscribe(); // Clean up the subscription
  }, []);
  

  const updateGameEasy = (gameInstanceExternal?: Game) => {
    if (gameInstance) {
      isLocalUpdate.current = true; // Set the flag before updating
      updateGameInstance(cloneDeep(gameInstanceExternal ? gameInstanceExternal : gameInstance));
    }
  };
  

  useEffect(() => {
    if (gameInstance) {
      if (!isGameCreated.current) {
        isGameCreated.current = true;
      } else {
        isLocalUpdate.current = true; // Set the flag before pushing
        gameInstance.pushToFirebase();
      }
    }
  }, [gameInstance]);
  
  
  const closeChatModal = () => {
    setModalOpen(false);
  };

  const closingPostEncounterModal= (gameInstanceExport : Game) => {
    if (gameInstanceExport)
      gameInstanceExport.activeEncounterRuntime = undefined;
    updateGameEasy(gameInstanceExport);
    setPostEncounterModalOpen(false);
  }
  const encounterStay = () => {
    if (gameInstance) {
      gameInstance.activeEncounterRuntime = undefined;
    }
    setEncounterModalOpen(false);
    updateGameEasy();
  }

  const encounterAccepted = (encounter? : Encounter, index?: number) => {
    if (gameInstance && encounter && (index || index === 0) && gameInstance.activeEncounterRuntime) {
      if (index == 0) {
        gameInstance.burn(encounter.type - 2);
      }
      let idToRemove: number = encounter.boxes[index * -1 + 1].idNum;
      let indexToRemove: number | undefined = undefined;
      gameInstance.activeEncounterRuntime.necessaryDiceboxes.map((box: DiceBox, necessaryDBIndex: number) => {
        if (box.idNum == idToRemove) {
          indexToRemove = necessaryDBIndex;
        }
      });
      if (indexToRemove) {
        gameInstance.activeEncounterRuntime.necessaryDiceboxes.splice(indexToRemove, 1);
      }
    }
    updateGameEasy();
    setEncounterFacing(true);
    setEncounterModalOpen(false);
  }

  const onLeaveEncounter = (gameInstanceExport: Game) => {
    setEncounterFacing(false);

    if (gameInstanceExport.activeEncounterRuntime) {
      gameInstanceExport.activeEncounterRuntime.rewardDecision = [0, gameInstanceExport.playerList[0]];
      let punishment : [number, number] = gameInstanceExport.activeEncounterRuntime.calculatePunishment(); //hearts, time
      gameInstanceExport.activeEncounterRuntime.punishmentDecision = [punishment[1], punishment[0], 0]
    }
    updateGameEasy(gameInstanceExport);
    setPostEncounterModalOpen(true); // Open the modal here
  };
  
  // onLose functionality for the encounter window
  const submitChat = async (inputText: string) => {
    if (gameInstance) {
      gameInstance.chatLog.push(
        (localStorage.getItem("userdata") || "undefined user") +
          ": " +
          inputText
      );
      updateGameEasy();
    }
  };

  const exploreDeck = () => { //DOESNT HANDLE IF FLOORS RUN OUT
    if (!gameInstance) return;

    let hasEmpty : boolean = false;
    const workspace : Array<[Encounter, boolean]> = gameInstance.workspace;
    workspace.forEach((w: [Encounter, boolean]) => {
      if (w[0].name == Encounter.EmptyEncounter.name) {
        hasEmpty = true;
      }
    });

    if (!hasEmpty) {
      updateGameEasy();
      return;
    }

    gameInstance.burn(2);

    workspace.map(
      (encounter: [Encounter, boolean], index : number) => {
        if (encounter[0].name === Encounter.EmptyEncounter.name) {
          workspace[index][0] = gameInstance.deck.pop() ?? Encounter.EmptyEncounter; //doesn't handle if floors run out
          workspace[index][1] = false;
        }
      }
    );
    updateGameEasy();
  };
  
  const activeClick = (index: number) => {
    if (!gameInstance) return;

    const workspace : Array<[Encounter, boolean]> = gameInstance.workspace;
    if (workspace[index][0] == Encounter.EmptyEncounter) { //only keep going if they clicked on something that exists
      return;
    } //everything past this point def exists

    if (!workspace[index][1]) { //if covered, burn 2, flip it
      gameInstance.burn(2);
      workspace[index][1] = true;
    } //no else statement - active encounter becomes whatever they clicked

    gameInstance.activeEncounterRuntime = new EncounterRuntime(gameInstance.dungeon, workspace[index][0], gameInstance.playerList, index);
    setEncounterModalOpen(true);
    updateGameEasy();
  };

  const showChat = async (gameId: string, title: string, message: string) => {
    setModalTitle(title);
    setModalContent(message);
    setModalOpen(true);
  };

  let onPage: boolean = false; //this is retarded please make this better

  useEffect(() => {
    if (onPage){
      const navigate = useNavigate()
      navigate('/')
    }
  }, [onPage])
  
  if (!gameInstance) {
    return <div>Loading...</div>;
  }
  return (
    <PageLayout>
      <div className="p-6 bg-gray-900 text-white min-h-screen">
        <button
          className="w-10 h-10 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80"
          onClick={() => {
            const gameInfo = ['boss', 'characterSelected', 'dungeon', 'gameId', 'playerCount'];
            gameInfo.forEach((key) => localStorage.removeItem(key));
            onPage = true;
          }}
        >
          <span className="text-xl font-bold">Exit</span>
        </button>
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Game: {localStorage.getItem("gameId")}</h1>
            <div className="text-xl">
              Player:{" "}
              <span className="font-semibold">
                {gameInstance.findPlayer()?.id || "Unknown Player"}
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6">
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
                  src={`/${gameInstance.dungeon.name}.jpg`}
                  alt={gameInstance.dungeon.name}
                  className="w-48 h-48 object-contain rounded-md"
                />
                <img
                  src={`/Leveling/Level${gameInstance.level}-${gameInstance.playerNum === 1 ? "1P" : "2P"}.jpg`}
                  alt={gameInstance.level.toString()}
                  className="w-48 h-48 object-contain rounded-md"
                />
              </div>
            </div>

            {gameInstance.playerNum === 2 && (
              <div className="fixed left-0 top-50 h-3/4 w-1/4 bg-gray-800 p-4 shadow-md">
                <h2 className="text-xl font-bold mb-4">Chat</h2>
                <div className="flex flex-col h-3/4 overflow-y-scroll bg-gray-700 p-2 rounded-md shadow-inner">
                  {gameInstance.chatLog.map((message: string, index: number) => (
                    <div key={index} className="text-sm text-gray-200 mb-2">
                      {message}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-2">
                Deck - Discard: {gameInstance.discard.length}
              </h2>
              <div className="flex flex-wrap justify-center">
                {gameInstance.workspace.map((encounterOptional: [Encounter, boolean], index: number) => (
                  <img
                    key={index}
                    src={
                      encounterOptional[1]
                        ? `/Encounters/${encounterOptional[0].name}.jpg`
                        : encounterOptional[0].name === Encounter.EmptyEncounter.name
                        ? "Empty.jpg"
                        : "ClosedDoor.jpg"
                    }
                    alt=""
                    className="w-50 h-32 m-1 object-cover rounded-md shadow-lg"
                    onClick={() => activeClick(index)}
                  />
                ))}
              </div>
              <div>
                <img
                  src="ClosedDoor.jpg"
                  className="w-50 h-32 m-1 object-cover rounded-md shadow-lg m-auto mt-10"
                  onClick={() => exploreDeck()}
                />
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-4">Player Info</h2>
              <div className="flex flex-wrap justify-center">
                <div className="flex flex-col">
                  <div className="bg-gray-700 p-4 rounded-md mb-4">
                    <h3 className="text-lg font-bold text-white mb-2">Experience Points (XP)</h3>
                    <div className="text-center text-white">
                      {gameInstance.xp} XP
                    </div>
                    <div className="text-center text-white">
                      {gameInstance.level} Level
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-md mb-4">
                    <h3 className="text-lg font-bold text-white mb-2">Items</h3>
                    <div className="flex flex-wrap">
                      {gameInstance.findPlayer()?.defeatedEncounters
                        .filter(([_, isItem]) => isItem)
                        .map(([encounter], index) => (
                          <div key={index} className="m-2">
                            <img
                              src={`/Encounters/${encounter.name}.jpg`}
                              alt={encounter.name}
                              className="w-24 h-24 object-cover rounded-md shadow-md"
                            />
                            <span className="block text-center text-sm text-white mt-1">
                              {encounter.name}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-md">
                    <h3 className="text-lg font-bold text-white mb-2">Skills</h3>
                    <div className="flex flex-wrap">
                      {gameInstance.findPlayer()?.defeatedEncounters
                        .filter(([_, isItem]) => !isItem)
                        .map(([encounter], index) => (
                          <div key={index} className="m-2">
                            <img
                              src={`/Encounters/${encounter.name}.jpg`}
                              alt={encounter.name}
                              className="w-24 h-24 object-cover rounded-md shadow-md"
                            />
                            <span className="block text-center text-sm text-white mt-1">
                              {encounter.name}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center" onClick={() => { gameInstance.usePotion(true); updateGameEasy(); }}>
                <img
                  src="https://drive.google.com/thumbnail?id=1eF9CUtN2PHmpr2dWZnIMcdZgE2TS8cVs&sz=w1000"
                  alt="Additional Image"
                  className="w-32 h-32 object-contain rounded-md mb-2"
                />
                <span className="text-sm"> {gameInstance.potions} Potions Left</span>
              </div>
              <div className="flex items-center justify-center space-x-2 my-4">
                <span className="text-xl font-semibold text-white">Hearts:</span>
                {gameInstance.findPlayer()?.itemSum()?.values[3] !== undefined &&
                  Array.from({ length: (gameInstance.findPlayer()?.itemSum()?.values[3] || 0) - (gameInstance.findPlayer()?.damage || 0) }).map((_, index) => (
                    <span key={index} className="text-red-500 text-2xl">
                      ❤️
                    </span>
                  ))}
              </div>
            </div>

            {isEncounterFacing && (
              <EncounterCard
                onClick={() => console.log("running the encounter")}
                onLeaveEncounter={onLeaveEncounter}
                gameInstanceImport={gameInstance}
              />
            )}

            {gameInstance.playerNum === 2 && (
              <div
                onClick={() =>
                  showChat(
                    localStorage.getItem("gameId") || "1234",
                    "Chat",
                    "Enter your message here:"
                  )
                }
              >
                <FontAwesomeIcon icon={faComment} size="5x" />
              </div>
            )}

            {isPostEncounterModalOpen && (
              <PostEncounterModal
                isOpen={isPostEncounterModalOpen}
                onClose={(gameInstanceExport) => closingPostEncounterModal(gameInstanceExport)}
                gameInstanceImport={gameInstance}
              />
            )}

            {isModalOpen && (
              <ChatModal
                isOpen={isModalOpen}
                onClose={closeChatModal}
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
                content={gameInstance.activeEncounterRuntime ? Util.convertEncounterNameToShowName(gameInstance.activeEncounterRuntime.encounter.name) : "NULL ENCOUNTER ERROR"}
                onAction={encounterAccepted}
                actionLabel="Encounter"
                encounter={gameInstance.activeEncounterRuntime ? gameInstance.activeEncounterRuntime.encounter : Encounter.EmptyEncounter}
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