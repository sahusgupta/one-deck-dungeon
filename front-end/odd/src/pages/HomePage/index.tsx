import React, { useState } from 'react';
import { logout } from '../../backend/firebase/google_auth';
import { useNavigate } from 'react-router-dom';
import MultiplayerModal from '../../components/Modals/multiplayerModal';
import PageLayout from '../../components/PageLayout';
import { Util } from '../../middle-end/Util/Util';
import { Game } from '../../middle-end/RuntimeFiles/Game';
import { HiChevronLeft, HiChevronDoubleRight } from 'react-icons/hi';

const HomePage: React.FC = () => {
  const gameIdLength = 4;
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("Error");
  const [modalTitle, setModalTitle] = useState("Error");
  const navigate = useNavigate();

  const userName = localStorage.getItem('userdata') || 'Guest';

  const showModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalContent(message);
    setModalOpen(true);
    localStorage.setItem("gameId", title.split(": ")[1]);
  };

  const onAction = (inputValue: string) => {
    console.log(inputValue); // handle logic for code joining
    if (inputValue !== "") {
      localStorage.setItem("gameId", inputValue);
      reRoute("2P", inputValue);
    } else {
      reRoute("2P", inputValue);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const reRoute = (playerCount: string, gameCode?: string) => {
    localStorage.setItem("playerCount", playerCount);
    localStorage.setItem("gameId", gameCode || Util.generateRandCode(gameIdLength));
    if (playerCount === "2P" && gameCode) {
      navigate("/play");
    } else if (!localStorage.getItem("characterSelected")) {
      navigate("/selectBuild");
    } else {
      navigate("/dungeon-select");
    }
  };

  return (
    <PageLayout>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-75"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-white">
        {/* Username Display */}
        <div className="bg-black bg-opacity-70 text-lg px-4 py-2 rounded-md text-center focus:outline-none animate-fadeIn">
          {userName}
        </div>

        {/* Player Options */}
        <div className="flex space-x-4 w-250">
          {/* Log Out Button */}
          <button className="w-56 h-56 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80 transform transition-transform duration-300 hover:scale-105" onClick={() => {
              logout();
              navigate('/');
          }}>
            <span className="text-xl font-bold">Log Out</span>
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center">
              <HiChevronLeft size="20px"/>
            </div>
          </button>

          {/* 1 Player Button */}
          <button className="w-56 h-56 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80 transform transition-transform duration-300 hover:scale-105" onClick={() => reRoute("1P")}>
            <span className="text-xl font-bold">1 Player</span>
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center">
              <HiChevronDoubleRight size="20px"/>
            </div>
          </button>

          {/* 2 Player Button */}
          <button className="w-56 h-56 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 py-4 rounded-lg space-y-2 hover:bg-opacity-80 transform transition-transform duration-300 hover:scale-105" onClick={() => showModal("Your Generated Game Code: " + Util.generateRandCode(gameIdLength), "Join Another Game")}>
            <span className="text-xl font-bold">2 Player</span>
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center">
              <HiChevronDoubleRight size="20px"/>
            </div>
          </button>
        </div>

        {isModalOpen && (
          <MultiplayerModal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={modalTitle}
            content={modalContent}
            onAction={onAction}
            actionLabel="Submit"
          />
        )}
      </div>
    </PageLayout>
  );
};

export default HomePage;
