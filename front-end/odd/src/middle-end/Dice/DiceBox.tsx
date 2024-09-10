import { Dice } from "./Dice";

class DiceBox {
    _neededRoll: number;
    _constrainedToOne: boolean;
    _requiredToFill: boolean;
    _heldDice: number
    _punishmentTime: number;
    _punishmentHearts: number;

    constructor(need: number, constrained: boolean, required: boolean, punishmentTime: number, punishmentHearts : number){
        this._neededRoll = need;
        this._constrainedToOne = constrained;
        this._requiredToFill = required;
        this._heldDice = 0;
        this._punishmentTime = punishmentTime;
        this._punishmentHearts = punishmentHearts;
    }

    getNeededRoll(): number{return this._neededRoll;}
    getConstrainedToOne(): boolean{return this._constrainedToOne}
    getRequiredToFill(): boolean{return this._requiredToFill}
    getheldDice(): number{return this._heldDice;}
    setNeededRoll(n: number): void {this._neededRoll = n}
    setConstrainedToOne(b: boolean): void {this._constrainedToOne = b}
    setRequiredToFill(b: boolean): void {this._requiredToFill = b}
    setHeldDice(n: number): void {this._heldDice = n}

    addDice(dice: Dice){
        this._neededRoll -= dice.value;
        this._heldDice += 1;
    }
}

export {DiceBox};