import React from 'react';
import './video.css';
interface YouTubeVideoProps {
  embedId: string; 
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ embedId }) => {
  return (
    <div className="video-responsive">
      <iframe
        width="100%" 
        height="315"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen 
        title="Embedded YouTube video" 
      />
    </div>
  );
};

export default YouTubeVideo;