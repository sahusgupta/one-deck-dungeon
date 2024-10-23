import { Dice } from "./Dice";

class DiceBox {
    private _neededRoll: number;
    public get neededRoll(): number {
        return this._neededRoll;
    }
    public set neededRoll(value: number) {
        this._neededRoll = value;
    }

    private _constrainedToOne: boolean;
    public get constrainedToOne(): boolean {return this._constrainedToOne;}
    public set constrainedToOne(value: boolean) {this._constrainedToOne = value;}

    private _punishmentTime: number; //for bosses, any number > 0 means skull box
    private _punishmentHearts: number; //for peril/combat, 0 punishment means required
    private _type: number; //0 is strength, 1 is speed, 2 is magic, 3 is anything
    public get type(): number {return this._type;}
    public set type(value: number) {this._type = value;}
    public get punishmentHearts(): number{return this._punishmentHearts;}
    public get punishmentTime(): number{return this._punishmentTime;}

    private _idNum: number;
    public get idNum(): number {return this._idNum;}
    public set idNum(value: number) {this._idNum = value;}

    private static incrementor: number = 0;

    constructor(need: number, type: number, constrained: boolean, punishmentTime: number, punishmentHearts : number, id?: number){
        this._neededRoll = need;
        this._constrainedToOne = constrained;
        this._punishmentTime = punishmentTime;
        this._punishmentHearts = punishmentHearts;
        this._type = type;

        if (id) {
            this._idNum = id;
        } else {
            this._idNum = DiceBox.incrementor++;
        }
    }

    public equals(other: DiceBox) : boolean {
        return other.idNum == this._idNum;
    }
}

export {DiceBox};