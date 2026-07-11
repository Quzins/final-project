import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="home">

      <section className="hero">
        <div>
          <h1>⚽ FOOTBALL MEDIA</h1>

          <p>
            Всё о Чемпионате мира 2026. <br />
            Команды, Игроки, Матчи и вы также можете поставить ставку за вашу любимую команду
          </p>

          <div className="buttons">
            <Link to="/teams">Команды</Link>
            <Link to="/news">Новости</Link>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>О проекте</h2>

        <p>
          Football Media — современная независимая медиа-платформа,
          созданная болельщиками для болельщиков. Мы публикуем
          новости, составы команд, статистику игроков и всё самое
          интересное о Чемпионате мира.
        </p>
      </section>

      <section className="cards">

        <div className="card">
          <h2>⚽ Команды</h2>
          <p>Все участники чемпионата мира.</p>
          <Link to="/teams">Открыть →</Link>
        </div>

        <div className="card">
          <h2>📰 Новости</h2>
          <p>Последние футбольные события.</p>
          <Link to="/news">Открыть →</Link>
        </div>

        <div className="card">
          <h2>🏟 Стадионы</h2>
          <p>Арены проведения матчей.</p>
          <Link to="/stadiums">Открыть →</Link>
        </div>

        <div className="card">
          <h2>📅 Расписание</h2>
          <p>Матчи и календарь турнира.</p>
          <Link to="/matches">Открыть →</Link>
        </div>

      </section>

    </div>
  );
}

export default Home;