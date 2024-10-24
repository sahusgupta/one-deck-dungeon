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

interface EncounterProps {
  encounterRuntime: EncounterRuntime;
  onClick: () => void;
  onWin: () => void;
  player: Player;
  onLose: () => void;
}

const EncounterCard: React.FC<EncounterProps> = ({
  encounterRuntime,
  onClick,
  onWin,
  player,
  onLose,
}) => {
  const hearts = player.itemSum().values[3];
  console.log(encounterRuntime);
  const [state, setState] = useState(() => {
    const initialState: Record<string, any> = {
      current: Array(encounterRuntime.necessaryDiceboxes.length).fill(0),
    };
    return initialState;
  });

  const [canWin, setCanWin] = useState<boolean>(true);

  useEffect(() => {
    const remainingMaxValue = (diceArray: (number | null)[]) =>
      diceArray.filter((val) => val === null).length * 6;

    const checkWinPossible = () => {
      let possible = true;
      const max = state.current.reduce((acc: number, curr: number) => acc + curr, 0) +
        remainingMaxValue(encounterRuntime.availableDice.map(dice => dice[0].value ?? null));
      const needed = encounterRuntime.necessaryDiceboxes.reduce((acc: number, box: DiceBox) => acc + box.neededRoll, 0);
      if (max < needed) {
        possible = false;
      }
      setCanWin(possible);
    };

    checkWinPossible();
  }, [state, encounterRuntime]);

  const isEncounterDefeated = encounterRuntime.necessaryDiceboxes.every(
    (box: DiceBox, index: number) => state.current[index] >= box.neededRoll
  );

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
              setState((prevState) => ({ ...prevState })); // Trigger re-render
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
              console.log(data)
              const foundDice = Util.findDiceWithID(
                encounterRuntime.availableDice.map((v) => v[0]),
                Number.parseInt(data)
              );
              console.log(foundDice)
              if (foundDice) {
                encounterRuntime.useDiceOnBox(foundDice, box);

                setState((prevState) => {
                  const newCurrent = [...prevState.current];
                  newCurrent[boxIndex] += foundDice.value ?? 0;
                  console.log(newCurrent);
                  return { ...prevState, current: newCurrent };
                });
              }
            }}
          >
            {state.current[boxIndex]}/{box.neededRoll} Box
            {box.punishmentTime === 0 ? " *" : ""}
            {state.current[boxIndex] < box.neededRoll && box.punishmentTime > 0 && (
              <button onClick={() => logPunishmentDetails(box)}>
                Log Punishment
              </button>
            )}
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
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={onClick}
        >
          Cancel
        </button>
        {isEncounterDefeated && (
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={onWin}
          >
            Beat Encounter
          </button>
        )}
        {!canWin && (
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded"
            onClick={onLose}
          >
            I Lost
          </button>
        )}
      </div>
    </EncounterBase>
  );
}

export default EncounterCard;
