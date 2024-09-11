import { Hero } from "../Hero/Hero";

export class Player {
    private _id: string;
    
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

    public static getFromId (Id: string) : Player {
        return new Player(Id, Hero.Aquamancer1P);
    }
}