import '../css/video-editing/EditorMain.css'
import React, { useState, useEffect, useRef } from 'react';
import { Slider }  from "@mui/material";
import { PiPlayPause } from "react-icons/pi";
import VPlayer from './VPlayer';
import Timeline from './Timeline';
import SceneSettings from './SceneSettings';
import EditorMenuBar from './EditorMenuBar';
import VideoScriptContainer from './VideoScriptContainer';


const Editormain = ({ scenes, checkURLExpired }) => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [sceneStartTimes, setSceneStartTimes] = useState([]);
    const [totalDuration, setTotalDuration] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [scriptScenes, setScriptScenes] = useState();
    const [seekTo, setSeekTo] = useState(0);
    const vPlayerRef = useRef();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef(null);

  useEffect(() => {
    if (currentVideoIndex < scenes.length) {
      videoRef.current.src = scenes[currentVideoIndex];
    }
  }, [currentVideoIndex, scenes]);

  const handleMetadataLoaded = () => {
    const videoDuration = videoRef.current.duration;
    setTotalDuration(prevDuration => prevDuration + videoDuration);

    if (currentVideoIndex < scenes.length - 1) {
      setCurrentVideoIndex(prevIndex => prevIndex + 1);
    }
  };

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

  const formatTime = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      return `${hrs ? `${hrs}:` : ''}${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
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
      const accumulatedTime = sceneStartTimes[currentSceneIndex] + playedSeconds;
      setCurrentTime(accumulatedTime);
      setCurrentProgress(sceneStartTimes[currentSceneIndex] + playedSeconds);
      setSeekTo(0);
    };

    const handleClick = (index) => {
      setCurrentSceneIndex(index);
    };

    const handlePlayPause = () => {
      setPlaying(!playing);
    };
  
    const sliderMarks = scenes.map((scene, i) => ({
      value: sceneStartTimes[i] || 0,
    }));

    const setScriptScenesFromChild = (childScenes) => {
      setScriptScenes(childScenes);
    }

    return (
        <div className='editor-main'>
        <video
          ref={videoRef}
          onLoadedMetadata={handleMetadataLoaded}
          style={{ display: 'none' }}
        />
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
                      checkURLExpired={checkURLExpired}
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
                  <SceneSettings 
                    scenes={scenes}
                    currentSceneIndex={currentSceneIndex}
                  />
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

                        <div>
                            <div className="time-display"> 
                                {formatTime(currentTime)} / {formatTime(totalDuration)}
                            </div>
                        </div>

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