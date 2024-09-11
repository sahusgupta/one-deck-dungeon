export class Debuff {
    private _name: string;

    public get name(): string {return this._name;}

    public set name(value: string) {
        this._name = value;
    }

    public constructor(name: string) {
        this._name = name; 
    }

    public static readonly Null : Debuff = new Debuff("Null");
    public static readonly Dodge : Debuff = new Debuff("Dodge");
    public static readonly Survivor : Debuff = new Debuff("Survivor");
    public static readonly Flames : Debuff = new Debuff("Flames");
    public static readonly Split : Debuff = new Debuff("Split");
    public static readonly Swarm : Debuff = new Debuff("Swarm");
    public static readonly Frost : Debuff = new Debuff("Frost");
    public static readonly Ethereal : Debuff = new Debuff("Ethereal");
    public static readonly Fade : Debuff = new Debuff("Fade");
    public static readonly Undying : Debuff = new Debuff("Undying");
    public static readonly Drain : Debuff = new Debuff("Drain");

    //dungeon debuffs
    public static readonly HallOfStatues : Debuff = new Debuff("HallOfStatues");
    public static readonly FlameAura : Debuff = new Debuff("FlameAura");
    public static readonly Dragonskin : Debuff = new Debuff("Dragonskin");
}