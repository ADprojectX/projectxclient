import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from "react-player";
import { Container, AppBar, Toolbar, Typography, Slider }  from "@mui/material";

const VPlayer = ({ videoSrc, audioSrc, handleSceneEnd, handleProgress }) => {
  const playerRef = useRef();

  const seekTo = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds, 'seconds');
    }
  };

  useEffect(() => {
    seekTo(0);
  }, [videoSrc]);

  return (
    <div>
      <Container maxWidth="md" height="md">
        <ReactPlayer 
          ref={playerRef}
          url={videoSrc} 
          playing={true} 
          controls={true} 
          onEnded={handleSceneEnd}
          onProgress={handleProgress}
        />
        <audio id='audio' src={audioSrc} autoPlay />
      </Container>
    </div>
  );
};

const SceneSelector = ({ scenes }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [sceneStartTimes, setSceneStartTimes] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);

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
    setCurrentSceneIndex(newSceneIndex);
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
  };

  const sliderMarks = scenes.map((scene, i) => ({
    value: sceneStartTimes[i],
    label: scene.name,
  }));

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6"> ProjectX Video Player</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <VPlayer 
        videoSrc={scenes[currentSceneIndex].video} 
        audioSrc={scenes[currentSceneIndex].audio} 
        handleSceneEnd={handleSceneEnd}
        handleProgress={handleProgress}
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
  // Assuming your videos and audios are in public directory
  const scenes = [
    { name: 'Scene0', video: '/output/video0.mp4', audio: '/audio/voice#scene#0.mp3',  duration: 10 },
    { name: 'Scene1', video: '/output/video1.mp4', audio: '/audio/voice#scene#1.mp3',  duration: 8 },
    { name: 'Scene2', video: '/output/video2.mp4', audio: '/audio/voice#scene#2.mp3',  duration: 12 },
    { name: 'Scene3', video: '/output/video3.mp4', audio: '/audio/voice#scene#3.mp3',  duration: 7 },
    { name: 'Scene4', video: '/output/video4.mp4', audio: '/audio/voice#scene#4.mp3',   duration: 13},
    // Add more scenes here...
  ];

  return <SceneSelector scenes={scenes} />;
};

export default App;