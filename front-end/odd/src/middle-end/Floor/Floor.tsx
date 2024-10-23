import { Debuff } from "../Debuff/Debuff";
import { DiceBox } from "../Dice/DiceBox";
import { Encounter } from "../Encounter/Encounter";

export class Floor {

    private _debuff: Debuff;
    private _perilBoxes: Array<DiceBox>;
    private _combatBoxes: Array<DiceBox>;

    constructor(debuff: Debuff, perilBoxes: Array<DiceBox>, combatBoxes: Array<DiceBox>) {
        this._debuff = debuff;
        this._perilBoxes = perilBoxes;
        this._combatBoxes = combatBoxes;
    }
}