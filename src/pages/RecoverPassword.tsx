import { Fade } from "react-awesome-reveal";
import Navbar from "../components/Navbar";
import "../styles/RecoverPassword.css";
import { useState } from "react";
import axios from "axios";

function RecoverPassword() {

  const [alert, setAlert] = useState(false);
  const [alertNegative, setAlertNegative] = useState(false  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")

    const url = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.put(`${url}/users/update-password/${email}`)
      console.log(response.data);
      
      if(response.data.error) {
        console.log(response.data.error);
        setAlertNegative(true)
        setAlert(false)
      }else {
        setAlertNegative(false)
        setAlert(true)
      }

    } catch (error) {
      console.log(error);
      setAlertNegative(true)
      setAlert(false)
    }

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
              {alertNegative && (
                <div className="recoverpassword-result ">
                  <h6>No se encontro el correo electrónico</h6>
                </div>
              )}
              {alert && (
                <div className="recoverpassword-result-correct ">
                  <h6>Se envio la nueva contraseña a tu whatsapp</h6>
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
