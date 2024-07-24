import Menu from '../components/Menu'
import Header from '../components/Header'
import { Fade } from 'react-awesome-reveal'
import "../styles/maindiv.css"

function Stadistics() {
  return (
    <div className="maindiv">
      <Menu />
      <div className="sub-maindiv">
        <Fade>
          <Header />
          <div className="home-section"></div>
        </Fade>
      </div>
    </div>
  );
}

export default Stadistics
