import { Campaign } from "../Campaign/Campaign";
import { Item } from "../Loot/Item";
import { Skill } from "../Loot/Skill";

export class Hero {
    private _feat: Skill;
    public get feat(): Skill {return this._feat;}
    public set feat(value: Skill) {this._feat = value;}

    private _basicSkill: Skill;
    public get basicSkill(): Skill {return this._basicSkill;}
    public set basicSkill(value: Skill) {this._basicSkill = value;}

    private _basicItem: Item;
    public get basicItem(): Item {return this._basicItem;}
    public set basicItem(value: Item) {this._basicItem = value;}

    private _name: string;
    public get name(): string {return this._name;}
    public set name(value: string) {this._name = value;}

    private _heroName: string;
    public get heroName(): string {return this._heroName;}
    public set heroName(value: string) {this._heroName = value;}

    private _campaign: Campaign;

    public _maxItems: number = 1;

    public _maxSkills: number = 1;

    public constructor(feat: Skill, basicSkill: Skill, basicItem: Item, name: string, heroName: string, campaign: Campaign) {
        this._feat = feat;
        this._basicSkill = basicSkill;
        this._basicItem = basicItem;
        this._name = name;
        this._heroName = heroName;
        this._campaign = campaign;
    }

    public static readonly Aquamancer1P : Hero = new Hero(
        Skill.Tsunami1P,
        Skill.BubblesWaterSpirit,
        new Item([1, 2, 4, 5]),
        "", 
        "Aquamancer1P",
        new Campaign()
    );

    public static readonly Aquamancer2P : Hero = new Hero(
        Skill.Tsunami2P,
        Skill.WaterBlessing,
        new Item([0, 1, 3, 3]),
        "", 
        "Aquamancer2P",
        new Campaign()
    );

    public static readonly Archer1P : Hero = new Hero(
        Skill.EagleEye1P,
        Skill.Kiting,
        new Item([2, 3, 2, 5]),
        "", 
        "Archer1P",
        new Campaign()
    );

    public static readonly Archer2P : Hero = new Hero(
        Skill.EagleEye2P,
        Skill.CombinedShot,
        new Item([1, 2, 1, 3]),
        "", 
        "Archer2P",
        new Campaign()
    );

    public static readonly Dragoon1P : Hero = new Hero(
        Skill.Stalwart1P,
        Skill.Trident,
        new Item([4, 1, 2, 6]),
        "", 
        "Dragoon1P",
        new Campaign()
    );

    public static readonly Dragoon2P : Hero = new Hero(
        Skill.Stalwart2P,
        Skill.ForkedStrike,
        new Item([3, 0, 1, 4]),
        "", 
        "Dragoon2P",
        new Campaign()
    );

    public static readonly Mage1P : Hero = new Hero(
        Skill.ManaCharge1P,
        Skill.ShieldAura,
        new Item([1, 2, 4, 5]),
        "", 
        "Mage1P",
        new Campaign()
    );

    public static readonly Mage2P : Hero = new Hero(
        Skill.ManaCharge2P,
        Skill.PowerTransfer,
        new Item([0, 1, 3, 3]),
        "", 
        "Mage2P",
        new Campaign()
    );

    public static readonly Paladin1P : Hero = new Hero(
        Skill.Valiant1P,
        Skill.Armor,
        new Item([3, 1, 3, 5]),
        "", 
        "Paladin1P",
        new Campaign()
    );

    public static readonly Paladin2P : Hero = new Hero(
        Skill.Valiant2P,
        Skill.SupportAura,
        new Item([2, 0, 2, 3]),
        "", 
        "Paladin2P",
        new Campaign()
    );

    public static readonly Rogue1P : Hero = new Hero(
        Skill.DaringGamble1P,
        Skill.Stealth,
        new Item([1, 4, 2, 5]),
        "", 
        "Rogue1P",
        new Campaign()
    );

    public static readonly Rogue2P : Hero = new Hero(
        Skill.DaringGamble2P,
        Skill.Dungeoneering,
        new Item([0, 3, 1, 3]),
        "", 
        "Rogue2P",
        new Campaign()
    );

    public static readonly Warrior1P : Hero = new Hero(
        Skill.Frenzy1P,
        Skill.SecondWind,
        new Item([4, 2, 1, 6]),
        "", 
        "Warrior1P",
        new Campaign()
    );

    public static readonly Warrior2P : Hero = new Hero(
        Skill.Frenzy2P,
        Skill.FearlessCharge,
        new Item([3, 1, 0, 4]),
        "", 
        "Warrior2P",
        new Campaign()
    );

    public static readonly Witch1P : Hero = new Hero(
        Skill.HammerSmash1P,
        Skill.InnerFire,
        new Item([2, 2, 2, 5]),
        "", 
        "Witch1P",
        new Campaign()
    );

    public static readonly Witch2P : Hero = new Hero(
        Skill.HammerSmash2P,
        Skill.AntiHex,
        new Item([1, 1, 1, 3]),
        "", 
        "Witch2P",
        new Campaign()
    );


}