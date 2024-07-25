import "../styles/Header.css";
import ButtonA from "./buttons/ButtonA";


function Header() {

  const name = localStorage.getItem('name') as string;

  return (
    <div className="header-main">
      <img
        src="/assets/images/LogoSecurityHub.png"
        alt="Logo SecurityHub"
        className="home-header-logo"
      />
      <ul>
        <li>
          <div className="header-main-user">
            <ButtonA
              text={name}
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
