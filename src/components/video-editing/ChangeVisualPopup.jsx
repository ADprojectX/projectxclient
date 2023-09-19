import '../css/video-editing/ChangeVisualPopup.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { LuUpload } from "react-icons/lu";
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const REQ_BASE_URL = process.env.REACT_APP_REQ_BASE_URL;
let reqid = localStorage.getItem('reqid');

const ChangeVisualPopup = ({ scenes, currentSceneIndex }) => {
    const [title, setTitle] = useState('');
    const [selectedDiv, setSelectedDiv] = useState('sdxl');

    const handleDivSelection = (selection) => {
        setSelectedDiv(selection);
      }
      

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
      };
    
    const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (title.trim() !== '') {
        handleSubmit(e);
        }
    }
    };

    const handleSubmit = (e) => {
        const data ={
            reqid:reqid,
            sceneid: scenes[currentSceneIndex].sceneId,
            prompt:title,
            service:selectedDiv
        }

        // Convert the data object into a query parameter string
        const queryParams = Object.keys(data)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');

        axios.get(`${REQ_BASE_URL}/generate-image/?${queryParams}`, { withCredentials: true })
        .then(response => {
            
        })
        .catch(error => {
            console.error('Failed to fetch projects:', error);
        });
    };
    
    return (
    <div className="cv-popup-div">
        {/* <div className='popup-div-title'>Coming Soon</div> */}
        <div className='cv-popup-sidebar'>
        </div>

        <div className='cv-popup-main'>

            <div className='cv-popup-video-player'>

            </div>

            <div className='cv-popup-input-container'>
                <div className={`cv-popup-title-input-unit ${title.trim() !== '' ? 'filled' : ''}`}>
                    <input type="text"  onKeyPress={handleEnterKeyPress} value={title} onChange={handleTitleChange} placeholder="Enter your image prompt here..." />
                </div>
                <button 
                    className="cv-popup-title-input-btn" 
                    onClick={handleSubmit} 
                    type="submit">
                    Generate New Image
                    {/* <BsFillArrowRightCircleFill className="title-btn" color={title.trim() === '' ? 'transparent' : '#10C300'} size={32}/> */}
                </button>
            </div>

            <div className="cv-button-container">

                <div 
                    className={`cv-btns ${selectedDiv === 'sdxl' ? 'gradient-border-color' : ''}`} 
                    onClick={() => handleDivSelection('sdxl')}
                >
                    <img style={{ width: '60px', height: '60px', margin: '20px' }} className="cv-btn-icon" src="../stability-logo.png"/>
                    <p style={{ margin: '5px' }}>Prompt Like Stable Diffusion</p>
                </div>

                <div 
                    className={`cv-btns ${selectedDiv === 'mjx' ? 'gradient-border-color' : ''}`} 
                    onClick={() => handleDivSelection('mjx')}
                >
                    <img style={{ width: '100px', height: '100px' }} className="cv-btn-icon" src="../midjourney_logo.png"/>
                    <p style={{ margin: '5px' }}>Prompt Like Midjourney</p>
                </div>


                {/* <div className='cv-btns gradient-border-color'>
                    <img style={{ width: '60px', height: '60px', margin: '20px' }} className="cv-btn-icon" src="../stability-logo.png"/>
                    <p style={{ margin: '5px' }}>Prompt Like Stable Diffusion</p>
                </div>
                <div className='cv-btns gradient-border-color'>
                    <img style={{ width: '100px', height: '100px' }} className="cv-btn-icon" src="../midjourney_logo.png"/>
                    <p style={{ margin: '5px' }}>Prompt Like Midjourney</p>
                </div> */}

                <div className='tile-divider'></div>

                {/* <div className='cv-btns'>
                    <FaPhotoFilm style={{ margin: '16px' }} color='#8EB0BC' size={80}/>
                    <p style={{ margin: '15px' }}>Choose Stock Footages</p>
                </div> */}
                
                <div className='cv-btns'>
                    <LuUpload style={{ margin: '20px' }} color='#8EB0BC' size={60}/>
                    <p style={{ margin: '5px' }}>Upload your own Footage</p>
                </div>
            </div>

        </div>
    </div>
    );
}

export default ChangeVisualPopup;