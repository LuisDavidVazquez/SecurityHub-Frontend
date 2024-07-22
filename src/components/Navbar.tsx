import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import ButtonA from "./buttons/ButtonA";

function Navbar() {
  interface NavItem {
    path: string;
    text: string;
    imgSrc: string;
    imgAlt: string;
  }

  const navItems: NavItem[] = [
    {
      path: "/",
      text: "Conócenos",
      imgSrc: "src/assets/svg/world.svg",
      imgAlt: "Icono de mundo",
    },
    {
      path: "/login",
      text: "Iniciar Sesión",
      imgSrc: "src/assets/svg/user.svg",
      imgAlt: "Icono de usuario",
    },
  ];

  return (
    <div className="navbar-login">
      <img
        src="src/assets/images/LogoSecurityHub.png"
        alt="Logo SecurityHub"
        className="navbar-login-logo"
      />
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "navbar-login-activate" : "navbar-login-desactivate"
              }
            >
              <ButtonA
                text={item.text}
                imgSrc={item.imgSrc}
                imgAlt={item.imgAlt}
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
