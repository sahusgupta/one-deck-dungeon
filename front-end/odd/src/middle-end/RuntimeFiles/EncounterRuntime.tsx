import { Dice } from "../Dice/Dice";
import { DiceBox } from "../Dice/DiceBox";
import { Dungeon } from "../Dungeon/Dungeon";
import { Encounter } from "../Encounter/Encounter";
import { Floor } from "../Floor/Floor";
import { Hero } from "../Hero/Hero";
import { Player } from "./Player";

export class EncounterRuntime { //only creates one instance per encounter per player
  private _encounter: Encounter;
  public get encounter(): Encounter {return this._encounter;}
  public set encounter(value: Encounter) {this._encounter = value;}

  private _workspaceIndex: number;
  public get workspaceIndex(): number {return this._workspaceIndex;}
  public set workspaceIndex(value: number) {this._workspaceIndex = value;}

  private _availableDice: Array<[Dice, boolean]>; //dice, and if its used
  public get availableDice(): Array<[Dice, boolean]> {return this._availableDice;}
  public set availableDice(value: Array<[Dice, boolean]>) {this._availableDice = value;}

  private _diceInBox: Array<[Dice, number, DiceBox]>; //dice, its contribution, and the box that its in
  public get diceInBox(): Array<[Dice, number, DiceBox]> {return this._diceInBox;}
  public set diceInBox(value: Array<[Dice, number, DiceBox]>) {this._diceInBox = value;}

  private _necessaryDiceboxes: Array<DiceBox>;
  public get necessaryDiceboxes(): Array<DiceBox> {return this._necessaryDiceboxes;}
  public set necessaryDiceboxes(value: Array<DiceBox>) {this._necessaryDiceboxes = value;}

  public constructor (dungeon: Dungeon, _encounter: Encounter, players: Array<Player>, _workspaceIndex: number) {
    this._encounter = _encounter;
    this._workspaceIndex = _workspaceIndex;

    this._availableDice = new Array<[Dice, boolean]>();
    this._diceInBox = new Array<[Dice, number, DiceBox]>();
    this._necessaryDiceboxes = new Array<DiceBox>();

    players.forEach((p : Player) => {
      for (let i = 0; i < 3; i++) {
        for (let v = 0; v < p.itemSum().values[i]; v++) {
          this._availableDice.push([new Dice(i), false]);
        }
      }
    });

    dungeon.floors.map((floor : Floor, index : number) => {
      if (index <= dungeon.currFloor) {
        if (this._encounter.type == 1) { //combat
          this.necessaryDiceboxes.push(...floor.combatBoxes);
        } else if (this._encounter.type >= 2) { //peril
          this.necessaryDiceboxes.push(...floor.perilBoxes);
        } else { //boss
          //TODO
        }
      }
    });

    this.necessaryDiceboxes.push(...this._encounter.boxes);

  }

  public useDiceOnBox(dice: Dice, box: DiceBox) {
    if (this.makeDiceUsed(dice)) {
      return;
    }

    if (box.constrainedToOne) {
      this._diceInBox.forEach((value: [Dice, number, DiceBox]) => {
        if (value[0].equals(dice) || value[2].equals(box)) {
          return;
        }
      });
    }

    if ((dice.type == box.type || dice.type == 3) && dice.value) {
      this._diceInBox.push([dice, dice.value, box]);
    }
  }

  public combineDice(diceOne: Dice, diceTwo: Dice) {
    if (this.makeDiceUsed(diceOne)) {
      return;
    }

    if (this.makeDiceUsed(diceTwo)) {
      return;
    }
    if (diceOne.value && diceTwo.value) {
      this._availableDice.push([new Dice(3, Math.min(diceOne.value, diceTwo.value)), false])
    }
  }

  private makeDiceUsed(dice: Dice) : boolean { //returns true if dice alr used
    this._availableDice.forEach((d: [Dice, boolean]) => {
      if (dice.equals(d[0])) {
        if (d[1]) {
          return true;
        } else {
          d[1] = true;
        }
      }
    });
    return false;
  }

  //0: Mandatory slots not covered
  //1: Mandatory slots covered
  //2: All slots covered
  public checkState() : number { 
    this._necessaryDiceboxes.map((box: DiceBox, boxIndex: number) => {
      let neededRoll: number = box.neededRoll;
      let partialAdder: number = 0;
      this._diceInBox.map((value: [Dice, number, DiceBox], valueIndex: number) => {
        if (box.equals(value[2])) {
          partialAdder += value[1];
        }
      });

      if (partialAdder < neededRoll) {
        if (box.punishmentHearts == 0) {
          return 0;
        } else {
          return 1;
        }
      }
    });

    return 2;
  }




}