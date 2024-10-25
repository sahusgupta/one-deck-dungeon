import { Dungeon } from "../Dungeon/Dungeon";
import { Encounter } from "../Encounter/Encounter";
import { Hero } from "../Hero/Hero";
import { Player } from "./Player";
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../backend/firebase/firebase_utils';
import { EncounterRuntime } from "./EncounterRuntime";
import { Dice } from "../Dice/Dice";
import { DiceBox } from "../Dice/DiceBox";
import { Item } from "../Loot/Item";
import { Skill } from "../Loot/Skill";

export class Game {

    private _gameId: string | undefined;
    public get gameId(): string | undefined { return this._gameId; }
    public set gameId(value: string | undefined) { this._gameId = value; }
    
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

    private _xp: number;
    public get xp(): number { return this._xp; }
    public set xp(value: number) {
        this._xp = value;
        if (this._xp >= 6 && this._level === 1) {
            this._xp -= 6;
            this.level = 2;
            this._potions += 1;
            const newItem = new Item([1, 0, 0, 0]);
            this.findPlayer()?.items.push(newItem);
            this.findPlayer()?.items.push(newItem);
        }
        if (this._xp >= 8 && this._level === 2) {
            this._xp -= 8;
            this.level = 3;
            this._potions += 1;
        }
        if (this._xp >= 10 && this._level === 3) {
            this._xp -= 10;
            this.level = 4;
            this._potions += 1;
            const newItem = new Item([1, 0, 0, 0]);
            this.findPlayer()?.items.push(newItem);
            this.findPlayer()?.items.push(newItem);
        }
        if (this._level === 4) {
            while (this._xp >= 5) {
                this._xp -= 5;
                this._potions += 1;
            }
        }
    }

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
  
