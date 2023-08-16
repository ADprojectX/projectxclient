import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import EditorMain from '../components/video-editing/Editormain';
import SideNavBar from '../components/SideBar';
import './css/VideoPlayer.css';
import axios from 'axios';

const REQ_BASE_URL = 'http://localhost:8000/req';

const VideoPlayer = () => {
  const [videoFiles, setVideoFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const asturlss = [
    [
      0,
      "6d424a12-891c-4a93-9b0d-60b4bc1986b6",
      "https://d11ew2auizyka7.cloudfront.net/OBJECT_STORE/c6ab0753-f26c-47ec-af3d-1d564060c0c8/454cb395-d739-4021-831a-33bf7fb63bae/intermediate_video/mjx_XIL/6d424a12-891c-4a93-9b0d-60b4bc1986b6/mjx_Dave.mp4?Expires=1692143167&Signature=k9RtlBQDe-v1sYKwpF~4qiwTvOB92Yuk7m39cHlWJXeekDAO0ygXE15cVy9JZCpAIMYfFtAxINYehOdJL1TH1oLW1mcJYzSVdXNqC2jtmHFnB9MITVGO5~vOpn~KzHaPsF0pF-F9KV1idDHkybw3QUbNtiSftr2z1cPM5w4F7RUwbLT-H8eNCTup86~RpXQcsoqtLF8ih~tGD48frZ7Qo7cG7MVV7fKv5ra~ghibLkFjK6c4LFpYYl89HZEkyP5zHCTnxgYA7oNrq76~~lWSLF8wcf-t6INiCg8xgV3t-lsFA3wAmH-M1vL-67iXzjNpfux~mz06mkPiuR65vxh4bw__&Key-Pair-Id=K34B758VRRHHIL"
  ]
  ]
  
  const assturls = [
    [
      0,
      "ffb44e98-2fa8-422a-b27d-d773924fbcff",
      "https://drive.google.com/file/d/1PXQ-NnMOcmSP5imOO2jUpjFzrvBMmChp/view?usp=sharing"
    ],
    [
      1,
      "d3acb716-ad48-4b3f-bd6c-e9a8cede6938",
      "https://drive.google.com/file/d/1m-nxUJWr-_r1EW6ZGYhGdwp68dDvMobf/view?usp=sharing"
    ],
    [
      2,
      "7b167788-cc0f-4001-842f-b878c799551f",
      "https://drive.google.com/file/d/1QAEzJPbBlFos1LRNUQE2rjgzjR1g0nUm/view?usp=sharing"
    ]
  ]

  
  const location = useLocation();
  const reqid = location.state && location.state.reqid;

  const hasUrlExpired = (url) => {
    const expiresMatch = url.match(/Expires=(\d+)/);
    if (!expiresMatch) return true;

    const expiryTimestamp = parseInt(expiresMatch[1], 10);
    return (Date.now() / 1000) > expiryTimestamp;
  };

  
  const fetchVideo = async (scene) => {
    const [index, sceneId, cloudfrontUrl] = scene;
    console.log(scene)
    
    try {
      const videoResponse = await fetch(cloudfrontUrl, {method: 'GET', mode: 'no-cors'});
      if (!videoResponse.ok) {
        throw new Error('Video not available');
      }

      const videoBlob = await videoResponse.blob();
      console.log("VIDEOBLOB")
      console.log(videoBlob)
      return URL.createObjectURL(videoBlob); // Return the URL created from the blob.
    } catch (err) {
      console.warn('Video not available yet, will retry:', err.message);
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const videoURL = await fetchVideo(scene);
            resolve(videoURL);
          } catch (retryErr) {
            reject(retryErr);
          }
        }, 2 * 60 * 1000); // 2 minutes
      });
    }
  };
  
  
  useEffect(() => {
    async function fetchVideos() {
      setIsLoading(true); // Start loading
      
      try {
        console.log("fetchedVideos started");
        const fetchedVideos = await Promise.all(asturlss.map(fetchVideo));
        console.log("fetchedVideos", fetchedVideos);
        setVideoFiles(fetchedVideos);
      } catch (error) {
        console.error('Failed to retrieve video files:', error);
      } finally {
        setIsLoading(false); // End loading once everything is done
      }
    }
    
    fetchVideos();
  }, []);
  
  // const fetchVideo = async (scene) => {
  //   const [index, sceneId, cloudfrontUrl] = scene;
  //   console.log(scene)
  //   if (hasUrlExpired(cloudfrontUrl)) {
  //     try {
  //       const response = await axios.get(`${REQ_BASE_URL}/video-files/?sceneid=${sceneId}&category=image`);
  //       if (response.data && response.data.url) {
  //         return fetchVideo([index, sceneId, response.data.url]);
  //       }
  //     } catch (err) {
  //       console.error('Error fetching new URL:', err);
  //       throw err;
  //     }
  //   }
  
  //   try {
  //     const videoResponse = await fetch(cloudfrontUrl);
  //     if (!videoResponse.ok) {
  //       throw new Error('Video not available');
  //     }
  //     const videoBlob = await videoResponse.blob();
  //     return URL.createObjectURL(videoBlob); // Return the URL created from the blob.
  //   } catch (err) {
  //     console.warn('Video not available yet, will retry:', err.message);
  //     return new Promise((resolve, reject) => {
  //       setTimeout(async () => {
  //         try {
  //           const videoURL = await fetchVideo(scene);
  //           resolve(videoURL);
  //         } catch (retryErr) {
  //           reject(retryErr);
  //         }
  //       }, 2 * 60 * 1000); // 2 minutes
  //     });
  //   }
  // };
  
