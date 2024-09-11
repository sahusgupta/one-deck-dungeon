interface DungeonProps{
    imgURL: string;
    onClick: () => void;
}

const DungeonTag: React.FC<DungeonProps> = ({
    imgURL, 
    onClick,
}) =>{
    return(
        <button className="w-80 h-56 bg-black " onClick={onClick}>
              
                <img src={imgURL} className="w-1500 h-1500 object-cover rounded-t-lg mb-4"/>
            </button>
    )
}
export default DungeonTag