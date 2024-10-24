import { Dungeon } from "../Dungeon/Dungeon";
import { Encounter } from "../Encounter/Encounter";
import { Hero } from "../Hero/Hero";
import { Player } from "./Player";
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../backend/firebase/firebase_utils';
import { EncounterRuntime } from "./EncounterRuntime";
import { JSONHelper } from "./JSONHelper";

export class Game {

    private _gameId: string | null;
    public get gameId(): string | null { return this._gameId; }
    public set gameId(value: string | null) { this._gameId = value; }
    
    private _active: boolean = false;
    public get active(): boolean { return this._active; }
    public set active(value: boolean) { this._active = value; }

    private _playerList: Array<Player>;
    public get playerList(): Array<Player> {return this._playerList;}
    public set playerList(value: Array<Player>) {this._playerList = value;}

    private _dungeon: Dungeon;
    public get dungeon(): Dungeon {return this._dungeon;}
    public set dungeon(value: Dungeon) {this._dungeon = value;}

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
    public get chatLog(): Array<string> {return this._chatLog;}
    public set chatLog(value: Array<string>) {this._chatLog = value;}

    private _activeEncounterRuntime: EncounterRuntime | undefined; //undefined runtime means you arent fighting
    public get activeEncounterRuntime(): EncounterRuntime | undefined {return this._activeEncounterRuntime;}
    public set activeEncounterRuntime(value: EncounterRuntime | undefined) {this._activeEncounterRuntime = value;}

    private _workspace: Array<[Encounter, boolean]>;
    public get workspace(): Array<[Encounter, boolean]> {return this._workspace;}
    public set workspace(value: Array<[Encounter, boolean]>) {this._workspace = value;}

    private _deck: Array<Encounter>;
    public get deck(): Array<Encounter> {return this._deck;}
    public set deck(value: Array<Encounter>) {this._deck = value;}

    private _discard: Array<Encounter>;
    public get discard(): Array<Encounter> {return this._discard;}
    public set discard(value: Array<Encounter>) {this._discard = value;}
    
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
        this._activeEncounterRuntime = undefined;

        this._workspace = new Array<[Encounter, boolean]>(
            [Encounter.EmptyEncounter, false],
            [Encounter.EmptyEncounter, false],
            [Encounter.EmptyEncounter, false],
            [Encounter.EmptyEncounter, false]
        );

        this._discard = new Array<Encounter>();
        this._deck = Array.from<Encounter>(Encounter.encounterList);
        this.shuffle(this._deck);
    }

    //HANDLES ALL NETWORKING AND CROSS COMMUNICATION

    private shuffle(array : Array<Encounter>) {
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
          } 
          return array; 
    }

    public burn(num : number) {
        for (let i : number = 0; i < num ; i++) {
            this._discard.push(this._deck.pop() ?? Encounter.EmptyEncounter);
        }
    }

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
        for (var o = 0; o < this.deck.length; o++) {
            ret += " - " + this.deck[o].name + "\n";
        }

    }
    //ARRAYS: COMMA SEPERATED NO SPACES Ex: "turtle,frog,fox,monkey"
    //TUPLE ARRAYS: DASH SEPERATES TUPLE ITEMS, COMMA SEPERATED Ex: "turtle-2,frog-1,fox-3,monkey-4" 
    public pushToFirebase(gameId: number) {
        console.log(JSONHelper.stringifiedGame(this));
    }

    // public pullFromFirebase(gameId: number) { //this is hard bc it involved parsing literally every value from firebase

    // }

}
