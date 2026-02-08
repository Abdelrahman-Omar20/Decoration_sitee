import React from 'react';

interface VideoPlayerProps {
    url: string;
    title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
    // Helper to determine if URL is a YouTube link
    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeId = getYoutubeId(url);

    if (youtubeId || url.includes('youtube.com/embed/')) {
        const embedUrl = youtubeId
            ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1`
            : url;

        return (
            <div className="video-player-container">
                <iframe
                    title={title}
                    src={embedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="video-iframe"
                ></iframe>
            </div>
        );
    }

    // Default to HTML5 video for direct links or uploaded files
    return (
        <video controls autoPlay className="video-player">
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoPlayer;
