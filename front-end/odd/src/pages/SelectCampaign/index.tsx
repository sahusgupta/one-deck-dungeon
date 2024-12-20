// import React, { useEffect } from 'react';
// import { HiChevronDoubleRight } from "react-icons/hi";
// import { useNavigate } from 'react-router-dom';
// import PlayerCard from '../../components/PlayerCard';
// import { db } from '../../backend/firebase/firebase_utils';
// import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
// import { heroes as h } from '../../backend/mappings';
// import PageLayout from '../../components/PageLayout';
// import HeroCard from '../../components/HeroCard';
// const SelectCampaignPage: React.FC = () => {
//   const info = async () => {
//     const docRef = doc(db, "users", localStorage.getItem('credentials') ? String(localStorage.getItem('credentials')) : "");
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       let data = docSnap.data();
//       localStorage.setItem('userdata', data.name)
//     } else {
//       userName = 'Couldn\'t find display name'
//       // docSnap.data() will be undefined in this case
//       console.log("No user");
//     }
//   }
//   async function getHeroes() {
//     console.log("Starting getHeroes")
//     let matching_heroes: Map<any, any>[] = []
//     const docRef = doc(db, "users", localStorage.getItem('credentials') ? String(localStorage.getItem('credentials')) : "");
//     const docSnap = await getDoc(docRef);
//     console.log("Document snapshot:", docSnap)
//     if (docSnap.exists()) {
//         let data = docSnap.data();
//         let heroes = data.heroes;
//         console.log(heroes)
//         for (let hero of heroes){
//           let h: Map<any, any> = new Map<any, any>();
//           console.log('logging hero', hero)
//           let h_map = hero
//           for (let [key, value] of Object.entries(h_map)){
//             h.set(key, value)
//           }
//           matching_heroes.push(h)
//         }
        
//       } else {
//         userName = 'Couldn\'t find display name'
//         console.log("No user");
//       }
//       return matching_heroes;
//   }
//   let heroes: Map<any, any>[] = []
  
  
//   info();
//   function mapToObject(map: Map<any, any>): Object {
//     const obj: any = {};
//     for (const [key, value] of Object.entries(map)) {
//       // Handle nested Maps recursively
//       if (value instanceof Map) {
//         obj[key] = mapToObject(value);
//       }
//       // Handle arrays that might contain Maps
//       else if (Array.isArray(value)) {
//         obj[key] = value.map(item => 
//           item instanceof Map ? mapToObject(item) : item
//         );
//       }
//       // Handle regular values
//       else {
//         obj[key] = value;
//       }
//     }
//     return obj;
//   }
//   let userName = localStorage.getItem('userdata');
//   const navigate = useNavigate();
//   const nextUrl = "/char-select";
//   console.log(nextUrl);
//   const reRoute = (characterSelected: string) => {
//     localStorage.setItem('characterSelected', characterSelected)
//     navigate(nextUrl)
//   };
//   if (localStorage.getItem('characterSelected') != null && localStorage.getItem('userdata') != null) {
//     (async() => {
//       try {
//         heroes = await getHeroes()
//       } catch (error) {
//         console.error("Error in getHeroes:", error)
//       }
//     })()
//   } else {
//     console.log('Conditions not met')
//     navigate('/char-select')
//   }

//   if (heroes.length == 0){
//     (async () => {
//       console.log('empty')
//       const d = doc(db, 'users', localStorage.getItem('credentials') as string)
//       const dRef = await getDoc(d)
//       if (dRef.exists()){
//         let hero = localStorage.getItem('characterSelected') as string + localStorage.getItem('playerCount') as string;
//         console.log("is in h", hero in h)
//         if (hero in h){
//           const sHero = h[hero];
//           let hMaps: Object[] = dRef.data().heroes;
//           hMaps.push(mapToObject(await sHero().ToMap()))
//           console.log(hMaps, Array.from(hMaps.values()))
//           heroes.push(await sHero().ToMap())
//           console.log("this is heroes", heroes)
//           updateDoc(d, {heroes: hMaps})
//         } else {
//           console.log(hero)
//           navigate('/char-select')
//         }
//       }
//     })()
//   }
//   console.log('new heroes', heroes)
//   console.log('new len', heroes.length)
//   return (
//     <PageLayout>
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-white">
//         {heroes.map((hero, index) => (
//             <div key={index} className="flex space-x-4 w-250">
//                 <HeroCard hero={hero}></HeroCard>
//             </div>
//         ))}

//       </div>
//       <button onClick={() => {
//         reRoute(localStorage.getItem('characterSelected') as string)
//       }}>Create New</button>

//     </PageLayout>
//   );
// };

// export default SelectCampaignPage;