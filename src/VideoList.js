import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JSZip from 'jszip';

const REQ_BASE_URL = 'http://localhost:8000/req';
const VideoList = () => {
  const [videoFiles, setVideoFiles] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Make an HTTP request to retrieve the video files from the Django backend
    axios.get(`${REQ_BASE_URL}/video-files/`, { responseType: 'arraybuffer' })
      .then((response) => {
        const zip = new JSZip();
        return zip.loadAsync(response.data);
      })
      .then((zip) => {
        const filePromises = Object.keys(zip.files).map((fileName) => {
          const file = zip.files[fileName];
          return file.async('blob').then((blob) => {
            return { name: fileName, url: URL.createObjectURL(blob) };
          });
        });
        return Promise.all(filePromises);
      })
      .then((videos) => {
        setVideoFiles(videos);
      })
      .catch((error) => {
        console.error('Failed to retrieve video files:', error);
      });
  }, []);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div>
      <h2>Video Files</h2>
      {videoFiles.length > 0 ? (
        <>
          <ul>
            {videoFiles.map((videoFile) => (
              <li key={videoFile.name}>
                <button onClick={() => handleVideoClick(videoFile)}>{videoFile.name}</button>
              </li>
            ))}
          </ul>
          {selectedVideo && (
            <div>
              <h3>Selected Video: {selectedVideo.name}</h3>
              <video src={selectedVideo.url} controls autoPlay />
            </div>
          )}
        </>
      ) : (
        <p>No video files found.</p>
      )}
    </div>
  );
};

export default VideoList;
