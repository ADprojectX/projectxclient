import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from "react-player";
import { useLocation } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Slider }  from "@mui/material";
import './css/VideoPlayer.css'
import ScriptContainer from '../components/ScriptContainer';
import axios from 'axios';
import JSZip from 'jszip';

const REQ_BASE_URL = 'http://localhost:8000/req';

// const VideoDurationGetter = ({ videos, onDurationsReady }) => {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [videoDurations, setVideoDurations] = useState([]);
  
//   const handleDuration = (duration) => {
//     setVideoDurations([...videoDurations, duration]);
//     setCurrentVideoIndex(currentVideoIndex + 1);
//   };
  
//   useEffect(() => {
//     if (currentVideoIndex >= videos.length) {
//       onDurationsReady(videoDurations);
//     }
//   }, [currentVideoIndex, videoDurations, videos.length, onDurationsReady]);
  
//   if (currentVideoIndex < videos.length) {
//     return (
//       <ReactPlayer
//         url={videos[currentVideoIndex]}
//         onDuration={handleDuration}
//         style={{ display: "none" }} // Hide the video player
//       />
//     );
//   }
  
//   return null;
// };


const VPlayer = ({ videoSrc, audioSrc, handleSceneEnd, handleProgress, seekTo }) => {
  const reactPlayerRef = useRef();

  useEffect(() => {
    if (seekTo > 0) {
      setTimeout(() => {
        reactPlayerRef.current.seekTo(seekTo);
      }, 200); // Delay seekTo to allow video to load
    }
  }, [videoSrc, seekTo]);

  return (
    <div>
      <Container maxWidth="md" height="md">
        <ReactPlayer 
          ref={reactPlayerRef}
          url={videoSrc}
          playing={true} 
          controls={true} 
          onEnded={handleSceneEnd} 
          onProgress={handleProgress}
        />
        {/* <audio id='audio' src={audioSrc} autoPlay /> */}
      </Container>
    </div>
  );
};

const SceneSelector = ({ scenes }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [sceneStartTimes, setSceneStartTimes] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [seekTo, setSeekTo] = useState(0);

  useEffect(() => {
    let tempTotalDuration = 0;
    let tempStartTimes = [];
    scenes.forEach(scene => {
      tempStartTimes.push(tempTotalDuration);
      tempTotalDuration += scene.duration;
    });
    setTotalDuration(tempTotalDuration);
    setSceneStartTimes(tempStartTimes);
  }, [scenes]);

  const handleSliderChange = (event, newValue) => {
    setCurrentProgress(newValue);
    const newSceneIndex = sceneStartTimes.findIndex((start, i) => newValue >= start && (!sceneStartTimes[i+1] || newValue < sceneStartTimes[i+1]));
    if (newSceneIndex !== currentSceneIndex) {
      setCurrentSceneIndex(newSceneIndex);
    }
    setSeekTo(newValue - sceneStartTimes[newSceneIndex]);
  };

  const handleSceneEnd = () => {
    const nextSceneIndex = currentSceneIndex + 1;
    if (nextSceneIndex < scenes.length) {
      setCurrentSceneIndex(nextSceneIndex);
    } else {
      setCurrentSceneIndex(0);
      setCurrentProgress(0);
    }
  };

  const handleProgress = ({ playedSeconds }) => {
    setCurrentProgress(sceneStartTimes[currentSceneIndex] + playedSeconds);
    setSeekTo(0); // reset the seekTo value after seeking
  };

  const sliderMarks = scenes.map((scene, i) => ({
    value: sceneStartTimes[i],
    label: scene.name,
  }));

  if (scenes.length === 0 || !scenes[currentSceneIndex] || !scenes[currentSceneIndex].video) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">ProjectX Video Player</Typography>
        </Toolbar>
      </AppBar>
      <div className='v-player-main'>
        <ScriptContainer />
        {/* <div className="scriptContainer">
              {scenes && scenes.map((scene, index) => (
                <Card
                  key={index}
                  scene={scene}
                  index={index}
                  updateCard={updateCard}
                  deleteCard={deleteCard}
                  addCard={addCard}
                />
              ))}
          </div> */}
        <div className='v-player'>
          <VPlayer 
            videoSrc={scenes[currentSceneIndex].video} 
            audioSrc={scenes[currentSceneIndex].audio} 
            handleSceneEnd={handleSceneEnd}
            handleProgress={handleProgress}
            seekTo={seekTo}
            />
          <div className='slider'>  
            <Slider
              value={currentProgress}
              step={1}
              min={0}
              max={totalDuration}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              marks={sliderMarks}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

// ... Your imports ...

// const App = () => {
//   const location = useLocation();
//   const videoData = location.state?.videoFiles || [];

//   return <SceneSelector scenes={videoData} />;
// };

// export default App;

const App = () => {
  const [videoFiles, setVideoFiles] = useState([]);
  const location = useLocation();
  let reqid = location.state && location.state.reqid
  let videoData = location.state && location.state.videoFiles
  
  useEffect(() => {
    setVideoFiles(videoData)
  }, []);
  
  return <SceneSelector scenes={videoFiles} />;
};

export default App;

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