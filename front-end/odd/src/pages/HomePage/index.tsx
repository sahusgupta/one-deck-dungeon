import React from 'react';
import { logout } from '../../backend/firebase/google_auth';
import { useEffect, useState } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/firebase/firebase_utils';
import { getDoc, collection, doc, query, where, getDocs, updateDoc } from 'firebase/firestore';
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
      localStorage.setItem('userdata', data.name)
      localStorage.setItem('imageURL', data.imageURL)
      localStorage.setItem('email', data.email)
    } else {
      userName = 'Couldn\'t find display name'
      // docSnap.data() will be undefined in this case
      console.log("No user"); 
    }
  }
  info();
  let userName = localStorage.getItem('userdata');
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
  const onAction = async (inputValue: string) => {
    console.log(inputValue) //handle logic for code joining
    // Check if the game code exists in the active games collection
    if(inputValue != ""){
      const gameQuery = query(collection(db, "games"), where("gameId", "==", inputValue));
      const querySnapshot = await getDocs(gameQuery);
      if (!querySnapshot.empty) {
        // Game code exists, pull all the data
        querySnapshot.forEach(async (doc) => {
          const gameData = doc.data();
          if(gameData.players[1] == "fillerID"){

          localStorage.setItem("dungeon", gameData.dungeon);
          localStorage.setItem("players", JSON.stringify(gameData.players));
          localStorage.setItem("boss", gameData.boss);
          localStorage.setItem("deck", gameData.deck);

          // Update the players list
          const players = gameData.players;
          const userId = localStorage.getItem("credentials");
          if (players && players.length > 1 && userId) {
            players[1] = userId;
            await updateDoc(doc.ref, { players });
            localStorage.setItem("players", JSON.stringify(players));
          }
          reRoute("2P", inputValue, modalTitle.split(": ")[1]);
        }
        else{
          console.log("game full")
        }
        });
        
      } else {
        console.log("Invalid game code");
        // Handle invalid game code scenario
      }
    } else {
      reRoute("2P", inputValue, modalTitle.split(": ")[1]);
    }
  }
  const closeModal = () => {
    setModalOpen(false);
  };
  const navigate = useNavigate();
  const reRoute = (playerCount: string, gameCode?: string, titleCode?: string) => { //parameter should be "1P" or "2P"
    localStorage.setItem("playerCount", playerCount)
    localStorage.setItem("gameId", gameCode ? gameCode : (titleCode ? titleCode : Util.generateRandCode(gameIdLength)));
    if (playerCount === "2P" && gameCode === "" && titleCode) {
      navigate("/dungeon-select") //joins as server
    } else if (playerCount === "2P" && gameCode && gameCode.length == gameIdLength) {
      navigate("/play") //joins as client
    } else if(!localStorage.getItem("characterSelected")){
      console.log("over here nbow");
      navigate("/selectBuild")
    } 
    else {
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
          <button className="w-56 h-56 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80" onClick={() => {
              logout();
              navigate('/')
          }}>
            <span className="text-xl font-bold">Log Out</span>
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <HiChevronLeft size="20px"/>
              </svg>
            </div>
          </button>
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
