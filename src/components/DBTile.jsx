import './css/DashboardTile.css'
import { Navigate, useNavigate } from 'react-router-dom';
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
                {/* <Icon icon={ic_receipt_outline} size={32}/>
                <Icon icon={arrowRightOutline} size={24}/>
                <Icon icon={play} size={32}/> */}
            <div className='tile-text'>{text}</div>    
            <button className="tile-button" onClick={handleClick}>Continue</button>
        </div>
      );
}

export default DBTile;