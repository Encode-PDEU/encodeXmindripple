import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavBar from './navbar';
// import { ReactMatrixAnimation } from 'react-matrix-animation';

const leaderboardData = [
  { name: 'Preet Sojitra', points: 2500, Solved: 50 },
  { name: 'Preet Sojitra', points: 2550, Solved: 45 },
  { name: 'Preet Sojitra', points: 2500, Solved: 40 },
  { name: 'Preet Sojitra', points: 2500, Solved: 35 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
  { name: 'Preet Sojitra', points: 2500, Solved: 30 },
];

const MobileMenu = ({ isOpen }) => {
  const router = useRouter();
  return (
    <></>
  );
};


export default function Leaderboard_laptop() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const participants = [
    { name: 'Preet Sojitra', rank: 13, points: 2500, solved: 30 },
  ];

  return (
    <div className="relative">
      {isMobileMenuOpen ? null : <NavBar />}
      <h1 className={`font-oswald font-semibold text-4xl md:text-6xl text-custom-yellow pl-4 md:pl-[40px] md:pt-[56px] md:pb-[56px] pt-4'} pb-4 md:pb-56`}>LEADERBOARD</h1>
      <div className="w-full px-4 md:px-10">
        <table className="w-full border border-black">
          <thead>
            <tr className="font-roboto md:text-2xl font-semibold text-center">
              <th className="p-3 tracking-wide">Rank</th>
              <th className="p-3 tracking-wide">Name</th>
              <th className="p-3 tracking-wide">Points</th>
              <th className="p-3 tracking-wide">Solved</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-custom rounded' : 'bg-black'} text-white`}>
                <td className="px-3 tracking-wide text-custom-green font-roboto md:text-2xl font-medium rounded-s-lg p-4 align-middle text-center">{index + 1}</td>
                <td className="px-3 tracking-wide text-custom-green font-roboto md:text-2xl font-medium max-w-[200px] align-middle text-center">{player.name}</td>
                <td className="px-3 tracking-wide text-custom-green font-roboto md:text-2xl font-medium align-middle text-center">{player.points}</td>
                <td className={`px-3  tracking-wide text-custom-green font-roboto md:text-2xl font-medium align-middle text-center ${index % 2 === 0 ? 'rounded-r-lg' : 'rounded-s-lg'}`}>{player.Solved}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      {/* Participant in sticky bar*/}
      <div className="fixed bottom-0 w-full">
        <div className="bg-custom p-3 md:p-5">
          {participants.map((participant, index) => (
            <div key={index} className={`p-2 md:p-4 md:flex md:flex-row md:items-center justify-between ${index % 2 === 0 ? 'bg-custom' : 'bg-black'}`}>
              <span className="text-custom-green font-roboto md:text-2xl font-medium text-center">{participant.rank}</span>
              <span className="tracking-wide text-custom-green font-roboto md:text-2xl font-medium max-w-[200px] text-center">{participant.name}</span>
              <span className="text-custom-green font-roboto md:text-2xl font-medium text-center">{participant.points}</span>
              <span className={`text-custom-green font-roboto md:text-2xl font-medium text-center ${index % 2 === 0 ? 'rounded-r-lg' : 'rounded-s-lg'}`}>{participant.solved}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}