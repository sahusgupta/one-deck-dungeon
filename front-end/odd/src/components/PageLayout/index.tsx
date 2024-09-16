import React, { ReactNode, useState, useEffect, useRef } from 'react';
type PageLayoutProps = {
    children: ReactNode;
  };
  
  const PageLayout: React.FC<PageLayoutProps> = ({children }) => {
      const imageURL = localStorage.getItem('imageURL') || "null";
    return (
        <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: 'url("dragonwallpaper.jpg")',
        }}
      >
        {children}
        <div className="absolute top-4 right-4 flex space-x-2">
        <div className="w-10 h-10 rounded-full bg-gray-500"><img src={imageURL}/></div> {/* Replace with actual profile image */}
        <div className="w-10 h-10 rounded-full bg-gray-500"></div> {/* Replace with actual profile image */}
        </div>
        </div>
    )
  }

export default PageLayout