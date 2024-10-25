import { Debuff } from "../Debuff/Debuff";
import { DiceBox } from "../Dice/DiceBox";
import { Encounter } from "../Encounter/Encounter";
import { Floor } from "../Floor/Floor";

export class Dungeon {
    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    private _boss: Encounter;
    
    public get boss(): Encounter {return this._boss;}
    public set boss(value: Encounter) {this._boss = value;}
    
    private _floors: Array<Floor>;

    public get floors(): Array<Floor> {return this._floors;}
    public set floors(value: Array<Floor>) {this._floors = value;}

    private _currFloor: number = 0;
    public get currFloor(): number {return this._currFloor;}
    public set currFloor(value: number) {this._currFloor = value;}

    public constructor(name : string, boss: Encounter, floor0: Floor, floor1: Floor, floor2: Floor) {
        this._boss = boss;
        this._name = name;
        this._floors = new Array<Floor>(floor0, floor1, floor2);
        this._currFloor = 0;
    }

    public static getFromBossName(bossName : string | null) : Dungeon {
        var i = 0;
        for (i = 0; i < this.dungeonList.length; i++) {
            var d = this.dungeonList[i];
            if (d.boss.name === bossName) {
                return d;
            }
        }
        return this.DragonCave;
    }

    public static findDungeon(name: string): Dungeon {
        for (let dungeon of this.dungeonList) {
            if (dungeon.name === name) {
                return dungeon;
            }
        }
        // Return a default Dungeon or handle as per your logic
        return this.DragonCave; // Assuming DragonCave is the default
    }

    public getCurrFloor() : Floor {
        return this._floors[this._currFloor];
    }

    public static readonly DragonCave = new Dungeon("DragonCave", Encounter.Dragon1, 
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
    );

    public static readonly LichTomb = new Dungeon("LichTomb", Encounter.Lich1, 
        new Floor(new Debuff("Undying Legions"), [
            new DiceBox(4, 3, true, 0, 0)
        ],[
            new DiceBox(2, 2, true, 0, 0),
            new DiceBox(5, 0, true, 2, 0)
        ], ),
        new Floor(new Debuff("Weakness Curse"), [
            new DiceBox(6, 3, true, 1, 1)
        ],[
            new DiceBox(3, 2, true, 0, 0)
        ]),
        new Floor(new Debuff("Blade Storm"), [
            new DiceBox(4, 3, true, 0, 1)
        ],[
            new DiceBox(10, 2, false, 0, 2)
        ])
    );

    public static readonly HydraReef = new Dungeon("HydraReef", Encounter.Hydra1, 
        new Floor(new Debuff("Sticky Surrounding"), [
            new DiceBox(5, 3, true, 1, 1)
        ],[
            new DiceBox(3, 1, true, 0, 1)
        ]),
        new Floor(new Debuff("Regeneration"), [
            new DiceBox(3, 3, true, 0, 0)
        ],[
            new DiceBox(5, 1, true, 0, 1),
            new DiceBox(5, 2, true, 1, 1)
        ]),
        new Floor(new Debuff("Poison Aura"), [
            new DiceBox(5, 3, true, 0, 0)
        ],[
            new DiceBox(5, 2, true, 1, 1)
        ])
    );

    public static readonly YetiCavern = new Dungeon("YetiCavern", Encounter.Yeti1, 
        new Floor(new Debuff("Freezing Winds"), [
            new DiceBox(4, 3, true, 0, 0)
        ],[
            new DiceBox(3, 2, true, 1, 0),
            new DiceBox(4, 2, true, 1, 0)
        ]),
        new Floor(new Debuff("Brutal Strength"), [
            new DiceBox(5, 3, true, 1, 1)
        ],[
            new DiceBox(5, 0, true, 0, 2)
        ]),
        new Floor(new Debuff("Biting Cold"), [
            new DiceBox(4, 3, true, 0, 0)
        ],[
            new DiceBox(3, 0, true, 0, 1),
            new DiceBox(3, 0, true, 0, 1),
        ])
    );

    public static readonly MinotaurMaze = new Dungeon("MinotaurMaze", Encounter.Minotaur1, 
        new Floor(new Debuff("Deadly Maze"), [
            new DiceBox(5, 3, true, 0, 1)
        ],[
            new DiceBox(2, 1, true, 0, 1),
            new DiceBox(2, 1, true, 0, 1)
        ]),
        new Floor(new Debuff("Crumbling Walls"), [
            new DiceBox(3, 3, true, 0, 0)
        ],[
            new DiceBox(3, 0, true, 0, 0),
            new DiceBox(3, 0, true, 0, 0)
        ]),
        new Floor(new Debuff("Poison Dart Traps"), [
            new DiceBox(6, 3, true, 1, 1)
        ],[
            new DiceBox(12, 1, false, 0, 3)
        ])
    );

    public static readonly dungeonList : Array<Dungeon> = new Array<Dungeon>(
        this.DragonCave,
        this.HydraReef,
        this.LichTomb,
        this.MinotaurMaze,
        this.YetiCavern
    );
}