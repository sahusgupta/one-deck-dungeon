import { Skill } from "../cards/Skill";
import { Item } from "../cards/Item";
import { Hero } from "./Hero";

class Player {
    private _masterDie: Array<string>;
    private _items: Array<Item>;
    private _hero: Array<Hero>;
    private _id: string;
    private _skills: Array<Skill>;

	constructor(items: Array<Item>, heroes: Array<Hero>, id: string, skills: Array<Skill>, die: Array<string>) {
        this._masterDie = die;
        this._hero = heroes;
        this._id = id;
        this._items = items;
        this._skills = skills;
	}

    public get hero(): Hero {return this._hero;}
    public set hero(value: Array<Hero>) {this._hero = value;}
    public get id(): string {return this._id;}
    public set id(value: string) {this._id = value;}
    public get skills(): Array<Skill> {return this._skills;}
    public set skills(value: Array<Skill>) {this._skills = value;}
    public get items(): Array<Item> {return this._items;}
    public set items(value: Array<Item>) {this._items = value;}
    public get masterDie(): Array<string> {return this._masterDie;}
    public set masterDie(value: Array<string>) {this._masterDie = value;}

    public loadData(userID: string){
        
    }
     
}
export {Player}