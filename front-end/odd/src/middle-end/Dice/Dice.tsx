export class Dice {
    private _type: number; //0 strength, 1 speed, 2 magic, 3 black
    public get type(): number {return this._type;}
    public set type(value: number) {this._type = value;}

    private _value: number | undefined;
    public get value(): number | undefined {return this._value;}
    public set value(value: number | undefined) {this._value = value;}

    private _idNum: number;
    public get idNum(): number {return this._idNum;}
    public set idNum(value: number) {this._idNum = value;}

    private static incrementor: number = 0;
    
    public constructor(_type: number, _value?: number, id?: number){
        this._type = _type;
        this._value = _value;
        if (id) {
            this._idNum = id;
        } else {
            this._idNum = Dice.incrementor++;
        }
    }
    public roll(): number {
        this._value = Math.floor(Math.random() * 6) + 1
        return this._value;
    }

    public equals(other: Dice) : boolean {
        return other.idNum == this._idNum;
    }
}