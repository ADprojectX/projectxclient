import '../css/video-editing/EditorMenuBar.css';
import React, { useState } from 'react';
import { FiDownload, FiMusic } from "react-icons/fi";
import { FaCirclePlay } from "react-icons/fa6";
import axios from 'axios';

const REQ_BASE_URL = process.env.REACT_APP_REQ_BASE_URL;

const EditorMenuBar = ({ handleFullScreen }) => {

    const [status, setStatus] = useState(null);

    let reqid = localStorage.getItem('reqid');

    const downloadVideo = (url) => {
        console.log("videoUrl in downloadVideo")
        console.log(url)
        console.log("typeof(videoURL)")
        console.log(typeof(url))

        const link = document.createElement('a');
        link.href = url;
        link.download = 'video'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const downloadResource = (url, retries = 0) => {
        const MAX_RETRIES = 10;
        const RETRY_INTERVAL = 5000;
        console.log("videoUrl in downloadResource")
        console.log(url)

        fetch(url, { method: 'GET' })
            .then((response) => {
                if (response.ok) {
                    setStatus('Resource available.');
                    console.log("videoUrl in downloadResource ok");
                    console.log(url);
                    downloadVideo(url);
                } else {
                    // Resource not available, so retry
                    if (retries < MAX_RETRIES) {
                        setTimeout(() => {
                            downloadResource(retries + 1);
                        }, RETRY_INTERVAL);
                        setStatus(`Resource not available. Retry ${retries + 1} of ${MAX_RETRIES}.`);
                    } else {
                        setStatus('Max retries reached. Resource not available.');
                        alert('Download Failed. Please try again or contact support');
                    }
                }
            })
            .catch((error) => {
                // Error occurred, so retry
                if (retries < MAX_RETRIES) {
                    setTimeout(() => {
                        downloadResource(retries + 1);
                    }, RETRY_INTERVAL);
                    setStatus(`Error occurred. Retry ${retries + 1} of ${MAX_RETRIES}. Error: ${error.message}`);
                } else {
                    setStatus('Max retries reached. Error occurred while checking resource: ' + error.message);
                }
            });
    };

    const fetchVideoURL = async (reqId) => {
        try {   
            const [response] = await Promise.all([
                axios.get(`${REQ_BASE_URL}/download-project?reqid=${reqid}`, { withCredentials: true }),
            ]);
            const videoURL = response.data.final_video;
            downloadResource(videoURL);
        } catch (error) {
            console.error('Failed to retrieve video files:', error);
        }
    }

    
    const handleDownloadButton = async (reqid) => {
        try {
            console.log("In DOWNLOAD BUTTON 3")
            fetchVideoURL();
        } catch (error) {
            console.error('Failed to start the download process:', error);
        }
    };
    
    
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