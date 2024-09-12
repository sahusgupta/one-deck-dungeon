import { Skill } from "../Loot/Skill";
import { getDoc, getDocs, collection, doc, setDoc } from 'firebase/firestore';
import { db, app } from "../../backend/firebase/firebase_utils";
import { Hero } from "../Hero/Hero";
import { MapLike } from "typescript";
interface Map {
    
}

export class Campaign {
    private _checks: number;
    public get checks(): number {
        return this._checks;
    }
    public set checks(value: number) {
        this._checks = value;
    }
    private _skills: Array<Skill>;
    public get skills(): Array<Skill> {
        return this._skills;
    }
    public set skills(value: Array<Skill>) {
        this._skills = value;
    }
    public constructor(skills: Array<Skill>, checks: number) {
        this._skills = skills;
        this._checks = checks
    }
    private async fromFirestore () {
        const collectionRef = collection(db, 'users')
        const docRef = doc(db, 'users', localStorage.getItem('credentials') ? String(localStorage.getItem('credentials')) : "")
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            const data = docSnap.data();
            
        }
    }

    private async toFirestore(hero: Hero){
        const collectionRef = collection(db, 'users')
        const docRef = doc(db, 'users', localStorage.getItem('credentials') ? String(localStorage.getItem('credentials')) : "")
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
            const data = docSnap.data();

        }
    }
}