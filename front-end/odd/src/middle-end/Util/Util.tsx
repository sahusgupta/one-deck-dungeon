export class Util {
    public static generateRandCode(len: number) : string {
      let res = '';
      for (let i = 0; i < len; i++){
        res += Math.round(Math.random() * 8);
      }
      return res;
  
    }
}