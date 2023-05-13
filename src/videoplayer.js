import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import ReactPlayer from "react-player";
import { Container }  from "@mui/material";
import { AppBar } from "@mui/material";
import { Toolbar } from '@mui/material';
import { Typography } from "@mui/material";

const VideoPlayer = ({ videoSrc, audioSrc }) => {
  return (
    <div>
      <Container maxWidth="md" height="md">
        <ReactPlayer 
          url={videoSrc} 
          playing={true} 
          controls={true} 
        />
        <audio id='audio' src={audioSrc} autoPlay />
      </Container>
    </div>
  );
};

const SceneSelector = ({ scenes }) => {
  const [currentScene, setCurrentScene] = useState(scenes[0]);

  const handleSceneSelect = (selectedOption) => {
    const scene = scenes.find((s) => s.name === selectedOption.value);
    setCurrentScene(scene);
  };

  const sceneOptions = scenes.map((scene) => ({
    value: scene.name,
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
      <VideoPlayer videoSrc={currentScene.video} audioSrc={currentScene.audio} />
      <Select
        defaultValue={sceneOptions[0]}
        onChange={handleSceneSelect}
        options={sceneOptions}
      />
    </div>
  );
};

// This component will be the main component
const App = () => {
  // Assuming your videos and audios are in public directory
  const scenes = [
    { name: 'Scene0', video: '/output/video0.mp4', audio: '/audio/voice#scene#0.mp3' },
    { name: 'Scene1', video: '/output/video1.mp4', audio: '/audio/voice#scene#1.mp3' },
    { name: 'Scene2', video: '/output/video2.mp4', audio: '/audio/voice#scene#2.mp3' },
    { name: 'Scene3', video: '/output/video3.mp4', audio: '/audio/voice#scene#3.mp3' },
    { name: 'Scene4', video: '/output/video4.mp4', audio: '/audio/voice#scene#4.mp3' },
    // Add more scenes here...
  ];

  return <SceneSelector scenes={scenes} />;
};

export default App;
