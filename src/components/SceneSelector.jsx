import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Slider }  from "@mui/material";
import VPlayer from './VPlayer';
import './css/SceneSelector.css'
import Timeline from './Timeline';

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

    const handleClick = (index) => {
      setCurrentSceneIndex(index);
    };
  
    const sliderMarks = scenes.map((scene, i) => ({
      value: sceneStartTimes[i],
    //   label: scene.name,
      // label: (i + 1).toString(),
    }));

    const sx = {
      // Customize the color for the Slider track and thumb
      '& .MuiSlider-rail': {
        backgroundColor: 'rgb(157, 248, 175)', // Change the color for the track
      },
      '& .MuiSlider-track': {
        backgroundColor: 'rgb(70, 241, 104)', // Change the color for the track before the thumb
      },
      '& .MuiSlider-thumb': {
        backgroundColor: 'rgb(70, 241, 104)', // Change the color for the thumb
        outline: 'none',
      },
      '& .MuiSlider-valueLabel': {
        color: 'rgba(209, 207, 207, 0.8)', // Change the color for the value label
      },
      '& .MuiSlider-mark': {
        color: 'rgb(0, 255, 51)', // Change the color for the value label
      },
      '& .MuiSlider-markLabel': {
        color: 'rgb(0, 255, 51)', // Change the color for the value label
      },
    }
  
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
                        // sx={sx}
                    />
                </div>
                <div className='timeline'>  
                    <Timeline scenes={scenes} currentSceneIndex={currentSceneIndex} handleClick={handleClick} />
                    {/* {scenes.map((scene, index) => (
                        <img
                            key={index}
                            // src={scene.thumbnail}
                            src={`../thumbnails/${index}.jpg`}
                            alt={`Thumbnail ${index}`}
                            className={`thumbnail ${index === currentSceneIndex ? 'active' : ''}`}
                            onClick={() => handleClick(index)}
                        />
                    ))} */}
                </div>
            </div>
        </div>
    );
  };
  
  export default SceneSelector;