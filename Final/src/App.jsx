import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import Teams from './team/Teams'
import Home from './pages/home'
import Bets from './bets/Bets'
import Match from './matches/Match'

import './App.css'


function App() {




 

  return (
    <>
    
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}/>

      <Route path="/teams" element={<Teams />}/>
      <Route path="/bets" element={<Bets />}/>
      <Route path="/match" element={<Match />}/>



      </Routes>
      </BrowserRouter>
    </>

  )
  

}


export default App