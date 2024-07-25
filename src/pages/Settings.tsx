import Menu from "../components/Menu";
import Header from "../components/Header";
import { Fade } from "react-awesome-reveal";
import "../styles/maindiv.css";
import "../styles/Settings.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Settings() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const id_user = localStorage.getItem("id");

  useEffect(() => {
    getDAta();
  }, []);

  const getDAta = async () => {
      setName(localStorage.getItem("name") as string);
      setLastName(localStorage.getItem("lastname") as string);
      setPhone(localStorage.getItem("phone") as string);
      setMail(localStorage.getItem("email") as string);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");

  const handleCancelClick = () => {
    getDAta();
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "mail":
        setMail(value);
        break;
      case "password":
        // Handle password if needed
        break;
      default:
        break;
    }
  };

  const handleSaveClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const mail = formData.get("mail") as string;
    if (name === "" || lastName === "" || phone === "" || mail === "") {
      Swal.fire({
        title: "Campos vacios",
        icon: "warning",
        showConfirmButton: false,
      });
    } else {
      try {
        const response = await axios.put(`${url}/users/${id_user}`, {
          name: name,
          lastName: lastName,
          phone: phone,
          mail: mail,
        });
        console.log(response);

        setName(name);
        setLastName(lastName);
        setPhone(phone);
        setMail(mail);

        localStorage.setItem("name", name);
        localStorage.setItem("lastname", lastName);
        localStorage.setItem("phone", phone);
        localStorage.setItem("email", mail);

        Swal.fire({
          title: "Cambios guardados ",
          icon: "success",
          showConfirmButton: false,
        });
        setIsEditing(false);
      } catch (error) {
        Swal.fire({
          title: "No se guardaron los cambios",
          icon: "warning",
          showConfirmButton: false,
        });
        console.log(error);
      }
    }
  };

  const handleSavePassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const passwordC = formData.get("passwordC") as string;
    if (password === "" || passwordC === "") {
      Swal.fire({
        title: "Campos vacios",
        icon: "warning",
        showConfirmButton: false,
      });
    } else if (password != passwordC) {
      Swal.fire({
        title: "Campos no coinciden",
        icon: "warning",
        showConfirmButton: false,
      });
    } else {
      try {
        const response = await axios.put(`${url}/users/${id_user}`, {
          password: password,
        });
        console.log(response);
        Swal.fire({
          title: "Contraseña nueva cambiada",
          icon: "success",
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "No se guardaron los cambios",
          icon: "warning",
          showConfirmButton: false,
        });
        console.log(error);
      }
    }
  };

  return (
    <div className="maindiv">
      <Menu />
      <div className="sub-maindiv">
        <Fade>
          <Header />
          <div className="settings-section">
            <section className="settings-section-1">
              <h1>Perfil</h1>
              <div className="settings-section-1-edit">
                <img
                  src="/assets/images/login.png"
                  alt="Icono de perfil"
                  style={{ width: "15%" }}
                />
                <br />
                {isEditing ? (
                  <form onSubmit={handleSaveClick}>
                    <ul>
                      <li>
                        <h2>Nombre: </h2>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={handleInputChange}
                        />
                      </li>
                      <li>
                        <h2>Apellido: </h2>
                        <input
                          type="text"
                          name="lastName"
                          value={lastName}
                          onChange={handleInputChange}
                        />
                      </li>
                      <li>
                        <h2>Teléfono: </h2>
                        <input
                          type="text"
                          name="phone"
                          value={phone}
                          onChange={handleInputChange}
                        />
                      </li>
                      <li>
                        <h2>Correo: </h2>
                        <input
                          type="text"
                          name="mail"
                          value={mail}
                          onChange={handleInputChange}
                        />
                      </li>
                    </ul>
                    <div>
                      <button className="button-guardar" type="submit">
                        Guardar
                      </button>
                      <button
                        className="button-cancelar"
                        onClick={handleCancelClick}
                        type="button"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="setting-form">
                    <ul>
                      <li>
                        <h2>Nombre: </h2>
                        <label>{name}</label>
                      </li>
                      <li>
                        <h2>Apellido: </h2>
                        <label>{lastName}</label>
                      </li>
                      <li>
                        <h2>Teléfono: </h2>
                        <label>{phone}</label>
                      </li>
                      <li>
                        <h2>Correo: </h2>
                        <label>{mail}</label>
                      </li>
                    </ul>
                    <button className="button-editar" onClick={handleEditClick}>
                      Editar
                    </button>
                  </div>
                )}
              </div>
            </section>
            <br />
            <br /><br />
            <section className="settings-section-1">
              <h1>Cambiar contraseña</h1>
              <div className="settings-section-1-edit">
                <br />
                <form onSubmit={handleSavePassword}>
                  <ul>
                    <li>
                      <h2>Nueva contraseña: </h2>
                      <input type="password" name="password" />
                    </li>
                    <li>
                      <h2>Confirmar contraseña: </h2>
                      <input type="password" name="passwordC" />
                    </li>
                  </ul>
                  <div>
                    <button className="button-guardar" type="submit">
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Settings;
