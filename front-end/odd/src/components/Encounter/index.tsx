import React, { useEffect, useState } from "react";
import { Encounter } from "../../middle-end/Encounter/Encounter";
import EncounterBase from "./encounterBase";
import Dice from "react-dice-roll";
import { Hero } from "../../middle-end/Hero/Hero";

interface EncounterProps {
  encounter: Encounter;
  onClick: () => void;
  onDefeat: () => void;
  hero: Hero | null;
  onLose: () => void;
}

const EncounterCard: React.FC<EncounterProps> = ({
  encounter,
  onClick,
  onDefeat,
  hero,
  onLose,
}) => {
  const diceConfig = {
    yellow: {
      amount: 5,
      faces: [
        "https://drive.google.com/thumbnail?id=1RUjbXgb1zrhzmoYPRJHqdsaS0asFj7OQ&sz=w1000",
        "https://drive.google.com/thumbnail?id=1ugPUVuORGHQgYy6kn-izilERyBQ75ANT&sz=w1000",
        "https://drive.google.com/thumbnail?id=1j6g5qu_GjariWl9w9TupE7DeBUWIJs0z&sz=w1000",
        "https://drive.google.com/thumbnail?id=12BRJ3Eo36JPrXHY1ia0FZq1aaAefXDda&sz=w1000",
        "https://drive.google.com/thumbnail?id=1q6ZyyyhgmBOX54nOhVV8Sl02Or6fgO-h&sz=w1000",
        "https://drive.google.com/thumbnail?id=1NzQnTTtwFxKxw4DmUkAUch6QZEo0KP2U&sz=w1000",
      ],
      boxes: encounter.boxes.filter((box) => box.type === 0),
      colorClass: "yellow",
      boxClass: "bg-yellow-500 border-yellow-700",
    },
    blue: {
      amount: 5,
      faces: [
        "https://drive.google.com/thumbnail?id=1NygZkS2sL8dtnTpStxIipgNQnh1rPMrQ&sz=w1000",
        "https://drive.google.com/thumbnail?id=1JqpZte8HBp9S0neVRdE5Gk6B8p7292-B&sz=w1000",
        "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000",
        "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000",
        "https://drive.google.com/thumbnail?id=1lP6_SvegGwqzY7ZCdpdtObGjzt4Isi1F&sz=w1000",
        "https://drive.google.com/thumbnail?id=10dqi-GNHPodNPmiZ0V_IflLdXVVth3Ue&sz=w1000",
      ],
      boxes: encounter.boxes.filter((box) => box.type === 2),
      colorClass: "blue",
      boxClass: "bg-blue-500 border-blue-700",
    },
    black: {
      amount: 5,
      faces: [
        "https://drive.google.com/thumbnail?id=1dmxTGOmw6cW6wjsWo1xWhK503xvEW6Wc&sz=w1000",
        "https://drive.google.com/thumbnail?id=1mQC_Bv_m2nx_qdNics6bFDm2cDFevhOo&sz=w1000",
        "https://drive.google.com/thumbnail?id=16MpNbd-mWyFc4lyre6BdhRUt_1ia-NAr&sz=w1000",
        "https://drive.google.com/thumbnail?id=1FzGXlI3ae612fxp3PT4sJYkB9mJCYdGx&sz=w1000",
        "https://drive.google.com/thumbnail?id=1r9v3ftIlrTMuPlcMP2zFdLeLeoxfFp0j&sz=w1000",
        "https://drive.google.com/thumbnail?id=1yfnrTeFMirQWuSMc9r8cowUWDKsNJI_J&sz=w1000",
      ],
      boxes: encounter.boxes.filter((box) => box.type === 3),
      colorClass: "black",
      boxClass: "bg-black border-gray-700",
    },
    pink: {
      amount: 5,
      faces: [
        "https://drive.google.com/thumbnail?id=17LTXwJjXjN4rFzA0P827J50lvdP7HOMQ&sz=w1000",
        "https://drive.google.com/thumbnail?id=1UK-lCu66p_t_9zTp_PjmQsTLFW4CGv-q&sz=w1000",
        "https://drive.google.com/thumbnail?id=1mml53cxpKcj8EegETGdBmmHVYwJgsoMi&sz=w1000",
        "https://drive.google.com/thumbnail?id=1gVxmrRN_Cjc2Aq_whiEzFChsBpmBk8sH&sz=w1000",
        "https://drive.google.com/thumbnail?id=13VseXMQbnHZf3jnHXOSU4L2yH8AsTy6o&sz=w1000",
        "https://drive.google.com/thumbnail?id=1K2IP4g_GxA5EmkFWUeEAS0B4Df55KkEU&sz=w1000",
      ],
      boxes: encounter.boxes.filter((box) => box.type === 1),
      colorClass: "pink",
      boxClass: "bg-pink-500 border-pink-700",
    },
  };

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

  const handleRoll = (color: string, diceIndex: number, value: number) => {
    setState((prevState) => {
      const newState = { ...prevState };
      if (!newState[color].diceRolled[diceIndex]) {
        newState[color].rolledDice[diceIndex] = value;
        newState[color].diceRolled[diceIndex] = true;
      }
      return newState;
    });
  };

  const handleDrop = (
    color: string,
    value: number,
    diceIndex: number,
    boxIndex: number
  ) => {
    setState((prevState) => {
      const newState = { ...prevState };
      if (!newState[color].diceDropped[diceIndex]) {
        newState[color].current[boxIndex] += value;
        newState[color].diceDropped[diceIndex] = true;
      }
      return newState;
    });
  };

  const renderDiceAndBoxes = (color: string) => {
    const { amount, faces, boxes, boxClass } = diceConfig[color as keyof typeof diceConfig];
    const colorState = state[color];

    return (
      <div className="flex space-x-2 mt-4" key={color}>
        {/* Dice */}
        {Array.from({ length: amount }, (_, diceIndex) => (
          <div
            key={`${color}-dice-${diceIndex}`}
            draggable={
              colorState.diceRolled[diceIndex] &&
              !colorState.diceDropped[diceIndex]
            }
            onDragStart={(e) => {
              if (!colorState.diceDropped[diceIndex]) {
                e.dataTransfer.setData(
                  "text/plain",
                  `${color}-${colorState.rolledDice[diceIndex]}-${diceIndex}`
                );
              }
            }}
          >
            <Dice
              size={50}
              faces={faces}
              onRoll={(value: number) => handleRoll(color, diceIndex, value)}
              disabled={colorState.diceRolled[diceIndex]}
            />
          </div>
        ))}
        {/* Boxes */}
        {boxes.map((box: any, boxIndex: number) => (
          <div
            key={`${color}-box-${boxIndex}`}
            className={`${boxClass} p-2 rounded-md border-dotted border-2`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const data = e.dataTransfer.getData("text/plain");
              const [droppedColor, value, diceIndex] = data.split("-");
              if (droppedColor === color) {
                handleDrop(
                  color,
                  parseInt(value),
                  parseInt(diceIndex),
                  boxIndex
                );
              }
            }}
          >
            {state[color].current[boxIndex]}/{box.neededRoll} {color} Box
          </div>
        ))}
      </div>
    );
  };

  return (
    <EncounterBase isOpen={true} onClose={onClick}>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">{encounter.name}</h1>
        <img
          className="w-full h-auto mb-4"
          src={`Encounters/${encounter.name}.jpg`}
          alt={encounter.name}
        />
      </div>

      {/* Dice Section */}
      <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
        <h2 className="text-2xl font-bold mb-2">Dice</h2>
        <div className="flex flex-col items-center">
          {Object.keys(diceConfig).map((color) => renderDiceAndBoxes(color))}
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
            onClick={onDefeat}
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
