import { useState } from "react";
import { teams } from "./teamsData";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./Teams.css";

function Teams() {
  const continents = [
    "Europe",
    "South America",
    "North America",
    "Asia",
    "Africa",
    "Oceania",
  ];

  return (
    <>
      <header>
        <h1>
          Тут вы можете посмотреть все команды, участвующие в Чемпионате Мира 2026
        </h1>
        <Link to="/">На Главную</Link>
      </header>

      <section>
        <div className="container">
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
                {/* Если в континенте нет команд, сетка останется пустой */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Teams;
