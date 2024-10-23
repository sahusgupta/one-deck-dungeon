export class Dice {
    private _type: number; //0 strength, 1 speed, 2 magic, 3 black
    public get type(): number {return this._type;}
    public set type(value: number) {this._type = value;}

    private _value: number | undefined;
    public get value(): number | undefined {return this._value;}
    public set value(value: number | undefined) {this._value = value;}
    
    constructor(_type: number, _value?: number){
        this._type = _type;
        this._value = _value;
    }
    public roll(): number {
        this._value = Math.floor(Math.random() * 6) + 1
        return this._value;
    }
}