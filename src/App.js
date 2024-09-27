import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchWidget from './components/SearchWidget';
import PlayButton from './components/PlayButton';
import AboutPage from './components/AboutPage';
import './fonts.css';
import './App.css'; // Import updated styles

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

  useEffect(() => {
    // Example API call or logic to get song data
  }, []);

  const handleSong1Select = (song) => {
    setSong1(song);
  };

  const handleSong2Select = (song) => {
    setSong2(song);
  };

  const handleGenerateMatch = async () => {
    try {
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

      {/* Use the search widget to select both song1 and song2 */}
      <div className="search-section">
        <SearchWidget placeholder="Search for Song 1" onSongSelect={handleSong1Select} />
        <SearchWidget placeholder="Search for Song 2" onSongSelect={handleSong2Select} />
      </div>

      <div className="song-display">
        {/* Display song1, the plus sign, song2, the equal sign, and the matched song */}
        <div className="song-container">
          {song1 && (
            <div>
              <img
                src={song1.coverArtUrl}
                alt="Song 1 Cover"
                className="cover-art"
              />
              <p>{song1.name}</p>
              <PlayButton songUrl={song1.previewUrl} />
            </div>
          )}
        </div>

        <span className="plus-sign">+</span>

        <div className="song-container">
          {song2 && (
            <div>
              <img
                src={song2.coverArtUrl}
                alt="Song 2 Cover"
                className="cover-art"
              />
              <p>{song2.name}</p>
              <PlayButton songUrl={song2.previewUrl} />
            </div>
          )}
        </div>

        <span className="equal-sign">=</span>

        <div className="song-container">
          {matchedSong && (
            <div>
              <img
                src={matchedSong.coverArtUrl}
                alt="Matched Song Cover"
                className="cover-art"
              />
              <p>{matchedSong.name}</p>
              <PlayButton songUrl={matchedSong.previewUrl} />
            </div>
          )}
        </div>
      </div>

      <button className="generate-button" onClick={handleGenerateMatch}>
        Generate New Song
      </button>
    </div>
  );
}

export default App;
