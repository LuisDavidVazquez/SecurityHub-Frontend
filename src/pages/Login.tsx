import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Login.css";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="login">
      <Navbar />
      <Fade>
        <div className="login-main">
          <section className="login-section-1">
            <img
              src="/assets/images/secure house.png" // Ajustar la ruta
              alt="Icono casa segura"
              style={{ width: "60%" }}
            />
          </section>
          <section className="login-section-2">
            <img
              src="/assets/images/login.png" // Ajustar la ruta
              alt="Icono de ususario"
              style={{ width: "120px" }}
            />
            <br />
            <form action="" onSubmit={handleSubmit}>
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
              <button>Ingresar</button>
            </form>
          </section>
        </div>
      </Fade>
    </div>
  );
}

export default Login;
