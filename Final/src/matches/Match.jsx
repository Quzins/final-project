import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Match.css";

const GROUPS = "ABCDEFGHIJKL".split("");

export default function Match({ allMatches }) {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("ALL");

  const filtered = allMatches.filter((m) => {
    const text = m.home.name.toLowerCase() + " " + m.away.name.toLowerCase();
    const searchMatch = text.includes(search.toLowerCase());
    const groupMatch =
      activeGroup === "ALL" ||
      m.home.group === activeGroup ||
      m.away.group === activeGroup;

    return searchMatch && groupMatch;
  });

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <span className="logo">🏆 ЧМ-2026</span>
          <Link to="/bets" className="nav-link">Перейти к ставкам</Link>
        </div>
      </header>

      <div className="app">
        <div className="hero">
          <h1>⚽ МАТЧ-ЦЕНТР</h1>
          <p>Групповой этап • Расписание матчей • Коэффициенты</p>
        </div>

        <div className="controls">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск команды..."
            className="search-input"
          />

          <div className="groups">
            <button 
              className={activeGroup === "ALL" ? "active" : ""} 
              onClick={() => setActiveGroup("ALL")}
            >
              Все
            </button>
            {GROUPS.map((g) => (
              <button 
                key={g} 
                className={activeGroup === g ? "active" : ""} 
                onClick={() => setActiveGroup(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="matches-grid">
          {filtered.map((m) => (
            <div className="match-card" key={m.id}>
              <div className="match-header">
                <span className="match-date">{m.date} в {m.time}</span>
                <span className="status">{m.status}</span>
              </div>

              <div className="teams">
                <div className="team">
                  <img src={m.home.flag_url} alt={m.home.name} />
                  <span>{m.home.name}</span>
                </div>

                <div className="vs">VS</div>

                <div className="team">
                  <img src={m.away.flag_url} alt={m.away.name} />
                  <span>{m.away.name}</span>
                </div>
              </div>

              <div className="match-coefs">
                <div className="coef-item">П1: <span>{m.coefs.home}</span></div>
                <div className="coef-item">Х: <span>{m.coefs.draw}</span></div>
                <div className="coef-item">П2: <span>{m.coefs.away}</span></div>
              </div>

              <Link to="/bets" className="bet-match-btn">Сделать ставку</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
