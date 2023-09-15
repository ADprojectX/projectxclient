import React, { useState, useEffect } from 'react';
import EditorMain from '../components/video-editing/Editormain';
import SideNavBar from '../components/SideBar';
import './css/VideoPlayer.css';
import axios from 'axios';

const REQ_BASE_URL = process.env.REACT_APP_REQ_BASE_URL;

const VideoPlayer = () => {
  const [videoFiles, setVideoFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  let reqid = localStorage.getItem('reqid');

  const fetchThumbnails = async (reqId) => {
    try {
        const res = await axios.get(`${REQ_BASE_URL}/get-thumbnails/?reqid=${reqId}`);
        return res.data.asset_urls.map(thumbnailArr => thumbnailArr[2]); // assuming the URL structure is the same
    } catch (error) {
        console.error('Failed to retrieve thumbnails:', error);
        return [];
    }
  }

  const fetchVideoFiles = async (reqId) => {
    try {
        const [response, thumbnails] = await Promise.all([
            axios.get(`${REQ_BASE_URL}/video-files/?reqid=${reqId}`),
            fetchThumbnails(reqId)
        ]);

        const videoData = response.data.asset_urls;
        const videosWithDuration = await Promise.all(videoData.map(async (videoArr, index) => {
            const sceneId = videoArr[1];
            const url = videoArr[2];
            return new Promise((resolve) => {
                const videoElement = document.createElement('video');
                videoElement.src = url;
                videoElement.addEventListener('loadedmetadata', () => {
                    const duration = videoElement.duration;
                    resolve({ url, duration, thumbnail: thumbnails[index], sceneId });
                });
            });
        }));

        const videoFiles = videosWithDuration.map((video, index) => ({
            name: `Scene${index}`,
            video: video.url,
            thumbnail: video.thumbnail,
            audio: '',
            duration: video.duration,
            sceneId: video.sceneId
        }));

        setVideoFiles(videoFiles);
        setIsLoading(false);
    } catch (error) {
        console.error('Failed to retrieve video files:', error);
    }
  }

  useEffect(() => {
    fetchVideoFiles(reqid);
  }, [reqid]);

  const checkURLExpired = (url) => {
    if (hasUrlExpired(url)) {
      console.log("URL expired")
      updateExpiredURL();
  }
  }


  const updateExpiredURL = () => {
    fetchVideoFiles(reqid);
  };

  const hasUrlExpired = (url) => {
    const expiresMatch = url.match(/Expires=(\d+)/);
    if (!expiresMatch) return true;
  
    const expiryTimestamp = parseInt(expiresMatch[1], 10);
    return (Date.now() / 1000) > expiryTimestamp;
  };
  
  if (isLoading) {
    return <div>Loading videos...</div>;
  }
  
  return (
    <div className='video-page'>
      <SideNavBar />
      <div className='editor'>
        <div className='video-player'>
          <EditorMain scenes={videoFiles} checkURLExpired={checkURLExpired}/>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;