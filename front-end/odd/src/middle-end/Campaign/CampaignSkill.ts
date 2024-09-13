import { Skill } from "../Loot/Skill"
class CampaignSkill extends Skill{
      private _circles: number;
      public get circles () {return this._circles;}
      public set circles (circles: number) {this._circles = circles}
      private _squares: number;
      public get squares () {return this._squares;}
      public set squares (squares: number) {this.squares = squares}
      private _pentagons: number;
      public get pentagons () {return this._pentagons;}
      public set pentagons (pentagons: number) {this._pentagons = pentagons}
      
      public constructor (name: string, circles: number, squares: number, pentagons: number, func: CallableFunction){
        super(name, func);
        this._circles = circles;
        this._pentagons = pentagons;
        this._squares = squares;
      }

      public static readonly Veteran = new CampaignSkill('Veteran', 6, 0, 0, () => {});
      public static readonly Durability = new CampaignSkill('Durability', 6, 4, 0, () => {});
      public static readonly Crafty = new CampaignSkill('Crafty', 6, 4, 4, () => {});
  
      public static readonly Prepared = new CampaignSkill('Prepared', 6, 0, 0, () => {});
      public static readonly FirstAid = new CampaignSkill('First Aid', 6, 2, 0, () => {});
      public static readonly Recovery = new CampaignSkill('Recovery', 6, 4, 0, () => {});
      public static readonly Grit = new CampaignSkill('Grit', 6, 4, 4, () => {});
  
      public static readonly Guile = new CampaignSkill('Guile', 6, 0, 0, () => {});
      public static readonly Fortitude = new CampaignSkill('Fortitude', 6, 2, 0, () => {});
      public static readonly Planning = new CampaignSkill('Planning', 6, 4, 0, () => {});
      public static readonly DirectHit = new CampaignSkill('Direct Hit', 6, 4, 4, () => {});
  
      public static readonly Cunning = new CampaignSkill('Cunning', 6, 0, 0, () => {});
      public static readonly Speed = new CampaignSkill('Speed', 6, 2, 0, () => {});
      public static readonly Knowledge = new CampaignSkill('Knowledge', 6, 4, 0, () => {});
      public static readonly Foresight = new CampaignSkill('Foresight', 6, 4, 4, () => {});
}
export { CampaignSkill }