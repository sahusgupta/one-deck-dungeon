import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectDungeon: React.FC = () => {

    const userName = "Daniel Rupawalla" //pull from db
    const navigate = useNavigate();
    const reRoute = (playerCount: string) => {
      console.log(playerCount);
      const url = "/" + playerCount;
      navigate(url)
  };
    return (
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'url("dragonwallpaper.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
  
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-white">
          {/* Username Input */}
          <div className="bg-black bg-opacity-70 text-lg px-4 py-2 rounded-md text-center focus:outline-none"> {userName} </div>
  
          {/* Player Options */}
          <div className="flex space-x-4 w-250">
            {/* Select Char */}
            <button className="w-56 h-56 bg-black " onClick={() => reRoute("one-player")}>
              
                <img src="Aquamancer1P.jpg" className="w-1500 h-1500 object-cover rounded-t-lg mb-4"/>
            </button>
  
            {/* Select Char*/}
            <button className="w-56 h-56 bg-black " onClick={() => reRoute("one-player")}>
              
              <img src="Archer1P.jpg" className="w-1500 h-1500 object-cover rounded-t-lg mb-4"/>
          </button>
                      {/* Select Char */}
                      <button className="w-56 h-56 bg-black " onClick={() => reRoute("one-player")}>
              
              <img src="Dragoon1P.jpg" className="w-1500 h-1500 object-cover rounded-t-lg mb-4"/>
          </button>
                      {/* Select Char */}
                      <button className="w-56 h-56 bg-black " onClick={() => reRoute("one-player")}>
              
              <img src="Mage1P.jpg" className="w-1500 h-1500 object-cover rounded-t-lg mb-4"/>
          </button>
                      {/* Select Char */}
                      <button className="w-56 h-56 bg-black " onClick={() => reRoute("one-player")}>
              
              <img src="Paladin1P.jpg" className="w-1500 h-1500 object-cover rounded-t-lg mb-4"/>
          </button>
                              {/* Select Char */}
                              <button className="w-56 h-56 bg-black " onClick={() => reRoute("one-player")}>
              
              <img src="Rogue1P.jpg" className="w-1500 h-1500 object-cover rounded-t-lg mb-4"/>
          </button>
                              {/* Select Char */}
                              <button className="w-56 h-56 bg-black " onClick={() => reRoute("one-player")}>
              
              <img src="Warrior1P.jpg" className="w-1500 h-1500 object-cover rounded-t-lg mb-4"/>
          </button>
                              {/* Select Char */}
                              <button className="w-56 h-56 bg-black " onClick={() => reRoute("one-player")}>
              
              <img src="Witch1P.jpg" className="w-1500 h-1500 object-cover rounded-t-lg mb-4"/>
          </button>
          </div>
  
          {/* Profile Icons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-500"></div> {/* Replace with actual profile image */}
            <div className="w-10 h-10 rounded-full bg-gray-500"></div> {/* Replace with actual profile image */}
          </div>
        </div>
      </div>
    );

};
export default SelectDungeon