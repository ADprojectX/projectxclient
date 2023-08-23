import '../css/video-editing/SceneSettings.css'
import { useState } from 'react';
import { BiCaptions, BiVideoRecording, BiHide } from "react-icons/bi";
import { TbTransitionRight } from "react-icons/tb";
import { IoDuplicateOutline } from "react-icons/io5";
import { RiImageEditFill } from "react-icons/ri";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaPhotoFilm } from "react-icons/fa6";
import { LuUpload } from "react-icons/lu";

const Overlay = ({ onClick }) => (
    <div className="overlay" onClick={onClick}></div>
);


const ChangeVisualPopup = () => (
    <div className="popup-div">
        <div className='popup-div-title'>Coming Soon</div>
        <div className="popup">
            <div className='change-visual-btns gradient-border-color'>
                <img style={{ width: '110px', height: '110px' }} className="change-visual-btn-icon" src="../midjourney_logo.png"/>
                <p>Prompt Like Midjourney</p>
            </div>
            <div className='change-visual-btns gradient-border-color'>
                <img style={{ width: '70px', height: '70px', margin: '20px' }} className="change-visual-btn-icon" src="../stability-logo.png"/>
                <p>Prompt Like Stable Diffusion</p>
            </div>

            <div className='tile-divider'></div>

            <div className='change-visual-btns'>
                <FaPhotoFilm style={{ margin: '16px' }} color='#8EB0BC' size={80}/>
                <p style={{ margin: '15px' }}>Choose Stock Footages</p>
            </div>
            <div className='change-visual-btns'>
                <LuUpload style={{ margin: '20px' }} color='#8EB0BC' size={70}/>
                <p style={{ margin: '15px' }}>Upload your own Footage</p>
            </div>
        </div>
    </div>
);

const SceneSettings = () => {
    const [activePopup, setActivePopup] = useState(null);

    return (
        <div className="scene-settings">
            <div className='scene-settings-header'>
                <div> Coming Soon </div>
            </div>

            <div className='scene-settings-tiles'>
                {/* Change Visual */}
                <button className='ss-tile first-btn' onClick={() => setActivePopup('visual')}>
                    <div className='ss-tile-icon'>
                        <RiImageEditFill size={22}/>
                    </div>
                    <div className='ss-tile-text'>
                        Change Visual
                    </div>
                </button>

                {/* Change Caption */}
                <button className='ss-tile'>
                    <div className='ss-tile-icon'>
                        <BiCaptions size={22}/>
                    </div>
                    <div className='ss-tile-text'>
                    Change Caption
                    </div>
                </button>

                {/* Add Transition */}
                <button className='ss-tile'>
                    <div className='ss-tile-icon'>
                        <TbTransitionRight size={20}/>
                    </div>
                    <div className='ss-tile-text'>
                    Add Transition
                    </div>
                </button>

                {/* Duplicate Scene */}
                <button className='ss-tile'>
                    <div className='ss-tile-icon'>
                        <IoDuplicateOutline size={20}/>
                    </div>
                    <div className='ss-tile-text'>
                    Duplicate Scene
                    </div>
                </button>

                {/* Convert to video */}
                <button className='ss-tile'>
                    <div className='ss-tile-icon'>
                        <BiVideoRecording size={20}/>
                    </div>
                    <div className='ss-tile-text'>
                    Convert to video
                    </div>
                </button>

                {/* Hide Caption */}
                <button className='ss-tile'>
                    <div className='ss-tile-icon'>
                        <BiHide size={20}/>
                    </div>
                    <div className='ss-tile-text'>
                    Hide Caption
                    </div>
                </button>

            </div>
            {activePopup && <Overlay onClick={() => setActivePopup(null)} />}
            {activePopup === 'visual' && <ChangeVisualPopup />}

            <div className='scene-settings-delete-footer'>
                <button className='scene-settings-delete-button'>
                    <RiDeleteBin2Line  size={22} />
                </button>
            </div>

        </div>
      );
}

export default SceneSettings;