    public constructor(gameId: string | undefined, dungeon: Dungeon, players: Array<string>, heros: Array<string>) {
        this.active = true;
        this._playerList = new Array<Player>();
        players.map((player : string, index : number)  => {
            this._playerList.push(Player.getFromId(player, Hero.findHero(heros[index], players.length == 1 ? "1P" : "2P")));
        });
        this._dungeon = dungeon;
        this._gameId = gameId;
        this._potions = 1;
        this._level = 1;
        this._xp = 0;
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
    public findPlayer(){
        const credentials = localStorage.getItem("credentials");
            if (!credentials) return undefined;
    
        const player = this._playerList.find(p => p.id === credentials);
        return player;
    }
    public usePotion(inPlayPage: boolean) {
        if(this.potions>=1){
            const credentials = localStorage.getItem("credentials");
            if (!credentials) return;
    
            const player = this._playerList.find(p => p.id === credentials);
            if (!player) return;
    
            if (inPlayPage) {
                console.log(player.damage)
                player.damage = Math.max(0, player.damage - 3);
            } else {
                player.damage = Math.max(0, player.damage - 2);
            }
            this.potions-=1;
        }
    }
    public static getInstance() : Game {
        return this._instance;
    }

    public static createGame(gameId: string | undefined, dungeon: Dungeon, players: Array<string>, heros: Array<string>) : void {
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
    public async pushToFirebase() {
        if (this._gameId) {
          await setDoc(doc(db, "games", this._gameId.toString()), this.stringifyGame());
        } else {
          console.error("gameId is null");
        }
      }
      

    public async pullFromFirebase() { //this is hard bc it involved parsing literally every value from firebase
        if (this._gameId) {
            const gameRef = doc(db, "games", this._gameId.toString());
            const gameSnap = await getDoc(gameRef);
            if (gameSnap.exists()) {
              const gamedata = gameSnap.data();
              this.updateGame(gamedata);
            }    
        }
    }
    public static initializeFromGameData(gameData: any): Game {
        const players = localStorage.getItem("playerCount") === "1P" ? [localStorage.getItem("credentials") || "playerDNE"] : [localStorage.getItem("credentials") || "playerDNE", "fillerID"];
    const charactersSelected : Array<string> = [localStorage.getItem("characterSelected") || "Warrior", "Aquamancer"] //need to expand for 2P somehow
        Game.createGame(localStorage.getItem("gameId") || undefined, Dungeon.findDungeon(gameData.dungeon), players, charactersSelected);
        const gameInstance = Game.getInstance();
        gameInstance.updateGame(gameData);
        return gameInstance;
    }

    public updateGame(gameData: any) {
        this._active = gameData.active;
    
        // Update playerList
        this._playerList = gameData.playerList.map((pData: any) => {
            // Find the hero associated with the player
            let hero = Hero.findHero(pData.hero, this._playerList.length === 1 ? "1P" : "2P");
    
            // Create a new Player instance
            let player = Player.getFromId(pData.id, hero);
    
            // Assign skills to the player
            player.skills = pData.skills.map((skillName: string) => Skill.findSkill(skillName));
    
            // Assign items to the player
            player.items = pData.items.map((itemData: any) => new Item(itemData.values));
    
            // Assign defeated encounters
            player.defeatedEncounters = pData.defeatedEncounters.map((d: any) => {
                let encounter = Encounter.findEncounter(d.encounter);
                return [encounter, d.isItem];
            });
    
            // Assign damage
            player.damage = pData.damage;
    
            return player;
        });
    
        // Update dungeon
        this._dungeon = Dungeon.findDungeon(gameData.dungeon);
        this._dungeon.currFloor = gameData.currFloor;
    
        // Update simple properties
        this._potions = gameData.potions;
        this._level = gameData.level;
        this._xp = gameData.xp;
        this._playerNum = gameData.playerNum;
        this._chatLog = gameData.chatLog;

    
        // Update activeEncounterRuntime if it exists
        if (gameData.activeEncounterRuntime && Object.keys(gameData.activeEncounterRuntime).length > 0) {
            let encounter = Encounter.findEncounter(gameData.activeEncounterRuntime.encounter);
            let workspaceIndex = gameData.activeEncounterRuntime.workspaceIndex;
    
            // Reconstruct availableDice
            let availableDice = gameData.activeEncounterRuntime.availableDice.map((a: any) => {
                let [type, value, idNum] = a.dice;
                let dice = new Dice(type, value, idNum);
                let used = a.used;
                return [dice, used];
            });
    
            // Reconstruct diceInBox
            let diceInBox = gameData.activeEncounterRuntime.diceInBox.map((a: any) => {
                let [type, value, idNum] = a.dice;
                let dice = new Dice(type, value, idNum);
                let contribution = a.contribution;
                let [neededRoll, boxType, constrainedToOne, punishmentTime, punishmentHearts, boxIdNum] = a.box;
                let box = new DiceBox(neededRoll, boxType, constrainedToOne, punishmentTime, punishmentHearts, boxIdNum);
                return [dice, contribution, box];
            });
    
            // Reconstruct necessaryDiceboxes
            let necessaryDiceboxes = gameData.activeEncounterRuntime.necessaryDice.map((a: any) => {
                let [neededRoll, boxType, constrainedToOne, punishmentTime, punishmentHearts, boxIdNum] = a.box;
                return new DiceBox(neededRoll, boxType, constrainedToOne, punishmentTime, punishmentHearts, boxIdNum);
            });

            // let rewardDecision = gameData.activeEncounterRuntime ? [
            //     gameData.activeEncounterRuntime.rewardDecision.type,

            // ]
    
            // Create the EncounterRuntime
            this._activeEncounterRuntime = new EncounterRuntime(
                this._dungeon, 
                encounter, 
                this._playerList, 
                workspaceIndex, 
                [
                    availableDice,
                    diceInBox,
                    necessaryDiceboxes
                ]
            );
        } else {
            this._activeEncounterRuntime = undefined;
        }
    
        // Update workspace
        this._workspace = gameData.workspace.map((w: any) => {
            let encounter = Encounter.findEncounter(w.encounter);
            let revealed = w.revealed;
            return [encounter, revealed];
        });
    
        // Update deck and discard
        this._deck = gameData.deck.map((d: string) => Encounter.findEncounter(d));
        this._discard = gameData.discard.map((d: string) => Encounter.findEncounter(d));
    }
    

    private stringifyGame() : any {
        return { //seperator sequence, from shallowest to deepest: , - | * # ^
            active: this.active,
            playerList: this.playerList.map(p => ({
                id: p.id,
                skills: p.skills.map(s => s.name),
                items: p.items.map(i => ({
                    values: i.values
                })),
                defeatedEncounters: p.defeatedEncounters.map(d => ({
                    encounter: d[0].name,
                    isItem: d[1]
                })),
                damage: p.damage,
                hero: p.hero.heroName
            })),
            dungeon: this.dungeon.name,
            currFloor: this.dungeon.currFloor,
            potions: this.potions,
            level: this.level,
            xp: this.xp,
            playerNum: this.playerNum,
            chatLog: this.chatLog,
            activeEncounterRuntime: this.activeEncounterRuntime ? {  
                encounter: this.activeEncounterRuntime.encounter.name,
                workspaceIndex: this.activeEncounterRuntime.workspaceIndex,
                availableDice: this.activeEncounterRuntime.availableDice.map(a => ({
                    dice: [a[0].type, a[0].value ?? 0, a[0].idNum],
                    used: a[1]
                })),
                diceInBox: this.activeEncounterRuntime.diceInBox.map(a => ({
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
                necessaryDice: this.activeEncounterRuntime.necessaryDiceboxes.map(a => ({
                    box: [
                        a.neededRoll, 
                        a.type, 
                        a.constrainedToOne, 
                        a.punishmentTime,
                        a.punishmentHearts,
                        a.idNum
                    ]
                })),
                rewardDecision: this.activeEncounterRuntime.rewardDecision ? {
                    type: this.activeEncounterRuntime.rewardDecision[0],
                    playerId: this.activeEncounterRuntime.rewardDecision[1].id
                } : {},
                punishmentDecision: this.activeEncounterRuntime.punishmentDecision ? {
                    timePunishment: this.activeEncounterRuntime.punishmentDecision[0],
                    player1Punishment: this.activeEncounterRuntime.punishmentDecision[1],
                    player2Punishment: this.activeEncounterRuntime.punishmentDecision[1],
                } : {},
            } : {},
            workspace: this.workspace.map(w => ({
                encounter: w[0].name,
                revealed: w[1]
            })),
            deck: this.deck.map(d => d.name),
            discard: this.discard.map(d => d.name)
        }
    }

    public workspaceAndDeckEmpty() : boolean {
        let ret : boolean = true;
        this.workspace.forEach(w => {
            if (w[0].name != Encounter.EmptyEncounter.name) {
                ret = false;
            }
        })

        return ret && this.deck.length == 0;
    }

    public upgradeFloor() {
        this._dungeon.currFloor++;
        this._discard = new Array<Encounter>();
        this._deck = Array.from<Encounter>(Encounter.encounterList);
        this.shuffle(this._deck);
    }

}
