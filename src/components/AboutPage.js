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
          I used React for the frontend development as well as Node and Express for the backend. The website uses Spotify's Web API to fetch song data and metadata, and integrates the Spotify Playback SDK to allow in-browser playback of song previews.
        </p>
        <p className="about-section-text">
          To calculate the most musically compatible genre between two input songs, I use genre data sourced from <a href="https://everynoise.com" target="_blank" rel="noopener noreferrer" className="about-link">EveryNoise</a>, a massive genre taxonomy created by Glenn McDonald. Every genre is embedded into vector space using OpenAI's text embedding models, which allows Song Plus Song to semantically compare and average genres in a mathematically meaningful way. This makes the recommendation engine more dynamic, flexible, and capable of finding genre connections even when the input songs seem unrelated.
        </p>
        <p className="about-section-text">
          The result is a new song pulled from Spotify whose genre is the closest match to both of your inputs — calculated using real natural language processing techniques.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Is This Safe To Use?</h2>
        <p className="about-section-text">
          Yes! Song Plus Song does not require any of your Spotify account data. The generated song simply provides a direct link to listen to it on Spotify.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Contact</h2>
        <p className="about-section-text">
          Questions? Comments? Suggestions? Feel free to email me at thomasjohnliautaud@gmail.com.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
