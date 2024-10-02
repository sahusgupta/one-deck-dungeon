import React, { useEffect } from 'react';
import { HiChevronDoubleRight } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import PlayerCard from '../../components/PlayerCard';
import { db } from '../../backend/firebase/firebase_utils';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { heroes as h } from '../../backend/mappings';
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
  async function getHeroes() {
    console.log("Starting getHeroes")
    let matching_heroes: unknown[][] = []
    const agent = localStorage.getItem('characterSelected') as string;
    console.log("Selected agent:", agent)
    const docRef = doc(db, "users", localStorage.getItem('credentials') ? String(localStorage.getItem('credentials')) : "");
    const docSnap = await getDoc(docRef);
    console.log("Document snapshot:", docSnap)
    if (docSnap.exists()) {
        let data = docSnap.data();
        let heroes = data.heroes;
  
        for (let hero of heroes){
          let h: unknown[] = []
          console.log(hero)
          let h_map = hero
          if (h_map.heroName != agent){
            continue;
          } else {
            for (let [key, value] of Object.entries(JSON.parse(hero))){
              h.push(value)
            }
            matching_heroes.push(h)
          }
        }
        
      } else {
        userName = 'Couldn\'t find display name'
        console.log("No user");
      }
      return matching_heroes;
  }
  let heroes: unknown[][] = []
  
  
  info();
  let userName = localStorage.getItem('userdata');
  const navigate = useNavigate();
  useEffect(() =>  {
    if (localStorage.getItem('characterSelected') != null && localStorage.getItem('userdata') != null) {
      (async() => {
        try {
          heroes = await getHeroes()
          console.log("Heroes retrieved:", heroes)
        } catch (error) {
          console.error("Error in getHeroes:", error)
        }
      })()
    } else {
      console.log('Conditions not met')
    }
    console.log(heroes.length)
    if (heroes.length == 0){
      (async () => {
        const d = doc(db, 'users', localStorage.getItem('credentials') as string)
        const dRef = await getDoc(d)
        if (dRef.exists()){
          let hero = localStorage.getItem('characterSelected') as string + localStorage.getItem('playerCount') as string;
          const sHero = h[hero]
          let hMaps: Map<string, any>[] = dRef.data().heroes;
          hMaps.push(await sHero.ToMap())
          setDoc(d, {heroes: hMaps})
        }
        console.log('leaving')
        navigate('/play')
      })()
    }
  })
  return (
    <PageLayout>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-white">
        {heroes.map((hero, index) => (
            <div key={index} className="flex space-x-4 w-250">
                {hero as string[]}
            </div>
        ))}
        <div className="flex space-x-4 w-250">

        </div>

      </div>
    </PageLayout>
  );
};

export default SelectCampaignPage;