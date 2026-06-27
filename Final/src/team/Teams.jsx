import { useState  } from "react"
import {teams} from './teamsData'

function Teams(){

    return (
        <>
        <h1>Тут вы можете посмотреть все команды учавствующие в Чемпионате Мира 2026</h1>

        <div className="card">
            <h1>{teams}</h1>
            
        </div>
        </>
    )
}

export default Teams



   