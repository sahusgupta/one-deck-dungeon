export class Hero {
    private _feat: Skill;
    public get feat(): Skill {return this._feat;}
    public set feat(value: Skill) {this._feat = value;}

    private _basicSkill: Skill;
    public get basicSkill(): Skill {return this._basicSkill;}
    public set basicSkill(value: Skill) {this._basicSkill = value;}

    private _basicItem: Item;
    public get basicItem(): Item {return this._basicItem;}
    public set basicItem(value: Item) {this._basicItem = value;}

    private _name: string;
    public get name(): string {return this._name;}
    public set name(value: string) {this._name = value;}

    private _heroName: string;
    public get heroName(): string {return this._heroName;}
    public set heroName(value: string) {this._heroName = value;}

    public _maxItems: number = 1;

    public _maxSkills: number = 1;

    public constructor(feat: Skill, basicSkill: Skill, basicItem: Item, name: string, heroName: string) {
        this._feat = feat;
        this._basicSkill = basicSkill;
        this._basicItem = basicItem;
        this._name = name;
        this._heroName = heroName;
    }

    public static readonly Aquamancer1P : Hero = new Hero(
        Skill.Tsunami1P,
        Skill.BubblesWaterSpirit,
        new Item([1, 2, 4, 5]),
        "", 
        "Aquamancer1P"
    );

    public static readonly Aquamancer2P : Hero = new Hero(
        Skill.Tsunami2P,
        Skill.WaterBlessing,
        new Item([1, 2, 4, 5]),
        "", 
        "Aquamancer2P"
    );


}