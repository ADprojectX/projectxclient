import './css/DashboardTile.css'
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit'


const DBTile = ( {icon1, icon2, icon3, text, link} ) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(link);
    };
    
    return (
        <div className="tile">

            <div className='icons'>
                <Icon icon={icon1.icon} size={icon1.size} />
                <Icon icon={icon2.icon} size={icon2.size}/>
                <Icon icon={icon3.icon} size={icon3.size}/>
            </div>  
            <div className='tile-text'>{text}</div>    
            <button className="tile-button" onClick={handleClick}>Continue</button>
        </div>
      );
}

export default DBTile;