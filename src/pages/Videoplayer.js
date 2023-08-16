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

  
  const location = useLocation();
  const reqid = location.state && location.state.reqid;

  // const hasUrlExpired = (url) => {
  //   const expiresMatch = url.match(/Expires=(\d+)/);
  //   if (!expiresMatch) return true;

  //   const expiryTimestamp = parseInt(expiresMatch[1], 10);
  //   return (Date.now() / 1000) > expiryTimestamp;
  // };

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
  //     console.log("videores")
  //     console.log(videoResponse)
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

  // useEffect(() => {
  //   setIsLoading(true); // Start loading

  //   axios.get(`${REQ_BASE_URL}/video-files/?reqid=${reqid}`)
  //     .then(async (response) => {
  //       if (response.data && response.data.asset_urls) {
  //         const assetUrls = response.data.asset_urls;
  //         console.log(URL)
  //         console.log(assetUrls)
  //         const fetchedVideos = await Promise.all(assetUrls.map(fetchVideo));
  //         console.log("fetchedVideos")
  //         console.log(fetchedVideos)
  //         setVideoFiles(fetchedVideos);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Failed to retrieve video files:', error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false); // End loading once everything is done
  //     });
  // }, [reqid]);



  useEffect(() => {
    axios
      .get(`${REQ_BASE_URL}/video-files/?reqid=${reqid}`)
      .then((response) => {
        console.log("RESPONSE DATA")
        console.log(response.data);
        const videoData = response.data.asset_urls; // array of arrays with the given structure
        const videoPromises = videoData.map((videoArr) => {
          const url = videoArr[2]; // third element of the inner array is the URL
          return new Promise((resolve) => {
            const videoElement = document.createElement('video');
            videoElement.src = url;
            videoElement.addEventListener('loadedmetadata', () => {
              const duration = videoElement.duration;
              resolve({ url, duration });
            });
          });
        });
        return Promise.all(videoPromises);
      })
      .then((videosWithDuration) => {
        const videoFiles = videosWithDuration.map((video, index) => ({
          name: `Scene${index}`,
          video: video.url,
          audio: '', // Provide audio URL if available
          duration: video.duration
        }));
        setVideoFiles(videoFiles);
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to retrieve video files:', error);
      });
  }, [reqid]);
  

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
