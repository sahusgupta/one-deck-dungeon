import { DocumentData } from "firebase/firestore";
import { Campaign } from "../Campaign/Campaign";
import { CampaignSkill } from "../Campaign/CampaignSkill";
import { Item } from "../Loot/Item";
import { Skill } from "../Loot/Skill";
import { skills } from "../../backend/mappings";

function generateHeroID(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

export class Hero {
    private _id: string;
    public get id(): string { return this._id; }
    public set id(value: string) { this._id = value; }

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
    public get campaign(): Campaign { return this._campaign; }
    public set campaign(value: Campaign) { this._campaign = value; }

    public _maxItems: number = 1;

    public _maxSkills: number = 1;

    public constructor(feat: Skill, basicSkill: Skill, basicItem: Item, name: string, heroName: string, campaign: Campaign) {
        this._feat = feat;
        this._id = generateHeroID(10)
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
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   
    );

    public static readonly Aquamancer2P : Hero = new Hero(
        Skill.Tsunami2P,
        Skill.WaterBlessing,
        new Item([0, 1, 3, 3]),
        "", 
        "Aquamancer2P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   
    );

    public static readonly Archer1P : Hero = new Hero(
        Skill.EagleEye1P,
        Skill.Kiting,
        new Item([2, 3, 2, 5]),
        "", 
        "Archer1P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   
    );

    public static readonly Archer2P : Hero = new Hero(
        Skill.EagleEye2P,
        Skill.CombinedShot,
        new Item([1, 2, 1, 3]),
        "", 
        "Archer2P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   
    );

    public static readonly Dragoon1P : Hero = new Hero(
        Skill.Stalwart1P,
        Skill.Trident,
        new Item([4, 1, 2, 6]),
        "", 
        "Dragoon1P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   

    );

    public static readonly Dragoon2P : Hero = new Hero(
        Skill.Stalwart2P,
        Skill.ForkedStrike,
        new Item([3, 0, 1, 4]),
        "", 
        "Dragoon2P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   

    );

    public static readonly Mage1P : Hero = new Hero(
        Skill.ManaCharge1P,
        Skill.ShieldAura,
        new Item([1, 2, 4, 5]),
        "", 
        "Mage1P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   

    );

    public static readonly Mage2P : Hero = new Hero(
        Skill.ManaCharge2P,
        Skill.PowerTransfer,
        new Item([0, 1, 3, 3]),
        "", 
        "Mage2P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   
    );

    public static readonly Paladin1P : Hero = new Hero(
        Skill.Valiant1P,
        Skill.Armor,
        new Item([3, 1, 3, 5]),
        "", 
        "Paladin1P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   
    );

    public static readonly Paladin2P : Hero = new Hero(
        Skill.Valiant2P,
        Skill.SupportAura,
        new Item([2, 0, 2, 3]),
        "", 
        "Paladin2P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   

    );

    public static readonly Rogue1P : Hero = new Hero(
        Skill.DaringGamble1P,
        Skill.Stealth,
        new Item([1, 4, 2, 5]),
        "", 
        "Rogue1P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   

    );

    public static readonly Rogue2P : Hero = new Hero(
        Skill.DaringGamble2P,
        Skill.Dungeoneering,
        new Item([0, 3, 1, 3]),
        "", 
        "Rogue2P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   

    );

    public static readonly Warrior1P : Hero = new Hero(
        Skill.Frenzy1P,
        Skill.SecondWind,
        new Item([4, 2, 1, 6]),
        "", 
        "Warrior1P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   

    );

    public static readonly Warrior2P : Hero = new Hero(
        Skill.Frenzy2P,
        Skill.FearlessCharge,
        new Item([3, 1, 0, 4]),
        "", 
        "Warrior2P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   

    );

    public static readonly Witch1P : Hero = new Hero(
        Skill.HammerSmash1P,
        Skill.InnerFire,
        new Item([2, 2, 2, 5]),
        "", 
        "Witch1P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   

    );

    public static readonly Witch2P : Hero = new Hero(
        Skill.HammerSmash2P,
        Skill.AntiHex,
        new Item([1, 1, 1, 3]),
        "", 
        "Witch2P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   

    );

    public static readonly Empty1P : Hero = new Hero(
        Skill.HammerSmash2P,
        Skill.AntiHex,
        new Item([1, 1, 1, 3]),
        "", 
        "Empty1P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   
    );

    public static readonly Empty2P : Hero = new Hero(
        Skill.HammerSmash2P,
        Skill.AntiHex,
        new Item([1, 1, 1, 3]),
        "", 
        "Empty2P",
        new Campaign(new Array<CampaignSkill>(CampaignSkill.Veteran, CampaignSkill.Durability, CampaignSkill.Crafty, CampaignSkill.Prepared, CampaignSkill.FirstAid, CampaignSkill.Recovery, CampaignSkill.Grit, CampaignSkill.Guile, CampaignSkill.Fortitude, CampaignSkill.Planning, CampaignSkill.DirectHit, CampaignSkill.Cunning,CampaignSkill.Speed, CampaignSkill.Knowledge, CampaignSkill.Foresight), 0)   
    );

    public static readonly encounterList : Array<Hero> = new Array<Hero>(
        this.Aquamancer1P,
        this.Aquamancer2P,
        this.Archer1P,
        this.Archer2P,
        this.Dragoon1P,
        this.Dragoon2P,
        this.Mage1P,
        this.Mage2P,
        this.Paladin1P,
        this.Paladin2P,
        this.Rogue1P,
        this.Rogue2P,
        this.Warrior1P,
        this.Warrior2P,
        this.Witch1P,
        this.Witch2P,
        this.Empty1P,
        this.Empty2P
    )

    public static findHero(name : string, players : string | null) : Hero {
        console.log("finding hero: " + name)
        const hero = this.encounterList.find(
            (hero) => hero.heroName.slice(0, hero.heroName.length -2 ) === name && hero.heroName.slice(hero.heroName.length -2) === players
        );
        console.log(hero)
        if(hero){
            return hero
        }
        if (players == "1P") {
            console.log("returning empty on you")
            return this.Empty1P;
        } else {
            return this.Empty2P;
        }
    }

    public async ToMap(){
        let m: Map<string, any> = new Map<string, any>();
        for (let [key, value] of Object.entries(skills)) {
            if (value() === this._feat) {
              m.set('feat', key)
            } else if (value() == this._basicSkill){
                m.set('basicSkill', key)
            }
        }
        const campaignData = await this.campaign.toFirestore();
        console.log(this._basicItem.values)
        m.set('basicItem', JSON.stringify(this._basicItem))
        m.set('name', JSON.stringify(this._name))
        m.set('basicItem', JSON.stringify(this._basicItem.values))
        m.set('heroName', JSON.stringify(this._heroName))
        m.set('campaignData', JSON.stringify(Object.entries(campaignData)))

        let q = Object.fromEntries(m);

        return q;
    }

}