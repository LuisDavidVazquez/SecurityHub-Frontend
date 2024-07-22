import "../styles/profiles.css"

interface ButtonAProps {
  name: string;
}

const Profiles: React.FC<ButtonAProps> = ({name}) => {
  return (
    <div className='profiles'>
      <div className="profiles-main">
        <img src="/assets/images/login.png" alt="Icono de perfil"/>
      </div>
      <br />
      <h2>{name}</h2>
    </div>
  )
}

export default Profiles
