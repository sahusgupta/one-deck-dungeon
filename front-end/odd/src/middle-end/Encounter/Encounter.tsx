import { DiceBox } from "../Dice/DiceBox";

export class Encounter {
    private _xp: number;
    public get xp(): number {return this._xp;}
    public set xp(value: number) {this._xp = value;}

    private _name: string;
    public get name(): number {return this._xp;}
    public set name(value: number) {this._xp = value;}

    private _type: number; //0 is boss, 1 is combat, 2+ is peril w/ time for worse option being (x - 2)
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

    private _boxes: Array<DiceBox>; //boxes should always be left to right, top to bottom
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

    public static readonly ArrowWall1 : Encounter = new Encounter(2, "ArrowWall1", 3,
        new Item([1, 0, 0, 0]),
        Skill.Dodge,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 2, false, 3, 2),
            new DiceBox(11, 1, false, 2, 3),
        )
    );

    public static readonly ArrowWall2 : Encounter = new Encounter(2, "ArrowWall2", 3, 
        new Item([0, 0, 1, 0]),
        Skill.Mana,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 2, false, 3, 2),
            new DiceBox(11, 1, false, 2, 3),
        )
    );

    public static readonly Bandit1 : Encounter = new Encounter(3, "Bandit1", 1,
        new Item([0, 0, 1, 0]),
        Skill.Backstab,
        Debuff.Dodge,
        new Array<DiceBox>(
            new DiceBox(8, 1, false, 0, 2),
            new DiceBox(3, 1, true, 0, 1),
            new DiceBox(4, 1, true, 1, 0),
            new DiceBox(5, 0, true, 2, 0),
            new DiceBox(5, 0, true, 1, 1)
        )
    );

    public static readonly Bandit2 : Encounter = new Encounter(3, "Bandit2", 1, 
        new Item([0, 1, 0, 0]),
        Skill.Backstab,
        Debuff.Dodge,
        new Array<DiceBox>(
            new DiceBox(8, 1, false, 0, 2),
            new DiceBox(3, 1, true, 0, 1),
            new DiceBox(4, 1, true, 1, 0),
            new DiceBox(5, 0, true, 2, 0),
            new DiceBox(5, 0, true, 1, 1)
        )
    );

    public static readonly BearTraps1 : Encounter = new Encounter(2, "BearTraps1", 5,
        new Item([0, 0, 1, 0]),
        Skill.Mana,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 1, false, 1, 2),
            new DiceBox(11, 1, false, 2, 3),
        )
    );

    public static readonly BearTraps2 : Encounter = new Encounter(2, "BearTraps2", 5, 
        new Item([0, 1, 0, 0]),
        Skill.Invisibility,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 1, false, 1, 2),
            new DiceBox(11, 1, false, 2, 3),
        )
    );

    public static readonly Beetle1 : Encounter = new Encounter(2, "Beetle1", 1,
        new Item([0, 0, 1, 0]),
        Skill.Accuracy,
        Debuff.Survivor,
        new Array<DiceBox>(
            new DiceBox(8, 1, false, 0, 2),
            new DiceBox(3, 1, true, 0, 1),
            new DiceBox(4, 1, true, 1, 0),
            new DiceBox(5, 0, true, 2, 0),
            new DiceBox(5, 0, true, 1, 1)
        )
    );

    public static readonly Beetle2 : Encounter = new Encounter(2, "Beetle2", 1, 
        new Item([0, 0, 1, 0]),
        Skill.CrushingBlow,
        Debuff.Survivor,
        new Array<DiceBox>(
            new DiceBox(3, 1, true, 0, 0),
            new DiceBox(4, 1, true, 0, 0),
            new DiceBox(5, 0, true, 0, 0),
            new DiceBox(5, 0, true, 2, 0),
            new DiceBox(5, 0, true, 1, 1)
        )
    );

}