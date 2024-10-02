import React from 'react';
import { Encounter } from '../../middle-end/Encounter/Encounter';
interface EncounterProps{
    encounter: Encounter;
    onClick: () => void;
}

const EncounterCard: React.FC<EncounterProps> = ({
    encounter, 
    onClick,
}) =>{
    console.log(encounter)
    return(
        <button className="w-80 h-56 bg-black " onClick={onClick}>
              
                
            </button>
    )
}
export default EncounterCard;