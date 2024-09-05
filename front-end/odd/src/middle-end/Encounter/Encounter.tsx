import { DiceBox } from "../Dice/DiceBox";

class Encounter {
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

}