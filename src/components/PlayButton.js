import React, { useState, useRef, useEffect } from 'react';
import { colors } from '../App.js';
import './PlayButton.css';

function PlayButton({ previewUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (previewUrl) {
      audioRef.current = new Audio(previewUrl);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, [previewUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button onClick={togglePlay} className="play-button">
      {isPlaying ? (
        <svg className="play-button-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="2" width="3" height="12" rx="1" fill={colors.spotifyBlack} />
          <rect x="10" y="2" width="3" height="12" rx="1" fill={colors.spotifyBlack} />
        </svg>
      ) : (
        <svg className="play-button-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2.5L13 8L4 13.5V2.5Z" fill={colors.spotifyBlack} />
        </svg>
      )}
    </button>
  );
}

export default PlayButton;