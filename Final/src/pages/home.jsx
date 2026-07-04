import { useState } from 'react'
import { BrowserRouter } from "react-router";
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
           <a href="http://">Комада</a>
           <a href="http://">Игроки</a>
           <a href="http://">Ставки на спорт</a>
           <a href="http://">Матчи</a>
    </section>
    </>

  )
}

export default App
