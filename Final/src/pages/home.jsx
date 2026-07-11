import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <header>

      </header>

      <section className="hero">
        <div>
          <h1>⚽ FOOTBALL MEDIA</h1>

          <p>
            Всё о Чемпионате мира 2026. <br />
            Команды, Игроки, Матчи и вы также можете поставить ставку за вашу любимую команду
          </p>

          
        </div>
      </section>
      <section className="stats">
  <div className="stat-card">
    <h2>48</h2>
    <span>Сборных</span>
  </div>

  <div className="stat-card">
    <h2>104</h2>
    <span>Матча</span>
  </div>

  <div className="stat-card">
    <h2>16</h2>
    <span>Городов</span>
  </div>

  <div className="stat-card">
    <h2>3</h2>
    <span>Страны-хозяйки</span>
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
      <section className="features">

    <h2>Что доступно на Football Media?</h2>

    <div className="feature-grid">

        <div className="feature">
            <span>⚽</span>
            <h3>Все сборные</h3>
            <p>Изучайте участников чемпионата мира и их историю.</p>
        </div>

        <div className="feature">
            <span>👤</span>
            <h3>Игроки</h3>
            <p>Полные составы и информация о футболистах.</p>
        </div>

        <div className="feature">
            <span>📅</span>
            <h3>Матчи</h3>
            <p>Календарь и расписание турнира.</p>
        </div>

        <div className="feature">
            <span>💰</span>
            <h3>Ставки</h3>
            <p>Попробуйте угадать будущего победителя.</p>
        </div>

    </div>

</section>

      <section className="cards">
        <Link to="/teams">
          <div className="card">
            <h2>⚽ Команды</h2>
            <p>Все команды чемпионата мира</p>

          </div>
        </Link>
        <Link to="/players">
          <div className="card">
            <h2>Составы</h2>
            <p>Все игроки учавстующие в чемпионате</p>

          </div>
        </Link>
        
        <Link to="/match">
          <div className="card">
            <h2>Матчи</h2>
            <p>календарь турнира.</p>

          </div>
        </Link>
        <Link to="/bets">
          <div className="card">
            <h2>Ставки за команды</h2>
            <p>Вы можете поставить ставку на команду за которую болеете</p>

          </div>
        </Link>

      </section>

    </div>
  );
}

export default Home;