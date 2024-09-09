import { DiceBox } from "../Dice/DiceBox";
import { Encounter } from "../Encounter/Encounter";

export class Floor {

    private _debuff: Debuff;
    private _perilBoxes: Array<DiceBox>;
    private _combatBoxes: Array<DiceBox>;
    private _deck: Array<Encounter>;
    private _discard: Array<Encounter>;
    private _workspace: Array<[Encounter, boolean]>;

    constructor(debuff: Debuff, perilBoxes: Array<DiceBox>, combatBoxes: Array<DiceBox>) {
        this._debuff = debuff;
        this._perilBoxes = perilBoxes;
        this._combatBoxes = combatBoxes;

        this._discard = new Array<Encounter>();
        this._workspace = new Array<[Encounter, boolean]>();
        //needs to initialize deck,
    }
}