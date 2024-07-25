import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Login.css";
import { Fade } from "react-awesome-reveal";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from 'axios';

function Login() {

  const navigate = useNavigate();
  const [alertNegative, setAlertNegative] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setAlertNegative(false)

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const url = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.post(`${url}/users/login`, {
        mail: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      
      const token = response.data.token;
      const res = await axios.post(`${url}/users/authToken`,{
        token : token
      })
      localStorage.setItem('token', token);
      localStorage.setItem('id', res.data.decoded.id);
      localStorage.setItem('name', res.data.decoded.name);
      localStorage.setItem('lastname', res.data.decoded.lastName);
      localStorage.setItem('phone', res.data.decoded.phone);
      localStorage.setItem('email', res.data.decoded.mail);

      Swal.fire({
        title: "Bienvenido " + res.data.decoded.name,
        icon: "success",
        showConfirmButton: false,
      });
      navigate("/home");

    } catch (error) {
      console.log(error);
      setAlertNegative(true);
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
              <button>Ingresar</button><br /><br />
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
