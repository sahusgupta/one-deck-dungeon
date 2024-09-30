import React from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import PlayerCard from '../../components/PlayerCard';
import { db } from '../../backend/firebase/firebase_utils';
import { getDoc, doc } from 'firebase/firestore';
import PageLayout from '../../components/PageLayout';
const SelectCampaignPage: React.FC = () => {
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
  let matching_heroes: string[][] = []
  if (localStorage.getItem('characterSelected') != null && localStorage.getItem('userdata') != null) async() => {
      const agent = localStorage.getItem('characterSelected') as string;
      const docRef = doc(db, "users", localStorage.getItem('credentials') ? String(localStorage.getItem('credentials')) : "");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let data = docSnap.data();
        let heroes = data.heroes;

        for (let hero of heroes){
            matching_heroes.push(JSON.parse(hero) as string[])
        }
        
      } else {
        userName = 'Couldn\'t find display name'
        console.log("No user");
      }
  }
  
  info();
  let userName = localStorage.getItem('userdata');
  const navigate = useNavigate();
  const playerUrl = "/homepage";
  console.log(playerUrl);
  const reRoute = (characterSelected: string) => {
    localStorage.setItem('characterSelected', characterSelected)
    navigate(playerUrl)
  };
  
  return (
    <PageLayout>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-white">
        {matching_heroes.map((hero, index) => (
            <div key={index} className="flex space-x-4 w-250">
                {hero}
            </div>
        ))}
        <div className="flex space-x-4 w-250">

        </div>

      </div>
    </PageLayout>
  );
};

export default SelectCampaignPage;