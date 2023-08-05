import '../css/video-editing/SceneSettings.css'
import { BsImage } from "react-icons/bs";
import { BiCaptions, BiVideoRecording, BiHide } from "react-icons/bi";
import { TbTransitionRight } from "react-icons/tb";
import { IoDuplicateOutline, IoVideocam } from "react-icons/io5";
import { RiImageEditFill } from "react-icons/ri";
import { RiDeleteBin2Line } from "react-icons/ri";

const SceneSettings = () => {

    return (
        <div className="scene-settings">
            <div className='scene-settings-header'>
                <div> SCENE SETTINGS </div>
            </div>

            <div className='scene-settings-tiles'>
                {/* Change Visual */}
                <button className='ss-tile first-tile'>
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

            <div className='scene-settings-delete-footer'>
                <button className='scene-settings-delete-button'>
                    <RiDeleteBin2Line  size={22} />
                </button>
            </div>

        </div>
      );
}

export default SceneSettings;