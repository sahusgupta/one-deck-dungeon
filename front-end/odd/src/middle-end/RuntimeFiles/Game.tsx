class Game {
    private playerList: Array<Player>;
    private dungeon: Dungeon;
    public gameId: string;
    private potions: number;
  
    public constructor(gameId: string) {
        this.playerList = new Array<Player>();
        this.dungeon = new Dungeon();
        this.gameId = gameId;
        this.potions = 0;
    }
    
    public get getPlayerList() : Array<Player> {
        return this.playerList;
    }
    
    public set setPlayerList(v : Array<Player>) {
        this.playerList = v;
    }
    
    public get getDungeon() : Dungeon {
        return this.dungeon;
    }
  
    public set setDungeon(v : Dungeon) {
        this.dungeon = v;
    }
    
    
    public get getPotions() : number {
        return this.potions;
    }

    
    public set setPotions(v : number) {
        this.potions = v;
    }

    public incrementPotions() : void {
        this.potions++;
    }
    
}
