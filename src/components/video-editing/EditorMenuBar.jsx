import '../css/video-editing/EditorMenuBar.css'
import { FiDownload, FiMusic } from "react-icons/fi";
import { FaCirclePlay } from "react-icons/fa6";


const EditorMenuBar = () => {

    return (
        <div className="editor-menu-bar">
          <FiMusic size={28} color='9B00B5'/>
          <FaCirclePlay size={28} color='9B00B5'/>
          <FiDownload size={28} color='9B00B5'/>
        </div>
      );
}

export default EditorMenuBar;