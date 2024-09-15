import { Debuff } from "../Debuff/Debuff";
import { Hero } from "../Hero/Hero";
import { Item } from "../Loot/Item";
import { Skill } from "../Loot/Skill";

export class Player {
    private _id: string;
    public get id(): string {return this._id;}
    public set id(value: string) {this._id = value;}
    
    private _skills: Array<Skill>;

    private _items: Array<Item>;

    private _activeDebuff: Debuff;

    private _hero: Hero;

    public constructor(id: string, hero: Hero) {
        this._id = id;
        this._hero = hero;
        this._skills = new Array<Skill>(hero.feat, hero.basicSkill);
        this._items = new Array<Item>(hero.basicItem);
        this._activeDebuff = Debuff.Null;
    }

    public static getFromId (id: string) : Player {
        return new Player(id, Hero.Aquamancer1P);
    }
}