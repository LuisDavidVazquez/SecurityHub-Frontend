import { Fade } from "react-awesome-reveal";
import Menu from "../components/Menu";
import Header from "../components/Header";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <Menu />
      <div className="home-main">
        <Fade>
          <Header />
          <div className="home-section">
            <section className="home-section-metrics">
              <h1>Metricas</h1>
              <br />
              <ul>
                <li>
                  <h2>Temperatura</h2>
                  <h2>50 °C</h2>
                </li>
                <li>
                    <h2>Sonido</h2>
                    <h2>50</h2>
                </li>
                <li>
                    <h2>Gases</h2>
                    <h2>50</h2>
                </li>
              </ul>
            </section>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Home;
