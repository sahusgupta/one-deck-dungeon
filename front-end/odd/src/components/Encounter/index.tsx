import React, { useEffect, useState } from "react";
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


interface EncounterProps {
  encounterRuntimeInit: EncounterRuntime;
  onClick: () => void;
  onWin: () => void;
  player: Player;
  onLose: () => void;
  updateGameEasy: (encounterRuntime? : EncounterRuntime) => void;
}

const EncounterCard: React.FC<EncounterProps> = ({
  encounterRuntimeInit,
  onClick,
  onWin,
  player,
  onLose,
  updateGameEasy,
}) => {
  const hearts = player.itemSum().values[3];
  const [encounterRuntime, updateEncounterRuntime] = useState<EncounterRuntime>(encounterRuntimeInit);

  const updateRuntimeEasy = () => {
    updateEncounterRuntime(cloneDeep(encounterRuntime))
  }

  useEffect(() => {
    updateGameEasy(cloneDeep(encounterRuntime));
  }, [encounterRuntime])

  const logPunishmentDetails = (box: DiceBox) => {
    console.log(`Punishment Time: ${box.punishmentTime}, Punishment Hearts: ${box.punishmentHearts}`);
  };

  const renderDiceAndBoxes = () => {
    return (
      <div className="flex flex-wrap space-x-2 mt-4">
        {/* Dice */}
        {encounterRuntime.availableDice.map(([dice, used], diceIndex) => (
          <div
            key={`dice-${diceIndex}`}
            draggable={!used && dice.beenRolled()}
            onDragStart={(e) => {
              if (!used && dice.value !== null) {
                e.dataTransfer.setData("text/plain", `${dice.idNum}`);
              }
            }}
          >
          <Dice
            size={50}
            faces={Util.diceTypeToFacesAndClasses(dice.type)[0]}
            onRoll={(value: number) => {
              dice.value = value; // Set dice value
              updateRuntimeEasy();
            }}
            disabled={dice.beenRolled()}
          />
          </div>
        ))}
        {/* Boxes */}
        {encounterRuntime.necessaryDiceboxes.map((box: DiceBox, boxIndex: number) => (
          <div
            key={`box-${boxIndex}`}
            className={`bg-${Util.diceTypeToFacesAndClasses(box.type)[1]}-500 p-2 rounded-md border-2`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const data = e.dataTransfer.getData("text/plain");
              const foundDice = Util.findDiceWithID(
                encounterRuntime.availableDice.map((v) => v[0]),
                Number.parseInt(data)
              );
              if (foundDice) {
                encounterRuntime.useDiceOnBox(foundDice, box);
              }
              updateRuntimeEasy();
            }}
          >
            {encounterRuntime.findFillAmount(box.idNum)}/{box.neededRoll} Box
            {box.punishmentTime === 0 ? " *" : ""}
          </div>
        ))}

      </div>
    );
  };

  return (
    <EncounterBase isOpen={true} onClose={onClick}>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">{encounterRuntime.encounter.name}</h1>
        <img
          className="w-full h-auto mb-4"
          src={`Encounters/${encounterRuntime.encounter.name}.jpg`}
          alt={encounterRuntime.encounter.name}
        />
      </div>
      {/* Heart Section */}
      <div className="flex items-center justify-center space-x-2 my-4">
        <span className="text-xl font-semibold text-white">Hearts:</span>
        {hearts && Array.from({ length: hearts }).map((_, index) => (
          <span key={index} className="text-red-500 text-2xl">❤️</span>
        ))}
      </div>
      {/* Dice and Boxes Section */}
      <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
        <h2 className="text-2xl font-bold mb-2">Dice & Boxes</h2>
        <div className="flex flex-wrap justify-center">
          {renderDiceAndBoxes()}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          className={`px-4 py-2 bg-${encounterRuntime.checkState() <= 1 ? `red` : `green`}-600 text-white rounded`}
          onClick={onWin}
          disabled={encounterRuntime.checkState() == 0}
        >
          Leave Encounter
        </button>
      </div>
    </EncounterBase>
  );
}

export default EncounterCard;
