import React from 'react';
import { useEffect, useState } from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/firebase/firebase_utils';
import { getDoc, collection, doc } from 'firebase/firestore';
import MultiplayerModal from '../../components/Modals/multiplayerModal';

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
function generateGameCode(len: number){
  let res = ''
  for (let i = 0; i < len; i++){
    res += chars.charAt(Math.floor(Math.random()*chars.length) + 1)
  }
  return res;
}

const HomePage: React.FC = () => {
  const info = async () => {
    const docRef = doc(db, "users", localStorage.getItem('credentials') ? String(localStorage.getItem('credentials')) : "");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      console.log(data)
      localStorage.setItem('userdata', data.name)
      localStorage.setItem('imageURL', data.imageURL)
    } else {
      userName = 'Couldn\'t find display name'
      // docSnap.data() will be undefined in this case
      console.log("No user");
    }
  }
  let userName = localStorage.getItem('userdata');
  const imageURL = localStorage.getItem('imageURL') || "null"
  info();
  console.log(userName)
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("Error");
  const [modalTitle, setModalTitle] = useState("Error");
  const showModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalContent(message);
    setModalOpen(true);
  };
  const onAction = () => {
    console.log("onAction clicked")
  }
  const closeModal = () => {
    setModalOpen(false);
  };
  const navigate = useNavigate();
  const reRoute = (playerCount: string) => { //parameter should be "1P" or "2P"
    localStorage.setItem("playerCount", playerCount)
    if(!localStorage.getItem("characterSelected")){
      navigate("/char-select")
    }
    else{
      navigate("/dungeon-select")
    }
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
          {/* 1 Player Button */}
          <button className="w-56 h-56 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80" onClick={() => reRoute("one-player")}>
            <span className="text-xl font-bold">1 Player</span>
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <HiChevronDoubleRight size="20px"/>
              </svg>
            </div>
          </button>

          {/* 2 Player Button */}
          <button className="w-56 h-56 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80" onClick={() => showModal("test1", "test2")}>
            <span className="text-xl font-bold">2 Player</span>
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <HiChevronDoubleRight size="20px"/>
              </svg>
            </div>
          </button>
        </div>
        {isModalOpen && (<MultiplayerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        content={modalContent}
        onAction={onAction}
        actionLabel = "test"
        />
        )}
        {/* Profile Icons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="w-10 h-10 rounded-full bg-gray-500"><img src={imageURL}/></div> {/* Replace with actual profile image */}
          <div className="w-10 h-10 rounded-full bg-gray-500"></div> {/* Replace with actual profile image */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
