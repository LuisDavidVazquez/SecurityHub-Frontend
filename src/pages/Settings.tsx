import Menu from '../components/Menu'
import Header from '../components/Header'
import { Fade } from 'react-awesome-reveal'

function Settings() {
  return (
    <div>
      <Menu />
      <div className="settings-main">
        <Fade>
          <Header />
          <div className="settings-section">

          </div>
        </Fade>
      </div>
    </div>
  )
}

export default Settings
