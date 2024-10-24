import { Dice } from "../Dice/Dice";

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

    public static yellowDiceFaces = ["https://drive.google.com/thumbnail?id=1RUjbXgb1zrhzmoYPRJHqdsaS0asFj7OQ&sz=w1000","https://drive.google.com/thumbnail?id=1ugPUVuORGHQgYy6kn-izilERyBQ75ANT&sz=w1000", "https://drive.google.com/thumbnail?id=1j6g5qu_GjariWl9w9TupE7DeBUWIJs0z&sz=w1000", "https://drive.google.com/thumbnail?id=12BRJ3Eo36JPrXHY1ia0FZq1aaAefXDda&sz=w1000", "https://drive.google.com/thumbnail?id=1q6ZyyyhgmBOX54nOhVV8Sl02Or6fgO-h&sz=w1000","https://drive.google.com/thumbnail?id=1NzQnTTtwFxKxw4DmUkAUch6QZEo0KP2U&sz=w1000"]
    public static blueDiceFaces = ["https://drive.google.com/thumbnail?id=1NygZkS2sL8dtnTpStxIipgNQnh1rPMrQ&sz=w1000","https://drive.google.com/thumbnail?id=1JqpZte8HBp9S0neVRdE5Gk6B8p7292-B&sz=w1000", "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000", "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000", "https://drive.google.com/thumbnail?id=1lP6_SvegGwqzY7ZCdpdtObGjzt4Isi1F&sz=w1000","https://drive.google.com/thumbnail?id=10dqi-GNHPodNPmiZ0V_IflLdXVVth3Ue&sz=w1000"];
    public static blackDiceFaces = ["https://drive.google.com/thumbnail?id=1dmxTGOmw6cW6wjsWo1xWhK503xvEW6Wc&sz=w1000","https://drive.google.com/thumbnail?id=1mQC_Bv_m2nx_qdNics6bFDm2cDFevhOo&sz=w1000", "https://drive.google.com/thumbnail?id=16MpNbd-mWyFc4lyre6BdhRUt_1ia-NAr&sz=w1000", "https://drive.google.com/thumbnail?id=1FzGXlI3ae612fxp3PT4sJYkB9mJCYdGx&sz=w1000", "https://drive.google.com/thumbnail?id=1r9v3ftIlrTMuPlcMP2zFdLeLeoxfFp0j&sz=w1000","https://drive.google.com/thumbnail?id=1yfnrTeFMirQWuSMc9r8cowUWDKsNJI_J&sz=w1000"];
    public static pinkDiceFaces = ["https://drive.google.com/thumbnail?id=17LTXwJjXjN4rFzA0P827J50lvdP7HOMQ&sz=w1000","https://drive.google.com/thumbnail?id=1UK-lCu66p_t_9zTp_PjmQsTLFW4CGv-q&sz=w1000", "https://drive.google.com/thumbnail?id=1mml53cxpKcj8EegETGdBmmHVYwJgsoMi&sz=w1000", "https://drive.google.com/thumbnail?id=1gVxmrRN_Cjc2Aq_whiEzFChsBpmBk8sH&sz=w1000", "https://drive.google.com/thumbnail?id=13VseXMQbnHZf3jnHXOSU4L2yH8AsTy6o&sz=w1000","https://drive.google.com/thumbnail?id=1K2IP4g_GxA5EmkFWUeEAS0B4Df55KkEU&sz=w1000"];
  

    public static diceTypeToFacesAndClasses(type : number) : [string[], string] {
      switch (type) {
        case 0: //strength
          return [Util.yellowDiceFaces, `yellow`];
          break;
        case 1: //speed
          return [Util.pinkDiceFaces, `pink`];
          break;
        case 2: //magic
          return [Util.blueDiceFaces, `blue`];
          break;
        case 3: //black
          return [Util.blackDiceFaces, `black`];
          break;
        default:
          return [Util.blackDiceFaces, `black`];
          break;
      }
    }

    public static findDiceWithID(arr: Array<Dice>, id: number) : Dice | undefined {
      let ret = undefined
      arr.forEach(d => {
          if (d.idNum == id) {
            ret = d
          }
      });
      return ret;
    }
}