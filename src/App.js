import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMediaQuery } from '@material-ui/core';
import SearchWidget from './components/SearchWidget';
import PlayButton from './components/PlayButton';
import AboutPage from './components/AboutPage';
import './fonts.css';

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
  const [genreInfo, setGenreInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [showAboutPage, setShowAboutPage] = useState(false);

  const isMobile = useMediaQuery('(max-width: 760px)');

  useEffect(() => {
    if (matchedSong && matchedSong.song) {
      console.log('Matched Song:', matchedSong);
      setSpotifyUrl(matchedSong.song.url || '');
    }
  }, [matchedSong]);

  const handleSongSelect = (selectedSong, songNumber) => {
    if (songNumber === 1) {
      setSong1(selectedSong);
    } else {
      setSong2(selectedSong);
    }
    setMatchedSong(null);
    setGenreInfo(null);
  };

  const handleBack = (songNumber) => {
    if (songNumber === 1) {
      setSong1(null);
    } else {
      setSong2(null);
    }
    setMatchedSong(null);
    setGenreInfo(null);
  };

  const handleMatchSongs = async () => {
    if (!song1 || !song2) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/match`, {
        song1Id: song1.id,
        song2Id: song2.id,
      });
      setMatchedSong(response.data);
      setGenreInfo(response.data.genreInfo);
      setSpotifyUrl(response.data.song.url || '');
    } catch (error) {
      console.error('Error matching songs:', error);
      alert('An error occurred while matching songs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateNew = async () => {
    setMatchedSong(null);
    setGenreInfo(null);
    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/generate-new`, {
        song1Id: song1.id,
        song2Id: song2.id,
      });
      setMatchedSong(response.data);
      setGenreInfo(response.data.genreInfo);
      setSpotifyUrl(response.data.song.url || '');
    } catch (error) {
      console.error('Error generating new song:', error);
      alert('An error occurred while generating a new song. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderSong = (song, title, genre) => {
    if (!song) return null;

    const imageUrl = song.album?.images?.[1]?.url || song.coverArt || 'placeholder-image-url.jpg';

    return (
      <div
        style={{
          textAlign: 'center',
          backgroundColor: colors.spotifyBlack,
          padding: '15px',
          borderRadius: '8px',
          ...fontStyle,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '360px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ height: '20px', marginBottom: '8px' }}>
          {genre && (
            <div style={{ color: colors.spotifyGrey, fontSize: '0.9em' }}>Genre: {genre}</div>
          )}
        </div>
        <h3 style={{ color: colors.spotifyWhite, marginBottom: '8px', fontWeight: 900, fontSize: '0.9em' }}>
          {title}
        </h3>
        <img
          src={imageUrl}
          alt={`${song.name} album cover`}
          style={{ width: '150px', height: '150px', marginBottom: '12px', borderRadius: '4px' }}
        />
        <div style={{ fontWeight: 'bold', color: colors.spotifyWhite, fontSize: '0.9em', marginBottom: '8px' }}>
          {song.name}
        </div>
        <div style={{ fontSize: '0.8em', color: colors.spotifyGrey, marginBottom: '12px' }}>
          {song.artists.map((artist) => artist.name).join(', ')}
        </div>
        <div style={{ height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {song.preview_url ? (
            <PlayButton previewUrl={song.preview_url} />
          ) : (
            <span style={{ color: colors.spotifyGrey, fontSize: '0.8em' }}>No preview available</span>
          )}
        </div>
      </div>
    );
  };

  const buttonStyle = {
    backgroundColor: colors.spotifyGreen,
    color: colors.spotifyBlack,
    border: 'none',
    padding: '10px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9em',
    width: '100%',
    maxWidth: '200px',
  };

  const symbolStyle = {
    fontSize: '40px',
    color: colors.spotifyWhite,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isMobile ? '100%' : '60px',
    height: isMobile ? '60px' : '60px',
    marginTop: isMobile ? '20px' : '170px',
  };

  const columnStyle = {
    width: isMobile ? '100%' : '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: isMobile ? '30px' : '0',
  };

  const headerStyle = {
    textAlign: 'center',
    color: colors.spotifyWhite,
    fontSize: '1.2em',
    marginBottom: '15px',
    width: '100%',
  };

  const genreInfoStyle = {
    textAlign: 'center',
    color: colors.spotifyWhite,
    fontSize: '1em',
    marginTop: '30px',
    padding: '15px',
    backgroundColor: colors.spotifyBlack,
    borderRadius: '8px',
    width: '100%',
  };

  const spotifyLinkStyle = {
    color: colors.spotifyGreen,
    textDecoration: 'none',
    fontSize: '1em',
    fontWeight: 'bold',
    marginTop: '15px',
    display: 'inline-block',
    cursor: 'pointer',
  };

  const handleSpotifyClick = () => {
    if (spotifyUrl) {
      window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('Spotify link is not available for this song.');
    }
  };

  const handleAboutClick = () => {
    setShowAboutPage(true);
  };

  const handleBackToMain = () => {
    setShowAboutPage(false);
  };

  if (showAboutPage) {
    return (
      <div style={{ backgroundColor: colors.spotifyBlack, minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
          <button onClick={handleBackToMain} style={buttonStyle}>
            Back to Main
          </button>
        </div>
        <AboutPage />
      </div>
    );
  }

  return (
    <div
      className="App"
      style={{
        padding: '20px',
        backgroundColor: colors.spotifyBlack,
        minHeight: '100vh',
        color: colors.spotifyWhite,
        ...fontStyle,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <h1 style={{ color: colors.spotifyGreen, marginBottom: isMobile ? '20px' : '0' }}>Song Plus Song</h1>
        <button onClick={handleAboutClick} style={buttonStyle}>
          About
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginBottom: '30px',
            width: '100%',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <div style={columnStyle}>
            <h2 style={headerStyle}>Song 1</h2>
            {song1 ? (
              renderSong(song1, 'Selected Song 1', matchedSong ? genreInfo?.genre1 : null)
            ) : (
              <SearchWidget onSongSelect={(song) => handleSongSelect(song, 1)} songNumber={1} />
            )}
            {song1 && (
              <button
                onClick={() => handleBack(1)}
                disabled={isLoading}
                style={{ ...buttonStyle, marginTop: '10px' }}
              >
                Change Song
              </button>
            )}
          </div>
          {(song1 || song2) && <div style={symbolStyle}>+</div>}
          <div style={columnStyle}>
            <h2 style={headerStyle}>Song 2</h2>
            {song2 ? (
              renderSong(song2, 'Selected Song 2', matchedSong ? genreInfo?.genre2 : null)
            ) : (
              <SearchWidget onSongSelect={(song) => handleSongSelect(song, 2)} songNumber={2} />
            )}
            {song2 && (
              <button
                onClick={() => handleBack(2)}
                disabled={isLoading}
                style={{ ...buttonStyle, marginTop: '10px' }}
              >
                Change Song
              </button>
            )}
          </div>
          {(song1 || song2) && <div style={symbolStyle}>=</div>}
          <div style={columnStyle}>
            <h2 style={headerStyle}>Matched Song</h2>
            {matchedSong ? (
              renderSong(matchedSong.song, 'Matched Song', genreInfo?.matchedGenre)
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  color: colors.spotifyGrey,
                  backgroundColor: colors.spotifyBlack,
                  padding: '20px',
                  borderRadius: '8px',
                  height: '360px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                Select two songs to find a match
              </div>
            )}
            {matchedSong && (
              <button
                onClick={handleGenerateNew}
                disabled={isLoading}
                style={{ ...buttonStyle, marginTop: '10px' }}
              >
                {isLoading ? 'Generating...' : 'Generate New Song'}
              </button>
            )}
          </div>
        </div>
        {!matchedSong && (
          <div
            style={{
              textAlign: 'center',
              marginTop: '20px',
              color: colors.spotifyWhite,
              fontSize: '1em',
            }}
          >
            Select two songs to generate a song that is the closest genre to both songs.
          </div>
        )}
        {matchedSong && genreInfo && (
          <div style={{ textAlign: 'center' }}>
            <div style={genreInfoStyle}>
              Most similar genre to {genreInfo.genre1} and {genreInfo.genre2} is {genreInfo.matchedGenre}
            </div>
            {spotifyUrl && (
              <div onClick={handleSpotifyClick} style={spotifyLinkStyle}>
                Listen on Spotify
              </div>
            )}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {song1 && song2 && !matchedSong && (
            <button
              onClick={handleMatchSongs}
              disabled={isLoading}
              style={{ ...buttonStyle, maxWidth: '250px' }}
            >
              {isLoading ? 'Matching...' : 'Generate Song'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;