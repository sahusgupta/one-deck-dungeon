import { Skill } from "../Loot/Skill";

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

}