class Dice {
    _sides: number = 6;
    _value: number;

    constructor(v: number){this._value = v}
    roll(): number {
        this._value = Math.floor(Math.random() * this._sides) + 1
        return this._value;
    }
    public get value () {
        return this._value;
    }
}

export {Dice}