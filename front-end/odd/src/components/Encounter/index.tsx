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
  const diceConfig = {
    yellow: {
      amount: player.itemSum().values[0],
      faces: Util.yellowDiceFaces,
      boxes: encounter.boxes.filter((box) => box.type === 0),
      colorClass: "yellow",
      boxClass: "bg-yellow-500 border-yellow-700",
    },
    blue: {
      amount: player.itemSum().values[2],
      faces: Util.blueDiceFaces,
      boxes: encounter.boxes.filter((box) => box.type === 2),
      colorClass: "blue",
      boxClass: "bg-blue-500 border-blue-700",
    },
    pink: {
      amount: player.itemSum().values[1],
      faces: Util.pinkDiceFaces,
      boxes: encounter.boxes.filter((box) => box.type === 1),
      colorClass: "pink",
      boxClass: "bg-pink-500 border-pink-700",
    },
  };

  const floorBoxes = Dungeon.DragonCave.getCurrFloor().perilBoxes.map((box, index) => {
    console.log(box)
    let colorClass = "gray";
    let boxClass = "bg-gray-500 border-gray-700";
    let faces = Util.blackDiceFaces; // Default to black dice faces

    if (box.type === 0) {
      colorClass = "yellow";
      boxClass = "bg-yellow-500 border-yellow-700";
      faces = Util.yellowDiceFaces;
    } else if (box.type === 1) {
      colorClass = "pink";
      boxClass = "bg-pink-500 border-pink-700";
      faces = Util.pinkDiceFaces;
    } else if (box.type === 2) {
      colorClass = "blue";
      boxClass = "bg-blue-500 border-blue-700";
      faces = Util.blueDiceFaces;
    }

    return {
      ...box,
      colorClass,
      boxClass,
      faces,
      index,
    };
  });

  const [state, setState] = useState(() => {
    const initialState: Record<string, any> = {};
    for (const color in diceConfig) {
      initialState[color] = {
        rolledDice: Array(diceConfig[color as keyof typeof diceConfig].amount).fill(null),
        diceRolled: Array(diceConfig[color as keyof typeof diceConfig].amount).fill(false),
        diceDropped: Array(diceConfig[color as keyof typeof diceConfig].amount).fill(false),
        current: Array(diceConfig[color as keyof typeof diceConfig].boxes.length).fill(0),
      };
    }
    initialState.floor = {
      current: Array(floorBoxes.length).fill(0),
    };
    return initialState;
  });

  const [canWin, setCanWin] = useState<boolean>(true);

  useEffect(() => {
    const remainingMaxValue = (diceArray: (number | null)[]) =>
      diceArray.filter((val) => val === null).length * 6;

    const checkWinPossible = () => {
      let possible = true;
      for (const color in diceConfig) {
        const colorState = state[color];
        const colorBoxes = diceConfig[color as keyof typeof diceConfig].boxes;
        const max =
          colorState.current.reduce((acc: number, curr: number) => acc + curr, 0) +
          remainingMaxValue(colorState.rolledDice);
        const needed = colorBoxes.reduce((acc: number, box: any) => acc + box.neededRoll, 0);
        if (max < needed) {
          possible = false;
          break;
        }
      }
      setCanWin(possible);
    };

    checkWinPossible();
  }, [state, diceConfig]);

  const isEncounterDefeated = Object.keys(diceConfig).every((color) => {
    const colorState = state[color];
    const colorBoxes = diceConfig[color as keyof typeof diceConfig].boxes;
    return colorBoxes.every(
      (box: any, index: number) => colorState.current[index] >= box.neededRoll
    );
  });

  const logPunishmentDetails = (box: any) => {
    console.log(`Punishment Time: ${box.punishmentTime}, Punishment Hearts: ${box.punishmentHearts}`);
  };

  const renderDiceAndBoxes = () => {
    return (
      <div className="flex space-x-2 mt-4">
        {/* Dice */}
        {Array.from({ length: encounterRuntime.availableDice.length ?? 0 }, (_, diceIndex) => (
          <div
            draggable={
              encounterRuntime.availableDice[diceIndex][0].beenRolled() &&
              !encounterRuntime.availableDice[diceIndex][1]
            }

            onDragStart={(e) => {
              if (!encounterRuntime.availableDice[diceIndex][1]) {
                e.dataTransfer.setData(
                  "text/plain",
                  `${encounterRuntime.availableDice[diceIndex][0].idNum}`
                );
              }
            }}
          >
            <Dice
              size={50}
              faces={Util.diceTypeToFacesAndClasses(encounterRuntime.availableDice[diceIndex][0].type)[0]}
              onRoll={(value: number) => {
                encounterRuntime.availableDice[diceIndex][0].value = value;
                //code to trigger the useeffect
              }}
              disabled={encounterRuntime.availableDice[diceIndex][0].beenRolled()}
            />
          </div>
        ))}
        {/* Boxes */}
        {encounterRuntime.necessaryDiceboxes.map((box: DiceBox, boxIndex: number) => (
          <div
            className={`${Util.diceTypeToFacesAndClasses(box.type)[1]} p-2 rounded-md border-dotted border-2`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const data = e.dataTransfer.getData("text/plain");
              // const [droppedColor, value, diceIndex] = data.split("-");
              const foundDice = Util.findDiceWithID(encounterRuntime.availableDice.map(v => v[0]), Number.parseInt(data));
              if (foundDice) {
                encounterRuntime.useDiceOnBox(foundDice, box);
              }
            }}
          >
            {state[color].current[boxIndex]}/{box.neededRoll} Box
            {box.punishmentTime === 0 ? " *" : ""}
            {state[color].current[boxIndex] < box.neededRoll && box.punishmentTime > 0 && (
              <button onClick={() => logPunishmentDetails(box)}>Log Punishment</button>
            )}
          </div>
        ))}
      </div>
    );
  };

  // const renderFloorBoxes = () => {
  //   return (
  //     <div className="flex space-x-2 mt-4">
  //       {floorBoxes.map((box: any, index: number) => {
  //         const neededRoll = box._neededRoll; // Access the neededRoll from the private property
  //         console.log(`Floor Box ${index}:`, box);
  //         console.log(neededRoll);
  //         return (
  //           <div
  //             key={`floor-box-${index}`}
  //             className={`${box.boxClass} p-2 rounded-md border-dotted border-2`}
  //           >
  //             {state.floor.current[index]}/{neededRoll} Floor Box
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

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
      {/* Dice Section */}
      <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
        <h2 className="text-2xl font-bold mb-2">Dice</h2>
        <div className="flex flex-col items-center">
          {Object.keys(diceConfig).map((color) => renderDiceAndBoxes(color))}
        </div>
      </div>
      {/* Floor Boxes Section */}
      <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md mt-4">
        <h2 className="text-2xl font-bold mb-2">Floor Boxes</h2>
        <div className="flex flex-col items-center">
          {renderFloorBoxes()}
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
};

export default EncounterCard;
