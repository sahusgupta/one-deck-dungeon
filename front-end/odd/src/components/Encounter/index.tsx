import React from 'react';
import { Encounter } from '../../middle-end/Encounter/Encounter';
import EncounterBase from './encounterBase';
import { Util } from '../../middle-end/Util/Util';
import Dice from 'react-dice-roll';
interface EncounterProps{
    encounter: Encounter;
    onClick: () => void;
    yellowDiceAmount: any;
    blueDiceAmount: any;
    blackDiceAmount: any;
    pinkDiceAmount: any;
}
const EncounterCard: React.FC<EncounterProps> = ({
    encounter, 
    onClick,
    yellowDiceAmount,
    blueDiceAmount,
    blackDiceAmount,
    pinkDiceAmount,
}) =>{
    console.log(encounter)
    console.log(encounter.name)
    const yellowDice = ["https://drive.google.com/thumbnail?id=1RUjbXgb1zrhzmoYPRJHqdsaS0asFj7OQ&sz=w1000","https://drive.google.com/thumbnail?id=1ugPUVuORGHQgYy6kn-izilERyBQ75ANT&sz=w1000", "https://drive.google.com/thumbnail?id=1j6g5qu_GjariWl9w9TupE7DeBUWIJs0z&sz=w1000", "https://drive.google.com/thumbnail?id=12BRJ3Eo36JPrXHY1ia0FZq1aaAefXDda&sz=w1000", "https://drive.google.com/thumbnail?id=1q6ZyyyhgmBOX54nOhVV8Sl02Or6fgO-h&sz=w1000","https://drive.google.com/thumbnail?id=1NzQnTTtwFxKxw4DmUkAUch6QZEo0KP2U&sz=w1000"]
    const blueDice = ["https://drive.google.com/thumbnail?id=1NygZkS2sL8dtnTpStxIipgNQnh1rPMrQ&sz=w1000","https://drive.google.com/thumbnail?id=1JqpZte8HBp9S0neVRdE5Gk6B8p7292-B&sz=w1000", "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000", "https://drive.google.com/thumbnail?id=1raFkwnYkJSDLuWp5Avc49ybraKFGD_ms&sz=w1000", "https://drive.google.com/thumbnail?id=1lP6_SvegGwqzY7ZCdpdtObGjzt4Isi1F&sz=w1000","https://drive.google.com/thumbnail?id=10dqi-GNHPodNPmiZ0V_IflLdXVVth3Ue&sz=w1000"];
    const blackDice = ["https://drive.google.com/thumbnail?id=1dmxTGOmw6cW6wjsWo1xWhK503xvEW6Wc&sz=w1000","https://drive.google.com/thumbnail?id=1mQC_Bv_m2nx_qdNics6bFDm2cDFevhOo&sz=w1000", "https://drive.google.com/thumbnail?id=16MpNbd-mWyFc4lyre6BdhRUt_1ia-NAr&sz=w1000", "https://drive.google.com/thumbnail?id=1FzGXlI3ae612fxp3PT4sJYkB9mJCYdGx&sz=w1000", "https://drive.google.com/thumbnail?id=1r9v3ftIlrTMuPlcMP2zFdLeLeoxfFp0j&sz=w1000","https://drive.google.com/thumbnail?id=1yfnrTeFMirQWuSMc9r8cowUWDKsNJI_J&sz=w1000"];
    const pinkDice = ["https://drive.google.com/thumbnail?id=17LTXwJjXjN4rFzA0P827J50lvdP7HOMQ&sz=w1000","https://drive.google.com/thumbnail?id=1UK-lCu66p_t_9zTp_PjmQsTLFW4CGv-q&sz=w1000", "https://drive.google.com/thumbnail?id=1mml53cxpKcj8EegETGdBmmHVYwJgsoMi&sz=w1000", "https://drive.google.com/thumbnail?id=1gVxmrRN_Cjc2Aq_whiEzFChsBpmBk8sH&sz=w1000", "https://drive.google.com/thumbnail?id=13VseXMQbnHZf3jnHXOSU4L2yH8AsTy6o&sz=w1000","https://drive.google.com/thumbnail?id=1K2IP4g_GxA5EmkFWUeEAS0B4Df55KkEU&sz=w1000"];
    return(
        <EncounterBase
        isOpen={true}
        onClose={onClick}>
            <div className="text-white">
            {encounter.name}
            <img className=""
            src={`Encounters/${encounter.name}.jpg`}
            />
            </div>

             {/* Dice Section */}
             <div className="col-span-1 bg-gray-800 rounded-lg p-4 shadow-md">
              <h2 className="text-2xl font-bold mb-2">Dice</h2>
              <div className="flex flex-col items-center">
                <div className="flex space-x-2">
              {Array.from({length:yellowDiceAmount}, (_, index) => (
                    <Dice key={index} size={50} faces= {yellowDice} onRoll={(value:number) => console.log(value)} />
                  ))}
                  </div>
                  <div className="flex space-x-2">
                  {Array.from({length:blueDiceAmount}, (_, index) => (
                    <Dice key={index} size={50} faces= {blueDice} onRoll={(value:number) => console.log(value)} />
                  ))}
                  </div>
                  <div className="flex space-x-2">
                  {Array.from({length:blackDiceAmount}, (_, index) => (
                    <Dice key={index} size={50} faces= {blackDice} onRoll={(value:number) => console.log(value)} />
                  ))} 
                  </div>
                  <div className="flex space-x-2">
                  {Array.from({length:pinkDiceAmount}, (_, index) => (
                    <Dice key={index} size={50} faces= {pinkDice} onRoll={(value:number) => console.log(value)} />
                  ))}
                  </div>
              </div>
            </div>
        </EncounterBase>
    )
}
export default EncounterCard;