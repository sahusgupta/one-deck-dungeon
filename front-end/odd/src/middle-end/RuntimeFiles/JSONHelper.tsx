import { Game } from "./Game";

export class JSONHelper {
    public static stringifiedGame(game: Game) : any {
        const jsonRep = { //seperator sequence, from shallowest to deepest: , - | * # ^
            active: game.active,
            playerList: game.playerList.map(p => ({
                id: p.id,
                skills: p.skills.map(s => s.name),
                items: p.items.map(i => ({
                    values: i.values
                })),
                defeatedEncounters: p.defeatedEncounters.map(d => ({
                    encounter: d[0].name,
                    isItem: d[1]
                })),
                hero: p.hero.heroName
            })),
            dungeon: game.dungeon.name,
            potions: game.potions,
            level: game.level,
            playerNum: game.playerNum,
            chatLog: game.chatLog,
            activeEncounterRuntime: game.activeEncounterRuntime ? {  
                encounter: game.activeEncounterRuntime.encounter.name,
                workspaceIndex: game.activeEncounterRuntime.workspaceIndex,
                availableDice: game.activeEncounterRuntime.availableDice.map(a => ({
                    dice: [a[0].type, a[0].value ?? 0, a[0].idNum],
                    used: a[1]
                })),
                diceInBox: game.activeEncounterRuntime.diceInBox.map(a => ({
                    dice: [a[0].type, a[0].value ?? 0, a[0].idNum],
                    contribution: a[1],
                    box: [
                        a[2].neededRoll, 
                        a[2].type, 
                        a[2].constrainedToOne, 
                        a[2].punishmentTime,
                        a[2].punishmentHearts,
                        a[2].idNum
                    ]
                })),
                necessaryDice: game.activeEncounterRuntime.necessaryDiceboxes.map(a => ({
                    box: [
                        a.neededRoll, 
                        a.type, 
                        a.constrainedToOne, 
                        a.punishmentTime,
                        a.punishmentHearts,
                        a.idNum
                    ]
                }))

            } : {},
            workspace: game.workspace.map(w => ({
                encounter: w[0].name,
                revealed: w[1]
            })),
            deck: game.deck.map(d => d.name),
            discard: game.discard.map(d => d.name)
        }
        return jsonRep;

    }
}