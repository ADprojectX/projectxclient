import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Container } from '@mui/material';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import Slider from '@mui/material/Slider';

const VideoPlayer = ({ scenes, currentTime, playerRef }) => {
  // Find the current scene based on the current time
  const currentScene = scenes.find(
    (scene) => currentTime >= scene.start && currentTime < scene.end
  );

  const setCurrentTime = (time) => {
    playerRef.current.seekTo(time);
  };

  return (
    <div>
      <Container maxWidth="md" height="md">
        <ReactPlayer
          url={currentScene.video}
          playing={true}
          controls={true}
          progressInterval={100} // Update the currentTime every 100ms
          style={{ marginBottom: 20 }}
          config={{
            file: {
              forceVideo: true,
              attributes: {
                disablePictureInPicture: true, // Disable picture-in-picture mode
              },
            },
          }}
          onProgress={(progress) => {
            // Update the current time
            setCurrentTime(progress.playedSeconds);
          }}
          ref={playerRef} // Assign the ref to playerRef
        />
        <audio id="audio" src={currentScene.audio} autoPlay />
        <Slider
          value={currentTime}
          min={currentScene.start}
          max={currentScene.end}
          onChange={(_, value) => setCurrentTime(value)}
        />
      </Container>
    </div>
  );
};

// This component will be the main component
const VideoDashBoard = () => {
  // Assuming your videos and audios are in public directory
  const scenes = [
    {
      name: 'Scene0',
      video: '/output/video0.mp4',
      audio: '/audio/voice#scene#0.mp3',
      start: 0,
      end: 10,
    },
    {
      name: 'Scene1',
      video: '/output/video1.mp4',
      audio: '/audio/voice#scene#1.mp3',
      start: 10,
      end: 20,
    },
    {
      name: 'Scene2',
      video: '/output/video2.mp4',
      audio: '/audio/voice#scene#2.mp3',
      start: 20,
      end: 30,
    },
    {
      name: 'Scene3',
      video: '/output/video3.mp4',
      audio: '/audio/voice#scene#3.mp3',
      start: 30,
      end: 40,
    },
    {
      name: 'Scene4',
      video: '/output/video4.mp4',
      audio: '/audio/voice#scene#4.mp3',
      start: 40,
      end: 50,
    },
    // Add more scenes here...
  ];

  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  const handleTimeChange = (event, newValue) => {
    if (playerRef && playerRef.current && playerRef.current.video) {
      playerRef.current.video.seekTo(newValue);
    }
  };

  const currentScene = scenes?.find((scene) => {return currentTime >= scene.start && currentTime < scene.end;
  });

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Video Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: 20 }}>
        <VideoPlayer scenes={scenes} currentTime={currentTime} playerRef={playerRef} />
        <Typography variant="h6" gutterBottom>
          Current Scene: {currentScene ? currentScene.name : ''}
        </Typography>
        <input
          type="range"
          min={0}
          max={scenes[scenes.length - 1].end}
          value={currentTime}
          onChange={handleTimeChange}
        />
      </Container>
    </div>
  );
};

export default VideoDashBoard;



// import React, { useState} from 'react';
// import Select from 'react-select';
// import ReactPlayer from "react-player";
// import { Container }  from "@mui/material";
// import { AppBar } from "@mui/material";
// import { Toolbar } from '@mui/material';
// import { Typography } from "@mui/material";

// const VideoPlayer = ({ videoSrc, audioSrc }) => {
//   return (
//     <div>
//       <Container maxWidth="md" height="md">
//         <ReactPlayer 
//           url={videoSrc} 
//           playing={true} 
//           controls={true} 
//         />
//         <audio id='audio' src={audioSrc} autoPlay />
//       </Container>
//     </div>
//   );
// };

// const SceneSelector = ({ scenes }) => {
//   const [currentScene, setCurrentScene] = useState(scenes[0]);

//   const handleSceneSelect = (selectedOption) => {
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
//         <VideoPlayer videoSrc={currentScene.video} audioSrc={currentScene.audio} />
//       <Select
//         defaultValue={sceneOptions[0]}
//         onChange={handleSceneSelect}
//         options={sceneOptions}
//       />
//     </div>
//   );
// };

// // This component will be the main component
// const VideoDashBoard = () => {
//   // Assuming your videos and audios are in public directory
//   const scenes = [
//     { name: 'Scene0', video: '/output/video0.mp4', audio: '/audio/voice#scene#0.mp3' },
//     { name: 'Scene1', video: '/output/video1.mp4', audio: '/audio/voice#scene#1.mp3' },
//     { name: 'Scene2', video: '/output/video2.mp4', audio: '/audio/voice#scene#2.mp3' },
//     { name: 'Scene3', video: '/output/video3.mp4', audio: '/audio/voice#scene#3.mp3' },
//     { name: 'Scene4', video: '/output/video4.mp4', audio: '/audio/voice#scene#4.mp3' },
//     // Add more scenes here...
//   ];

//   return <SceneSelector scenes={scenes} />;
// };

// export default VideoDashBoard;
