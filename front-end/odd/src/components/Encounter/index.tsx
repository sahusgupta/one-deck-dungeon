//index.tsx for encounters
import React, { useEffect, useState, useRef } from "react";
import { Encounter } from "../../middle-end/Encounter/Encounter";
import EncounterBase from "./encounterBase";
import Dice from "react-dice-roll";
import { Hero } from "../../middle-end/Hero/Hero";
import { Player } from "../../middle-end/RuntimeFiles/Player";
import { Dungeon } from "../../middle-end/Dungeon/Dungeon";
import { Util } from "../../middle-end/Util/Util";
import { EncounterRuntime } from "../../middle-end/RuntimeFiles/EncounterRuntime";
import { DiceBox } from "../../middle-end/Dice/DiceBox";
import cloneDeep from "lodash/cloneDeep";
import { Game } from "../../middle-end/RuntimeFiles/Game";
import PostEncounterModal from "./postEncounter";

interface EncounterProps {
  onClick: () => void;
  onLeaveEncounter: (gameInstanceExport: Game) => void; // Add this line
  gameInstanceImport: Game;
}

const EncounterCard: React.FC<EncounterProps> = ({
  onClick,
  onLeaveEncounter,
  gameInstanceImport,
}) => {
  const [gameInstance, updateGameInstance] = useState<Game>(gameInstanceImport);
  const diceRefs = useRef<{ [key: number]: any }>({});
  const updateGameEasy = () => {
    updateGameInstance(cloneDeep(gameInstance));
  };

  useEffect(() => {
    gameInstance.pushToFirebase();
  }, [gameInstance]);

  const handleLeaveEncounter = (gameInstanceExport: Game) => {
    updateGameEasy();
    onLeaveEncounter(gameInstanceExport); // Call the prop function
  };

  const renderDiceAndBoxes = () => {
    return (
      <div className="flex flex-wrap space-x-2 mt-4">
        {/* Dice */}
        {gameInstance.activeEncounterRuntime?.availableDice.map(
          ([dice, used], diceIndex) => {
            const borderColor = dice.beenRolled()
              ? Util.diceTypeToFacesAndClasses(dice.type)[1]
              : "transparent"; // Set color only if rolled
  
            return (
              <div
                key={`dice-${diceIndex}`}
                draggable={!used && dice.beenRolled()}
                onDragStart={(e) => {
                  if (!used && dice.value !== null) {
                    e.dataTransfer.setData("text/plain", `${dice.idNum}`);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const data = e.dataTransfer.getData("text/plain");
                  const draggedDice = Util.findDiceWithID(
                    gameInstance.activeEncounterRuntime?.availableDice.map(
                      (v) => v[0]
                    ) ?? new Array(),
                    Number.parseInt(data)
                  );
                  if (draggedDice && dice.beenRolled() && !used) {
                    gameInstance.activeEncounterRuntime?.combineDice(
                      draggedDice,
                      dice
                    );
                    updateGameEasy();
                  }
                }}
                className={`border-4 border-${borderColor}-500 rounded-md`}
              >
                <Dice
                  ref={(el) => {
                    if (el) {
                      diceRefs.current[dice.idNum] = el;
                    }
                  }}
                  size={50}
                  faces={Util.diceTypeToFacesAndClasses(dice.type)[0]}
                  defaultValue={(dice.value ?? 6) as 1 | 2 | 3 | 4 | 5 | 6}
                  onRoll={(value: number) => {
                    dice.value = value; // Set dice value
                    updateGameEasy();
                  }}
                  disabled={dice.beenRolled()}
                />
              </div>
            );
          }
        )}
        {/* Boxes */}
        {gameInstance.activeEncounterRuntime?.necessaryDiceboxes.map(
          (box: DiceBox, boxIndex: number) => (
            <div
              key={`box-${boxIndex}`}
              className={`bg-${
                Util.diceTypeToFacesAndClasses(box.type)[1]
              }-500 p-2 rounded-md border-2`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const data = e.dataTransfer.getData("text/plain");
                const foundDice = Util.findDiceWithID(
                  gameInstance.activeEncounterRuntime?.availableDice.map(
                    (v) => v[0]
                  ) ?? new Array(),
                  Number.parseInt(data)
                );
                if (foundDice) {
                  gameInstance.activeEncounterRuntime?.useDiceOnBox(
                    foundDice,
                    box
                  );
                }
                updateGameEasy();
              }}
              onClick={() => {
                gameInstance.activeEncounterRuntime?.clearDicebox(box);
                updateGameEasy();
              }}
            >
              {gameInstance.activeEncounterRuntime?.findFillAmount(box.idNum)}/
              {box.neededRoll} Box
              {box.punishmentTime === 0 && box.punishmentHearts == 0 ? " *" : ""}
            </div>
          )
        )}
      </div>
    );
  };
  return (
    <EncounterBase isOpen={true} onClose={onClick}>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {gameInstance.activeEncounterRuntime?.encounter.name}
        </h1>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <div className="flex flex-col items-center">
            <img
              src={`/${gameInstance.dungeon.name}.jpg`}
              alt={gameInstance.dungeon.name}
              className="w-32 h-32 object-contain rounded-md mb-2"
            />
            <span className="text-sm">{gameInstance.dungeon.name}</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={`/Leveling/Level${gameInstance.level}-${
                gameInstance.playerNum == 1 ? "1P" : "2P"
              }.jpg`}
              alt={gameInstance.level.toString()}
              className="w-32 h-32 object-contain rounded-md mb-2"
            />
            <span className="text-sm">Level {gameInstance.level}</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={gameInstance.activeEncounterRuntime?.encounter.type != 0 ?
                 `/Encounters/${gameInstance.activeEncounterRuntime?.encounter.name}.jpg`
                : `${gameInstance.activeEncounterRuntime?.encounter.name}.jpg`}
              alt={gameInstance.activeEncounterRuntime?.encounter.name}
              className="w-32 h-32 object-contain rounded-md mb-2"
            />
            <span className="text-sm">
              {gameInstance.activeEncounterRuntime?.encounter.name}
            </span>
          </div>
          <div
            className="flex flex-col items-center"
            onClick={() => {gameInstance.usePotion(false); updateGameEasy()}}
          >
            <img
              src="https://drive.google.com/thumbnail?id=1eF9CUtN2PHmpr2dWZnIMcdZgE2TS8cVs&sz=w1000"
              alt="Additional Image"
              className="w-32 h-32 object-contain rounded-md mb-2"
            />
            <span className="text-sm">
              {" "}
              {gameInstance.potions} Potions Left
            </span>
          </div>
        </div>
      </div>
      {/* Heart Section */}
      <div className="flex items-center justify-center space-x-2 my-4">
        <span className="text-xl font-semibold text-white">Hearts:</span>
        {gameInstance.findPlayer()?.itemSum().values[3] &&
          Array.from({
            length:
              (gameInstance.findPlayer()?.itemSum().values[3] ?? 0) - (gameInstance.findPlayer()?.damage ?? 0),
          }).map((_, index) => (
            <span key={index} className="text-red-500 text-2xl">
              ❤️
            </span>
          ))}
      </div>
      {/* Dice and Boxes Section */}
      <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Dice & Boxes</h2>
        <div className="flex flex-wrap justify-center">
          {renderDiceAndBoxes()}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          className={`px-4 py-2 bg-${
            (gameInstance.activeEncounterRuntime?.checkState() ?? 0) === 0 ||
            gameInstance.activeEncounterRuntime?.checkState() === undefined
              ? `gray`
              : gameInstance.activeEncounterRuntime?.checkState() === 1
              ? `red`
              : `green`
          }-500 text-white rounded`}
          onClick={() => {
            handleLeaveEncounter(gameInstance);
          }}
        >
          Leave Encounter
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            gameInstance.activeEncounterRuntime?.availableDice.forEach(
              ([dice, used]) => {
                if (!dice.beenRolled()) {
                  const diceComponent = diceRefs.current[dice.idNum];
                  if (diceComponent) {
                    diceComponent.rollDice();
                  }
                }
              }
            );
          }}
        >
          Roll All
        </button>
      </div>
    </EncounterBase>
  );
};
export default EncounterCard;