//   useEffect(() => {
//       setIsLoading(true); // Start loading
    
//       axios.get(`${REQ_BASE_URL}/video-files/?reqid=${reqid}`)
//       .then(async (response) => {
//         if (response.data && response.data.asset_urls) {
//             const assetUrls = asturlss;
//         // const assetUrls = response.data.asset_urls;
//         console.log(URL)
//         console.log(assetUrls)
//         const fetchedVideos = await Promise.all(assetUrls.map(fetchVideo));
//         console.log("fetchedVideos")
//         console.log(fetchedVideos)
//         setVideoFiles(fetchedVideos);
//     }
//   })
//   .catch((error) => {
//     console.error('Failed to retrieve video files:', error);
//   })
//   .finally(() => {
//     setIsLoading(false); // End loading once everything is done
//   });
// }, [reqid]);

// Loading condition
if (isLoading) {
  return <div>Loading videos...</div>;
}

return (
  <div className='video-page'>
      <SideNavBar />
      <div className='editor'>
        <div className='video-player'>
          <EditorMain scenes={videoFiles} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;


// const fetchVideo = async (scene) => {
//   const [index, sceneId, cloudfrontUrl] = scene;
//   console.log(scene)
//   if (hasUrlExpired(cloudfrontUrl)) {
//     try {
//       const response = await axios.get(`${REQ_BASE_URL}/video-files/?sceneid=${sceneId}&category=image`);
//       if (response.data && response.data.url) {
//         return fetchVideo([index, sceneId, response.data.url]);
//       }
//     } catch (err) {
//       console.error('Error fetching new URL:', err);
//       throw err;
//     }
//   }

//   //1286
//   //9729

//   try {
//     const videoResponse = await fetch(cloudfrontUrl);
//     if (!videoResponse.ok) {
//       throw new Error('Video not available');
//     }
//     return cloudfrontUrl; // or return videoResponse.blob() based on your need.
//   } catch (err) {
//     console.warn('Video not available yet, will retry:', err.message);
//     return new Promise((resolve, reject) => {
//       setTimeout(async () => {
//         try {
//           const videoUrl = await fetchVideo(scene);
//           resolve(videoUrl);
//         } catch (retryErr) {
//           reject(retryErr);
//         }
//       }, 2 * 60 * 1000); // 2 minutes
//     });
//   }
// };


// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import EditorMain from '../components/video-editing/Editormain';
// import SideNavBar from '../components/SideBar';
// import './css/VideoPlayer.css'
// import JSZip from 'jszip';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api';
// const REQ_BASE_URL = 'http://localhost:8000/req';


// const VideoPlayer = () => {
//   const [videoFiles, setVideoFiles] = useState([]);

//   const hasUrlExpired = (url) => {
//     const expiresMatch = url.match(/Expires=(\d+)/);
//     if (!expiresMatch) return true;
  
//     const expiryTimestamp = parseInt(expiresMatch[1], 10);
//     return (Date.now() / 1000) > expiryTimestamp;
//   };
  
//   const location = useLocation();
//   let reqid = location.state && location.state.reqid;
//   // ${REQ_BASE_URL}/video-files/?sceneid=${sceneid}&category=${'image'} 
//   useEffect(() => {
//     axios
//       .get(`${REQ_BASE_URL}/video-files/?reqid=${reqid}`)
//       .then((response) => {
//         console.log("RESPONSE OF VIDEO")
//         console.log(response.data)

//         if (response.data && response.data.asset_urls) {
//           const assetUrls = response.data.asset_urls;
//           console.log(assetUrls)
//           // Do something with assetUrls, like setting it in the component's state or passing it to another function
//         }
//         // const zip = new JSZip();
//         // return zip.loadAsync(response.data);
//       })      
//       .catch((error) => {
//         console.error('Failed to retrieve video files:- ', error);
//       });
//     }, []);
    
//     // let reqid = location.state && location.state.reqid
//     // let videoData = location.state && location.state.videoFiles
    
    
//     // useEffect(() => {
//       //   setVideoFiles(videoData)
//       //   console.log(videoFiles)
//       // }, []);
      
//       return (
//         <div className='video-page'>
//       <SideNavBar />

//       <div className='editor'>

//         <div className='video-player'>
//           <EditorMain scenes={videoFiles} />
//         </div>

//       </div>
//     </div>
//     );
//   };
  
//   export default VideoPlayer;
  // .then((zip) => {
  //   const filePromises = Object.keys(zip.files).map((fileName) => {
  //     const file = zip.files[fileName];
  //     return file.async('blob').then((blob) => {
  //       return { name: fileName, url: URL.createObjectURL(blob) };
  //     });
  //   });
  //   return Promise.all(filePromises);
  // })
  // .then((videos) => {
  //   const videoPromises = videos.map((video) => {
  //     return new Promise((resolve) => {
  //       const videoElement = document.createElement('video');
  //       videoElement.src = video.url;
  //       videoElement.addEventListener('loadedmetadata', () => {
  //         const duration = videoElement.duration;
  //         resolve({ ...video, duration });
  //       });
  //     });
  //   });
  //   return Promise.all(videoPromises);
  // })
  // .then((videosWithDuration) => {
  //   const videoFiles = videosWithDuration.map((video, index) => ({
  //     name: `Scene${index}`,
  //     video: video.url,
  //     audio: '', 
  //     duration: video.duration
  //   }));
  //   setVideoFiles(videoFiles); 
  // })






// axios.get(`${REQ_BASE_URL}/video-files/`, { responseType: 'arraybuffer' })
//   .then((response) => {
//     const zip = new JSZip();
//     return zip.loadAsync(response.data);
//   })
//   .then((zip) => {
//     const filePromises = Object.keys(zip.files).map((fileName) => {
//       const file = zip.files[fileName];
//       return file.async('blob').then((blob) => {
//         return { name: fileName, url: URL.createObjectURL(blob) };
//       });
//     });
//     return Promise.all(filePromises);
//   })
//   .then((videos) => {
//     const videoPromises = videos.map((video) => {
//       return new Promise((resolve) => {
//         const videoElement = document.createElement('video');
//         videoElement.src = video.url;
//         videoElement.addEventListener('loadedmetadata', () => {
//           const duration = videoElement.duration;
//           resolve({ ...video, duration });
//         });
//       });
//     });
//     return Promise.all(videoPromises);
//   })
//   .then((videosWithDuration) => {
//     setVideoFiles(
//       videosWithDuration.map((video, index) => ({
//         name: `Scene${index}`,
//         video: video.url,
//         audio: '', // Provide audio URL if available
//         duration: video.duration
//       }))
//     );
//   })
//   .catch((error) => {
//     console.error('Failed to retrieve video files:', error);
//   });
