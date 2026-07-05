import { useState } from "react";
import { players } from "./playersData";
import "./players.css";

function Players() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div>

      <h1>Выбери команду</h1>

      <div>
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
          <h2><span><img src="" alt="" /></span>{selectedTeam.team}</h2>

          <h3>Игроки:</h3>

          {selectedTeam.players.map((player) => (
            <div key={player.id} className="player-card">
              <h4>{player.name}</h4>
              <p>{player.position}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Players;