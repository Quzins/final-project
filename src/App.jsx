import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Teams from './team/Teams'
import './App.css'

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/teams" element={<Teams />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App