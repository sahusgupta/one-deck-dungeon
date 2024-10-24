import { Game } from "./Game";
import { Player } from "./Player";

export class JSONHelper {
    public static stringifiedGame(game: Game) : string {
        const jsonRep = { //seperator sequence, from shallowest to deepest: , - | * # ^
            "active": game.active,
            "playerList": [
                
            ]
            "dungeon": game.dungeon.name,
            "potions": game.potions,
            "level": game.level,
            "playerNum": game.playerNum,
            "chatLog": game.chatLog.join(","),
            "activeEncounterRuntime": game.activeEncounterRuntime == undefined ? "" : [

            ].join(",")
        }
    }
}