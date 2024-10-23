import { Debuff } from "../Debuff/Debuff";
import { DiceBox } from "../Dice/DiceBox";
import { Encounter } from "../Encounter/Encounter";

export class Floor {

    private _debuff: Debuff;
    private _perilBoxes: Array<DiceBox>;
    private _combatBoxes: Array<DiceBox>;
    private _deck: Array<Encounter>;
    public get deck(): Array<Encounter> {
        return this._deck;
    }
    public set deck(value: Array<Encounter>) {
        this._deck = value;
    }
    private _discard: Array<Encounter>;
    public get discard(): Array<Encounter> {
        return this._discard;
    }
    public set discard(value: Array<Encounter>) {
        this._discard = value;
    }
    private _workspace: Array<[Encounter, boolean]>;
    public get workspace(): Array<[Encounter, boolean]> {
        return this._workspace;
    }
    public set workspace(value: Array<[Encounter, boolean]>) {
        this._workspace = value;
    }
    public get perilBoxes(): Array<DiceBox> {
        return this._perilBoxes;
    }
    constructor(debuff: Debuff, perilBoxes: Array<DiceBox>, combatBoxes: Array<DiceBox>) {
        this._debuff = debuff;
        this._perilBoxes = perilBoxes;
        this._combatBoxes = combatBoxes;
    }
}