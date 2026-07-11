import { useState } from "react";
import { Link } from "react-router-dom";
import "./Bets.css";

function Bets({ allMatches, wallet, setWallet, walletOpened, setWalletOpened }) {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [bet, setBet] = useState(0);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [message, setMessage] = useState("Добро пожаловать! Подтвердите возраст и откройте кошелёк.");
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  const filteredMatches = allMatches.filter((m) => {
    const text = m.home.name.toLowerCase() + " " + m.away.name.toLowerCase();
    return text.includes(search.toLowerCase());
  });

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
    if (chance < 0.3) money = Math.floor(Math.random() * 4001) + 1000;
    else if (chance < 0.8) money = Math.floor(Math.random() * 20001) + 20000;
    else money = Math.floor(Math.random() * 20001) + 60000;

    setWallet(money);
    setWalletOpened(true);
    setMessage(`💰 Кошелёк успешно открыт! Вам начислено ${money.toLocaleString()} сом`);
  };

  const handleSelectOutcome = (match, outcome) => {
    setSelectedMatch(match);
    setSelectedOutcome(outcome);
    const label = outcome === 'home' ? match.home.name : outcome === 'away' ? match.away.name : 'Ничью';
    setMessage(`Выбрана ставка на матч ${match.home.name} VS ${match.away.name}. Исход: ${label}`);
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
    if (!selectedMatch || !selectedOutcome) {
      setMessage("⚠️ Пожалуйста, выберите матч и исход для ставки.");
      return;
    }

    const rand = Math.random();
    let finalOutcome = 'draw';
    if (rand < 0.45) finalOutcome = 'home';
    else if (rand > 0.55) finalOutcome = 'away';

    const isWin = selectedOutcome === finalOutcome;
    const currentCoef = selectedMatch.coefs[selectedOutcome];
    
    if (isWin) {
      const prize = Math.floor(bet * currentCoef);
      const profitNetto = prize - bet;
      setWallet((prev) => prev + profitNetto); 
      setHistory((prev) => [
        {
          id: Date.now(),
          amount: bet,
          matchName: `${selectedMatch.home.name} - ${selectedMatch.away.name}`,
          isWin: true,
          details: `Победа! Матч завершился в пользу вашего исхода.`,
          profit: `+${prize.toLocaleString()} сом`
        },
        ...prev,
      ]);
      setMessage(`🎉 Отлично! Ставка сыграла! Вы выиграли ${prize.toLocaleString()} сом (Коэф. ${currentCoef})!`);
    } else {
      setWallet((prev) => prev - bet);
      const correctLabel = finalOutcome === 'home' ? selectedMatch.home.name : finalOutcome === 'away' ? selectedMatch.away.name : 'Ничья';
      setHistory((prev) => [
        {
          id: Date.now(),
          amount: bet,
          matchName: `${selectedMatch.home.name} - ${selectedMatch.away.name}`,
          isWin: false,
          details: `Проигрыш. Фактический результат: ${correctLabel}`,
          profit: `-${bet.toLocaleString()} сом`
        },
        ...prev,
      ]);
      setMessage(`😔 Ставка не сыграла. Результат матча: ${correctLabel}.`);
    }

    setBet(0);
    setSelectedOutcome(null);
  };

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <span className="logo">🏆 Букмекерская Контора</span>
          <Link to="/">На Главную</Link>
          <Link to="/match" className="nav-link">В Матч-Центр</Link>
        </div>
      </header>

      <div className="app">
        <h1>🏆 Ставки на ЧМ-2026</h1>
        <p className="subtitle">Выбирай коэффициенты из реальной сетки матчей турнира</p>

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

        <h2>1. Выберите исход матча для купона</h2>
        <input 
          type="text" 
          placeholder="Фильтр матчей по командам..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="search-input"
          style={{marginBottom: '20px'}}
        />
        
        <div className="bets-matches-list">
          {filteredMatches.slice(0, 15).map((m) => (
            <div key={m.id} className="bet-row-card">
              <div className="bet-row-teams">
                <span>{m.home.name}</span>
                <span className="vs-badge">VS</span>
                <span>{m.away.name}</span>
              </div>
              <div className="bet-row-actions">
                <button 
                  className={`coef-btn ${selectedMatch?.id === m.id && selectedOutcome === 'home' ? 'active' : ''}`}
                  onClick={() => handleSelectOutcome(m, 'home')}
                >
                  П1 ({m.coefs.home})
                </button>
                <button 
                  className={`coef-btn ${selectedMatch?.id === m.id && selectedOutcome === 'draw' ? 'active' : ''}`}
                  onClick={() => handleSelectOutcome(m, 'draw')}
                >
                  Х ({m.coefs.draw})
                </button>
                <button 
                  className={`coef-btn ${selectedMatch?.id === m.id && selectedOutcome === 'away' ? 'active' : ''}`}
                  onClick={() => handleSelectOutcome(m, 'away')}
                >
                  П2 ({m.coefs.away})
                </button>
              </div>
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
            <button onClick={() => adjustBet("ALL")} style={{ color: '#b98b5f', fontWeight: 'bold' }}>Ва-банк</button>
            <button onClick={resetBet} className="btn-danger">❌ Сброс</button>
          </div>
        </div>

        <button className="btn-primary btn-action" onClick={makeBet}>
          🔥 Разместить Прогноз
        </button>

        {message && <div className="status-message">{message}</div>}

        <hr />

        <div className="history-section">
          <h2>📊 История прогнозов</h2>
          {history.length === 0 ? (
            <p style={{ color: "#75695d", textAlign: "center", marginTop: '15px' }}>Вы пока не сделали ни одной ставки.</p>
          ) : (
            <div className="history-list">
              {history.map((item) => (
                <div key={item.id} className={`history-card ${item.isWin ? "win" : "lose"}`}>
                  <div className="history-info">
                    <h4>{item.matchName}</h4>
                    <p>{item.details} • Сумма: {item.amount.toLocaleString()} сом</p>
                  </div>
                  <div className="history-result">
                    {item.profit}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Bets;
