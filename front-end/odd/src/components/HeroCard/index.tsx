import React from 'react';
import { Hero } from '../../middle-end/Hero/Hero'; // Adjust the import path as needed

interface HeroCardProps {
  hero: Map<any, any>;
  onClick?: () => void;
}

const HeroCard: React.FC<HeroCardProps> = ({ hero, onClick }) => {
  return (
    <div className="w-64 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
      <button className="w-full" onClick={onClick}>
        <img 
          src={`${hero.get('heroName') as string}.jpg`} 
          alt={hero.get('name') as string} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{hero.get('heroName') as string}</h3>
          <p className="text-sm mb-1">Name: {hero.get('name') as string}</p>
          <p className="text-sm mb-1">Feat: {hero.get('feat') as string}</p>
          <p className="text-sm mb-1">Basic Skill: {hero.get('basicSkill') as string}</p>
          <p className="text-sm mb-1">Basic Item: {hero.get('basicItem') as string}</p>
          <p className="text-sm">Max Items: {hero.get('maxitems') as string}</p>
          <p className="text-sm">Max Skills: {hero.get('maxskills') as string}</p>
        </div>
      </button>
    </div>
  );
};

export default HeroCard;