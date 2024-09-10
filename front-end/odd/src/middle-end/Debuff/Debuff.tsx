class Debuff {
    private _name: string;

    public get name(): string {return this._name;}

    public set name(value: string) {
        this._name = value;
    }

    public constructor(name: string) {
        this._name = name; 
    }

    public static readonly Dodge : Debuff = new Debuff("Dodge");
}