import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EditorMain from '../components/video-editing/Editormain';
import SideNavBar from '../components/SideBar';
import './css/VideoPlayer.css'
import JSZip from 'jszip';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const REQ_BASE_URL = 'http://localhost:8000/req';


const VideoPlayer = () => {
  const [videoFiles, setVideoFiles] = useState([]);

  const location = useLocation();
  let reqid = location.state && location.state.reqid;

  useEffect(() => {
    axios
      .get(`${REQ_BASE_URL}/video-files/`, { responseType: 'arraybuffer' })
      .then((response) => {
        const zip = new JSZip();
        return zip.loadAsync(response.data);
      })
      .then((zip) => {
        const filePromises = Object.keys(zip.files).map((fileName) => {
          const file = zip.files[fileName];
          return file.async('blob').then((blob) => {
            return { name: fileName, url: URL.createObjectURL(blob) };
          });
        });
        return Promise.all(filePromises);
      })
      .then((videos) => {
        const videoPromises = videos.map((video) => {
          return new Promise((resolve) => {
            const videoElement = document.createElement('video');
            videoElement.src = video.url;
            videoElement.addEventListener('loadedmetadata', () => {
              const duration = videoElement.duration;
              resolve({ ...video, duration });
            });
          });
        });
        return Promise.all(videoPromises);
      })
      .then((videosWithDuration) => {
        const videoFiles = videosWithDuration.map((video, index) => ({
          name: `Scene${index}`,
          video: video.url,
          audio: '', // Provide audio URL if available
          duration: video.duration
        }));
        setVideoFiles(videoFiles); // Set the state here instead of navigating
      })
      .catch((error) => {
        console.error('Failed to retrieve video files:- ', error);
      });
  }, []);
  
  // let reqid = location.state && location.state.reqid
  // let videoData = location.state && location.state.videoFiles


  // useEffect(() => {
  //   setVideoFiles(videoData)
  //   console.log(videoFiles)
  // }, []);
  
  return (
    <div className='video-page'>
      <SideNavBar />

      <div className='editor'>

        <div className='video-player'>
          <EditorMain scenes={videoFiles} />
        </div>

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