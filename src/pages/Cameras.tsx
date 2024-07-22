import Menu from '../components/Menu'
import Header from '../components/Header'
import { Fade } from 'react-awesome-reveal'


function Cameras() {
  return (
    <div>
      <Menu />
      <div className="camera-main">
        <Fade>
          <Header />
          <div className="camera-section">

          </div>
        </Fade>
      </div>
    </div>
  )
}

export default Cameras
