import { Dungeon } from "../Dungeon/Dungeon";
import { Encounter } from "../Encounter/Encounter";
import { Player } from "./Player";

export class Game {
    private _active: boolean = false;
    public get active(): boolean { return this._active; }
    public set active(value: boolean) { this._active = value; }
    private _playerList: Array<Player>;
    private _dungeon: Dungeon;
    public get dungeon(): Dungeon {return this._dungeon;}
    public set dungeon(value: Dungeon) {this._dungeon = value;}
    private _gameId: string | null;
    public get gameId(): string | null { return this._gameId; }
    public set gameId(value: string | null) { this._gameId = value; }
    private _potions: number;
    public get potions(): number { return this._potions; }
    public set potions(value: number) { this._potions = value; }
    private _level: number;
    public get level(): number { return this._level; }
    public set level(value: number) { this._level = value; }
    private _playerNum: number;
    public get playerNum(): number { return this._playerNum; }
    public set playerNum(value: number) { this._playerNum = value; }
    
    private static _instance : Game;
  
    public constructor(gameId: string | null, dungeon: Dungeon, players: Array<string>) {
        this.active = true;
        this._playerList = new Array<Player>();
        players.forEach(player  => {
            this._playerList.push(Player.getFromId(player));
        });
        this._dungeon = dungeon;
        this._gameId = gameId;
        this._potions = 1;
        this._level = 1;
        this._playerNum = this._playerList.length;
    }
    //HANDLES ALL NETWORKING AND CROSS COMMUNICATION

    public static getInstance() : Game {
        return this._instance;
    }

    public static createGame(gameId: string | null, dungeon: Dungeon, players: Array<string>) : void {
        this._instance = new Game(gameId, dungeon, players);
    }

    public printSetup() : void {
        let ret : string = "";

        ret += "Players: ";

        for (var i = 0; i < this._playerList.length; i++) {
            // console.log("iterating");
            ret += this._playerList[i].id + (i != this._playerList.length - 1 ? ", " : "");
        }

        ret += "\n";
        ret += 
            "GameID: " + this._gameId + "\n" +
            "Dungeon Boss: " + this._dungeon.boss.name + "\n" +
            "Floor 0 Encounter Sequence: \n";
        for (var o = 0; o < this._dungeon.floors[0].deck.length; o++) {
            ret += " - " + this._dungeon.floors[0].deck[o].name + "\n";
        }

    }

    
    
}
