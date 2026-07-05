import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Teams from './team/Teams'
import Players from './players/players'
import './App.css'

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/teams" element={<Teams />}/>
      <Route path="/players" element={<Players />}/>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App