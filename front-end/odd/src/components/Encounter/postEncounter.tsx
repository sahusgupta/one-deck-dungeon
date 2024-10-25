import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { Game } from "../../middle-end/RuntimeFiles/Game";
import { Encounter } from "../../middle-end/Encounter/Encounter";
import cloneDeep from "lodash/cloneDeep";

interface PostEncounterModalProps {
  isOpen: boolean;
  onClose: (gameInstanceExport : Game) => void;
  gameInstanceImport: Game;
}

const PostEncounterModal: React.FC<PostEncounterModalProps> = ({ 
  isOpen, 
  onClose, 
  gameInstanceImport 
}) => {
    const [gameInstance, updateGameInstance] = useState<Game>(gameInstanceImport);

    const updateGameEasy = () => {
      updateGameInstance(cloneDeep(gameInstance));
    };

    useEffect(() => {
      gameInstance.pushToFirebase();
    }, [gameInstance]);

    // Handle changes in damage allocation
    const handleDamageChange = (playerIndex: number, value: number) => {
      gameInstance.activeEncounterRuntime?.updateDamageDistribution(playerIndex, value);
      updateGameEasy();
    };

    // Check if player can add item
    const canAddItem = () => {
      const player = gameInstance.findPlayer();
      const isTwoPlayer = gameInstance.playerNum === 2;
      const level : number = gameInstance.level;
      const subtractor: number = 
        level == 1 ? 1 : 
        level == 2 ? 3 :
        level == 3 ? 3 :
        level == 4 ? 5 : 1;
      let ret : boolean = player ? (player.items.length-subtractor) < player.getItemLimit(gameInstance.level, isTwoPlayer) : false;
      return ret;
    };

    // Check if player can add skill
    const canAddSkill = () => {
      const player = gameInstance.findPlayer();
      const isTwoPlayer = gameInstance.playerNum === 2;
      let ret : boolean = player ? (player.skills.length-2) < player.getSkillLimit(gameInstance.level, isTwoPlayer) : false;
      return ret;
    };

    // Handle changes in reward selection
    const handleRewardChange = (rewardType: number) => {
      if (gameInstance.activeEncounterRuntime?.rewardDecision) {
        gameInstance.activeEncounterRuntime.rewardDecision[0] = rewardType;
      }
      updateGameEasy();
    };

    // Function to apply punishments and rewards
    const applyPunishmentAndReward = (playerIndex: number) => {
      if (
        gameInstance.activeEncounterRuntime?.punishmentDecision == undefined || 
        gameInstance.activeEncounterRuntime?.rewardDecision == undefined
      ) {
        return;
      }
      const rewardDecision = gameInstance.activeEncounterRuntime.rewardDecision;
      const punishmentDecision = gameInstance.activeEncounterRuntime.punishmentDecision;

      rewardDecision[1] = gameInstance.playerList[playerIndex];
      gameInstance.playerList[0].damageInc(punishmentDecision[1]);
      if (gameInstance.playerList.length > 1) {
        gameInstance.playerList[1].damageInc(punishmentDecision[2]);
      }

      // Burn time (discard cards)
      gameInstance.burn(punishmentDecision[0]);

      // Handle reward logic based on rewardType
      switch (rewardDecision[0]) {
        case 0:
          // Add encounter's XP to the game's XP
          gameInstance.xp += gameInstance.activeEncounterRuntime.encounter.xp;
          break;
        case 1:
          // Add the encounter's item to the player's items, if allowed
          const encounterItem = gameInstance.activeEncounterRuntime?.encounter.item;
          if (encounterItem && canAddItem()) {
            rewardDecision[1].items.push(encounterItem);
            rewardDecision[1].defeatedEncounters.push([gameInstance.activeEncounterRuntime.encounter, true]);
          }
          break;
        case 2:
          // Add the encounter's skill to the player's skills, if allowed
          const encounterSkill = gameInstance.activeEncounterRuntime?.encounter.skill;
          if (encounterSkill && canAddSkill()) {
            rewardDecision[1].skills.push(encounterSkill);
            rewardDecision[1].defeatedEncounters.push([gameInstance.activeEncounterRuntime.encounter, false]);
          }
          break;
        default:
          break;
      }
      gameInstance.workspace[gameInstance.activeEncounterRuntime?.workspaceIndex ?? 4][0] = Encounter.EmptyEncounter;
      gameInstance.workspace[gameInstance.activeEncounterRuntime?.workspaceIndex ?? 4][1] = false;

      updateGameEasy();
      onClose(gameInstance);
    };

    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => {onClose(gameInstance)}}
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
                    value={gameInstance.activeEncounterRuntime?.punishmentDecision?.[1]}
                    onChange={(e) => handleDamageChange(0, parseInt(e.target.value))}
                    min="0"
                    max={gameInstance.activeEncounterRuntime?.maxDamage()}
                  />
                </div>
                {/* Player 2 Damage Input (if applicable) */}
                {gameInstance.playerList.length > 1 && (
                  <div className="flex items-center">
                    <label className="w-1/3">Player 2 Damage:</label>
                    <input
                      type="number"
                      className="w-2/3 bg-gray-700 rounded px-2 py-1"
                      value={gameInstance.activeEncounterRuntime?.punishmentDecision?.[2]}
                      onChange={(e) => handleDamageChange(1, parseInt(e.target.value))}
                      min="0"
                      max={gameInstance.activeEncounterRuntime?.maxDamage()}
                    />
                  </div>
                )}
                {/* Remaining Damage Display */}
              </div>
            </div>
            {/* Reward Selection */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Select Reward</h3>
              <select
                value={gameInstance.activeEncounterRuntime?.rewardDecision?.[0]}
                onChange={(e) => {
                  handleRewardChange(parseInt(e.target.value))
                }}
                className="bg-gray-700 rounded px-2 py-1 w-full"
              >
                <option value="0">XP</option>
                {canAddItem() && <option value="1">Item</option>}
                {canAddSkill() && <option value="2">Skill</option>}
              </select>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {applyPunishmentAndReward(0)}}
                className={`px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition duration-200`}
              >
                Apply{gameInstance.playerList.length > 1 ? " for P1" : ""}
              </button>
            </div>
            {gameInstance.playerList.length > 1 && (<div className="flex justify-end space-x-4">
              <button
                onClick={() => {applyPunishmentAndReward(1)}}
                className={`px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition duration-200`}
              >
                Apply{gameInstance.playerList.length > 1 ? " for P2" : ""}
              </button>
            </div>)}
          </div>
        </Modal>
      );
    };
    
    export default PostEncounterModal;