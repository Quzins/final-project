import { useState } from "react";
import { teams } from "../team/teamsData";
import "./Bets.css";

function Bets() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [bet, setBet] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [walletOpened, setWalletOpened] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [message, setMessage] = useState("Добро пожаловать! Подтвердите возраст и откройте кошелёк.");
  const [history, setHistory] = useState([]);
  const [activeGroup, setActiveGroup] = useState("ALL");

  const groups = ["ALL", ...new Set(teams.map((t) => t.group))].sort();

  const filteredTeams = activeGroup === "ALL" 
    ? teams 
    : teams.filter((t) => t.group === activeGroup);

  const adjustBet = (amount) => {
    setMessage("");
    if (amount === "ALL") {
      setBet(wallet);
      return;
    }
    setBet((prev) => Math.max(0, prev + amount));
  };

  const resetBet = () => {
    setBet(0);
    setMessage("");
  };

  const openWallet = () => {
    if (walletOpened) {
      setMessage("Кошелёк уже активирован!");
      return;
    }
    if (!ageConfirmed) {
      setMessage("⚠️ Для открытия кошелька вам должно быть 18+");
      return;
    }
    
    const chance = Math.random();
    let money = 0;

    if (chance < 0.3) {
      money = Math.floor(Math.random() * 4001) + 1000;
    } else if (chance < 0.8) {
      money = Math.floor(Math.random() * 20001) + 20000;
    } else {
      money = Math.floor(Math.random() * 20001) + 60000;
    }

    setWallet(money);
    setWalletOpened(true);
    setMessage(`💰 Кошелёк успешно открыт! Вам начислено ${money.toLocaleString()} сом`);
  };

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setMessage(`Вы выбрали команду: ${team.name} (Группа ${team.group})`);
  };

  const makeBet = () => {
    if (!walletOpened) {
      setMessage("⚠️ Сначала необходимо открыть кошелёк.");
      return;
    }
    if (bet < 1000) {
      setMessage("⚠️ Минимальная ставка составляет 1 000 сом.");
      return;
    }
    if (bet > wallet) {
      setMessage("❌ Недостаточно средств на балансе кошелька.");
      return;
    }
    if (!selectedTeam) {
      setMessage("⚠️ Пожалуйста, выберите команду для ставки.");
      return;
    }

    const winnerTeam = teams[Math.floor(Math.random() * teams.length)];
    const isWin = selectedTeam.name === winnerTeam.name;
    
    if (isWin) {
      const prize = bet * 2;
      setWallet((prev) => prev + bet); 
      setHistory((prev) => [
        {
          id: Date.now(),
          amount: bet,
          team: selectedTeam.name,
          flag: selectedTeam.flag_url,
          isWin: true,
          details: `Победа! Команда выиграла матч.`,
          profit: `+${prize.toLocaleString()} сом`
        },
        ...prev,
      ]);
      setMessage(`🎉 Отлично! ${selectedTeam.name} побеждает! Вы выиграли ${prize.toLocaleString()} сом!`);
    } else {
      setWallet((prev) => prev - bet);
      setHistory((prev) => [
        {
          id: Date.now(),
          amount: bet,
          team: selectedTeam.name,
          flag: selectedTeam.flag_url,
          isWin: false,
          details: `Проигрыш. Чемпионом стал: ${winnerTeam.name}`,
          profit: `-${bet.toLocaleString()} сом`
        },
        ...prev,
      ]);
      setMessage(`😔 Ставка не сыграла. Победила команда: ${winnerTeam.name}.`);
    }

    setBet(0);
  };

  const clearHistory = () => {
    setHistory([]);
    setMessage("История ваших прогнозов полностью очищена.");
  };

  return (
    <div className="app">
      <h1>🏆 Ставки на ЧМ-2026</h1>
      <p className="subtitle">Выбирай фаворитов, голосуй и проверяй свою удачу</p>

      <div className="wallet-section">
        <div className="balance-display">
          Баланс: {wallet.toLocaleString()} сом
        </div>
        {!walletOpened && (
          <label className="age-label">
            <input
              type="checkbox"
              checked={ageConfirmed}
              onChange={(e) => setAgeConfirmed(e.target.checked)}
            />
            Мне исполнилось 18 лет
          </label>
        )}
        {!walletOpened && (
          <div style={{ marginTop: "15px" }}>
            <button className="btn-primary" onClick={openWallet}>Получить стартовый капитал</button>
          </div>
        )}
      </div>

      <h2>1. Проголосуйте за команду</h2>
      
      <div className="group-filters">
        {groups.map((group) => (
          <button
            key={group}
            className={`filter-btn ${activeGroup === group ? "active" : ""}`}
            onClick={() => setActiveGroup(group)}
          >
            {group === "ALL" ? "Все" : `Группа ${group}`}
          </button>
        ))}
      </div>

      <div className="teams-grid">
        {filteredTeams.map((team) => (
          <div
            key={team.fifa_code}
            className={`team-card ${selectedTeam?.fifa_code === team.fifa_code ? "selected" : ""}`}
            onClick={() => handleSelectTeam(team)}
          >
            <img src={team.flag_url} alt={team.name} className="flag" />
            <span className="team-name">{team.name}</span>
          </div>
        ))}
      </div>

      <h2>2. Настройте размер ставки</h2>
      <div className="bet-controls">
        <div className="bet-display">Текущая ставка: {bet.toLocaleString()} сом</div>
        <div className="btn-group">
          <button onClick={() => adjustBet(1000)}>+1 000</button>
          <button onClick={() => adjustBet(5000)}>+5 000</button>
          <button onClick={() => adjustBet(10000)}>+10 000</button>
          <button onClick={() => adjustBet("ALL")} style={{ color: "#ffd166" }}>Ва-банк</button>
          <button onClick={resetBet} className="btn-danger" style={{ padding: "12px" }}>❌ Сброс</button>
        </div>
      </div>

      <button className="btn-primary btn-action" onClick={makeBet}>
        🔥 Сделать ставку
      </button>

      {message && <div className="status-message">{message}</div>}

      <hr />

      <div className="history-section">
        <div className="history-header">
          <h2>📊 История прогнозов</h2>
          {history.length > 0 && (
            <button className="filter-btn btn-danger" onClick={clearHistory}>
              Очистить лог
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p style={{ color: "#94a3b8", textAlign: "center" }}>Вы пока не сделали ни одной ставки.</p>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <div key={item.id} className={`history-card ${item.isWin ? "win" : "lose"}`}>
                <div className="history-info">
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img src={item.flag} alt="" style={{ width: "24px", borderRadius: "2px" }} />
                    <h4>{item.team}</h4>
                  </div>
                  <p>{item.details} • Ставка: {item.amount.toLocaleString()} сом</p>
                </div>
                <div className="history-result" style={{ color: item.isWin ? "#00ff88" : "#ef4444" }}>
                  {item.profit}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bets;