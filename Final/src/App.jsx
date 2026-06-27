import { useState, BrowserRouter, Routes, Route } from 'react'
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
