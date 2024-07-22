import "../styles/Menu.css";
import MenuButton from "./buttons/MenuButton";
import { Link, NavLink } from "react-router-dom";

function Menu() {

  interface NavItem {
    path: string;
    imgSrc: string;
    imgAlt: string;
  }

  const navItems: NavItem[] = [
    {
      path: "/home",
      imgSrc: "src/assets/svg/home.svg",
      imgAlt: "Icono de casa",
    },
    {
      path: "/cameras",
      imgSrc: "src/assets/svg/camera.svg",
      imgAlt: "Icono de camara",
    },
    {
      path: "/stadistics",
      imgSrc: "src/assets/svg/stadistic.svg",
      imgAlt: "Icono de estadistica",
    },
    {
      path: "/settings",
      imgSrc: "src/assets/svg/settings.svg",
      imgAlt: "Icono de configuracion",
    },
  ];

  return (
    <div className="menu">
      <ul className="menu-list">
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink to={item.path} className={({ isActive }) =>
                isActive ? "menuNav-activate" : "menuNav"
              }>
              <MenuButton
                imgSrc={item.imgSrc}
                imgAlt={item.imgAlt}
              />
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="menu-logout">
        <Link to="/login" className="menuNav">
          <MenuButton
            imgSrc="src/assets/svg/logout.svg"
            imgAlt="Icono cerrar sesión"
          />
        </Link>
      </div>
    </div>
  );
}

export default Menu;
