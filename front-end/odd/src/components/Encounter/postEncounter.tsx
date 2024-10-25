//postEncounter modal 
import React, { useState } from "react";
import Modal from 'react-modal';
import { Game } from "../../middle-end/RuntimeFiles/Game";
import { Encounter } from "../../middle-end/Encounter/Encounter";

interface PostEncounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameInstance: Game;
}

const PostEncounterModal: React.FC<PostEncounterModalProps> = ({ isOpen, onClose, gameInstance }) => {
    // State variables for damage allocation and reward selection
    const [playerOneDamage, setPlayerOneDamage] = useState(0);
    const [playerTwoDamage, setPlayerTwoDamage] = useState(0);
    const [rewardType, setRewardType] = useState("XP");
  
    // Get total punishment from the encounter
    const totalPunishment = gameInstance.activeEncounterRuntime?.calculatePunishment();
    console.log(totalPunishment);
    const totalDamage = totalPunishment ? totalPunishment[0] : 0;
    const totalTimeBurnt = totalPunishment ? totalPunishment[1] : 0;

    // Handle changes in damage allocation
    const handleDamageChange = (playerIndex: number, value: number) => {
      if (playerIndex === 0) {
        setPlayerOneDamage(value);
      } else {
        setPlayerTwoDamage(value);
      }
    };
  
    // Handle changes in reward selection
    const handleRewardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setRewardType(event.target.value);
    };
  
    // Calculate remaining damage to allocate
    const remainingDamage = totalDamage - playerOneDamage - playerTwoDamage;
  
    // Determine if the "Apply" button should be disabled
    const isApplyDisabled = remainingDamage > 0;
  
    // Function to apply punishments and rewards
    const applyPunishmentAndReward = () => {
      if (totalPunishment) {
        // Apply damage to players
        gameInstance.playerList[0].damageInc(playerOneDamage);
        if (gameInstance.playerList.length > 1) {
          gameInstance.playerList[1].damageInc(playerTwoDamage);
        }
  
        // Burn time (discard cards)
        gameInstance.burn(totalTimeBurnt);
      }

      // Handle reward logic based on rewardType
      switch (rewardType) {
        case "XP":
          // Add encounter's XP to the game's XP
          gameInstance.xp += gameInstance.activeEncounterRuntime?.encounter.xp || 0;
          console.log(gameInstance.xp)
          break;
        case "Item":
          // Add the encounter's item to the player's items
          const encounterItem = gameInstance.activeEncounterRuntime?.encounter.item;
          if (encounterItem) {
            gameInstance.playerList[0].items.push(encounterItem);
          }
          if(gameInstance.activeEncounterRuntime){
            gameInstance.playerList[0].defeatedEncounters.push([gameInstance.activeEncounterRuntime.encounter, true])
          }
          break;
        case "Skill":
          // Placeholder for skill logic
          const skillItem = gameInstance.activeEncounterRuntime?.encounter.skill;
          if (skillItem) {
            gameInstance.playerList[0].skills.push(skillItem);
          }
          if(gameInstance.activeEncounterRuntime){
            gameInstance.playerList[0].defeatedEncounters.push([gameInstance.activeEncounterRuntime.encounter, false])
          }
          break;
        default:
          break;
      }
      gameInstance.workspace[gameInstance.activeEncounterRuntime?.workspaceIndex ?? 4][0] = Encounter.EmptyEncounter;
      gameInstance.workspace[gameInstance.activeEncounterRuntime?.workspaceIndex ?? 4][1] = false;
      console.log(gameInstance.workspace);
      onClose();
    };
    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Post Encounter Modal"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
          className="bg-gray-800 rounded-lg p-6 w-1/2 mx-auto text-white transform transition-transform duration-300"
        >
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center">Post Encounter Actions</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Distribute Damage</h3>
              <div className="space-y-4">
                {/* Player 1 Damage Input */}
                <div className="flex items-center">
                  <label className="w-1/3">Player 1 Damage:</label>
                  <input
                    type="number"
                    className="w-2/3 bg-gray-700 rounded px-2 py-1"
                    value={playerOneDamage}
                    onChange={(e) => handleDamageChange(0, parseInt(e.target.value))}
                    min="0"
                    max={totalDamage}
                  />
                </div>
                {/* Player 2 Damage Input (if applicable) */}
                {gameInstance.playerList.length > 1 && (
                  <div className="flex items-center">
                    <label className="w-1/3">Player 2 Damage:</label>
                    <input
                      type="number"
                      className="w-2/3 bg-gray-700 rounded px-2 py-1"
                      value={playerTwoDamage}
                      onChange={(e) => handleDamageChange(1, parseInt(e.target.value))}
                      min="0"
                      max={totalDamage}
                    />
                  </div>
                )}
                {/* Remaining Damage Display */}
                <div className="text-right">
                  Remaining Damage to Allocate: {remainingDamage}
                </div>
              </div>
            </div>
            {/* Reward Selection */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Select Reward</h3>
              <select
                value={rewardType}
                onChange={handleRewardChange}
                className="bg-gray-700 rounded px-2 py-1 w-full"
              >
                <option value="XP">XP</option>
                <option value="Item">Item</option>
                <option value="Skill">Skill</option>
              </select>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={applyPunishmentAndReward}
                disabled={isApplyDisabled}
                className={`px-4 py-2 ${
                  isApplyDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                } text-white rounded transition duration-200`}
              >
                Apply
              </button>
            </div>
          </div>
        </Modal>
      );
    };
    
    export default PostEncounterModal;
    