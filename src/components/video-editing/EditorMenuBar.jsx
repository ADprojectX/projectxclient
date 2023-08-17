import '../css/video-editing/EditorMenuBar.css';
import { FiDownload, FiMusic } from "react-icons/fi";
import { FaCirclePlay } from "react-icons/fa6";
import axios from 'axios';

const REQ_BASE_URL = 'http://localhost:8000/req';

const EditorMenuBar = ({ handleFullScreen }) => {

    let reqid = localStorage.getItem('reqid');

    const showProcessingIndicator = () => {
        // You can add some visual feedback like a spinner or changing the download button's appearance
        console.log("Video processing...");
    }

    const hideProcessingIndicator = () => {
        // Hide or revert the visual feedback shown during processing
        console.log("Video processing completed");
    }

    const downloadVideo = (url) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video.mp4'; // Adjust filename if necessary
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const checkIfVideoAvailable = (url, interval) => {
        axios.get(url)
            .then(response => {
                if (response.status === 200 && response.headers['content-type'] === 'video/mp4') { 
                    clearInterval(interval);
                    hideProcessingIndicator();
                    downloadVideo(url);
                }
            })
            .catch(error => {
                if (error.response && error.response.status !== 404) {
                    console.error('Error fetching video', error);
                }
            });
    }

    const handleDownloadButton = () => {
      axios.get(`${REQ_BASE_URL}/download-project?reqid=${reqid}`, { withCredentials: true })
          .then(response => {
              const finalVideoURL = response.data;
              console.log("FINALURL")
              console.log(finalVideoURL)
              showProcessingIndicator();
  
              let retries = 0; // Track the number of polling attempts
              const maxRetries = 10; // Maximum polling attempts
              let pollingInterval = 5000; // Start with 5 seconds
              
              const interval = setInterval(() => {
                  if (retries >= maxRetries) {
                      clearInterval(interval);
                      hideProcessingIndicator();
                      console.error('Max retries reached. Video might not be available.');
                      // Potentially show a user-friendly error message here
                      return;
                  }
  
                  checkIfVideoAvailable(finalVideoURL, interval);
  
                  retries++;
                  pollingInterval *= 1.5; // Increase polling interval by 50%
                  setTimeout(() => {
                      checkIfVideoAvailable(finalVideoURL, interval);
                  }, pollingInterval);
  
              }, pollingInterval); 
          })
          .catch(error => {
              console.error('Failed to Download Video', error);
          });
  }
  

    return (
        <div className="editor-menu-bar">
            {/* MUSIC BUTTON */}
            <div className='emb-button'>
                <FiMusic className='hover-effect' size={28} color='9B00B5'/>
            </div>
            {/* PREVIEW BUTTON */}
            <div className='emb-button'>
                <FaCirclePlay className='hover-effect' onClick={handleFullScreen} size={28} color='9B00B5'/>
            </div>
            {/* DOWNLOAD BUTTON */}
            <div className='emb-button' onClick={handleDownloadButton}>
                <FiDownload className='hover-effect' size={28} color='9B00B5'/>
            </div>
        </div>
    );
}

export default EditorMenuBar;


// import '../css/video-editing/EditorMenuBar.css'
// import { FiDownload, FiMusic } from "react-icons/fi";
// import { FaCirclePlay } from "react-icons/fa6";
// import axios from 'axios';


// const REQ_BASE_URL = 'http://localhost:8000/req';


// const EditorMenuBar = ({ handleFullScreen }) => {

//     let reqid = localStorage.getItem('reqid');

//     const handleDownloadButton = () => {
//       axios.get(`${REQ_BASE_URL}/download-project?reqid=${reqid}`, { withCredentials: true })
//       .then(response => {
//           const finalVideoURL = response.data;
//       })
//       .catch(error => {
//           console.error('Failed to Download Video', error);
//       });
//     }

//     return (
//         <div className="editor-menu-bar">
//           {/* MUSIC BUTTON */}
//           <div className='emb-button'>
//             <FiMusic className='hover-effect' size={28} color='9B00B5'/>
//           </div>
//           {/* PREVIEW BUTTON */}
//           <div className='emb-button'>
//             <FaCirclePlay className='hover-effect' onClick={handleFullScreen} size={28} color='9B00B5'/>
//           </div>
//           {/* DOWNLOAD BUTTON */}
//           <div className='emb-button' onClick={handleDownloadButton}>
//             <FiDownload className='hover-effect' size={28} color='9B00B5'/>
//           </div>
//         </div>
//       );
// }

// export default EditorMenuBar;