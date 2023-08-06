import '../css/video-editing/EditorMenuBar.css'
import { FiDownload, FiMusic } from "react-icons/fi";
import { FaCirclePlay } from "react-icons/fa6";


const EditorMenuBar = ({ handleFullScreen }) => {

    return (
        <div className="editor-menu-bar">
          <div className='emb-button'>
            <FiMusic className='hover-effect' size={28} color='9B00B5'/>
          </div>
          <div className='emb-button'>
            <FaCirclePlay className='hover-effect' onClick={handleFullScreen} size={28} color='9B00B5'/>
          </div>
          <div className='emb-button'>
            <FiDownload className='hover-effect' size={28} color='9B00B5'/>
          </div>
        </div>
      );
}

export default EditorMenuBar;