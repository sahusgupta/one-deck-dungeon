import React, { useState } from "react";
import { Encounter } from "../../middle-end/Encounter/Encounter";
import EncounterBase from "./encounterBase";
import Dice from "react-dice-roll";

interface EncounterProps {
  encounter: Encounter;
  onClick: () => void;
  onDefeat: () => void;
  yellowDiceAmount: any;
  blueDiceAmount: any;
  blackDiceAmount: any;
  pinkDiceAmount: any;
}

const EncounterCard: React.FC<EncounterProps> = ({
  encounter,
  onClick,
  onDefeat,
  yellowDiceAmount,
  blueDiceAmount,
  blackDiceAmount,
  pinkDiceAmount,
}) => {
  console.log(encounter);
  console.log(encounter.name);

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

  // State to track rolled dice values
  const [rolledYellowDice, setRolledYellowDice] = useState<number[]>(
    Array(yellowDiceAmount).fill(null)
  );
  const [rolledBlueDice, setRolledBlueDice] = useState<number[]>(
    Array(blueDiceAmount).fill(null)
  );
  const [rolledBlackDice, setRolledBlackDice] = useState<number[]>(
    Array(blackDiceAmount).fill(null)
  );
  const [rolledPinkDice, setRolledPinkDice] = useState<number[]>(
    Array(pinkDiceAmount).fill(null)
  );

  // State to track if dice are rolled
  const [yellowDiceRolled, setYellowDiceRolled] = useState<boolean[]>(
    Array(yellowDiceAmount).fill(false)
  );
  const [blueDiceRolled, setBlueDiceRolled] = useState<boolean[]>(
    Array(blueDiceAmount).fill(false)
  );
  const [blackDiceRolled, setBlackDiceRolled] = useState<boolean[]>(
    Array(blackDiceAmount).fill(false)
  );
  const [pinkDiceRolled, setPinkDiceRolled] = useState<boolean[]>(
    Array(pinkDiceAmount).fill(false)
  );

  // State to track if dice are dropped
  const [yellowDiceDropped, setYellowDiceDropped] = useState<boolean[]>(
    Array(yellowDiceAmount).fill(false)
  );
  const [blueDiceDropped, setBlueDiceDropped] = useState<boolean[]>(
    Array(blueDiceAmount).fill(false)
  );
  const [blackDiceDropped, setBlackDiceDropped] = useState<boolean[]>(
    Array(blackDiceAmount).fill(false)
  );
  const [pinkDiceDropped, setPinkDiceDropped] = useState<boolean[]>(
    Array(pinkDiceAmount).fill(false)
  );

  // State to track total values for each color
  const [yellowTotal, setYellowTotal] = useState<number>(() => {
    const total = encounter.boxes.filter(box => box.type === 0).reduce((acc, box) => acc + box.neededRoll, 0);
    console.log("Yellow Total:", total);
    return total;
  });

  const [blueTotal, setBlueTotal] = useState<number>(() => {
    const total = encounter.boxes.filter(box => box.type === 2).reduce((acc, box) => acc + box.neededRoll, 0);
    console.log("Blue Total:", total);
    return total;
  });

  const [blackTotal, setBlackTotal] = useState<number>(() => {
    const total = encounter.boxes.filter(box => box.type === 3).reduce((acc, box) => acc + box.neededRoll, 0);
    console.log("Black Total:", total);
    return total;
  });

  const [pinkTotal, setPinkTotal] = useState<number>(() => {
    const total = encounter.boxes.filter(box => box.type === 1).reduce((acc, box) => acc + box.neededRoll, 0);
    console.log("Pink Total:", total);
    return total;
  });

  const [yellowCurrent, setYellowCurrent] = useState<number>(0);
  const [blueCurrent, setBlueCurrent] = useState<number>(0);
  const [blackCurrent, setBlackCurrent] = useState<number>(0);
  const [pinkCurrent, setPinkCurrent] = useState<number>(0);
  const handleRoll = (color: string, index: number, value: number) => {
    switch (color) {
      case "yellow":
        if (!yellowDiceRolled[index]) {
          setRolledYellowDice((prev) => {
            const newRolledYellowDice = [...prev];
            newRolledYellowDice[index] = value;
            return newRolledYellowDice;
          });
          setYellowDiceRolled((prev) => {
            const newYellowDiceRolled = [...prev];
            newYellowDiceRolled[index] = true;
            return newYellowDiceRolled;
          });
        }
        break;
      case "blue":
        if (!blueDiceRolled[index]) {
          setRolledBlueDice((prev) => {
            const newRolledBlueDice = [...prev];
            newRolledBlueDice[index] = value;
            return newRolledBlueDice;
          });
          setBlueDiceRolled((prev) => {
            const newBlueDiceRolled = [...prev];
            newBlueDiceRolled[index] = true;
            return newBlueDiceRolled;
          });
        }
        break;
      case "black":
        if (!blackDiceRolled[index]) {
          setRolledBlackDice((prev) => {
            const newRolledBlackDice = [...prev];
            newRolledBlackDice[index] = value;
            return newRolledBlackDice;
          });
          setBlackDiceRolled((prev) => {
            const newBlackDiceRolled = [...prev];
            newBlackDiceRolled[index] = true;
            return newBlackDiceRolled;
          });
        }
        break;
      case "pink":
        if (!pinkDiceRolled[index]) {
          setRolledPinkDice((prev) => {
            const newRolledPinkDice = [...prev];
            newRolledPinkDice[index] = value;
            return newRolledPinkDice;
          });
          setPinkDiceRolled((prev) => {
            const newPinkDiceRolled = [...prev];
            newPinkDiceRolled[index] = true;
            return newPinkDiceRolled;
          });
        }
        break;
      default:
        break;
    }
  };

  const handleDrop = (color: string, value: number, index: number) => {
    switch (color) {
      case "yellow":
        if (!yellowDiceDropped[index]) {
          setYellowCurrent((prev) => prev + value);
          setYellowDiceDropped((prev) => {
            const newDropped = [...prev];
            newDropped[index] = true;
            return newDropped;
          });
        }
        break;
      case "blue":
        if (!blueDiceDropped[index]) {
          setBlueCurrent((prev) => prev + value);
          setBlueDiceDropped((prev) => {
            const newDropped = [...prev];
            newDropped[index] = true;
            return newDropped;
          });
        }
        break;
      case "black":
        if (!blackDiceDropped[index]) {
          setBlackCurrent((prev) => prev + value);
          setBlackDiceDropped((prev) => {
            const newDropped = [...prev];
            newDropped[index] = true;
            return newDropped;
          });
        }
        break;
      case "pink":
        if (!pinkDiceDropped[index]) {
          setPinkCurrent((prev) => prev + value);
          setPinkDiceDropped((prev) => {
            const newDropped = [...prev];
            newDropped[index] = true;
            return newDropped;
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <EncounterBase isOpen={true} onClose={onClick}>
      <div className="text-white">
        {encounter.name}
        <img className="" src={`Encounters/${encounter.name}.jpg`} />
      </div>

      {/* Dice Section */}
      <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
        <h2 className="text-2xl font-bold mb-2">Dice</h2>
        <div className="flex flex-col items-center">
          <div className="flex space-x-2">
            {Array.from({ length: yellowDiceAmount }, (_, index) => (
              <div
                key={index}
                draggable={yellowDiceRolled[index] && !yellowDiceDropped[index]}
                onDragStart={(e) =>
                  !yellowDiceDropped[index] &&
                  e.dataTransfer.setData(
                    "text/plain",
                    `yellow-${rolledYellowDice[index]}-${index}`
                  )
                }
              >
                <Dice
                  size={50}
                  faces={yellowDice}
                  onRoll={(value: number) => handleRoll("yellow", index, value)}
                  disabled={yellowDiceRolled[index]}
                />
              </div>
            ))}
            <div
              className="bg-yellow-500 p-2 rounded-md border-dotted border-2 border-yellow-700"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const data = e.dataTransfer.getData("text/plain");
                const [color, value, index] = data.split("-");
                handleDrop(color, parseInt(value), parseInt(index));
              }}
            >
              {yellowCurrent}/{yellowTotal} Yellow Total
            </div>
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: blueDiceAmount }, (_, index) => (
              <div
                key={index}
                draggable={blueDiceRolled[index] && !blueDiceDropped[index]}
                onDragStart={(e) =>
                  !blueDiceDropped[index] &&
                  e.dataTransfer.setData(
                    "text/plain",
                    `blue-${rolledBlueDice[index]}-${index}`
                  )
                }
              >
                <Dice
                  size={50}
                  faces={blueDice}
                  onRoll={(value: number) => handleRoll("blue", index, value)}
                  disabled={blueDiceRolled[index]}
                />
              </div>
            ))}
            <div
              className="bg-blue-500 p-2 rounded-md border-dotted border-2 border-blue-700"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const data = e.dataTransfer.getData("text/plain");
                const [color, value, index] = data.split("-");
                handleDrop(color, parseInt(value), parseInt(index));
              }}
            >
              {blueCurrent}/{blueTotal} Blue Total
            </div>
          </div>

          <div className="flex space-x-2">
            {Array.from({ length: blackDiceAmount }, (_, index) => (
              <div
                key={index}
                draggable={blackDiceRolled[index] && !blackDiceDropped[index]}
                onDragStart={(e) =>
                  !blackDiceDropped[index] &&
                  e.dataTransfer.setData(
                    "text/plain",
                    `black-${rolledBlackDice[index]}-${index}`
                  )
                }
              >
                <Dice
                  size={50}
                  faces={blackDice}
                  onRoll={(value: number) => handleRoll("black", index, value)}
                  disabled={blackDiceRolled[index]}
                />
              </div>
            ))}
            <div
              className="bg-black p-2 rounded-md border-dotted border-2 border-black-700"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const data = e.dataTransfer.getData("text/plain");
                const [color, value, index] = data.split("-");
                handleDrop(color, parseInt(value), parseInt(index));
              }}
            >
              {blackCurrent}/{blackTotal} Black Total
            </div>
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: pinkDiceAmount }, (_, index) => (
              <div
                key={index}
                draggable={pinkDiceRolled[index] && !pinkDiceDropped[index]}
                onDragStart={(e) =>
                  !pinkDiceDropped[index] &&
                  e.dataTransfer.setData(
                    "text/plain",
                    `pink-${rolledPinkDice[index]}-${index}`
                  )
                }
              >
                <Dice
                  size={50}
                  faces={pinkDice}
                  onRoll={(value: number) => handleRoll("pink", index, value)}
                  disabled={pinkDiceRolled[index]}
                />
              </div>
            ))}
            <div
              className="bg-pink-500 p-2 rounded-md border-dotted border-2 border-pink-700"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const data = e.dataTransfer.getData("text/plain");
                const [color, value, index] = data.split("-");
                handleDrop(color, parseInt(value), parseInt(index));
              }}
            >
              {pinkCurrent}/{pinkTotal} Pink Total
            </div>
          </div>
        </div>
      </div>
      <div className="text-white" onClick={onDefeat}>
        {" "}
        Cancel{" "}
      </div>
    </EncounterBase>
  );
};

export default EncounterCard;
