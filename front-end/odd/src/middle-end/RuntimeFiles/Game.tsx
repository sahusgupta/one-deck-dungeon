class Game {
    private playerList: Array<Player>;
    private dungeon: Dungeon;
  
    public constructor() {
        this.playerList = new Array<Player>();
      console.log("Hello world");
    }
    
    public getPlayers() : Array<Player> {
        return this.playerList;
    }
    
  }
  
//   const person = new Person("Jane");
//   console.log(person.getName()); // person.name isn't accessible from outside the class since it's private