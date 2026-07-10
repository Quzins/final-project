import { useState } from "react";
import { players } from "./playersData";
import "./players.css";
import playerImg from "../image/player.png";

function Players() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const positions = [

{ title: "Вратари", value: "Goalkeeper" },

{ title: "Защитники", value: "Defender" },

{ title: "Полузащитники", value: "Midfielder" },

{ title: "Нападающие", value: "Forward" },

{ title: "Тренеры", value: "Manager" },

];

  return (
    <div>

      <h1>Выбери команду</h1>

      <div className="teams">
        {players.map((team, index) => (
          <button
            key={index}
            onClick={() => setSelectedTeam(team)}
          >
            {team.team}
          </button>
        ))}
      </div>


{selectedTeam && (
  <div>
    <h2>{selectedTeam.team}</h2>

    {positions.map(pos => (
      <div key={pos.value} className="playersSec">
        <h2>{pos.title}</h2>

        {selectedTeam.players
          .filter(player => player.position === pos.value)
          .map(player => (
            <div key={player.id} className="player-card">
              <img src={playerImg} alt={player.name} />
              <h4>{player.name}</h4>
              <h4></h4>
            </div>
          ))}

      </div>
    ))}

  </div>
)}

    </div>
  );
}

export default Players;