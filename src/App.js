import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchWidget from './components/SearchWidget';
import PlayButton from './components/PlayButton';
import AboutPage from './components/AboutPage';
import './fonts.css';
import './App.css'; // Ensure this imports the latest styles

export const colors = {
  spotifyGreen: '#1DB954',
  spotifyBlack: '#191414',
  spotifyWhite: '#FFFFFF',
  spotifyGrey: '#B3B3B3',
};

const fontStyle = {
  fontFamily: "'Circular Std', Arial, sans-serif",
};

function App() {
  const [song1, setSong1] = useState(null);
  const [song2, setSong2] = useState(null);
  const [matchedSong, setMatchedSong] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  // Load songs or perform necessary setup
  useEffect(() => {
    // Your useEffect logic for fetching or setting up songs goes here
  }, []);

  const handleSong1Select = (song) => {
    setSong1(song);
  };

  const handleSong2Select = (song) => {
    setSong2(song);
  };

  const handleGenerateMatch = async () => {
    try {
      // Call API or logic to generate matched song
      const response = await axios.post('/api/match', {
        song1: song1.id,
        song2: song2.id,
      });
      setMatchedSong(response.data.matchedSong);
    } catch (error) {
      console.error('Error generating match:', error);
    }
  };

  return (
    <div className="app-container" style={fontStyle}>
      <div className="header">
        <h1 className="title">Song Plus Song</h1>
        <button className="about-button" onClick={() => setShowAbout(!showAbout)}>
          {showAbout ? 'Hide About' : 'About'}
        </button>
      </div>

      {showAbout && <AboutPage />}

      <SearchWidget onSong1Select={handleSong1Select} onSong2Select={handleSong2Select} />

      <div className="song-section">
        {song1 && (
          <div className="song-container">
            <img
              src={song1.coverArtUrl} // Use actual song1 cover art URL
              alt="Song 1 Cover"
              className="cover-art"
            />
            <p>{song1.name}</p>
            <PlayButton songUrl={song1.previewUrl} />
          </div>
        )}

        <span className="plus-sign">+</span>

        {song2 && (
          <div className="song-container">
            <img
              src={song2.coverArtUrl} // Use actual song2 cover art URL
              alt="Song 2 Cover"
              className="cover-art"
            />
            <p>{song2.name}</p>
            <PlayButton songUrl={song2.previewUrl} />
          </div>
        )}

        <span className="equal-sign">=</span>

        {matchedSong && (
          <div className="song-container">
            <img
              src={matchedSong.coverArtUrl} // Use actual matched song cover art URL
              alt="Matched Song Cover"
              className="cover-art"
            />
            <p>{matchedSong.name}</p>
            <PlayButton songUrl={matchedSong.previewUrl} />
          </div>
        )}
      </div>

      <button className="generate-button" onClick={handleGenerateMatch}>
        Generate New Song
      </button>
    </div>
  );
}

export default App;
