import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Login.css";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [alertNegative, setAlertNegative] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // const api_url = import.meta.env.VITE_HEXAGONAL_URL;

    if(email === "admin" && password==="1234"){
      navigate("/home")
    }else {
      setAlertNegative(true)
    }

  

  };

  return (
    <div className="login">
      <Navbar />
      <Fade>
        <div className="login-main">
          <section className="login-section-1">
            <img
              src="/assets/images/secure house.png"
              alt="Icono casa segura"
              style={{ width: "60%" }}
            />
          </section>
          <section className="login-section-2">
            <img
              src="/assets/images/login.png"
              alt="Icono de usuario"
              style={{ width: "120px" }}
            />
            <br />
            <form onSubmit={handleSubmit}>
              <h1>Iniciar sesión</h1>
              <br />
              <input type="text" placeholder="Correo electrónico" id="email" name="email" />
              <br />
              <input type="password" placeholder="Contraseña" id="password" name="password" />
              <div className="login-span">
                <Link to="/RecoverPassword" className="login-span-a">
                  Olvide mi contraseña
                </Link>
                <br />
                <br />
              </div>
              <button type="submit">Ingresar</button><br /><br />
              {alertNegative && (
                <div className="login-result">
                  <h6>Error con las credenciales</h6>
                </div>
              )}
            </form>
          </section>
        </div>
      </Fade>
    </div>
  );
}

export default Login;
