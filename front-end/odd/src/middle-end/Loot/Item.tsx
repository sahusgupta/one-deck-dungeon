class Item {
    private _values: Array<number>; //strength = 0, speed = 1, magic = 2, health = 3

    public get values(): Array<number> {
        return this._values;
    }
    
    public set values(value: Array<number>) {
        this._values = value;
    }

    public constructor(statsArr: number[]) {
        this._values = new Array<number>();
        for (let num = 0; num < statsArr.length; num++) {
            for (let i = 0; i < statsArr[num]; i++) {
                this._values.concat(num);
            }
        }

    }
}