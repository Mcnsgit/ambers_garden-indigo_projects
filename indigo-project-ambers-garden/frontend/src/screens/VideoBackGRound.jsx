// src/components/VideoBackGRound.js
import  { useRef, useCallback } from 'react';
import Video from '../assets/background-video.c5ba70b2e8707f21c2f5.mp4';

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
      loop
      muted
      onCanPlay={handleCanPlay}
    >
      <source src={'./assets/background-video.mp4'} type="video/mp4" />
    </video>
  );
}
