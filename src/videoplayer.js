import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Container, AppBar, Toolbar, Typography, Slider } from '@mui/material';

const VideoPlayer = ({ videoSrc, audioSrc, currentTime }) => {
  const [seeking, setSeeking] = useState(false);

  const handleProgress = (progress) => {
    if (!seeking) {
      currentTime(progress.playedSeconds);
    }
  };

  const handleSeek = (event, newValue) => {
    currentTime(newValue);
    setSeeking(true);
  };

  const handleSeekEnd = () => {
    setSeeking(false);
  };

  return (
    <div>
      <Container maxWidth="md" height="md">
        <ReactPlayer
          url={videoSrc}
          playing={true}
          controls={true}
          onProgress={handleProgress}
          progressInterval={1000}
          onSeek={handleSeek}
          onSeekEnd={handleSeekEnd}
          currentTime={currentTime}
        />
        <audio id="audio" src={audioSrc} autoPlay />
      </Container>
    </div>
  );
};

const SceneSelector = ({ scenes }) => {
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeChange = (event, newValue) => {
    setCurrentTime(newValue);
  };

  const handleSceneSelect = (event, newValue) => {
    setCurrentTime(newValue);
  };

  const getCurrentScene = () => {
    for (let i = 0; i < scenes.length - 1; i++) {
      const currentScene = scenes[i];
      const nextScene = scenes[i + 1];
      if (currentTime >= currentScene.time && currentTime < nextScene.time) {
        return currentScene;
      }
    }
    return scenes[scenes.length - 1];
  };

  const currentScene = getCurrentScene();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">ProjectX Video Player</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <VideoPlayer videoSrc={currentScene.video} audioSrc={currentScene.audio} currentTime={setCurrentTime} />
      <Slider
        value={currentTime}
        onChange={handleTimeChange}
        onChangeCommitted={handleSceneSelect}
        min={0}
        max={scenes[scenes.length - 1].time}
        marks={scenes.map((scene) => ({ value: scene.time, label: scene.name }))}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

const App = () => {
  const scenes = [
    { name: 'Scene0', video: '/output/video0.mp4', audio: '/audio/voice#scene#0.mp3', time: 0 },
    { name: 'Scene1', video: '/output/video1.mp4', audio: '/audio/voice#scene#1.mp3', time: 10 },
    { name: 'Scene2', video: '/output/video2.mp4', audio: '/audio/voice#scene#2.mp3', time: 20 },
    { name: 'Scene3', video: '/output/video3.mp4', audio: '/audio/voice#scene#3.mp3', time: 30 },
    { name: 'Scene4', video: '/output/video4.mp4', audio: '/audio/voice#scene#4.mp3', time: 40 },
    // Add more scenes here...
  ];
  return <SceneSelector scenes={scenes} />;
};

export default App;

// const SceneSelector = ({ scenes }) => {
//   const [currentScene, setCurrentScene] = useState(scenes[0]);
//   const handleSceneSelect = (selectedOption) => {
//     // setTemp(selectedOption)
//     const scene = scenes.find((s) => s.name === selectedOption.value);
//     setCurrentScene(scene);
//   };

//   const sceneOptions = scenes.map((scene) => ({
//     value: scene.name,
//     label: scene.name,
//   }));

//   return (
//     <div>
//       <AppBar position="fixed">
//         <Toolbar>
//             <Typography variant="h6"> ProjectX Video Player</Typography>
//         </Toolbar>
//       </AppBar>
//       <Toolbar />
//       <VideoPlayer videoSrc={currentScene.video} audioSrc={currentScene.audio} />
//       <h1>{currentScene.name}</h1>
//       <Select
//         defaultValue={sceneOptions[0]}
//         onChange={handleSceneSelect}
//         options={sceneOptions}
//       />
//     </div>
//   );
// };