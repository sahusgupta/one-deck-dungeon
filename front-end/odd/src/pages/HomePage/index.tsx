import React from 'react';
import { useEffect, useState } from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/firebase/firebase_utils';
import { getDoc, collection, doc } from 'firebase/firestore';
import MultiplayerModal from '../../components/Modals/multiplayerModal';
import PageLayout from '../../components/PageLayout';
import { Util } from '../../middle-end/Util/Util';


const HomePage: React.FC = () => {

  const gameIdLength = 4;
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
  info();
  let userName = localStorage.getItem('userdata');
  info();
  console.log(userName)
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("Error");
  const [modalTitle, setModalTitle] = useState("Error");
  const showModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalContent(message);
    setModalOpen(true);
    localStorage.setItem("gameId", title.split(": ")[1]);
    // localStorage.setItem("playerCount", "2P")
  };
  const onAction = (inputValue: string) => {
    console.log(inputValue) //handle logic for code joining
    //should either take to waiting for teammate screen or char 
    reRoute("2P", inputValue, modalTitle.split(": ")[1]);
  }
  const closeModal = () => {
    setModalOpen(false);
  };
  const navigate = useNavigate();
  const reRoute = (playerCount: string, gameCode?: string, titleCode?: string) => { //parameter should be "1P" or "2P"
    localStorage.setItem("playerCount", playerCount)
    localStorage.setItem("gameId", gameCode ? gameCode : Util.generateRandCode(gameIdLength));
    if (playerCount === "2P" && gameCode === "" && titleCode) {
      navigate("/dungeon-select") //joins as server
    } else if (playerCount === "2P" && gameCode && gameCode.length == gameIdLength) {
      navigate("/waiting") //joins as client
    } else if(!localStorage.getItem("characterSelected")){
      navigate("/char-select")
    } else {
      navigate("/dungeon-select")
    }
  };
  return (
    <PageLayout>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-white">
        {/* Username Input */}
        <div className="bg-black bg-opacity-70 text-lg px-4 py-2 rounded-md text-center focus:outline-none"> {userName} </div>

        {/* Player Options */}
        <div className="flex space-x-4 w-250">
          {/* 1 Player Button */}
          <button className="w-56 h-56 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80" onClick={() => reRoute("1P")}>
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
          <button className="w-56 h-56 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80" onClick={() => showModal("Your Generated Game Code: " + Util.generateRandCode(gameIdLength), "Join Another Game")}>
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
        actionLabel = "Submit"
        />
        )}
      </div>
    </PageLayout>
  );
};

export default HomePage;
