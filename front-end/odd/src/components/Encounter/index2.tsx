// import React, { useState } from "react";
// import { Encounter } from "../../middle-end/Encounter/Encounter";
// import EncounterBase from "./encounterBase";
// import { Hero } from "../../middle-end/Hero/Hero";
// import DiceComponent from "./diceComponent";

// interface EncounterProps {
//   encounter: Encounter;
//   onClick: () => void;
//   onDefeat: () => void;
//   hero: Hero | null;
// }
// interface DiceState {
//   rolled: number[];
//   rolledFlags: boolean[];
//   droppedFlags: boolean[];
//   current: number;
//   total: number;
// }
// const EncounterCard: React.FC<EncounterProps> = ({
//   encounter,
//   onClick,
//   onDefeat,
//   hero,
// }) => {
//   const yellowDiceAmount: number = hero?.basicItem?.values[0] || 0;
//   const pinkDiceAmount: number = hero?.basicItem?.values[1] || 0;
//   const blueDiceAmount: number = hero?.basicItem?.values[2] || 0;
//   const blackDiceAmount: number = 0;

//   const diceFaces = {
//     yellow: [
//       "https://drive.google.com/thumbnail?id=1RUjbXgb1zrhzmoYPRJHqdsaS0asFj7OQ&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1ugPUVuORGHQgYy6kn-izilERyBQ75ANT&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1j6g5qu_GjariWl9w9TupE7DeBUWIJs0z&sz=w1000",
//       "https://drive.google.com/thumbnail?id=12BRJ3Eo36JPrXHY1ia0FZq1aaAefXDda&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1q6ZyyyhgmBOX54nOhVV8Sl02Or6fgO-h&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1NzQnTTtwFxKxw4DmUkAUch6QZEo0KP2U&sz=w1000",
//     ],
//     blue: [
//       "https://drive.google.com/thumbnail?id=1NygZkS2sL8dtnTpStxIipgNQnh1rPMrQ&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1JqpZte8HBp9S0neVRdE5Gk6B8p7292-B&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1lP6_SvegGwqzY7ZCdpdtObGjzt4Isi1F&sz=w1000",
//       "https://drive.google.com/thumbnail?id=10dqi-GNHPodNPmiZ0V_IflLdXVVth3Ue&sz=w1000",
//     ],
//     black: [
//       "https://drive.google.com/thumbnail?id=1dmxTGOmw6cW6wjsWo1xWhK503xvEW6Wc&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1mQC_Bv_m2nx_qdNics6bFDm2cDFevhOo&sz=w1000",
//       "https://drive.google.com/thumbnail?id=16MpNbd-mWyFc4lyre6BdhRUt_1ia-NAr&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1FzGXlI3ae612fxp3PT4sJYkB9mJCYdGx&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1r9v3ftIlrTMuPlcMP2zFdLeLeoxfFp0j&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1yfnrTeFMirQWuSMc9r8cowUWDKsNJI_J&sz=w1000",
//     ],
//     pink: [
//       "https://drive.google.com/thumbnail?id=17LTXwJjXjN4rFzA0P827J50lvdP7HOMQ&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1UK-lCu66p_t_9zTp_PjmQsTLFW4CGv-q&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1mml53cxpKcj8EegETGdBmmHVYwJgsoMi&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1gVxmrRN_Cjc2Aq_whiEzFChsBpmBk8sH&sz=w1000",
//       "https://drive.google.com/thumbnail?id=13VseXMQbnHZf3jnHXOSU4L2yH8AsTy6o&sz=w1000",
//       "https://drive.google.com/thumbnail?id=1K2IP4g_GxA5EmkFWUeEAS0B4Df55KkEU&sz=w1000",
//     ],
//   };

//   const initialState = (amount: number): DiceState => ({
//     rolled: Array(amount).fill(null),
//     rolledFlags: Array(amount).fill(false),
//     droppedFlags: Array(amount).fill(false),
//     current: 0,
//     total: 0,
//   });

//   const [yellowState, setYellowState] = useState<DiceState>(() => ({
//     ...initialState(yellowDiceAmount),
//     total: encounter.boxes
//       .filter((box) => box.type === 0)
//       .reduce((acc, box) => acc + box.neededRoll, 0),
//   }));

//   const [blueState, setBlueState] = useState<DiceState>(() => ({
//     ...initialState(blueDiceAmount),
//     total: encounter.boxes
//       .filter((box) => box.type === 2)
//       .reduce((acc, box) => acc + box.neededRoll, 0),
//   }));

//   const [blackState, setBlackState] = useState<DiceState>(() => ({
//     ...initialState(blackDiceAmount),
//     total: encounter.boxes
//       .filter((box) => box.type === 3)
//       .reduce((acc, box) => acc + box.neededRoll, 0),
//   }));

//   const [pinkState, setPinkState] = useState<DiceState>(() => ({
//     ...initialState(pinkDiceAmount),
//     total: encounter.boxes
//       .filter((box) => box.type === 1)
//       .reduce((acc, box) => acc + box.neededRoll, 0),
//   }));

//   const handleRoll = (
//     color: string,
//     index: number,
//     value: number
//   ) => {
//     const updateState = (
//       stateSetter: React.Dispatch<React.SetStateAction<DiceState>>
//     ) => {
//       stateSetter((prev) => ({
//         ...prev,
//         rolled: prev.rolled.map((v, i) => (i === index ? value : v)),
//         rolledFlags: prev.rolledFlags.map((v, i) => (i === index ? true : v)),
//       }));
//     };

