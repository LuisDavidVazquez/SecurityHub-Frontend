import "./MenuButton.css"

interface ButtonAProps {
    imgSrc: string;
    imgAlt: string;
  }

const  MenuButton: React.FC<ButtonAProps> = ({ imgSrc, imgAlt }) => {
  return (
    <div className='menuButton'>
      <img src={imgSrc} alt={imgAlt} className='svgIcon' />
    </div>
  )
}

export default MenuButton
