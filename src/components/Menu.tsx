import "../styles/Menu.css";
import MenuButton from "./buttons/MenuButton";
import { Link, NavLink } from "react-router-dom";

function Menu() {
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  interface NavItem {
    path: string;
    imgSrc: string;
    imgAlt: string;
  }

  const navItems: NavItem[] = [
    {
      path: "/home",
      imgSrc: "/assets/svg/home.svg",
      imgAlt: "Icono de casa",
    },
    {
      path: "/cameras",
      imgSrc: "/assets/svg/camera.svg",
      imgAlt: "Icono de camara",
    },
    {
      path: "/stadistics",
      imgSrc: "/assets/svg/stadistic.svg",
      imgAlt: "Icono de estadistica",
    },
    {
      path: "/settings",
      imgSrc: "/assets/svg/settings.svg",
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
        <Link onClick={logOut} to="/login" className="menuNav">
          <MenuButton
            imgSrc="/assets/svg/logout.svg"
            imgAlt="Icono cerrar sesión"
          />
        </Link>
      </div>
    </div>
  );
}

export default Menu;
