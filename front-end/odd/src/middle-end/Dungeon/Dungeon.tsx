import { Debuff } from "../Debuff/Debuff";
import { DiceBox } from "../Dice/DiceBox";
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

    public static getFromBossName(bossName : string | null) : Dungeon {
        return Dungeon.DragonsCave;
    }

    public static readonly DragonsCave = new Dungeon(Encounter.Dragon1, 
        new Floor(Debuff.HallOfStatues, [
            new DiceBox(2, 3, true, 0, 0)
        ],[
            new DiceBox(3, 0, true, 0, 1)
        ]),
        new Floor(Debuff.FlameAura, [
            new DiceBox(6, 3, true, 0, 1)
        ],[
            new DiceBox(5, 2, true, 0, 2)
        ]),
        new Floor(Debuff.Dragonskin, [
            new DiceBox(5, 3, true, 0, 0)
        ],[
            new DiceBox(10, 0, false, 0, 0)
        ])
    )

}