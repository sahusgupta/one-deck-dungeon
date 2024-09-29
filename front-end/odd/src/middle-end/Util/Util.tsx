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
}