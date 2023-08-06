import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import ReactPlayer from "react-player";
import { PiPlayPause } from "react-icons/pi";


const VPlayer = forwardRef(({
  videoSrc,
  audioSrc,
  handleSceneEnd,
  handleProgress,
  seekTo,
  playing,
  setPlaying
}, ref) => {

    const reactPlayerRef = useRef();
    const playerWrapperRef = useRef();  // Reference for the div around ReactPlayer
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
      if (seekTo > 0) {
        setTimeout(() => {
          reactPlayerRef.current.seekTo(seekTo);
        }, 200); // Delay seekTo to allow video to load
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
      // Add the event listener when the component mounts
      document.addEventListener("keydown", handleKeydown);
    
      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener("keydown", handleKeydown);
      };
    }, [isFullscreen]); // Dependency on isFullscreen so the effect runs only when its value changes
    

    const handleFullScreen = () => {
      // Seek to start and play the video
      reactPlayerRef.current.seekTo(0);
      setPlaying(true);

      // Go full screen
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
          // <Button onClick={togglePlayPause} style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 10 }}>
          //   {playing ? 'Pause' : 'Play'}
          // </Button>

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
        {/* <audio id='audio' src={audioSrc} autoPlay /> */}
      </div>
    );
});

export default VPlayer;






// import React, { useRef, useEffect, useState, forwardRef } from 'react';
// import ReactPlayer from "react-player";
// import { Button } from "@mui/material";

// const VPlayer = forwardRef(({ 
//   videoSrc, 
//   audioSrc, 
//   handleSceneEnd, 
//   handleProgress, 
//   seekTo, 
//   playing, 
//   setPlaying 
// }, ref) => {
//     const reactPlayerRef = useRef();
//     const playerWrapperRef = useRef();  // Reference for the div around ReactPlayer
//     const [isFullscreen, setIsFullscreen] = useState(false);

//     useEffect(() => {
//       if (seekTo > 0) {
//         setTimeout(() => {
//           reactPlayerRef.current.seekTo(seekTo);
//         }, 200); // Delay seekTo to allow video to load
//       }
//     }, [videoSrc, seekTo]);

//     const handleFullScreen = () => {
//       // Seek to start and play the video
//       reactPlayerRef.current.seekTo(0);
//       setPlaying(true);

//       // Go full screen
//       if (playerWrapperRef.current.requestFullscreen) {
//         playerWrapperRef.current.requestFullscreen().then(() => {
//           setIsFullscreen(true);
//         });
//       } else if (playerWrapperRef.current.mozRequestFullScreen) {
//         playerWrapperRef.current.mozRequestFullScreen().then(() => {
//           setIsFullscreen(true);
//         }); // Firefox
//       } else if (playerWrapperRef.current.webkitRequestFullscreen) {
//         playerWrapperRef.current.webkitRequestFullscreen().then(() => {
//           setIsFullscreen(true);
//         }); // Chrome and Safari
//       } else if (playerWrapperRef.current.msRequestFullscreen) {
//         playerWrapperRef.current.msRequestFullscreen().then(() => {
//           setIsFullscreen(true);
//         }); // IE
//       }
//     };

//     const togglePlayPause = () => {
//       setPlaying(prevState => !prevState);
//     };

//     return (
//       <div ref={playerWrapperRef} style={{ width: '100%', height: '100%' }}>
//         <ReactPlayer
//           ref={reactPlayerRef}
//           url={videoSrc}
//           playing={playing}
//           controls={false}
//           onEnded={handleSceneEnd}
//           onProgress={handleProgress}
//           width='100%'
//           height='100%'
//         />
//         <Button onClick={handleFullScreen} style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
//           Full Screen
//         </Button>
//         {isFullscreen && (
//           <Button onClick={togglePlayPause} style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 10 }}>
//             {playing ? 'Pause' : 'Play'}
//           </Button>
//         )}
//         {/* <audio id='audio' src={audioSrc} autoPlay /> */}
//       </div>
//     );
// });

// export default VPlayer;





// import React, { useRef, useEffect } from 'react';
// import ReactPlayer from "react-player";
// import { Container }  from "@mui/material";

// const VPlayer = ({ videoSrc, audioSrc, handleSceneEnd, handleProgress, seekTo, playing }) => {
//     const reactPlayerRef = useRef();
  
//     useEffect(() => {
//       if (seekTo > 0) {
//         setTimeout(() => {
//           reactPlayerRef.current.seekTo(seekTo);
//         }, 200); // Delay seekTo to allow video to load
//       }
//     }, [videoSrc, seekTo]);
//     console.log(playing)
  
//     return (
//       <div style={{ width: '100%', height: '100%' }}>
//         <ReactPlayer
//           ref={reactPlayerRef}
//           url={videoSrc}
//           playing={playing}
//           controls={false}
//           onEnded={handleSceneEnd}
//           onProgress={handleProgress}
//           width='100%'
//           height='100%'
//         />
//       {/* <audio id='audio' src={audioSrc} autoPlay /> */}
//     </div>
//     );
//   };

//   export default VPlayer;