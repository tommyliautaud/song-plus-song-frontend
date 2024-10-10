import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMediaQuery } from '@mui/material';
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
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif',
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

  
  // In your App component, update the renderSong function:
  const renderSong = (song, title, genre) => {
    if (!song) return null;

  const imageUrl = song.album?.images?.[1]?.url || song.coverArt || 'placeholder-image-url.jpg';
  const spotifyUrl = song.external_urls?.spotify || song.url;

  const handleSongClick = () => {
    if (spotifyUrl) {
      window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('Spotify link is not available for this song.');
    }
  };

  const truncatedTextStyle = {
    width: '100%',
    maxHeight: '3.6em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  };

  const minLogoSize = 70; // Minimum width of the logo in pixels
  const logoSize = Math.max(minLogoSize, 100); // Use 100px or minLogoSize, whichever is larger
  const exclusionZone = logoSize / 4;

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
        height: '470px',
        justifyContent: 'flex-start',
        overflow: 'hidden', // Add this to prevent content from spilling out
      }}
    >
      <div style={{ marginBottom: '8px', height: '20px' }}>
        {genre && (
          <div style={{ color: colors.spotifyGrey, fontSize: '0.9em' }}>Genre: {genre}</div>
        )}
      </div>
      <h3 style={{ color: colors.spotifyWhite, marginBottom: '8px', fontWeight: 900, fontSize: '0.9em' }}>
        {title}
      </h3>
      <div style={{
        backgroundColor: colors.spotifyBlack,
        padding: `${exclusionZone}px 0`, // Changed to only have vertical padding
        marginBottom: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}>
        <img
          src="Spotify_Full_Logo_RGB_Green.png"
          alt="Spotify Logo"
          style={{
            width: `${logoSize}px`,
            height: 'auto',
          }}
        />
      </div>
      <img
        src={imageUrl}
        alt={`${song.name} album cover`}
        style={{ width: '150px', height: '150px', marginBottom: '12px', borderRadius: '4px' }}
      />
      <div 
        onClick={handleSongClick}
        style={{ 
          ...truncatedTextStyle,
          fontWeight: 'bold', 
          color: colors.spotifyGreen,
          fontSize: '0.9em', 
          cursor: 'pointer',
          textDecoration: 'underline',
          marginBottom: '8px',
        }}
      >
        {song.name}
        {song.explicit && (
          <span style={{
            marginLeft: '5px',
            padding: '2px 4px',
            backgroundColor: colors.spotifyGrey,
            color: colors.spotifyBlack,
            fontSize: '0.7em',
            fontWeight: 'bold',
            borderRadius: '2px',
          }}>
            E
          </span>
        )}
      </div>
      <div style={{ 
        ...truncatedTextStyle,
        fontSize: '0.8em', 
        color: colors.spotifyGrey, 
        marginBottom: '8px',
      }}>
        {song.album?.name || 'Unknown Album'}
      </div>
      <div style={{ 
        ...truncatedTextStyle,
        fontSize: '0.8em', 
        color: colors.spotifyGrey, 
        marginBottom: '20px',
      }}>
        {song.artists.map((artist) => artist.name).join(', ')}
      </div>
      <div style={{ 
        height: '32px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
      }}>
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
    maxWidth: '250px',
  };

  const symbolStyle = {
    fontSize: '40px',
    color: colors.spotifyWhite,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isMobile ? '100%' : '60px',
    height: isMobile ? '60px' : '60px',
    marginTop: isMobile ? '5px' : '256px', // Increased from 180px to 210px
  };

  const columnStyle = {
    width: isMobile ? '100%' : '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: isMobile ? '40px' : '20px', // Increased from 30px and 0
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
    padding: '10px',
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
        height: '100%', // Add this
        color: colors.spotifyWhite,
        ...fontStyle,
        display: 'flex',
        flexDirection: 'column',
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
        <h1 style={{ color: colors.spotifyWhite, marginBottom: isMobile ? '20px' : '0' }}>Song Plus Song</h1>
        <button onClick={handleAboutClick} style={buttonStyle}>
          About
        </button>
      </div>
      {isMobile && !matchedSong && (<div
          style={{
            textAlign: 'center',
            marginTop: '20px',
            color: colors.spotifyWhite,
            fontSize: '1em',
          }}
        >
          Select two songs to generate a song that is the closest genre to both songs.
        </div>)}
      <div id="outer-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-center',
          flex: 1,
        }}
      >
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
                style={{ ...buttonStyle, marginTop: '20px' }} // Increased from 10px
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
                style={{ ...buttonStyle, marginTop: '20px' }}
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
            {matchedSong && genreInfo && isMobile && (
          <div style={{ textAlign: 'center', marginTop: isMobile ? '20px' : '30px' }}>
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
        {matchedSong && isMobile && (
              <button
                onClick={handleGenerateNew}
                disabled={isLoading}
                style={{ ...buttonStyle, marginTop: '10px' }}
              >
                {isLoading ? 'Generating...' : 'Generate New Song'}
              </button>
            )}
            {matchedSong && !isMobile && (
              <button
                onClick={handleGenerateNew}
                disabled={isLoading}
                style={{ ...buttonStyle, marginTop: '20px' }}
              >
                {isLoading ? 'Generating...' : 'Generate New Song'}
              </button>
            )}
            <div style={{ textAlign: 'center', marginTop: '30px' }}> {/* Increased from 20px */}
              {song1 && song2 && !matchedSong && isMobile && (
              <button
                onClick={handleMatchSongs}
                disabled={isLoading}
                style={buttonStyle}
              >
              {isLoading ? 'Matching...' : 'Generate Song'}
              </button>
              )}
            </div>
          </div>
        </div>
        {matchedSong && genreInfo && !isMobile && (
          <div style={{ textAlign: 'center', marginTop: isMobile ? '20px' : '30px' }}>
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
        {!matchedSong && !isMobile && (
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
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px' }}> {/* Increased from 20px */}
        {song1 && song2 && !matchedSong && !isMobile && (
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
  );
}

export default App;