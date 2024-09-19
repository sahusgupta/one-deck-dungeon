import React, { ReactNode, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
type PageLayoutProps = {
    children: ReactNode;
  };
  
  const PageLayout: React.FC<PageLayoutProps> = ({children }) => {
      const imageURL = localStorage.getItem('imageURL') || "null";
      const character = localStorage.getItem('characterSelected') || "null";
      const charURL = "/HeadShots/" + character +".png"; 
      const navigate = useNavigate();
      const reRoute = () => {
        console.log("helo")
        navigate("/char-select")
      };
      
    return (
        <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'url("dragonwallpaper.jpg")',
        }}
      >
        {children}
        <div className="absolute top-4 right-4 flex space-x-2">
        <div className="w-10 h-10 rounded-full bg-gray-500 z-10" onClick={() => navigate("/homepage")}><img src={imageURL}/></div> 
        <div className="w-10 h-10 rounded-full bg-gray-500 z-10" onClick={reRoute}><img src={charURL}/></div>
        </div>
        </div>
    )
  }

export default PageLayout