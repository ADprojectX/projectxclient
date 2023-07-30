import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './css/VideoPlayer.css'
import SceneSelector from '../components/SceneSelector';
import VideoScriptContainer from '../components/VideoScriptContainer';
import ScriptContainer from '../components/ScriptContainer';
import SideNavBar from '../components/SideBar';

const VideoPlayer = () => {
  const [scriptScenes, setScriptScenes] = useState();
  const [videoFiles, setVideoFiles] = useState([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);  // new state for current scene
  
  const location = useLocation();
  let reqid = location.state && location.state.reqid
  let videoData = location.state && location.state.videoFiles

  const setScriptScenesFromChild = (childScenes) => {
    setScriptScenes(childScenes);
  }

  useEffect(() => {
    setVideoFiles(videoData)
    console.log(videoData)
  }, []);
  
  return (
    <div className='editor'>
    <SideNavBar />
      <div className='video-player'>
        <SceneSelector 
          scenes={videoFiles} 
          currentSceneIndex={currentSceneIndex}
          setCurrentSceneIndex={setCurrentSceneIndex}
          />
      </div>
      
      <div className='scrpt'>
        <VideoScriptContainer 
          setScenesFromChild={setScriptScenesFromChild} 
          currentSceneIndex={currentSceneIndex} 
          setCurrentSceneIndex={setCurrentSceneIndex} 
          />
      </div>



    </div>
    );
};

export default VideoPlayer;

// axios.get(`${REQ_BASE_URL}/video-files/`, { responseType: 'arraybuffer' })
//   .then((response) => {
//     const zip = new JSZip();
//     return zip.loadAsync(response.data);
//   })
//   .then((zip) => {
//     const filePromises = Object.keys(zip.files).map((fileName) => {
//       const file = zip.files[fileName];
//       return file.async('blob').then((blob) => {
//         return { name: fileName, url: URL.createObjectURL(blob) };
//       });
//     });
//     return Promise.all(filePromises);
//   })
//   .then((videos) => {
//     const videoPromises = videos.map((video) => {
//       return new Promise((resolve) => {
//         const videoElement = document.createElement('video');
//         videoElement.src = video.url;
//         videoElement.addEventListener('loadedmetadata', () => {
//           const duration = videoElement.duration;
//           resolve({ ...video, duration });
//         });
//       });
//     });
//     return Promise.all(videoPromises);
//   })
//   .then((videosWithDuration) => {
//     setVideoFiles(
//       videosWithDuration.map((video, index) => ({
//         name: `Scene${index}`,
//         video: video.url,
//         audio: '', // Provide audio URL if available
//         duration: video.duration
//       }))
//     );
//   })
//   .catch((error) => {
//     console.error('Failed to retrieve video files:', error);
//   });