import "../styles/Header.css";
import ButtonA from "./buttons/ButtonA";


function Header() {

  const email = localStorage.getItem('email') as string;

  return (
    <div className="header-main">
      <img
        src="/assets/images/LogoSecurityHub.png"
        alt="Logo SecurityHub"
        className="home-header-logo"
      />
      <ul>
        <li>
          <div style={{ height: "50%" }}>
            <img
              src="/assets/svg/notification.svg"
              alt="Icono de notificacion"
              style={{ height: "90%" }}
            />
          </div>
        </li>
        <li>
          <div className="header-main-user">
            <ButtonA
              text={email}
              imgSrc="/assets/svg/user.svg"
              imgAlt="Icono de usuario"
            />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Header;
