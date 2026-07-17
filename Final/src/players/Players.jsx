import { useState } from "react";
import { players } from "./playersData";
import { Link } from "react-router-dom";
import "./players.css";
import playerImg from "../image/images.jfif";

function Players() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false); 

  const positions = [
    { title: "Вратари", value: "Goalkeeper" },
    { title: "Защитники", value: "Defender" },
    { title: "Полузащитники", value: "Midfielder" },
    { title: "Нападающие", value: "Forward" },
    { title: "Тренер", value: "Manager" },
  ];

  const searchBoxStyle = {
    width: "100%",
    maxWidth: "400px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 20px",
    fontSize: "15px",
    fontFamily: "'Inter', sans-serif",
    color: "#3d352e",
    backgroundColor: !selectedTeam ? "#f1ebe2" : "white",
    border: isFocused ? "2px solid #b98b5f" : "2px solid #eee5da",
    borderRadius: "12px",
    boxShadow: isFocused 
      ? "0 6px 20px rgba(185, 139, 95, 0.15)" 
      : "0 4px 15px rgba(0, 0, 0, 0.04)",
    outline: "none",
    transition: "all 0.3s ease",
    cursor: !selectedTeam ? "not-allowed" : "text",
  };

  return (
    <>
      <header>
        <Link to="/">На Главную</Link>
        
        <div style={searchBoxStyle}>
          <input
            type="text"
            placeholder={selectedTeam ? "Поиск игрока по имени..." : "Сначала выберите команду..."}
            value={searchQuery}
            disabled={!selectedTeam}
            style={inputStyle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div>
        <h1>Выбери команду</h1>

        <div className="teams">
          {players.map((team, index) => (
            <button key={index} onClick={() => {
              setSelectedTeam(team);
              setSearchQuery(""); 
            }}>
              {team.team}
            </button>
          ))}
        </div>

        {selectedTeam && (
          <div>
            <h2>{selectedTeam.team}</h2>

            {positions.map((pos) => {
              const filteredPlayers = selectedTeam.players.filter(
                (player) =>
                  player.position === pos.value &&
                  player.name.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredPlayers.length === 0) return null;

              return (
                <div key={pos.value} className="playersSec">
                  <h2>{pos.title}</h2>

                  <div className="players-grid">
                    {filteredPlayers.map((player) => (
                      <div key={player.id} className="player-card">
                        <img src={playerImg} alt={player.name} />
                        <h4>{player.name}</h4>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Players;
