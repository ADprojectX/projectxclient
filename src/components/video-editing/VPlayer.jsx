import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import ReactPlayer from "react-player";
import { PiPlayPause } from "react-icons/pi";


const VPlayer = forwardRef(({
  videoSrc,
  handleSceneEnd,
  handleProgress,
  seekTo,
  playing,
  checkURLExpired,
  setPlaying
}, ref) => {
  
    const reactPlayerRef = useRef();
    const playerWrapperRef = useRef();
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
      if (seekTo > 0) {
        setTimeout(() => {
          reactPlayerRef.current.seekTo(seekTo);
        }, 200);
      }
    }, [videoSrc, seekTo]);

    const handleKeydown = (event) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    useEffect(() => {
      const handleFullscreenChange = () => {
          const isFS = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
          setIsFullscreen(!!isFS);
      };
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.addEventListener('mozfullscreenchange', handleFullscreenChange);
      document.addEventListener('MSFullscreenChange', handleFullscreenChange);
  
      return () => {
          document.removeEventListener('fullscreenchange', handleFullscreenChange);
          document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
          document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
          document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      };
  }, []);
  

    useEffect(() => {
      document.addEventListener("keydown", handleKeydown);
      return () => {
        document.removeEventListener("keydown", handleKeydown);
      };
    }, [isFullscreen]); 
    

    const handleFullScreen = () => {
      reactPlayerRef.current.seekTo(0);
      setPlaying(true);

      if (playerWrapperRef.current.requestFullscreen) {
        playerWrapperRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
        });
      } else if (playerWrapperRef.current.mozRequestFullScreen) {
        playerWrapperRef.current.mozRequestFullScreen().then(() => {
          setIsFullscreen(true);
        }); // Firefox
      } else if (playerWrapperRef.current.webkitRequestFullscreen) {
        playerWrapperRef.current.webkitRequestFullscreen().then(() => {
          setIsFullscreen(true);
        }); // Chrome and Safari
      } else if (playerWrapperRef.current.msRequestFullscreen) {
        playerWrapperRef.current.msRequestFullscreen().then(() => {
          setIsFullscreen(true);
        }); // IE
      }
    };

    const togglePlayPause = () => {
      setPlaying(prevState => !prevState);
    };

    useImperativeHandle(ref, () => ({
      handleFullScreen: handleFullScreen
    }));

    return (
      <div ref={playerWrapperRef} style={{ width: '100%', height: '100%' }}>
        {checkURLExpired(videoSrc)}
        
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
        {isFullscreen && (

          <button className='playpause-button-fullscreen'onClick={togglePlayPause} style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 10 }}>
          <svg width="0" height="0">
            <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop stopColor="#385BFE" offset="0%" />
              <stop stopColor="#3ACAF8" offset="100%" />
            </linearGradient>
          </svg>
          <PiPlayPause style={{ fill: "url(#blue-gradient)" }} size={35}  />
          </button>
        )}
      </div>
    );
});

export default VPlayer;