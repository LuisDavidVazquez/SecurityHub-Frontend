import NavBarLogin from "../components/Navbar";
import Profiles from "../components/Profiles";
import "../styles/About.css";
import { Fade } from "react-awesome-reveal";

function About() {
  const profileItems = [
    "Luis David Vázquez Albores",
    "Rodrigo Eliseo García Hérnandez",
    "Carlos Marroquin Ocanña",
    "Arturo Amizaday Jimenez Ojendis",
  ];

  return (
    <div className="about">
      <NavBarLogin />
      <Fade>
        <div className="about-main">
          <section className="about-section-1">
            <img src="/assets/images/LogoSecurityHub.png" alt="" />
          </section>
          <section className="about-section-2">
            <div className="about-section-2-contenedor">
              <p>
                Un software de monitoreo de propiedades para mantener informada
                la seguridad que usted necesite.{" "}
              </p>
            </div>
          </section>
          <section className="about-section-3">
            <div className="about-section-3-contenedor1">
              <h2>
                Nos enfo&shy;camos en su
                <span> seguridad</span>.
              </h2>
            </div>
            <div className="about-section-3-contenedor2">
              <h2>
                En México, la seguridad en el hogar ha ganado relevancia debido
                al aumento de accidentes domésticos y robos. Según el INEGI, en
                2022 se reportaron más de 2 millones de accidentes en el hogar,
                un 15% más que el año anterior. Asimismo, la ENVIPE 2023 indicó
                que el 30% de los hogares mexicanos han sido víctimas de algún
                delito, con alrededor de 200,000 robos en viviendas, lo que
                representa un incremento del 10% respecto al año anterior.
              </h2>
              <br />
              <h2>
                <span>SecurityHub</span> se preocupa por su seguridad con un
                monitoreo constante de sus propiedades.
              </h2>
            </div>
          </section>
          <section className="about-section-3 extra3">
            <div className="about-section-3-contenedor2 extra1">
              <h2>
                La implementación de un sistema de seguridad integral, como
                SecurityHub, no solo reduce significativamente los riesgos de
                robos, allanamientos y emergencias ambientales en el hogar, sino
                que también mejora la respuesta ante estos eventos.
                <br /><br />
                Al integrar diversas tecnologías y sensores en una plataforma
                accesible, SecurityHub puede detectar y alertar a los usuarios
                sobre posibles peligros en tiempo real. Esto permite a los
                propietarios tomar medidas preventivas rápidamente y minimizar
                el impacto de los incidentes. 
              </h2>
            </div>
            <div className="about-section-3-contenedor1 extra2">
              <h2>
                ¿Cómo hace su trabajo
                <span> Securityhub</span>?
              </h2>
            </div>
          </section>
          <section className="about-section-4">
            <p>Nosostros</p>
            <br />
            <br />
            <ul className="about-section-4-profile">
              {profileItems.map((item, index) => (
                <li key={index}>
                  <Profiles name={item} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Fade>
    </div>
  );
}

export default About;
