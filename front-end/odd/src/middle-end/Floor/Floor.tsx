import { Debuff } from "../Debuff/Debuff";
import { DiceBox } from "../Dice/DiceBox";
import { Encounter } from "../Encounter/Encounter";

export class Floor {

    private _debuff: Debuff;
    public get debuff_1(): Debuff {return this._debuff;}
    public set debuff_1(value: Debuff) {this._debuff = value;}
    
    private _perilBoxes: Array<DiceBox>;
    public get perilBoxes(): Array<DiceBox> {return this._perilBoxes;}
    public set perilBoxes(value: Array<DiceBox>) {this._perilBoxes = value;}

    private _combatBoxes: Array<DiceBox>;
    public get combatBoxes(): Array<DiceBox> {return this._combatBoxes;}
    public set combatBoxes(value: Array<DiceBox>) {this._combatBoxes = value;}

    constructor(debuff: Debuff, perilBoxes: Array<DiceBox>, combatBoxes: Array<DiceBox>) {
        this._debuff = debuff;
        this._perilBoxes = perilBoxes;
        this._combatBoxes = combatBoxes;
    }
}