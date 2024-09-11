import { Dungeon } from "../Dungeon/Dungeon";
import { Player } from "./Player";

export class Game {
    private _playerList: Array<Player>;
    private _dungeon: Dungeon;
    private _gameId: string;
    private _potions: number;
    private _level: number;
    private _playerNum: number;
  
    public constructor(gameId: string, dungeon: Dungeon, players: Array<string>, playerNum: number) {
        this._playerList = new Array<Player>();
        players.forEach(player  => {
            this._playerList.concat(Player.getFromId(player));
        });
        this._dungeon = dungeon;
        this._gameId = gameId;
        this._potions = 1;
        this._level = 1;
        this._playerNum = playerNum;
    }

    //HANDLES ALL NETWORKING AND CROSS COMMUNICATION
    
}
