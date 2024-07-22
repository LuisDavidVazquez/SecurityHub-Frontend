import { Fade } from "react-awesome-reveal";
import Navbar from "../components/Navbar";
import "../styles/RecoverPassword.css";

function RecoverPassword() {
  const handleSubmit = () => {};

  return (
    <div className="recoverpassword">
      <Navbar />
      <Fade>
        <div className="recoverpassword-main">
          <section>
            <form action="" onSubmit={handleSubmit}>
              <img
                src="src/assets/images/recoverPass.png"
                alt="Icono de recuperar contraseña"
                style={{ width: "120px" }}
              />
              <br />
              <h1>Recuperar contraseña</h1>
              <br /><br />
              <h3>Ingrese su correo electrónico </h3>
              <br />
              <input
                type="text"
                placeholder="Correo electrónico"
                id="email"
                name="email"
              />
              <br />
              <button>Enviar</button>
            </form>
          </section>
        </div>
      </Fade>
    </div>
  );
}

export default RecoverPassword;
