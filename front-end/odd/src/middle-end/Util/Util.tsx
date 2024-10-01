export class Util {
    public static generateRandCode(len: number) : string {
      let res = '';
      for (let i = 0; i < len; i++){
        res += Math.round(Math.random() * 8);
      }
      return res;
  
    }

    public static parseArrayAsStrings(item : string) : string[] {
      let ret : string = item.replaceAll(",", "");
      return ret.split(" ");
    }

    public static convertEncounterNameToShowName(name : string) : string {
      let ret : string = "";
      ret = name.replace(/([A-Z])/g, ' $1').toLowerCase();
      ret = ret.substring(0, ret.length - 1);
      ret = ret.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
      return ret;
    }
}