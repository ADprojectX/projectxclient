import React, { useRef, useEffect } from 'react';
import ReactPlayer from "react-player";
import { Container }  from "@mui/material";

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
            controls={false} 
            onEnded={handleSceneEnd} 
            onProgress={handleProgress}
          />
          {/* <audio id='audio' src={audioSrc} autoPlay /> */}
        </Container>
      </div>
    );
  };

  export default VPlayer;