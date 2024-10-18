import React from "react";
import Dice from "react-dice-roll";

interface DiceComponentProps {
  color: string;
  diceFaces: string[];
  diceAmount: number;
  rolledDice: number[];
  setRolledDice: React.Dispatch<React.SetStateAction<number[]>>;
  diceRolled: boolean[];
  setDiceRolled: React.Dispatch<React.SetStateAction<boolean[]>>;
  diceDropped: boolean[];
  setDiceDropped: React.Dispatch<React.SetStateAction<boolean[]>>;
  currentTotal: number;
  setCurrentTotal: React.Dispatch<React.SetStateAction<number>>;
  totalNeeded: number;
}

const DiceComponent: React.FC<DiceComponentProps> = ({
  color,
  diceFaces,
  diceAmount,
  rolledDice,
  setRolledDice,
  diceRolled,
  setDiceRolled,
  diceDropped,
  setDiceDropped,
  currentTotal,
  setCurrentTotal,
  totalNeeded,
}) => {
  const handleRoll = (index: number, value: number) => {
    if (!diceRolled[index]) {
      setRolledDice((prev) => {
        const newRolled = [...prev];
        newRolled[index] = value;
        return newRolled;
      });

      setDiceRolled((prev) => {
        const newRolledFlags = [...prev];
        newRolledFlags[index] = true;
        return newRolledFlags;
      });
    }
  };

  const handleDrop = (value: number, index: number) => {
    if (!diceDropped[index]) {
      setCurrentTotal((prev) => prev + value);

      setDiceDropped((prev) => {
        const newDroppedFlags = [...prev];
        newDroppedFlags[index] = true;
        return newDroppedFlags;
      });
    }
  };

  return (
    <div className="flex space-x-2">
      {/* Render each die */}
      {Array.from({ length: diceAmount }, (_, index) => (
        <div
          key={index}
          draggable={diceRolled[index] && !diceDropped[index]}
          onDragStart={(e) => {
            if (diceRolled[index] && !diceDropped[index]) {
              e.dataTransfer.setData(
                "text/plain",
                JSON.stringify({ color, value: rolledDice[index], index })
              );
            }
          }}
        >
          <Dice
            size={50}
            faces={diceFaces}
            onRoll={(value) => handleRoll(index, value)}
            disabled={diceRolled[index]}
          />
        </div>
      ))}

      {/* Drop zone for the dice */}
      <div
        className={`bg-${color}-500 p-2 rounded-md border-dotted border-2 border-${color}-700`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const { color: droppedColor, value, index } = JSON.parse(
            e.dataTransfer.getData("text/plain")
          );
          if (droppedColor === color) {
            handleDrop(value, index);
          }
        }}
      >
        {currentTotal}/{totalNeeded} {color.charAt(0).toUpperCase() + color.slice(1)} Total
      </div>
    </div>
  );
};

export default DiceComponent;
