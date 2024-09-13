import React from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { db } from '../../backend/firebase/firebase_utils';
import { getDoc, doc } from 'firebase/firestore';
const PlayPage: React.FC = () => {
  const info = async () => {
    const docRef = doc(db, "users", localStorage.getItem('credentials') ? String(localStorage.getItem('credentials')) : "");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      localStorage.setItem('userdata', data.name)
    } else {
      userName = 'Couldn\'t find display name'
      // docSnap.data() will be undefined in this case
      console.log("No user");
    }
  }
  info();
  let userName = localStorage.getItem('userdata'); //pull from db
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
        </div>
    </div>
  );
};

export default PlayPage;
