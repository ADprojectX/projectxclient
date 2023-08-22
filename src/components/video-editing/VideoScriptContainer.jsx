// import React, {useState} from 'react';
// import {useLocation } from 'react-router-dom';
// import axios from 'axios';
// import '../css/video-editing/VideoScriptContainer.css'
// import VideoScriptCard from './VideoScriptCard';

// const REQ_BASE_URL = 'http://localhost:8000/req';

// function ScriptContainer( { setScenesForParent, currentSceneIndex, setCurrentSceneIndex } ) {
//     const [scenes, setScenes] = useState();
//     const [errorMessage, setErrorMessage] = useState('');
//     const [isLoading, setIsLoading] = useState(true); 

//     console.log("re-rendered")
//     console.log(scenes)

//     // const location = useLocation();
//     // let reqid = location.state && location.state.reqid
//     let reqid = localStorage.getItem('reqid');

//     React.useEffect(() => {
//       if(scenes == null || scenes.length == 0){
//         fetchScriptFromBackend();
//       }
//     }, []);

//     const fetchScriptFromBackend = () => {
//       // Make a request to the backend to fetch the script based on the title
//       axios.get(`${REQ_BASE_URL}/fetch-script?reqid=${reqid}`, { withCredentials: true })
//       .then((response) => {
//         let scriptFromBack = response.data.script

//         console.log("scriptfromback ")

//         setScenesAndUpdateParent(scriptFromBack)
//         setIsLoading(false);
//         // setScenes(jsonData)
//         // setScript(scriptFromBack)
//         })
//         .catch((error) => {
//           setErrorMessage('script generation failed');
//           console.log(error);
//           setIsLoading(false);
//         });
//     };

//     const setScenesAndUpdateParent = (newScenes) => {
//       setScenes(newScenes);
//       setScenesForParent(newScenes);  // pass the updated state to the parent
//     }
    
//     const updateCard = (index, updatedScene) => {
//       const newScenes = [...scenes];
//       newScenes[index] = updatedScene;
//       // setScenes(newScenes);
//       setScenesAndUpdateParent(newScenes);
//     };
  
//     const deleteCard = (index) => {
//       const newScenes = scenes.slice(0, index).concat(scenes.slice(index+1)).map((scene, idx) => {
//         scene[0] = idx;  // Update the index of each scene
//         return scene;
//     });
//     setScenesAndUpdateParent(newScenes);
//     };
  
//     const addCard = (index) => {
//       const newScene = [index + 1, '', ''];  // Assuming uuid is handled by the backend
//       const newScenes = scenes.slice(0, index+1).concat([newScene], scenes.slice(index+1)).map((scene, idx) => {
//           scene[0] = idx;  // Update the index of each scene
//           return scene;
//       });
//       setScenesAndUpdateParent(newScenes);
//     }

//     const handleSceneClick = (index) => {
//       setCurrentSceneIndex(index);
//     };

//     console.log("before return")
    
//     return(
//         <div className="scriptContainer">
//               {isLoading && (
//                 <div className="loading-popup">
//                     Loading...
//                 </div>
//             )}
//             {scenes && scenes.map(([i , uuid, script]) => (
//             <VideoScriptCard
//                 uuid={uuid}
//                 index={i}
//                 scene={script}
//                 updateCard={updateCard}
//                 deleteCard={deleteCard}
//                 addCard={addCard}
//                 onSceneClick={handleSceneClick} // new prop to handle scene click
//                 isActive={i === currentSceneIndex} // new prop to indicate active scene
//             />
//             ))}
//             {errorMessage && <p className="error">{errorMessage}</p>}
//         </div>
//     );
// }

// export default ScriptContainer;

import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import VideoScriptCard from './VideoScriptCard';
import '../css/video-editing/VideoScriptContainer.css'

// const REQ_BASE_URL = 'http://localhost:8000/req';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const REQ_BASE_URL = process.env.REACT_APP_REQ_BASE_URL;

function VideoScriptContainer( { setScenesFromChild, currentSceneIndex, setCurrentSceneIndex } ) {
    const [scenes, setScenes] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    // const location = useLocation();
    // let reqid = location.state && location.state.reqid
    const activeCardRef = useRef(null);
    let reqid = localStorage.getItem('reqid');


    React.useEffect(() => {
      if(scenes == null || scenes.length == 0){
        fetchScriptFromBackend();
      }
    }, [0]);

    const setScenesAndUpdateParent = (newScenes) => {
      setScenes(newScenes);
      setScenesFromChild(newScenes);  // pass the updated state to the parent
    }
  
    const fetchScriptFromBackend = () => {
      // Make a request to the backend to fetch the script based on the title
      axios.get(`${REQ_BASE_URL}/fetch-script?reqid=${reqid}`, { withCredentials: true })
      .then((response) => {
        let scriptFromBack = response.data.script

        console.log("scriptfrombackend")

        setScenesAndUpdateParent(scriptFromBack)
        // setScenes(jsonData)
        // setScript(scriptFromBack)
        })
        .catch((error) => {
          setErrorMessage('script generation failed');
          console.log(error);
        });
    };


    
    const updateCard = (index, updatedScene) => {
      const newScenes = [...scenes];
      newScenes[index] = updatedScene;
      // setScenes(newScenes);
      setScenesAndUpdateParent(newScenes);
    };
  
    const deleteCard = (index) => {
      const newScenes = scenes.slice(0, index).concat(scenes.slice(index+1)).map((scene, idx) => {
        scene[0] = idx;  // Update the index of each scene
        return scene;
    });
    setScenesAndUpdateParent(newScenes);
    };
  
    const addCard = (index) => {
      const newScene = [index + 1, '', ''];  // Assuming uuid is handled by the backend
      const newScenes = scenes.slice(0, index+1).concat([newScene], scenes.slice(index+1)).map((scene, idx) => {
          scene[0] = idx;  // Update the index of each scene
          return scene;
      });
      setScenesAndUpdateParent(newScenes);
    }

    const handleSceneClick = (index) => {
      setCurrentSceneIndex(index);
    };

    // Scroll the container to the active card whenever the active scene index changes
    useEffect(() => {
        if (activeCardRef.current) {
        activeCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentSceneIndex]);
    
    return(
      <div className="videoScriptContainer">
            {scenes && scenes.map(([i , uuid, script]) => (
            <div
            key={uuid}
            ref={i === currentSceneIndex ? activeCardRef : null}
            >
                <VideoScriptCard
                    uuid={uuid}
                    index={i}
                    scene={script}
                    updateCard={updateCard}
                    deleteCard={deleteCard}
                    addCard={addCard}
                    onSceneClick={handleSceneClick} // new prop to handle scene click
                    isActive={i === currentSceneIndex} // new prop to indicate active scene
                />
            </div>
            ))}
            {errorMessage && <p className="error">{errorMessage}</p>}
        </div>

        // <div className="videoScriptContainer">
        //     {scenes && scenes.map((scene, index) => (
        //     <div
        //     key={index}
        //     ref={index === currentSceneIndex ? activeCardRef : null}
        //     >
        //         <VideoScriptCard
        //             // key={index}
        //             uuid={uuid}
        //             scene={scene}
        //             index={i}
        //             updateCard={updateCard}
        //             deleteCard={deleteCard}
        //             addCard={addCard}
        //             onSceneClick={handleSceneClick} // new prop to handle scene click
        //             isActive={index === currentSceneIndex} // new prop to indicate active scene
        //         />
        //     </div>
        //     ))}
        //     {errorMessage && <p className="error">{errorMessage}</p>}
        // </div>
    );
}

export default VideoScriptContainer;