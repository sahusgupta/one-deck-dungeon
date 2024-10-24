import React, { useEffect, useState } from "react";
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

const PlayPage: React.FC = () => {
  const [gameInstance, updateGameInstance] = useState<Game>(Game.getInstance());
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("Error");
  const [modalTitle, setModalTitle] = useState("Error");
  const [isEncounterModalOpen, setEncounterModalOpen] = useState(false);
  const [isEncounterFacing, setEncounterFacing] = useState(false);
  
  const updateGameEasy = (encounterRunTime?: EncounterRuntime) => {
    if (encounterRunTime) {
      gameInstance.activeEncounterRuntime = encounterRunTime;
    }
    updateGameInstance(cloneDeep(gameInstance));
  }

  useEffect(() => {
    console.log("use effect working");
    // console.log(gameInstance.activeEncounterRuntime?.diceInBox);
    gameInstance.pushToFirebase();
  
  }, [gameInstance]);

  const closeChatModal = () => {
    setModalOpen(false);
  };
  const encounterStay = () => {
    gameInstance.activeEncounterRuntime = undefined;

    setEncounterModalOpen(false);
    updateGameEasy();
  }

  const encounterAccepted = () => {
    setEncounterFacing(true);
    setEncounterModalOpen(false);
  }

  const onEncounterWin = () => {
    gameInstance.workspace[gameInstance.activeEncounterRuntime?.workspaceIndex ?? 4][0] = Encounter.EmptyEncounter;
    gameInstance.workspace[gameInstance.activeEncounterRuntime?.workspaceIndex ?? 4][1] = false;

    gameInstance.activeEncounterRuntime = undefined;

    setEncounterFacing(false);
    updateGameEasy()
  }

  // onLose functionality for the encounter window
  const onEncounterLose = async (heartsLost: number) => {

    gameInstance.workspace[gameInstance.activeEncounterRuntime?.workspaceIndex ?? 4][0] = Encounter.EmptyEncounter;
    gameInstance.workspace[gameInstance.activeEncounterRuntime?.workspaceIndex ?? 4][1] = false;

    gameInstance.activeEncounterRuntime = undefined;

    setEncounterFacing(false);
    updateGameEasy()
  };
  
  const submitChat = async (inputText: string) => {
    gameInstance.chatLog.push(
      (localStorage.getItem("userdata") || "undefined user") +
        ": " +
        inputText
    );
    updateGameEasy()
  };

  const exploreDeck = () => { //DOESNT HANDLE IF FLOORS RUN OUT
    let hasEmpty : boolean = false;
    const workspace : Array<[Encounter, boolean]> = gameInstance.workspace;
    workspace.forEach((w: [Encounter, boolean]) => {
      if (w[0].name == Encounter.EmptyEncounter.name) {
        hasEmpty = true;
      }
    });

    if (!hasEmpty) {
      updateGameEasy()
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
    updateGameEasy()
  };
  
  const activeClick = (index: number) => {
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
    updateGameEasy()
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

  return (
    <PageLayout>
      <div className="p-6 bg-gray-900 text-white min-h-screen">
          <button className="w-10 h-10 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80" onClick={() => {
            let gameInfo = ['boss', 'characterSelected', 'dungeon', 'gameId', 'playerCount']
            for (let key in gameInfo){
              localStorage.removeItem(key);
            }
            onPage = true;
          }}>
            <span className="text-xl font-bold">Exit</span>
          </button>
        <div className="container mx-auto">
          {/* Game Title and Player Info - problem , not able to update from firebase for username - takes data from google auth*/}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Game: {localStorage.getItem("gameId")}</h1>
            <div className="text-xl">
              Player:{" "}
              <span className="font-semibold">{gameInstance.playerList[0].id}</span> 
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
                  src={`/${gameInstance.dungeon.name}.jpg`}
                  alt={gameInstance.dungeon.name}
                  className="w-48 h-48 object-contain rounded-md"
                />
                <img
                  src={`/Leveling/Level${gameInstance.level}-${gameInstance.playerNum == 1 ? "1P" : "2P"}.jpg`}
                  alt={gameInstance.level.toString()}
                  className="w-48 h-48 object-contain rounded-md"
                />
              </div>
            </div>
            {/* Chat Section */}
            {gameInstance.playerNum == 2 && (
              <div className="fixed left-0 top-50 h-3/4 w-1/4 bg-gray-800 p-4 shadow-md">
                <h2 className="text-xl font-bold mb-4">Chat</h2>
                <div className="flex flex-col h-3/4 overflow-y-scroll bg-gray-700 p-2 rounded-md shadow-inner">
                  {gameInstance.chatLog.map((message : string, index : number) => (
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
              <div>
                <img
                  src="ClosedDoor.jpg"
                  className="w-50 h-32 m-1 object-cover rounded-md shadow-lg m-auto mt-10"
                  onClick={() => exploreDeck()}
                />
              </div>
            </div>
            {/* Players Section */}
            <div className="bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-4">Players</h2>
              <div className="grid grid-cols-2 gap-4">
                {gameInstance.playerList.map((player: Player, index: number) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-700 rounded-lg text-center"
                  >
                    <p className="text-lg font-semibold">Player {index + 1}</p>
                    <p className="text-lg font-semibold">
                      {" "}
                      Name: {player.id}
                    </p>
                    <p className="text-sm text-gray-400">{player.id}</p>
                  </div>
                ))}
              </div>
            </div>
            {isEncounterFacing && gameInstance.activeEncounterRuntime && (
              <EncounterCard
                encounterRuntimeInit={gameInstance.activeEncounterRuntime}
                onClick= {() => console.log("running the encounter")}
                onWin={() => onEncounterWin()}
                player={gameInstance.playerList[0]} //TODO need to add handling for 2P - currently only takes first one
                onLose={() => onEncounterLose(1)}
                updateGameEasy={updateGameEasy}
                gameInstance={gameInstance}
              />
            )

            }
            {gameInstance.playerNum == 2 && (
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
            {isEncounterModalOpen &&(
              <EncounterModal
              isOpen={isEncounterModalOpen}
              onClose={encounterStay}
                title={"You have encountered"}
                content={gameInstance.activeEncounterRuntime? Util.convertEncounterNameToShowName(gameInstance.activeEncounterRuntime.encounter.name) : "NULL ENCOUNTER ERROR"}
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