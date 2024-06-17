// src/components/VideoBackGRound.js
import React, { useRef, useCallback } from 'react';
import Video from '../assets/background-video.mp4'; // Replace with actual video path

export default function VideoBackground() {
  const videoRef = useRef();

  const setPlayBack = useCallback(() => {
    videoRef.current.playbackRate = 0.5;
  }, []);

  const handleCanPlay = useCallback(() => {
    setPlayBack();
  }, [setPlayBack]);

  return (
    <video
      ref={videoRef}
      className="background-video"
      autoPlay
      preload=''
      loop
      muted
      onCanPlay={handleCanPlay}
    >
      <source src={Video} type="video/mp4" />
    </video>
  );
}
