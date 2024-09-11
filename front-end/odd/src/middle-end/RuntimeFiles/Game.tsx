import { Dungeon } from "../Dungeon/Dungeon";
import { Player } from "./Player";

export class Game {
    private _playerList: Array<Player>;
    private _dungeon: Dungeon;
    private _gameId: string;
    private _potions: number;
  
    public constructor(gameId: string, dungeon: Dungeon, players: Array<string>) {
        this._playerList = new Array<Player>();
        players.forEach(player  => {
            this._playerList.concat(Player.getFromId(player));
        });
        this._dungeon = dungeon;
        this._gameId = gameId;
        this._potions = 1;
    }
    
}
