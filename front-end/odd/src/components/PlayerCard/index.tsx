interface PlayerCardProps{
    imgURL: string;
    onClick: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
    imgURL, 
    onClick,
}) =>{
    return(
        <button className="w-56 h-56 bg-black " onClick={onClick}>
              
                <img src={imgURL} className="w-1500 h-1500 object-cover rounded-t-lg mb-4"/>
            </button>
    )
}
export default PlayerCard