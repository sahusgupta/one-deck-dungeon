import { Debuff } from "../Debuff/Debuff";
import { DiceBox } from "../Dice/DiceBox";
import { Item } from "../Loot/Item";
import { Skill } from "../Loot/Skill";

export class Encounter {
    private _xp: number;
    public get xp(): number {return this._xp;}
    public set xp(value: number) {this._xp = value;}

    private _name: string;
    public get name(): string {return this._name;}
    public set name(value: string) {this._name = value;}

    private _type: number; //0 is boss, 1 is combat, 2+ is peril w/ time for worse option being (x - 2)
    public get type(): number {return this._type;}
    public set type(value: number) {this._type = value;}

    private _item: Item;
    public get item(): Item {return this._item;}
    public set item(value: Item) {this._item = value;}

    private _skill: Skill;
    public get skill(): Skill {return this._skill;}
    public set skill(value: Skill) {this.skill = value;}

    private _tempDebuff: Debuff;
    public get tempDebuff(): Debuff {return this._tempDebuff;}
    public set tempDebuff(value: Debuff) {this._tempDebuff = value;}

    private _boxes: Array<DiceBox>; //boxes should always be left to right, top to bottom
    public get boxes(): Array<DiceBox> {return this._boxes;}
    public set boxes(value: Array<DiceBox>) {this._boxes = value;}

    public constructor(xp: number, name: string, type: number, item: Item, skill: Skill, tempDebuff: Debuff, boxes: Array<DiceBox>) {
        this._xp = xp;
        this._name = name;
        this._type = type;
        this._item = item;
        this._skill = skill;
        this._tempDebuff = tempDebuff;
        this._boxes = boxes;
    }

    public toString() : string {
        return this.name;
    }

    public static readonly EmptyEncounter : Encounter = new Encounter(0, "EmptyEncounter1", 0,
        new Item([0, 0, 0, 0]),
        Skill.Null,
        Debuff.Null,
        new Array<DiceBox>()
    );

