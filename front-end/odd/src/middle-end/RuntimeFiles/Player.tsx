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
interface Dict {
    heroName: string
    herotype: string
    skills: Array<Skill>
    items: Array<Item>
    campaign: Map
}

/*

OR 
    User
        - Hero
            - campaign
*/

export class Player {
    private _id: string;
    public get id(): string {return this._id;}
    public set id(value: string) {this._id = value;}
    
    private _skills: Array<Skill>;

    private _items: Array<Item>;

    private _activeDebuff: Debuff;

    private _hero: Hero;

    public constructor(id: string, hero: Hero) {
        this._id = id;
        this._hero = hero;
        this._skills = new Array<Skill>(hero.feat, hero.basicSkill);
        this._items = new Array<Item>(hero.basicItem);
        this._activeDebuff = Debuff.Null;
    }

    public static getFromId (id: string) : Player {
        return new Player(id, Hero.Aquamancer1P);
    }

    public async loadFromStore (id: string) {
        const dRef = doc(db, 'users', id)
        const dVerif = await getDoc(dRef)
        if (dVerif.exists()){
            let data = dVerif.data()
            let name = dVerif.id;
            let heroInfo = JSON.parse(String(data))
            let hero = null;
        } else {
            
        }
    }
    public async saveToStore (event: Event) {
        alert('saving data to firestore')
        let campaign = this._hero.campaign.toFirestore();
        let exp: Dict = {
            heroName: this._hero.name,
            herotype: this._hero.heroName,
            skills: this._skills,
            items: this._items,
            campaign: await campaign,
        }
        let subColls = collection(db, `users/${localStorage.getItem("credentials") ? String(localStorage.getItem("credentials")) : ""}`)
        let q = query(subColls);
        let docs = await getDocs(q);
        let heronames: string[] = [];
        docs.forEach((doc) => {
            heronames.push(doc.id)
        })
        let d = doc(db, `users/${localStorage.getItem("credentials") ? String(localStorage.getItem("credentials")) : ""}`, exp.heroName)
        
        setDoc(d, {[exp.heroName]: exp})
        
    }
}