//     switch (color) {
//       case "yellow":
//         if (!yellowState.rolledFlags[index]) updateState(setYellowState);
//         break;
//       case "blue":
//         if (!blueState.rolledFlags[index]) updateState(setBlueState);
//         break;
//       case "black":
//         if (!blackState.rolledFlags[index]) updateState(setBlackState);
//         break;
//       case "pink":
//         if (!pinkState.rolledFlags[index]) updateState(setPinkState);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleDrop = (
//     color: string,
//     value: number,
//     index: number
//   ) => {
//     const updateState = (
//       stateSetter: React.Dispatch<React.SetStateAction<DiceState>>
//     ) => {
//       stateSetter((prev) => ({
//         ...prev,
//         current: prev.current + value,
//         droppedFlags: prev.droppedFlags.map((v, i) => (i === index ? true : v)),
//       }));
//     };

//     switch (color) {
//       case "yellow":
//         if (!yellowState.droppedFlags[index]) updateState(setYellowState);
//         break;
//       case "blue":
//         if (!blueState.droppedFlags[index]) updateState(setBlueState);
//         break;
//       case "black":
//         if (!blackState.droppedFlags[index]) updateState(setBlackState);
//         break;
//       case "pink":
//         if (!pinkState.droppedFlags[index]) updateState(setPinkState);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <EncounterBase isOpen={true} onClose={onClick}>
//       <div className="text-white">
//         {encounter.name}
//         <img
//           className=""
//           src={`Encounters/${encounter.name}.jpg`}
//           alt={`${encounter.name}`}
//         />
//       </div>

//       <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
//         <h2 className="text-2xl font-bold mb-2">Dice</h2>
//         <div className="flex flex-col items-center">
//           <DiceComponent
//             color="yellow"
//             diceFaces={diceFaces.yellow}
//             diceAmount={yellowDiceAmount}
//             rolledDice={yellowState.rolled}
//             setRolledDice={(rolled) =>
//               setYellowState((prev) => ({ ...prev, rolled: rolled as number[] }))
//             }
//             diceRolled={yellowState.rolledFlags}
//             setDiceRolled={(rolledFlags) =>
//               setYellowState((prev) => ({ ...prev, rolledFlags: rolledFlags as boolean[] }))
//             }
//             diceDropped={yellowState.droppedFlags}
//             setDiceDropped={(droppedFlags) =>
//               setYellowState((prev) => ({ ...prev, droppedFlags: droppedFlags as boolean[] }))
//             }
//             currentTotal={yellowState.current}
//             setCurrentTotal={(current) =>
//               setYellowState((prev) => ({ ...prev, current: current as number }))
//             }
//             totalNeeded={yellowState.total}
//           />
//           <DiceComponent
//             color="blue"
//             diceFaces={diceFaces.blue}
//             diceAmount={blueDiceAmount}
//             rolledDice={blueState.rolled}
//             setRolledDice={(rolled) =>
//               setBlueState((prev) => ({ ...prev, rolled: rolled as number[] }))
//             }
//             diceRolled={blueState.rolledFlags}
//             setDiceRolled={(rolledFlags) =>
//               setBlueState((prev) => ({ ...prev, rolledFlags: rolledFlags as boolean[] }))
//             }
//             diceDropped={blueState.droppedFlags}
//             setDiceDropped={(droppedFlags) =>
//               setBlueState((prev) => ({ ...prev, droppedFlags: droppedFlags as boolean[] }))
//             }
//             currentTotal={blueState.current}
//             setCurrentTotal={(current) =>
//               setBlueState((prev) => ({ ...prev, current: current as number }))
//             }
//             totalNeeded={blueState.total}
//           />
//           <DiceComponent
//             color="black"
//             diceFaces={diceFaces.black}
//             diceAmount={blackDiceAmount}
//             rolledDice={blackState.rolled}
//             setRolledDice={(rolled) =>
//               setBlackState((prev) => ({ ...prev, rolled: rolled as number[] }))
//             }
//             diceRolled={blackState.rolledFlags}
//             setDiceRolled={(rolledFlags) =>
//               setBlackState((prev) => ({ ...prev, rolledFlags: rolledFlags as boolean[] }))
//             }
//             diceDropped={blackState.droppedFlags}
//             setDiceDropped={(droppedFlags) =>
//               setBlackState((prev) => ({ ...prev, droppedFlags: droppedFlags as boolean[] }))
//             }
//             currentTotal={blackState.current}
//             setCurrentTotal={(current) =>
//               setBlackState((prev) => ({ ...prev, current: current as number }))
//             }
//             totalNeeded={blackState.total}
//           />
//           <DiceComponent
//             color="pink"
//             diceFaces={diceFaces.pink}
//             diceAmount={pinkDiceAmount}
//             rolledDice={pinkState.rolled}
//             setRolledDice={(rolled) =>
//               setPinkState((prev) => ({ ...prev, rolled: rolled as number[] }))
//             }
//             diceRolled={pinkState.rolledFlags}
//             setDiceRolled={(rolledFlags) =>
//               setPinkState((prev) => ({ ...prev, rolledFlags: rolledFlags as boolean[] }))
//             }
//             diceDropped={pinkState.droppedFlags}
//             setDiceDropped={(droppedFlags) =>
//               setPinkState((prev) => ({ ...prev, droppedFlags: droppedFlags as boolean[] }))
//             }
//             currentTotal={pinkState.current}
//             setCurrentTotal={(current) =>
//               setPinkState((prev) => ({ ...prev, current: current as number }))
//             }
//             totalNeeded={pinkState.total}
//           />
//         </div>
//       </div>

//       <div className="text-white" onClick={onDefeat}>
//         Cancel
//       </div>
//     </EncounterBase>
//   );
// };

// export default EncounterCard;