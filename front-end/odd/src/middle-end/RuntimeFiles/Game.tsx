import { Dungeon } from "../Dungeon/Dungeon";
import { Encounter } from "../Encounter/Encounter";
import { Hero } from "../Hero/Hero";
import { Player } from "./Player";
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../backend/firebase/firebase_utils';

export class Game {
    private _active: boolean = false;
    public get active(): boolean { return this._active; }
    public set active(value: boolean) { this._active = value; }
    private _playerList: Array<Player>;
    public get playerList(): Array<Player> {
        return this._playerList;
    }
    public set playerList(value: Array<Player>) {
        this._playerList = value;
    }
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

    private _chatLog: Array<string>;
    public get chatLog(): Array<string> {
        return this._chatLog;
    }
    public set chatLog(value: Array<string>) {
        this._chatLog = value;
    }

    private _activeEncounter: [Encounter, number]; //the active encounter, and its index in workspace
    public get activeEncounter(): [Encounter, number] {
        return this._activeEncounter;
    }
    public set activeEncounter(value: [Encounter, number]) {
        this._activeEncounter = value;
    }
    
    private static _instance : Game;
  
    public constructor(gameId: string | null, dungeon: Dungeon, players: Array<string>, heros: Array<string>) {
        this.active = true;
        this._playerList = new Array<Player>();
        players.map((player : string, index : number)  => {
            this._playerList.push(Player.getFromId(player, Hero.findHero(heros[index], players.length == 1 ? "1P" : "2P")));
        });
        this._dungeon = dungeon;
        this._gameId = gameId;
        this._potions = 1;
        this._level = 1;
        this._playerNum = this._playerList.length;
        this._chatLog = new Array<string>();
        this._activeEncounter = [Encounter.EmptyEncounter, 4];
    }
    //HANDLES ALL NETWORKING AND CROSS COMMUNICATION

    public static getInstance() : Game {
        return this._instance;
    }

    public static createGame(gameId: string | null, dungeon: Dungeon, players: Array<string>, heros: Array<string>) : void {
        this._instance = new Game(gameId, dungeon, players, heros);
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
    //ARRAYS: COMMA SEPERATED NO SPACES Ex: "turtle,frog,fox,monkey"
    //TUPLE ARRAYS: DASH SEPERATES TUPLE ITEMS, COMMA SEPERATED Ex: "turtle-2,frog-1,fox-3,monkey-4" 
    public async pushToFirebase(gameId: number) {
        if (gameId) {
            await setDoc(doc(db, "games", gameId.toString()), {
              gameId: gameId,
              dungeon: this._dungeon.name,
              players: this._playerList.map(player => player.id).join(","), //TODO
              boss: dungeon.boss.name,
              deck: dungeon.floors[0].deck.map(card => card.name).join(", "),
              hero1: characterSelected,
              player1dice: [],
              player2dice: []
            });
          } else {
            console.error("gameId is null");
          }
    }

    public pullFromFirebase(gameId: number) { //this is hard bc it involved parsing literally every value from firebase

    }

}
