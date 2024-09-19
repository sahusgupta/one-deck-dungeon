import { Skill } from "../Loot/Skill";
import { getDoc, getDocs, collection, doc, setDoc } from 'firebase/firestore';
import { db, app } from "../../backend/firebase/firebase_utils";
import { Hero } from "../Hero/Hero";
import { MapLike } from "typescript";
import { CampaignSkill } from "./CampaignSkill";
interface Map {
    skills: CampaignSkill[],
    checks: number
}

export class Campaign {
    private _checks: number;
    public get checks(): number {
        return this._checks;
    }
    public set checks(value: number) {
        this._checks = value;
    }
    private _skills: CampaignSkill[];
    public get skills(): CampaignSkill[] {
        return this._skills;
    }
    public set skills(value: CampaignSkill[]) {
        this._skills = value;
    }
    public constructor(skills: CampaignSkill[], checks: number) {
        this._skills = skills;
        this._checks = checks
    }
    public async fromFirestore () {
        const collectionRef = collection(db, 'users')
        const docRef = doc(db, 'users', localStorage.getItem('credentials') ? String(localStorage.getItem('credentials')) : "")
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            const data = docSnap.data();
            
        }
    }

    public async toFirestore(){
        const map: Map = {skills: this._skills, checks: this._checks}
        return map;
    }
}

export type {Map}