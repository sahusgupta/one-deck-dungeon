import { Dice } from "./Dice";

class DiceBox {
    neededRoll: number;
    constrainedToOne: boolean;
    requiredToFill: boolean;
    heldDice: number

    constructor(need: number, constrained: boolean, required: boolean){
        this.neededRoll = need;
        this.constrainedToOne = constrained;
        this.requiredToFill = required;
        this.heldDice = 0;
    }

    getNeededRoll(): number{return this.neededRoll;}
    getConstrainedToOne(): boolean{return this.constrainedToOne}
    getRequiredToFill(): boolean{return this.requiredToFill}
    getheldDice(): number{return this.heldDice;}
    setNeededRoll(n: number): void {this.neededRoll = n}
    setConstrainedToOne(b: boolean): void {this.constrainedToOne = b}
    setRequiredToFill(b: boolean): void {this.requiredToFill = b}
    setHeldDice(n: number): void {this.heldDice = n}

    addDice(dice: Dice){
        this.neededRoll -= dice.value;
        this.heldDice += 1;
    }
}

export {DiceBox};