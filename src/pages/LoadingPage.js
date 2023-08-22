// import React, { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import JSZip from 'jszip';

// const API_BASE_URL = 'http://localhost:8000/api';
// const REQ_BASE_URL = 'http://localhost:8000/req';

// ... Your imports and constants ...

function LoadingPage() {
    // const navigate = useNavigate();
    // const location = useLocation();
    // let reqid = location.state && location.state.reqid;
  
    // useEffect(() => {
    //   axios
    //     .get(`${REQ_BASE_URL}/video-files/`, { responseType: 'arraybuffer' })
    //     .then((response) => {
    //       const zip = new JSZip();
    //       return zip.loadAsync(response.data);
    //     })
    //     .then((zip) => {
    //       const filePromises = Object.keys(zip.files).map((fileName) => {
    //         const file = zip.files[fileName];
    //         return file.async('blob').then((blob) => {
    //           return { name: fileName, url: URL.createObjectURL(blob) };
    //         });
    //       });
    //       return Promise.all(filePromises);
    //     })
    //     .then((videos) => {
    //       const videoPromises = videos.map((video) => {
    //         return new Promise((resolve) => {
    //           const videoElement = document.createElement('video');
    //           videoElement.src = video.url;
    //           videoElement.addEventListener('loadedmetadata', () => {
    //             const duration = videoElement.duration;
    //             resolve({ ...video, duration });
    //           });
    //         });
    //       });
    //       return Promise.all(videoPromises);
    //     })
    //     .then((videosWithDuration) => {
    //       const videoFiles = videosWithDuration.map((video, index) => ({
    //         name: `Scene${index}`,
    //         video: video.url,
    //         audio: '', // Provide audio URL if available
    //         duration: video.duration
    //       }));
    //       navigate('/video', { state: { videoFiles: videoFiles, reqid: reqid } });
    //     })
    //     .catch((error) => {
    //       console.error('Failed to retrieve video files:', error);
    //     });
    // }, [navigate, reqid]);
  
    return <h1>Loading...</h1>;
  }
    

// function LoadingPage() {
//     const navigate = useNavigate();
//     const [videoFiles, setVideoFiles] = useState([]);
//     const location = useLocation();
//     let reqid = location.state && location.state.reqid
//     useEffect(() => {
//         console.log('initial')
//         axios.get(`${REQ_BASE_URL}/video-files/`, { responseType: 'arraybuffer' })
//           .then((response) => {
//             const zip = new JSZip();
//             console.log('first then')
//             return zip.loadAsync(response.data);
//           })
//           .then((zip) => {
//             const filePromises = Object.keys(zip.files).map((fileName) => {
//               const file = zip.files[fileName];
//               console.log('second then')
//               return file.async('blob').then((blob) => {
//                 return { name: fileName, url: URL.createObjectURL(blob) };
//               });
//             });
//             return Promise.all(filePromises);
//           })
//           .then((videos) => {
//             const videoPromises = videos.map((video) => {
//                 console.log('third then')
//               return new Promise((resolve) => {
//                 const videoElement = document.createElement('video');
//                 videoElement.src = video.url;
//                 videoElement.addEventListener('loadedmetadata', () => {
//                   const duration = videoElement.duration;
//                   resolve({ ...video, duration });
//                 });
//               });
//             });
//             return Promise.all(videoPromises);
//           })
//           .then((videosWithDuration) => {
//             setVideoFiles(
//               videosWithDuration.map((video, index) => ({
//                 name: `Scene${index}`,
//                 video: video.url,
//                 audio: '', // Provide audio URL if available
//                 duration: video.duration
//               }))
//             );
//             console.log(videoFiles)
//             navigate('/video', {state:{videoFiles:videoFiles, reqid:reqid}})

//           })
//           .catch((error) => {
//             console.error('Failed to retrieve video files:', error);
//           });
//       }, []);

//     return(
//         <>
//         <h1>Loading...</h1>
//         <div>{videoFiles}</div>
//         </>
//     );
// }

export default LoadingPage;