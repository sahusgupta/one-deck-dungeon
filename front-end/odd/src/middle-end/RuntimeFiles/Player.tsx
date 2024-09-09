export class Player {
    private _id: string;
    
    private _skills: Array<Skill>;

    private _item: Array<Item>;

    private _activeDebuff: Debuff;

    private _hero: Hero;

    public constructor(id: string, hero: Hero) {
        this._id = id;
        this._hero = hero;
    }
}