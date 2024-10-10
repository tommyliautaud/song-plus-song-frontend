import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchWidget.css';

function SearchWidget({ onSongSelect, songNumber }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        searchSpotify(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchSpotify = async (query) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search`, {
        params: { query },
      });
      setSearchResults(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error searching:', error.response || error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={`Search for Song ${songNumber}`}
        className="search-input"
      />

      <div className="search-results">
        <ul className="result-list">
          {searchResults.slice(0, 5).map((track) => (
            <li
              key={track.id}
              onClick={() => onSongSelect(track)}
              className="result-item"
            >
              <img
                src={track.album.images[2]?.url || 'placeholder-image-url.jpg'}
                alt={`${track.name} album cover`}
                className="result-image"
              />
              <div className="result-text-container">
                <div className="result-text result-name">{truncateText(track.name, 30)}</div>
                <div className="result-text result-album">{truncateText(track.album.name, 40)}</div> {/* Display album name */}
                <div className="result-text result-artist">
                  {truncateText(track.artists.map(artist => artist.name).join(', '), 40)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchWidget;