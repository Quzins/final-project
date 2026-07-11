import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import Teams from './team/Teams'
import Home from './pages/home'
import './App.css'


function App() {
  const  [count, setCount] = useState(0)




 

  return (
    <>
    
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}/>

      <Route path="/teams" element={<Teams />}/>

      </Routes>
      </BrowserRouter>
    </>

  )
  

}


export default App