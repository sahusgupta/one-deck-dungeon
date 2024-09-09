import { Encounter } from "../Encounter/Encounter";
import { Floor } from "../Floor/Floor";

export class Dungeon {
    private _boss: Encounter;
    
    public get boss(): Encounter {return this._boss;}
    public set boss(value: Encounter) {this._boss = value;}
    
    private _floors: Array<Floor>;

    public get floors(): Array<Floor> {return this._floors;}
    public set floors(value: Array<Floor>) {this._floors = value;}

    private _currFloor: number = 0;
    public get currFloor(): number {return this._currFloor;}
    public set currFloor(value: number) {this._currFloor = value;}

    public constructor(boss: Encounter, floor0: Floor, floor1: Floor, floor2: Floor) {
        this._boss = boss;
        this._floors = new Array<Floor>(floor0, floor1, floor2);
    }

}