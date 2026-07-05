import { useState } from "react";
import { teams } from "./teamsData";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./Teams.css";

function Teams() {
  const continents = [
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Africa",
    "Oceania",
  ];

  return (
    <>
      <header>
        <h1>
          Тут вы можете посмотреть все команды учавствующие в Чемпионате Мира
          2026
        </h1>
      </header>

      <section>
        <div className="container">
          <div className="card">
            {continents.map((continent) => (
              <div key={continent} className="continent-block">
                <h1>{continent}</h1>

                <div className="teams-grid">
                  {teams
                    .filter((team) => team.continent === continent)
                    .map((team) => (
                      <div className="team-card" key={team.fifa_code}>
                        <h4>{team.name}</h4>
                        <p>
                          Код: <span>{team.fifa_code}</span>
                        </p>
                        <p>
                          Группа: <span>{team.group}</span>
                        </p>
                        <img src={team.flag_url} alt={`${team.name} flag`} />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <Link to="/compound">Compound</Link>
        </div>
      </section>
      <section className='pages'>
            <a href="http://">Главная</a>
            <a href="http://">Игроки</a>            
            <a href="http://">Ставки на Футболл</a>
            <a href="http://">Матчи</a>
      </section>
    </>
  );
}

export default Teams;
