import { Debuff } from "../Debuff/Debuff";
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
        this._deck = Array.from<Encounter>(Encounter.encounterList);
        this.shuffle(this._deck);
    }

    private shuffle(array : Array<Encounter>) {
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
          } 
          return array; 
    }
}