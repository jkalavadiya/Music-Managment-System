import React, { useState, useRef } from 'react';
import {
    FaPlay,
    FaPause,
    FaStepForward,
    FaStepBackward,
    FaVolumeUp,
} from 'react-icons/fa';
import './PlayerBar.css';

interface PlayerBarProps {
    currentTrack?: {
        title: string;
        artist: string;
        cover: string;
    };
}

const PlayerBar: React.FC<PlayerBarProps> = ({ currentTrack }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseInt(e.target.value);
        setProgress(newProgress);
        if (audioRef.current) {
            const time = (newProgress / 100) * (audioRef.current.duration || 0);
            audioRef.current.currentTime = time;
        }
    };

    return (
        <div className='player-bar'>
            <div className='now-playing'>
                {currentTrack && (
                    <>
                        <img
                            src={currentTrack.cover}
                            alt={currentTrack.title}
                            className='track-cover'
                        />
                        <div className='track-info'>
                            <div className='track-title'>
                                {currentTrack.title}
                            </div>
                            <div className='track-artist'>
                                {currentTrack.artist}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className='player-controls'>
                <button className='control-btn' onClick={() => {}}>
                    <FaStepBackward />
                </button>
                <button className='control-btn play-btn' onClick={togglePlay}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className='control-btn' onClick={() => {}}>
                    <FaStepForward />
                </button>
            </div>

            <div className='progress-container'>
                <input
                    type='range'
                    min='0'
                    max='100'
                    value={progress}
                    onChange={handleProgressChange}
                    className='progress-bar'
                />
            </div>

            <div className='volume-control'>
                <FaVolumeUp />
                <input
                    type='range'
                    min='0'
                    max='100'
                    value={volume}
                    onChange={handleVolumeChange}
                    className='volume-slider'
                />
            </div>
        </div>
    );
};

export default PlayerBar;
