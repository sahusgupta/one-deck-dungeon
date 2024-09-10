import { DiceBox } from "../Dice/DiceBox";

export class Encounter {
    private _xp: number;
    public get xp(): number {return this._xp;}
    public set xp(value: number) {this._xp = value;}

    private _name: string;
    public get name(): number {return this._xp;}
    public set name(value: number) {this._xp = value;}

    private _type: number;
    public get type(): number {return this._xp;}
    public set type(value: number) {this._xp = value;}

    private _item: Item;
    public get item(): number {return this._xp;}
    public set item(value: number) {this._xp = value;}

    private _skill: Skill;
    public get skill(): number {return this._xp;}
    public set skill(value: number) {this._xp = value;}

    private _tempDebuff: Debuff;
    public get tempDebuff(): number {return this._xp;}
    public set tempDebuff(value: number) {this._xp = value;}

    private _boxes: Array<DiceBox>;
    public get boxes(): number {return this._xp;}
    public set boxes(value: number) {this._xp = value;}

    public constructor(xp: number, name: string, type: number, item: Item, skill: Skill, tempDebuff: Debuff, boxes: Array<DiceBox>) {
        this._xp = xp;
        this._name = name;
        this._type = type;
        this._item = item;
        this._skill = skill;
        this._tempDebuff = tempDebuff;
        this._boxes = boxes;
    }

    public static readonly Bandit1Encounter : Encounter = new Encounter(3, "Bandit1", 1, //type 0 is boss, 1 is combat, 2 is peril
        new Item([0, 0, 1, 0]),
        Skill.Backstab,
        Debuff.Dodge,
        new Array<DiceBox>(
            new DiceBox(8, false, false, 0, 2),
            new DiceBox(3, true, false, 0, 1),
            new DiceBox(4, true, false, 1, 0),
            new DiceBox(5, true, false, 2, 0),
            new DiceBox(5, true, false, 1, 1)
        )
    );

    public static readonly Bandit2Encounter : Encounter = new Encounter(3, "Bandit2", 1, 
        new Item("Bandit2", [0, 1, 0, 0]),
        Skill.Backstab,
        Debuff.Dodge,
        new Array<DiceBox>(
            new DiceBox(8, false, false, 0, 2),
            new DiceBox(3, true, false, 0, 1),
            new DiceBox(4, true, false, 1, 0),
            new DiceBox(5, true, false, 2, 0),
            new DiceBox(5, true, false, 1, 1)
        )
    );

}