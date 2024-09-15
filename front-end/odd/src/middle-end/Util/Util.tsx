export class Util {
    public static generateRandCode(len: number) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        let res = ''
        for (let i = 0; i < len; i++){
          res += chars.charAt(Math.floor(Math.random()*chars.length) + 1)
        }
        return res;
  
    }
}