    public static readonly ArrowWall1 : Encounter = new Encounter(2, "ArrowWall1", 3,
        new Item([1, 0, 0, 0]),
        Skill.Dodge,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 2, false, 3, 2),
            new DiceBox(11, 1, false, 2, 3),
        )
    );

    public static readonly ArrowWall2 : Encounter = new Encounter(2, "ArrowWall2", 3, 
        new Item([0, 0, 1, 0]),
        Skill.Mana,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 2, false, 3, 2),
            new DiceBox(11, 1, false, 2, 3),
        )
    );

    public static readonly Bandit1 : Encounter = new Encounter(3, "Bandit1", 1,
        new Item([0, 0, 1, 0]),
        Skill.Backstab,
        Debuff.Dodge,
        new Array<DiceBox>(
            new DiceBox(8, 1, false, 0, 2),
            new DiceBox(3, 1, true, 0, 1),
            new DiceBox(4, 1, true, 1, 0),
            new DiceBox(5, 0, true, 2, 0),
            new DiceBox(5, 0, true, 1, 1)
        )
    );

    public static readonly Bandit2 : Encounter = new Encounter(3, "Bandit2", 1, 
        new Item([0, 1, 0, 0]),
        Skill.Backstab,
        Debuff.Dodge,
        new Array<DiceBox>(
            new DiceBox(8, 1, false, 0, 2),
            new DiceBox(3, 1, true, 0, 1),
            new DiceBox(4, 1, true, 1, 0),
            new DiceBox(5, 0, true, 2, 0),
            new DiceBox(5, 0, true, 1, 1)
        )
    );

    public static readonly BearTraps1 : Encounter = new Encounter(2, "BearTraps1", 5,
        new Item([0, 0, 1, 0]),
        Skill.Mana,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 1, false, 1, 2),
            new DiceBox(11, 1, false, 2, 3),
        )
    );

    public static readonly BearTraps2 : Encounter = new Encounter(2, "BearTraps2", 5, 
        new Item([0, 1, 0, 0]),
        Skill.Invisibility,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 1, false, 1, 2),
            new DiceBox(11, 1, false, 2, 3),
        )
    );

    public static readonly Beetle1 : Encounter = new Encounter(2, "Beetle1", 1,
        new Item([0, 0, 1, 0]),
        Skill.Accuracy,
        Debuff.Survivor,
        new Array<DiceBox>(
            new DiceBox(3, 1, true, 0, 0),
            new DiceBox(4, 1, true, 0, 0),
            new DiceBox(5, 0, true, 0, 0),
            new DiceBox(3, 2, true, 0, 0),
            new DiceBox(4, 1, true, 2, 0),
            new DiceBox(6, 0, true, 1, 1),
        )
    );

    public static readonly Beetle2 : Encounter = new Encounter(2, "Beetle2", 1, 
        new Item([0, 0, 1, 0]),
        Skill.CrushingBlow,
        Debuff.Survivor,
        new Array<DiceBox>(
            new DiceBox(3, 1, true, 0, 0),
            new DiceBox(4, 1, true, 0, 0),
            new DiceBox(5, 0, true, 0, 0),
            new DiceBox(3, 2, true, 0, 0),
            new DiceBox(4, 1, true, 2, 0),
            new DiceBox(6, 0, true, 1, 1),
        )
    );

    public static readonly Boulder1 : Encounter = new Encounter(4, "Boulder1", 5,
        new Item([0, 0, 1, 1]),
        Skill.Valor,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(11, 2, false, 2, 3),
            new DiceBox(14, 1, false, 1, 4),
        )
    );

    public static readonly Boulder2 : Encounter = new Encounter(4, "Boulder2", 5, 
        new Item([1, 0, 0, 1]),
        Skill.CriticalStrikes,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(11, 2, false, 2, 3),
            new DiceBox(14, 1, false, 1, 4),
        )
    );

    public static readonly CaveIn1 : Encounter = new Encounter(2, "CaveIn1", 4,
        new Item([0, 1, 0, 0]),
        Skill.Flameweave,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 0, false, 3, 1),
            new DiceBox(11, 1, false, 2, 2),
        )
    );

    public static readonly CaveIn2 : Encounter = new Encounter(2, "CaveIn2", 4, 
        new Item([0, 0, 1, 0]),
        Skill.CrushingBlow,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 0, false, 3, 1),
            new DiceBox(11, 1, false, 2, 2),
        )
    );

    public static readonly FireElemental1 : Encounter = new Encounter(4, "FireElemental1", 1,
        new Item([0, 0, 1, 1]),
        Skill.Consistency,
        Debuff.Flames,
        new Array<DiceBox>(
            new DiceBox(3, 2, true, 1, 0),
            new DiceBox(3, 1, true, 1, 0),
            new DiceBox(6, 2, true, 1, 1),
            new DiceBox(11, 2, false, 1, 2),
            new DiceBox(6, 1, true, 1, 1),
        )
    );

    public static readonly FireElemental2 : Encounter = new Encounter(4, "FireElemental2", 1, 
        new Item([0, 1, 0, 1]),
        Skill.ManaFountain,
        Debuff.Flames,
        new Array<DiceBox>(
            new DiceBox(3, 2, true, 1, 0),
            new DiceBox(3, 1, true, 1, 0),
            new DiceBox(6, 2, true, 1, 1),
            new DiceBox(11, 2, false, 1, 2),
            new DiceBox(6, 1, true, 1, 1),
        )
    );

    public static readonly FlameStatues1 : Encounter = new Encounter(3, "FlameStatues1", 5,
        new Item([1, 0, 0, 0]),
        Skill.Haste,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(8, 2, false, 3, 2),
            new DiceBox(14, 1, false, 1, 3),
        )
    );

    public static readonly FlameStatues2 : Encounter = new Encounter(3, "FlameStatues2", 5, 
        new Item([0, 0, 1, 0]),
        Skill.Backstab,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(8, 2, false, 3, 2),
            new DiceBox(14, 1, false, 1, 3),
        )
    );

    public static readonly ForceWall1 : Encounter = new Encounter(4, "ForceWall1", 5,
        new Item([1, 0, 0, 1]),
        Skill.CrushingFist,
        Debuff.Null,    
        new Array<DiceBox>(
            new DiceBox(11, 1, false, 4, 2),
            new DiceBox(14, 2, false, 2, 4),
        )
    );

    public static readonly ForceWall2 : Encounter = new Encounter(4, "ForceWall2", 5,
        new Item([0, 0, 1, 1]),
        Skill.Poison,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(11, 1, false, 4, 2),
            new DiceBox(14, 2, false, 2, 4),
        )
    );

    public static readonly GloopingOoze1 : Encounter = new Encounter(3, "GloopingOoze1", 1,
        new Item([0, 0, 1, 0]),
        Skill.ArmorCrush,
        Debuff.Split,
        new Array<DiceBox>(
            new DiceBox(2, 2, true, 0, 0),
            new DiceBox(3, 2, true, 0, 0),
            new DiceBox(4, 0, true, 1, 1),
            new DiceBox(4, 0, true, 1, 1),
            new DiceBox(5, 2, true, 2, 0),
            new DiceBox(6, 0, true, 1, 1),
        )
    );

    public static readonly GloopingOoze2 : Encounter = new Encounter(3, "GloopingOoze2", 1, 
        new Item([1, 0, 0, 1]),
        Skill.Heroism,
        Debuff.Split,
        new Array<DiceBox>(
            new DiceBox(2, 2, true, 0, 0),
            new DiceBox(3, 2, true, 0, 0),
            new DiceBox(4, 0, true, 1, 1),
            new DiceBox(4, 0, true, 1, 1),
            new DiceBox(5, 2, true, 2, 0),
            new DiceBox(6, 0, true, 1, 1),
        )
    );

    public static readonly Goblin1 : Encounter = new Encounter(2, "Goblin1", 1,
        new Item([1, 0, 0, 0]),
        Skill.Shimmerblast,
        Debuff.Swarm,
        new Array<DiceBox>(
            new DiceBox(0, 0, false, 0, 0),
            new DiceBox(3, 0, true, 0, 1),
            new DiceBox(4, 1, true, 1, 0),
            new DiceBox(4, 1, true, 1, 1),
            new DiceBox(5, 0, true, 0, 2),
        )
    );

    public static readonly Goblin2 : Encounter = new Encounter(2, "Goblin2", 1, 
        new Item([1, 0, 0, 0]),
        Skill.Dodge,
        Debuff.Swarm,
        new Array<DiceBox>(
            new DiceBox(0, 0, false, 0, 0),
            new DiceBox(3, 0, true, 0, 1),
            new DiceBox(4, 1, true, 1, 0),
            new DiceBox(4, 1, true, 1, 1),
            new DiceBox(5, 0, true, 0, 2),
        )
    );

    public static readonly IceElemental1 : Encounter = new Encounter(2, "IceElemental1", 1,
        new Item([0, 1, 0, 1]),
        Skill.LuckyFamiliar,
        Debuff.Frost,
        new Array<DiceBox>(
            new DiceBox(11, 0, false, 0, 0),
            new DiceBox(3, 0, true, 1, 0),
            new DiceBox(4, 2, true, 0, 2),
            new DiceBox(5, 2, true, 1, 1),
            new DiceBox(6, 2, true, 1, 1),
        )
    );

    public static readonly IceElemental2 : Encounter = new Encounter(2, "IceElemental2", 1, 
        new Item([0, 1, 0, 1]),
        Skill.Flurry,
        Debuff.Frost,
        new Array<DiceBox>(
            new DiceBox(11, 0, false, 0, 0),
            new DiceBox(3, 0, true, 1, 0),
            new DiceBox(4, 2, true, 0, 2),
            new DiceBox(5, 2, true, 1, 1),
            new DiceBox(6, 2, true, 1, 1),
        )
    );

    public static readonly LockedDoor1 : Encounter = new Encounter(2, "LockedDoor1", 3,
        new Item([1, 0, 0, 0]),
        Skill.Shimmerblast,
        Debuff.Null,    
        new Array<DiceBox>(
            new DiceBox(8, 1, false, 4, 1),
            new DiceBox(11, 0, false, 2, 2),
        )
    );

    public static readonly LockedDoor2 : Encounter = new Encounter(2, "LockedDoor2", 3,
        new Item([0, 0, 1, 0]),
        Skill.Accuracy,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(8, 1, false, 4, 1),
            new DiceBox(11, 0, false, 2, 2),
        )
    );

    public static readonly Ogre1 : Encounter = new Encounter(4, "Ogre1", 1,
        new Item([1, 0, 0, 1]),
        Skill.ChaoticAura,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 0, false, 0, 1),
            new DiceBox(4, 1, true, 1, 0),
            new DiceBox(9, 0, false, 0, 2),
            new DiceBox(5, 1, true, 1, 1),
            new DiceBox(12, 0, false, 0, 3),
            new DiceBox(6, 1, true, 1, 1),
        )
    );

    public static readonly Ogre2 : Encounter = new Encounter(4, "Ogre2", 1, 
        new Item([0, 0, 1, 1]),
        Skill.BruteForce,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 0, false, 0, 1),
            new DiceBox(4, 1, true, 1, 0),
            new DiceBox(9, 0, false, 0, 2),
            new DiceBox(5, 1, true, 1, 1),
            new DiceBox(12, 0, false, 0, 3),
            new DiceBox(6, 1, true, 1, 1),
        )
    );

    public static readonly Phantom1 : Encounter = new Encounter(4, "Phantom1", 1,
        new Item([1, 0, 0, 1]),
        Skill.SteadyHands,
        Debuff.Ethereal,
        new Array<DiceBox>(
            new DiceBox(4, 0, true, 0, 0),
            new DiceBox(4, 1, true, 0, 0),
            new DiceBox(5, 1, true, 0, 2),
            new DiceBox(6, 1, true, 1, 1),
            new DiceBox(5, 0, true, 1, 1),
            new DiceBox(6, 0, true, 0, 2),
        )
    );

    public static readonly Phantom2 : Encounter = new Encounter(4, "Phantom2", 1, 
        new Item([0, 1, 0, 1]),
        Skill.TripleStrike,
        Debuff.Ethereal,
        new Array<DiceBox>(
            new DiceBox(4, 0, true, 0, 0),
            new DiceBox(4, 1, true, 0, 0),
            new DiceBox(5, 1, true, 0, 2),
            new DiceBox(6, 1, true, 1, 1),
            new DiceBox(5, 0, true, 1, 1),
            new DiceBox(6, 0, true, 0, 2),
        )
    );

    public static readonly PitOfSpikes1 : Encounter = new Encounter(3, "PitOfSpikes1", 5,
        new Item([0, 0, 1, 0]),
        Skill.ArmorCrush,
        Debuff.Null,    
        new Array<DiceBox>(
            new DiceBox(8, 0, false, 2, 2),
            new DiceBox(14, 1, false, 2, 3),
        )
    );

    public static readonly PitOfSpikes2 : Encounter = new Encounter(3, "PitOfSpikes2", 5,
        new Item([1, 0, 0, 0]),
        Skill.Dexterity,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(8, 0, false, 2, 2),
            new DiceBox(14, 1, false, 2, 3),
        )
    );

    public static readonly PlagueRat1 : Encounter = new Encounter(2, "PlagueRat1", 1,
        new Item([0, 1, 0, 0]),
        Skill.Persistence,
        Debuff.Swarm,
        new Array<DiceBox>(
            new DiceBox(0, 1, false, 0, 0),
            new DiceBox(3, 1, true, 1, 1),
            new DiceBox(3, 0, true, 1, 0),
            new DiceBox(5, 0, true, 1, 1),
            new DiceBox(5, 1, true, 2, 0),
        )
    );

    public static readonly PlagueRat2 : Encounter = new Encounter(2, "PlagueRat2", 1, 
        new Item([0, 1, 0, 0]),
        Skill.Flameweave,
        Debuff.Swarm,
        new Array<DiceBox>(
            new DiceBox(0, 1, false, 0, 0),
            new DiceBox(3, 1, true, 1, 1),
            new DiceBox(3, 0, true, 1, 0),
            new DiceBox(5, 0, true, 1, 1),
            new DiceBox(5, 1, true, 2, 0),
        )
    );

    public static readonly RunePuzzle1 : Encounter = new Encounter(2, "RunePuzzle1", 4,
        new Item([0, 1, 0, 0]),
        Skill.Persistence,
        Debuff.Null,    
        new Array<DiceBox>(
            new DiceBox(6, 2, false, 3, 1),
            new DiceBox(11, 0, false, 2, 3),
        )
    );

    public static readonly RunePuzzle2 : Encounter = new Encounter(2, "RunePuzzle2", 4,
        new Item([1, 0, 0, 0]),
        Skill.Clarity,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(6, 2, false, 3, 1),
            new DiceBox(11, 0, false, 2, 3),
        )
    );

    public static readonly Shadow1 : Encounter = new Encounter(3, "Shadow1", 1,
        new Item([0, 1, 0, 0]),
        Skill.StaticBurst,
        Debuff.Fade,
        new Array<DiceBox>(
            new DiceBox(10, 1, false, 0, 0),
            new DiceBox(5, 0, true, 1, 1),
            new DiceBox(3, 2, true, 1, 1),
            new DiceBox(4, 2, true, 1, 1),
            new DiceBox(5, 2, true, 1, 1),
        )
    );

    public static readonly Shadow2 : Encounter = new Encounter(3, "Shadow2", 1, 
        new Item([1, 0, 0, 1]),
        Skill.Heroism,
        Debuff.Fade,
        new Array<DiceBox>(
            new DiceBox(10, 1, false, 0, 0),
            new DiceBox(5, 0, true, 1, 1),
            new DiceBox(3, 2, true, 1, 1),
            new DiceBox(4, 2, true, 1, 1),
            new DiceBox(5, 2, true, 1, 1),
        )
    );

    public static readonly Skeleton1 : Encounter = new Encounter(2, "Skeleton1", 1,
        new Item([0, 1, 0, 0]),
        Skill.Invisibility,
        Debuff.Undying,
        new Array<DiceBox>(
            new DiceBox(2, 2, true, 0, 0),
            new DiceBox(4, 2, true, 0, 0),
            new DiceBox(3, 0, true, 1, 0),
            new DiceBox(5, 0, true, 1, 1),
            new DiceBox(5, 1, true, 1, 1),
            new DiceBox(6, 0, true, 2, 0),
        )
    );

    public static readonly Skeleton2 : Encounter = new Encounter(2, "Skeleton2", 1, 
        new Item([1, 0, 0, 0]),
        Skill.Clarity,
        Debuff.Undying,
        new Array<DiceBox>(
            new DiceBox(2, 2, true, 0, 0),
            new DiceBox(4, 2, true, 0, 0),
            new DiceBox(3, 0, true, 1, 0),
            new DiceBox(5, 0, true, 1, 1),
            new DiceBox(5, 1, true, 1, 1),
            new DiceBox(6, 0, true, 2, 0),
        )
    );

    public static readonly SpikedLog1 : Encounter = new Encounter(3, "SpikedLog1", 4,
        new Item([0, 1, 0, 0]),
        Skill.Cleave,
        Debuff.Null,    
        new Array<DiceBox>(
            new DiceBox(8, 0, false, 1, 3),
            new DiceBox(14, 1, false, 2, 3),
        )
    );

    public static readonly SpikedLog2 : Encounter = new Encounter(3, "SpikedLog2", 4,
        new Item([0, 1, 0, 0]),
        Skill.StaticBurst,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(8, 0, false, 1, 3),
            new DiceBox(14, 1, false, 2, 3),
        )
    );

    public static readonly Wraith1 : Encounter = new Encounter(3, "Wraith1", 1,
        new Item([1, 0, 0, 0]),
        Skill.Dexterity,
        Debuff.Drain,
        new Array<DiceBox>(
            new DiceBox(9, 2, false, 0, 0),
            new DiceBox(5, 0, true, 0, 0),
            new DiceBox(3, 0, true, 2, 0),
            new DiceBox(5, 0, true, 0, 2),
            new DiceBox(6, 2, true, 1, 1),
        )
    );

    public static readonly Wraith2 : Encounter = new Encounter(3, "Wraith2", 1, 
        new Item([1, 0, 0, 0]),
        Skill.Haste,
        Debuff.Drain,
        new Array<DiceBox>(
            new DiceBox(9, 2, false, 0, 0),
            new DiceBox(5, 0, true, 0, 0),
            new DiceBox(3, 0, true, 2, 0),
            new DiceBox(5, 0, true, 0, 2),
            new DiceBox(6, 2, true, 1, 1),
        )
    );

    public static readonly encounterList : Array<Encounter> = new Array<Encounter>(
        this.ArrowWall1,
        this.ArrowWall2,
        this.Bandit1,
        this.Bandit2,
        this.BearTraps1,
        this.BearTraps2,
        this.Beetle1,
        this.Beetle2,
        this.Boulder1,
        this.Boulder2,
        this.CaveIn1,
        this.CaveIn2,
        this.FireElemental1,
        this.FireElemental2,
        this.FlameStatues1,
        this.FlameStatues2,
        this.ForceWall1,
        this.ForceWall2,
        this.GloopingOoze1,
        this.GloopingOoze2,
        this.Goblin1,
        this.Goblin2,
        this.IceElemental1,
        this.IceElemental2,
        this.LockedDoor1,
        this.LockedDoor2,
        this.Ogre1,
        this.Ogre2,
        this.Phantom1,
        this.Phantom2,
        this.PitOfSpikes1,
        this.PitOfSpikes2,
        this.PlagueRat1,
        this.PlagueRat2,
        this.RunePuzzle1,
        this.RunePuzzle2,
        this.Shadow1,
        this.Shadow2,
        this.Skeleton1,
        this.Skeleton2,
        this.SpikedLog1,
        this.SpikedLog2,
        this.Wraith1,
        this.Wraith2
    );

    //bosses
    public static readonly Dragon1 : Encounter = new Encounter(0, "Dragon1", 0, 
        new Item([0, 0, 0, 0]),
        Skill.Null,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(5, 1, true, 0, 0),
            new DiceBox(5, 1, true, 0, 0),
            new DiceBox(6, 1, true, 1, 1),
            new DiceBox(16, 2, false, 0, 4),
            new DiceBox(6, 2, true, 1, 1),
            new DiceBox(17, 0, false, 0, 4),
            new DiceBox(6, 0, true, 1, 1),
        )
    );

    public static readonly Lich1 : Encounter = new Encounter(0, "Lich1", 0, 
        new Item([0, 0, 0, 0]),
        Skill.Null,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(5, 1, true, 0, 0),
            new DiceBox(5, 1, true, 0, 0),
            new DiceBox(6, 1, true, 1, 1),
            new DiceBox(16, 2, false, 0, 4),
            new DiceBox(6, 2, true, 1, 1),
            new DiceBox(17, 0, false, 0, 4),
            new DiceBox(6, 0, true, 1, 1),
        )
    );

    public static readonly Hydra1 : Encounter = new Encounter(0, "Hydra1", 0, 
        new Item([0, 0, 0, 0]),
        Skill.Null,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(5, 1, true, 0, 0),
            new DiceBox(5, 1, true, 0, 0),
            new DiceBox(6, 1, true, 1, 1),
            new DiceBox(16, 2, false, 0, 4),
            new DiceBox(6, 2, true, 1, 1),
            new DiceBox(17, 0, false, 0, 4),
            new DiceBox(6, 0, true, 1, 1),
        )
    );

    public static readonly Minotaur1 : Encounter = new Encounter(0, "Minotaur1", 0, 
        new Item([0, 0, 0, 0]),
        Skill.Null,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(5, 1, true, 0, 0),
            new DiceBox(5, 1, true, 0, 0),
            new DiceBox(6, 1, true, 1, 1),
            new DiceBox(16, 2, false, 0, 4),
            new DiceBox(6, 2, true, 1, 1),
            new DiceBox(17, 0, false, 0, 4),
            new DiceBox(6, 0, true, 1, 1),
        )
    );

    public static readonly Yeti1 : Encounter = new Encounter(0, "Yeti1", 0, 
        new Item([0, 0, 0, 0]),
        Skill.Null,
        Debuff.Null,
        new Array<DiceBox>(
            new DiceBox(5, 1, true, 0, 0),
            new DiceBox(5, 1, true, 0, 0),
            new DiceBox(6, 1, true, 1, 1),
            new DiceBox(16, 2, false, 0, 4),
            new DiceBox(6, 2, true, 1, 1),
            new DiceBox(17, 0, false, 0, 4),
            new DiceBox(6, 0, true, 1, 1),
        )
    );
}