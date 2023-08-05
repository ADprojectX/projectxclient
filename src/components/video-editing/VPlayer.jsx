import React, { useRef, useEffect } from 'react';
import ReactPlayer from "react-player";
import { Container }  from "@mui/material";

const VPlayer = ({ videoSrc, audioSrc, handleSceneEnd, handleProgress, seekTo, playing }) => {
    const reactPlayerRef = useRef();
  
    useEffect(() => {
      if (seekTo > 0) {
        setTimeout(() => {
          reactPlayerRef.current.seekTo(seekTo);
        }, 200); // Delay seekTo to allow video to load
      }
    }, [videoSrc, seekTo]);
    console.log(playing)
  
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ReactPlayer
          ref={reactPlayerRef}
          url={videoSrc}
          playing={playing}
          controls={false}
          onEnded={handleSceneEnd}
          onProgress={handleProgress}
          width='100%'
          height='100%'
        />
      {/* <audio id='audio' src={audioSrc} autoPlay /> */}
    </div>
    );
  };

  export default VPlayer;