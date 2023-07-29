import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Slider }  from "@mui/material";
import VPlayer from './VPlayer';

const SceneSelector = ({ scenes, currentSceneIndex, setCurrentSceneIndex }) => {
    // const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
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
  
    // const handleSceneEnd = () => {
    //   const nextSceneIndex = currentSceneIndex + 1;
    //   if (nextSceneIndex < scenes.length) {
    //     setCurrentSceneIndex(nextSceneIndex);
    //   } else {
    //     setCurrentSceneIndex(0);
    //     setCurrentProgress(0);
    //   }
    // };

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

  
    const sliderMarks = scenes.map((scene, i) => ({
      value: sceneStartTimes[i],
    //   label: scene.name,
      label: (i + 1).toString(),
    }));
  
    if (scenes.length === 0 || !scenes[currentSceneIndex] || !scenes[currentSceneIndex].video) {
      return <div>Loading...</div>;
    }
  
    return (
        <div className='v-player-main'>
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
    );
  };
  
  export default SceneSelector;