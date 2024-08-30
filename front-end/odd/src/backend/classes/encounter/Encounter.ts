import { Debuff } from "../effects/Debuff";
import { DiceBox } from "../dice/DiceBox";
import { Dice } from "../dice/Dice";
import { Item } from "../cards/Item";
import { Skill } from "../cards/Skill";

class Encounter {
    private _xp: number;
    private _name: string;
    private _type: number;
    private _item: Item;
    private _skill: Skill;
    private _tempDebuff: Debuff;
    private _boxes: Array<DiceBox>;
    private _consequences: Array<number>;
    
    constructor(x: number, name: string, type: number, item: Item, skill: Skill, td: Debuff, boxes: Array<DiceBox>, c: Array<number>){
        this._xp = x;
        this._name = name;
        this._type = type;
        this._item = item;
        this._skill = skill;
        this._tempDebuff = td;
        this._boxes = boxes;
        this._consequences = c;
    }
    
    public get xp(): number {return this._xp;}
    public set xp(value: number) {this._xp = value;}
    public get name(): string {return this._name;}
    public set name(value: string) {    this._name = value;}
    public get type(): number {return this._type;}
    public set type(value: number) {this._type = value;}
    public get item(): Item {return this._item;}
    public set item(value: Item) {this._item = value;}
    public get skill(): Skill {return this._skill;}
    public set skill(value: Skill) {this._skill = value;}
    public get tempDebuff(): Debuff {return this._tempDebuff;}
    public set tempDebuff(value: Debuff) {this._tempDebuff = value;}
    public get boxes(): Array<DiceBox> {return this._boxes;}
    public set boxes(value: Array<DiceBox>) {this._boxes = value;}

    public takeDamage (players: Array<Player>){
        // just go one by one and distribute the damage evenly and pin the most damage on the first player if there's an odd damage cost
        players[0].takeDamage(this._consequences[0] / 2 + this._consequences[0] % 2);
    }
}
