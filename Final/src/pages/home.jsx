import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'


function App() {
  const  [count, setCount] = useState(0)

  return (
    <>
    <section className='Headline'>
        <h1>Goal-Data</h1>
    </section>

    <section className='info'> <h4> это современная независимая медиа-платформа,
        созданная болельщиками для болельщиков.Мы объединяем любителей футбола со всего мира,
         предоставляя честный взгляд на игру без цензуры официальных клубов и корпоративных СМИ.
    </h4>
    </section>
    <section className='pages'>
           <Link to="/Teams"></Link>
           <Link to=""></Link>
           <Link to=""></Link>
           <Link to=""></Link>
    </section>
    </>

  )
}

export default App
