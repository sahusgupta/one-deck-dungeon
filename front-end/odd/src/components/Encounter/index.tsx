import React, { useState, useEffect } from "react";
import { Encounter } from "../../middle-end/Encounter/Encounter";
import EncounterBase from "./encounterBase";
import Dice from "react-dice-roll";

interface EncounterProps {
  encounter: Encounter;
  onClick: () => void;
  onDefeat: () => void;
  yellowDiceAmount: number;
  blueDiceAmount: number;
  blackDiceAmount: number;
  pinkDiceAmount: number;
}

type Color = "yellow" | "blue" | "black" | "pink";

const EncounterCard: React.FC<EncounterProps> = ({
  encounter,
  onClick,
  onDefeat,
  yellowDiceAmount,
  blueDiceAmount,
  blackDiceAmount,
  pinkDiceAmount,
}) => {
  // Define the colors used in the game
  const colors: Color[] = ["yellow", "blue", "black", "pink"];

  // Map color names to their corresponding dice faces (images)
  const diceFaces: Record<Color, string[]> = {
    yellow: [
      "https://drive.google.com/thumbnail?id=1RUjbXgb1zrhzmoYPRJHqdsaS0asFj7OQ&sz=w1000",
      "https://drive.google.com/thumbnail?id=1ugPUVuORGHQgYy6kn-izilERyBQ75ANT&sz=w1000",
      "https://drive.google.com/thumbnail?id=1j6g5qu_GjariWl9w9TupE7DeBUWIJs0z&sz=w1000",
      "https://drive.google.com/thumbnail?id=12BRJ3Eo36JPrXHY1ia0FZq1aaAefXDda&sz=w1000",
      "https://drive.google.com/thumbnail?id=1q6ZyyyhgmBOX54nOhVV8Sl02Or6fgO-h&sz=w1000",
      "https://drive.google.com/thumbnail?id=1NzQnTTtwFxKxw4DmUkAUch6QZEo0KP2U&sz=w1000",
    ],
    blue: [
      "https://drive.google.com/thumbnail?id=1NygZkS2sL8dtnTpStxIipgNQnh1rPMrQ&sz=w1000",
      "https://drive.google.com/thumbnail?id=1JqpZte8HBp9S0neVRdE5Gk6B8p7292-B&sz=w1000",
      "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000",
      "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000",
      "https://drive.google.com/thumbnail?id=1lP6_SvegGwqzY7ZCdpdtObGjzt4Isi1F&sz=w1000",
      "https://drive.google.com/thumbnail?id=10dqi-GNHPodNPmiZ0V_IflLdXVVth3Ue&sz=w1000",
    ],
    black: [
      "https://drive.google.com/thumbnail?id=1dmxTGOmw6cW6wjsWo1xWhK503xvEW6Wc&sz=w1000",
      "https://drive.google.com/thumbnail?id=1mQC_Bv_m2nx_qdNics6bFDm2cDFevhOo&sz=w1000",
      "https://drive.google.com/thumbnail?id=16MpNbd-mWyFc4lyre6BdhRUt_1ia-NAr&sz=w1000",
      "https://drive.google.com/thumbnail?id=1FzGXlI3ae612fxp3PT4sJYkB9mJCYdGx&sz=w1000",
      "https://drive.google.com/thumbnail?id=1r9v3ftIlrTMuPlcMP2zFdLeLeoxfFp0j&sz=w1000",
      "https://drive.google.com/thumbnail?id=1yfnrTeFMirQWuSMc9r8cowUWDKsNJI_J&sz=w1000",
    ],
    pink: [
      "https://drive.google.com/thumbnail?id=17LTXwJjXjN4rFzA0P827J50lvdP7HOMQ&sz=w1000",
      "https://drive.google.com/thumbnail?id=1UK-lCu66p_t_9zTp_PjmQsTLFW4CGv-q&sz=w1000",
      "https://drive.google.com/thumbnail?id=1mml53cxpKcj8EegETGdBmmHVYwJgsoMi&sz=w1000",
      "https://drive.google.com/thumbnail?id=1gVxmrRN_Cjc2Aq_whiEzFChsBpmBk8sH&sz=w1000",
      "https://drive.google.com/thumbnail?id=13VseXMQbnHZf3jnHXOSU4L2yH8AsTy6o&sz=w1000",
      "https://drive.google.com/thumbnail?id=1K2IP4g_GxA5EmkFWUeEAS0B4Df55KkEU&sz=w1000",
    ],
  };

  // Map color names to their corresponding dice amounts
  const diceAmounts = {
    yellow: yellowDiceAmount,
    blue: blueDiceAmount,
    black: blackDiceAmount,
    pink: pinkDiceAmount,
  };

  // Map color names to their corresponding type IDs in the encounter data
  const colorToType = {
    yellow: 0,
    pink: 1,
    blue: 2,
    black: 3,
  };

  // Map color names to their corresponding CSS classes
  const colorClasses = {
    yellow: "bg-yellow-500 border-yellow-700",
    blue: "bg-blue-500 border-blue-700",
    black: "bg-gray-700 border-black-700",
    pink: "bg-pink-500 border-pink-700",
  };

  // Initialize state variables
  const [rolledDice, setRolledDice] = useState<{ [key: string]: number[] }>({});
  const [diceRolled, setDiceRolled] = useState<{ [key: string]: boolean[] }>({});
  const [diceDropped, setDiceDropped] = useState<{ [key: string]: boolean[] }>({});
  const [currentTotals, setCurrentTotals] = useState<{ [key: string]: number }>({
    yellow: 0,
    blue: 0,
    black: 0,
    pink: 0,
  });

  // Initialize dice arrays when the dice amounts change
  useEffect(() => {
    const initialRolledDice: { [key: string]: number[] } = {};
    const initialDiceRolled: { [key: string]: boolean[] } = {};
    const initialDiceDropped: { [key: string]: boolean[] } = {};
    for (const color of colors) {
      initialRolledDice[color] = Array(diceAmounts[color]).fill(null);
      initialDiceRolled[color] = Array(diceAmounts[color]).fill(false);
      initialDiceDropped[color] = Array(diceAmounts[color]).fill(false);
    }
    setRolledDice(initialRolledDice);
    setDiceRolled(initialDiceRolled);
    setDiceDropped(initialDiceDropped);
    setCurrentTotals({ yellow: 0, blue: 0, black: 0, pink: 0 });
  }, [yellowDiceAmount, blueDiceAmount, blackDiceAmount, pinkDiceAmount]);

  // Calculate the total needed for each color based on the encounter data
  const totals = React.useMemo(() => {
    return colors.reduce((acc: { [key: string]: number }, color) => {
      const colorType = colorToType[color];
      const total = encounter.boxes
        .filter((box) => box.type === colorType)
        .reduce((sum, box) => sum + box.neededRoll, 0);
      acc[color] = total;
      return acc;
    }, {});
  }, [encounter]);

  // Handle rolling of dice
  const handleRoll = (color: string, index: number, value: number) => {
    if (!diceRolled[color][index]) {
      setRolledDice((prev) => ({
        ...prev,
        [color]: prev[color].map((v, i) => (i === index ? value : v)),
      }));
      setDiceRolled((prev) => ({
        ...prev,
        [color]: prev[color].map((v, i) => (i === index ? true : v)),
      }));
    }
  };

  // Handle dropping of dice into the encounter boxes
  const handleDrop = (color: string, value: number, index: number) => {
    if (!diceDropped[color][index]) {
      setCurrentTotals((prev) => ({
        ...prev,
        [color]: prev[color] + value,
      }));
      setDiceDropped((prev) => ({
        ...prev,
        [color]: prev[color].map((v, i) => (i === index ? true : v)),
      }));
    }
  };

  return (
    <EncounterBase isOpen={true} onClose={onClick}>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">{encounter.name}</h1>
        <img
          className="w-full h-auto object-contain rounded-md mb-4"
          src={`Encounters/${encounter.name}.jpg`}
          alt={encounter.name}
        />
      </div>

      {/* Dice Section */}
      <div className="bg-gray-800 rounded-lg p-4 shadow-md w-full">
        <h2 className="text-2xl font-bold mb-4">Dice</h2>
        <div className="flex flex-col space-y-4">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-4">
              {/* Render dice for the current color */}
              <div className="flex space-x-2">
                {Array.from({ length: diceAmounts[color] }, (_, index) => (
                  <div
                    key={index}
                    draggable={diceRolled[color][index] && !diceDropped[color][index]}
                    onDragStart={(e) =>
                      !diceDropped[color][index] &&
                      e.dataTransfer.setData(
                        "text/plain",
                        `${color}-${rolledDice[color][index]}-${index}`
                      )
                    }
                  >
                    <Dice
                      size={50}
                      faces={diceFaces[color]}
                      onRoll={(value: number) => handleRoll(color, index, value)}
                      disabled={diceRolled[color][index]}
                    />
                  </div>
                ))}
              </div>

              {/* Drop area for the current color */}
              <div
                className={`flex-1 p-4 rounded-md border-dotted border-2 ${colorClasses[color]}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const data = e.dataTransfer.getData("text/plain");
                  const [draggedColor, value, idx] = data.split("-");
                  if (draggedColor === color) {
                    handleDrop(color, parseInt(value), parseInt(idx));
                  }
                }}
              >
                <p className="text-white text-lg font-semibold">
                  {currentTotals[color]}/{totals[color]}{" "}
                  {color.charAt(0).toUpperCase() + color.slice(1)} Total
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Button */}
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={onDefeat}
        >
          Cancel
        </button>
      </div>
    </EncounterBase>
  );
};

export default EncounterCard;
