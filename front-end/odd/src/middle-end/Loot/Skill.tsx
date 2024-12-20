export class Skill {
    private _name: string;
    
    public get name(): string {return this._name;}

    public set name(value: string) {
        this._name = value;
    }
    
    private _function: CallableFunction = () => {
        //function 
    }

    public constructor(name: string, func?: CallableFunction) {
        this._name = name; 
        this._function = func ? func: () => {};
    }
    
    //Aquamancer
    public static readonly Tsunami1P : Skill = new Skill("Tsunami1P");
    public static readonly Tsunami2P : Skill = new Skill("Tsunami2P");
    public static readonly BubblesWaterSpirit : Skill = new Skill("BubblesWaterSpirit");
    public static readonly WaterBlessing : Skill = new Skill("WaterBlessing");
    //Archer
    public static readonly EagleEye1P : Skill = new Skill("EagleEye1P");
    public static readonly EagleEye2P : Skill = new Skill("EagleEye2P");
    public static readonly Kiting : Skill = new Skill("Kiting");
    public static readonly CombinedShot : Skill = new Skill("CombinedShot");
    //Dragoon
    public static readonly Stalwart1P : Skill = new Skill("Stalwart1P");
    public static readonly Stalwart2P : Skill = new Skill("Stalwart2P");
    public static readonly Trident : Skill = new Skill("Trident");
    public static readonly ForkedStrike : Skill = new Skill("ForkedStrike");
    //Mage
    public static readonly ManaCharge1P : Skill = new Skill("ManaCharge1P");
    public static readonly ManaCharge2P : Skill = new Skill("ManaCharge2P");
    public static readonly ShieldAura : Skill = new Skill("ShieldAura");
    public static readonly PowerTransfer : Skill = new Skill("PowerTransfer");
    //Paladin
    public static readonly Valiant1P : Skill = new Skill("Valiant1P");
    public static readonly Valiant2P : Skill = new Skill("Valiant2P");
    public static readonly Armor : Skill = new Skill("Armor");
    public static readonly SupportAura : Skill = new Skill("SupportAura");
    //Rogue
    public static readonly DaringGamble1P : Skill = new Skill("DaringGamble1P");
    public static readonly DaringGamble2P : Skill = new Skill("DaringGamble2P");
    public static readonly Stealth : Skill = new Skill("Stealth");
    public static readonly Dungeoneering : Skill = new Skill("Dungeoneering");
    //Warrior
    public static readonly Frenzy1P : Skill = new Skill("Frenzy1P");
    public static readonly Frenzy2P : Skill = new Skill("Frenzy2P");
    public static readonly SecondWind : Skill = new Skill("SecondWind");
    public static readonly FearlessCharge : Skill = new Skill("FearlessCharge");
    //Witch
    public static readonly HammerSmash1P : Skill = new Skill("HammerSmash1P");
    public static readonly HammerSmash2P : Skill = new Skill("HammerSmash2P");
    public static readonly InnerFire : Skill = new Skill("InnerFire");
    public static readonly AntiHex : Skill = new Skill("AntiHex");

    public static readonly Dodge : Skill = new Skill("Dodge");
    public static readonly Mana : Skill = new Skill("Mana");
    public static readonly Backstab : Skill = new Skill("Backstab");
    public static readonly Cleave : Skill = new Skill("Cleave");
    public static readonly Invisibility : Skill = new Skill("Invisibility");
    public static readonly Accuracy : Skill = new Skill("Accuracy");
    public static readonly CrushingBlow : Skill = new Skill("CrushingBlow");
    public static readonly Valor : Skill = new Skill("Valor");
    public static readonly CriticalStrikes : Skill = new Skill("CriticalStrikes");
    public static readonly Flameweave : Skill = new Skill("Flameweave");
    public static readonly Consistency : Skill = new Skill("Consistency");
    public static readonly ManaFountain : Skill = new Skill("ManaFountain");
    public static readonly Haste : Skill = new Skill("Haste");
    public static readonly CrushingFist : Skill = new Skill("CrushingFist");
    public static readonly Poison : Skill = new Skill("Poison");
    public static readonly ArmorCrush : Skill = new Skill("ArmorCrush");
    public static readonly Heroism : Skill = new Skill("Heroism");
    public static readonly Shimmerblast : Skill = new Skill("Shimmerblast");
    public static readonly LuckyFamiliar : Skill = new Skill("LuckyFamiliar");
    public static readonly Flurry : Skill = new Skill("Flurry");
    public static readonly ChaoticAura : Skill = new Skill("ChaoticAura");
    public static readonly BruteForce : Skill = new Skill("BruteForce");
    public static readonly SteadyHands : Skill = new Skill("SteadyHands");
    public static readonly TripleStrike : Skill = new Skill("TripleStrike");
    public static readonly Dexterity : Skill = new Skill("Dexterity");
    public static readonly Persistence : Skill = new Skill("Persistence");
    public static readonly Clarity : Skill = new Skill("Clarity");
    public static readonly StaticBurst : Skill = new Skill("StaticBurst");

    public static readonly Null : Skill = new Skill("Null");

    public static readonly skillList: Array<Skill> = [
        // Aquamancer Skills
        this.Tsunami1P,
        this.Tsunami2P,
        this.BubblesWaterSpirit,
        this.WaterBlessing,

        // Archer Skills
        this.EagleEye1P,
        this.EagleEye2P,
        this.Kiting,
        this.CombinedShot,

        // Dragoon Skills
        this.Stalwart1P,
        this.Stalwart2P,
        this.Trident,
        this.ForkedStrike,

        // Mage Skills
        this.ManaCharge1P,
        this.ManaCharge2P,
        this.ShieldAura,
        this.PowerTransfer,

        // Paladin Skills
        this.Valiant1P,
        this.Valiant2P,
        this.Armor,
        this.SupportAura,

        // Rogue Skills
        this.DaringGamble1P,
        this.DaringGamble2P,
        this.Stealth,
        this.Dungeoneering,

        // Warrior Skills
        this.Frenzy1P,
        this.Frenzy2P,
        this.SecondWind,
        this.FearlessCharge,

        // Witch Skills
        this.HammerSmash1P,
        this.HammerSmash2P,
        this.InnerFire,
        this.AntiHex,

        // General Skills
        this.Dodge,
        this.Mana,
        this.Backstab,
        this.Cleave,
        this.Invisibility,
        this.Accuracy,
        this.CrushingBlow,
        this.Valor,
        this.CriticalStrikes,
        this.Flameweave,
        this.Consistency,
        this.ManaFountain,
        this.Haste,
        this.CrushingFist,
        this.Poison,
        this.ArmorCrush,
        this.Heroism,
        this.Shimmerblast,
        this.LuckyFamiliar,
        this.Flurry,
        this.ChaoticAura,
        this.BruteForce,
        this.SteadyHands,
        this.TripleStrike,
        this.Dexterity,
        this.Persistence,
        this.Clarity,
        this.StaticBurst,
    ];

    public static findSkill(name: string): Skill {
        for (let skill of this.skillList) {
            if (skill.name === name) {
                return skill;
            }
        }
        return this.Null; // Return Null if not found
    }
}