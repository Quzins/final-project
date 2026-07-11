import { useState, useMemo } from 'react' // Добавили useMemo сюда
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import Teams from './team/Teams'
import Home from './pages/home'
import Bets from './bets/Bets'
import Match from './matches/Match'
import Players from './players/Players'
import { teams } from './team/teamsData' 

import './App.css'

function generateGroupMatches(groupTeams, groupIndex) {
  const matches = [];
  let dayOffset = groupIndex * 2 + 1;
  let matchId = 1;

  for (let i = 0; i < groupTeams.length; i++) {
    for (let j = i + 1; j < groupTeams.length; j++) {
      const coefHome = (Math.random() * 2 + 1.2).toFixed(2);
      const coefAway = (Math.random() * 2 + 1.5).toFixed(2);
      const coefDraw = (Math.random() * 2 + 2.5).toFixed(2);

      matches.push({
        id: `g-${groupIndex}-${matchId++}`,
        home: groupTeams[i],
        away: groupTeams[j],
        date: `День ${dayOffset}`,
        time: ["13:00", "16:00", "19:00"][matches.length % 3],
        status: "UPCOMING",
        coefs: { home: parseFloat(coefHome), draw: parseFloat(coefDraw), away: parseFloat(coefAway) }
      });
    }
  }
  return matches;
}

function App() {
  const [wallet, setWallet] = useState(0);
  const [walletOpened, setWalletOpened] = useState(false);

  const grouped = useMemo(() => {
    const map = {};
    teams.forEach((t) => {
      if (!map[t.group]) map[t.group] = [];
      map[t.group].push(t);
    });
    return map;
  }, []);

  const allMatches = useMemo(() => {
    let matches = [];
    Object.keys(grouped).forEach((groupKey, idx) => {
      matches = [...matches, ...generateGroupMatches(grouped[groupKey], idx)];
    });
    return matches;
  }, [grouped]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/teams" element={<Teams />}/>
          
          <Route 
            path="/bets" 
            element={
              <Bets 
                allMatches={allMatches} 
                wallet={wallet} 
                setWallet={setWallet}
                walletOpened={walletOpened}
                setWalletOpened={setWalletOpened}
              />
            }
          />
          
          <Route 
            path="/match" 
            element={
              <Match 
                allMatches={allMatches} 
              />
            }
          />
          
          <Route path="/players" element={<Players />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
