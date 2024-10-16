import { Dice } from "./Dice";

class DiceBox {
    private _neededRoll: number;
    public get neededRoll(): number {
        return this._neededRoll;
    }
    public set neededRoll(value: number) {
        this._neededRoll = value;
    }
    private _constrainedToOne: boolean;
    private _heldDice: number
    private _punishmentTime: number; //for bosses, any number > 0 means skull box
    private _punishmentHearts: number; //for other cards, 0 punishment means required
    private _type: number; //0 is strength, 1 is speed, 2 is magic, 3 is anything
    public get type(): number {
        return this._type;
    }
    public set type(value: number) {
        this._type = value;
    }

    constructor(need: number, type: number, constrained: boolean, punishmentTime: number, punishmentHearts : number){
        this._neededRoll = need;
        this._constrainedToOne = constrained;
        this._heldDice = 0;
        this._punishmentTime = punishmentTime;
        this._punishmentHearts = punishmentHearts;
        this._type = type;
    }

    getConstrainedToOne(): boolean{return this._constrainedToOne}
    getheldDice(): number{return this._heldDice;}
    setNeededRoll(n: number): void {this._neededRoll = n}
    setConstrainedToOne(b: boolean): void {this._constrainedToOne = b}
    setHeldDice(n: number): void {this._heldDice = n}

    addDice(dice: Dice){
        this._neededRoll -= dice.value;
        this._heldDice += 1;
    }
}

export {DiceBox};