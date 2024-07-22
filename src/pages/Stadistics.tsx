import { Fade } from "react-awesome-reveal"
import Header from "../components/Header"
import Menu from "../components/Menu"


function Stadistics() {
  return (
    <div>
      <Menu />
      <div className="stadistic-main">
        <Fade>
          <Header />
          <div className="stadistic-section">

          </div>
        </Fade>
      </div>
    </div>
  )
}

export default Stadistics

