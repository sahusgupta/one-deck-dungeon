class Skill {
    private _name: string;

    public get name(): string {return this._name;}

    public set name(value: string) {
        this._name = value;
    }

    private _values: Array<number>; //str = 0, speed = 1, magic = 2, health = 3

    public get values(): Array<number> {
        return this._values;
    }
    
    public set values(value: Array<number>) {
        this._values = value;
    }

    public constructor(name: string, statsArr: number[]) {
        this._name = name;
        this._values = new Array<number>();
        for (let num = 0; num < statsArr.length; num++) {
            for (let i = 0; i < statsArr[num]; i++) {
                this._values.concat(num);
            }
        }

    }
}