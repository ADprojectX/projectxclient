import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Slider }  from "@mui/material";
import VPlayer from './VPlayer';
// import './css/SceneSelector.css'
import '../css/video-editing/EditorMain.css'
import Timeline from './Timeline';
import SceneSettings from './SceneSettings';
import EditorMenuBar from './EditorMenuBar';
import VideoScriptContainer from './VideoScriptContainer';
import { PiPlayPause } from "react-icons/pi";
import { Widgets } from '@mui/icons-material';


const Editormain = ({ scenes }) => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [sceneStartTimes, setSceneStartTimes] = useState([]);
    const [totalDuration, setTotalDuration] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [scriptScenes, setScriptScenes] = useState();
    const [seekTo, setSeekTo] = useState(0);
    const vPlayerRef = useRef();

    const handleFullScreen = () => {
      vPlayerRef.current.handleFullScreen();
    };

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
        }
      };
  
    const handleProgress = ({ playedSeconds }) => {
      setCurrentProgress(sceneStartTimes[currentSceneIndex] + playedSeconds);
      setSeekTo(0); // reset the seekTo value after seeking
    };

    const handleClick = (index) => {
      setCurrentSceneIndex(index);
    };

    // Function to toggle play and pause
    const handlePlayPause = () => {
      setPlaying(!playing);
    };
  
    const sliderMarks = scenes.map((scene, i) => ({
      value: sceneStartTimes[i],
    //   label: scene.name,
      // label: (i + 1).toString(),
    }));

    const setScriptScenesFromChild = (childScenes) => {
      setScriptScenes(childScenes);
    }

    if (scenes.length === 0 || !scenes[currentSceneIndex] || !scenes[currentSceneIndex].video) {
      return <div>Loading...</div>;
    }
  
    return (
        <div className='editor-main'>
                <div className='grid-col-span-4'>
                  <EditorMenuBar handleFullScreen={handleFullScreen}/>
                </div>

                <div className='v-player grid-col-span-2'>
                  <VPlayer 
                      videoSrc={scenes[currentSceneIndex].video} 
                      audioSrc={scenes[currentSceneIndex].audio} 
                      handleSceneEnd={handleSceneEnd}
                      handleProgress={handleProgress}
                      seekTo={seekTo}
                      playing={playing}
                      setPlaying = {setPlaying}
                      ref={vPlayerRef}
                  />
                </div>

                <div className='scrpt'>
                  <VideoScriptContainer 
                    setScenesFromChild={setScriptScenesFromChild} 
                    currentSceneIndex={currentSceneIndex} 
                    setCurrentSceneIndex={setCurrentSceneIndex} 
                    />
                </div> 

                <div className='grid-scene-settings'>
                  <SceneSettings />
                </div>

                <div className='timeline-unit grid-col-span-3'>
                    
                    <div className='slider'> 
                        <button className='playpause-button'onClick={handlePlayPause}>
                          <svg width="0" height="0">
                            <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                              <stop stopColor="#385BFE" offset="0%" />
                              <stop stopColor="#3ACAF8" offset="100%" />
                            </linearGradient>
                          </svg>
                          <PiPlayPause style={{ fill: "url(#blue-gradient)" }} size={35}  />
                        </button>

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

                    <div className='timeline'>  
                      <Timeline scenes={scenes} currentSceneIndex={currentSceneIndex} handleClick={handleClick} />
                    </div>
                </div>

        </div>
    );
  };
  
  export default Editormain;