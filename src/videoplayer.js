import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from "react-player";
import { Container, AppBar, Toolbar, Typography, Slider }  from "@mui/material";
import axios from 'axios';
import JSZip from 'jszip';

const REQ_BASE_URL = 'http://localhost:8000/req';

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
      <Toolbar />
      <VPlayer 
        videoSrc={scenes[currentSceneIndex].video} 
        audioSrc={scenes[currentSceneIndex].audio} 
        handleSceneEnd={handleSceneEnd}
        handleProgress={handleProgress}
        seekTo={seekTo}
      />
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
  );
};


// This component will be the main component
const App = () => {
  const [videoFiles, setVideoFiles] = useState([]);

  useEffect(() => {
    axios.get(`${REQ_BASE_URL}/video-files/`, { responseType: 'arraybuffer' })
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
        setVideoFiles(
          videosWithDuration.map((video, index) => ({
            name: `Scene${index}`,
            video: video.url,
            audio: '', // Provide audio URL if available
            duration: video.duration
          }))
        );
      })
      .catch((error) => {
        console.error('Failed to retrieve video files:', error);
      });
  }, []);
  
  return <SceneSelector scenes={videoFiles} />;
};

export default App;
