import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Song Plus Song</h1>

      <div className="about-section">
        <h2 className="about-section-title">Inspiration</h2>
        <p className="about-section-text">
          I came up with the idea for Song Plus Song because I wanted to build a website that would allow people to find new music based off of their favorite kinds of music. If the people that use this site are anything like me, I like to listen to music across a great range of genres, and I wanted to know if there was a tool I could build that could help people find new music to listen to even if the genres of the songs they put into this website are wildly different.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">How This Works</h2>
        <p className="about-section-text">
          I used React for the frontend development as well as Node and Express for the backend development. The website itself uses Spotify's Web API to fetch the songs alongside their metadata as well as the Spotify Playback SDK to offer in browser playability for the song snippets.
        </p>
        <p className="about-section-text">
          Additionally, in order to calculate the most similar genre to the input genres, I used the genre information provided by <a href="https://everynoise.com" target="_blank" rel="noopener noreferrer" className="about-link">everynoise.com</a>. EveryNoise was made by Glenn McDonald. Without this site he built, this effort would not have been made possible and I commend him for the amazing work he did to bring EveryNoise to life.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Is This Safe To Use?</h2>
        <p className="about-section-text">
          Yes! Song Plus Song does not require any of the user's Spotify data. The generated song provides a link to listen to the song in Spotify.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Contact</h2>
        <p className="about-section-text">
          Questions? Comments? Concerns? Email me at @thomasjohnliautaud@gmail.com.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;