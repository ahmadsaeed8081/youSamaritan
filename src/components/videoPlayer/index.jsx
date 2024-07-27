import React, { useState, useRef } from "react";
import { FaPlay, FaExpand } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";

const VideoPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="">
      <video
      controls
        ref={videoRef}
        src={src}
        style={{ width: "100%", borderRadius: "10px"}}
      />
    
    </div>
  );
};

export default VideoPlayer;
