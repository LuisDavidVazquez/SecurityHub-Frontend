import { Fade } from "react-awesome-reveal";
import Navbar from "../components/Navbar";
import "../styles/RecoverPassword.css";
import { useState } from "react";

function RecoverPassword() {
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAlert(true);
  };

  return (
    <div className="recoverpassword">
      <Navbar />
      <Fade>
        <div className="recoverpassword-main">
          <section>
            <form action="" onSubmit={handleSubmit}>
              <img
                src="/assets/images/recoverPass.png"
                alt="Icono de recuperar contraseña"
                style={{ width: "120px" }}
              />
              <br />
              <h1>Recuperar contraseña</h1>
              <br />
              <br />
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
              <br />
              <br />
              {alert && (
                <div className="recoverpassword-result ">
                  <h6>Se envio tu nueva contraseña a tu whatsapp</h6>
                </div>
              )}
            </form>
          </section>
        </div>
      </Fade>
    </div>
  );
}

export default RecoverPassword;
