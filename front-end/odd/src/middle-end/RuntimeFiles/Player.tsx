import { TupleType } from "typescript";
import { Debuff } from "../Debuff/Debuff";
import { Hero } from "../Hero/Hero";
import { Item } from "../Loot/Item";
import { Skill } from "../Loot/Skill";
import { CampaignSkill } from "../Campaign/CampaignSkill";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../../backend/firebase/firebase_utils";
import { Map } from "../Campaign/Campaign";
import { log } from "console";
import { heroes } from "../../backend/mappings";
import { Encounter } from "../Encounter/Encounter";
export class Player {
    private _id: string;
    static EmptyPlayer: Player | undefined;
    private _skills: Array<Skill>;
    private _items: Array<Item>;
    private _defeatedEncounters: Array<[Encounter, boolean]>;
    private _hero: Hero;
    private _damage: number;

    constructor(id: string, hero: Hero) {
        this._id = id;
        this._hero = hero;
        this._skills = new Array<Skill>(hero.feat, hero.basicSkill);
        this._items = new Array<Item>(hero.basicItem);
        this._defeatedEncounters = [];
        this._damage = 0;
    }

    public get id(): string { return this._id; }
    public set id(value: string) { this._id = value; }

    public get skills(): Array<Skill> { return this._skills; }
    public set skills(value: Array<Skill>) { this._skills = value; }

    public get items(): Array<Item> { return this._items; }
    public set items(value: Array<Item>) { this._items = value; }

    public get defeatedEncounters(): Array<[Encounter, boolean]> { return this._defeatedEncounters; }
    public set defeatedEncounters(value: Array<[Encounter, boolean]>) { this._defeatedEncounters = value; }

    public get hero(): Hero { return this._hero; }
    public set hero(value: Hero) { this._hero = value; }

    public get damage(): number { return this._damage; }
    public set damage(value: number) { this._damage = value; }
    public damageInc(value: number) { this._damage += value; }

    // Helper methods to determine item and skill limits
    public getItemLimit(level: number, isTwoPlayer: boolean): number {
        const limits = {
            1: isTwoPlayer ? 1 : 1,
            2: isTwoPlayer ? 2 : 3,
            3: isTwoPlayer ? 3 : 5,
            4: isTwoPlayer ? 4 : 7
        };
        return limits[level as keyof typeof limits] || 0;
    }

    public getSkillLimit(level: number, isTwoPlayer: boolean): number {
        const limits = {
            1: isTwoPlayer ? 1 : 2,
            2: isTwoPlayer ? 2 : 3,
            3: isTwoPlayer ? 3 : 4,
            4: isTwoPlayer ? 4 : 5
        };
        console.log(limits[level as keyof typeof limits] || 0);
        return limits[level as keyof typeof limits] || 0;
    }

    public static getFromId(id: string, hero: Hero): Player {
        return new Player(id, hero);
    }

    public itemSum(): Item {
        let totalStrength = 0;
        let totalSpeed = 0;
        let totalMagic = 0;
        let totalHealth = 0;

        this.items.forEach((item: Item) => {
            totalStrength += item.values[0];
            totalSpeed += item.values[1];
            totalMagic += item.values[2];
            totalHealth += item.values[3];
        });

        return new Item([totalStrength, totalSpeed, totalMagic, totalHealth]);
    }
}
