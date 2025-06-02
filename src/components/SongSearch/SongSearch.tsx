import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SongSearch.css';

interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[];
    };
}

const SongSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const SPOTIFY_CLIENT_ID = 'YOUR_SPOTIFY_CLIENT_ID';
    const SPOTIFY_CLIENT_SECRET = 'YOUR_SPOTIFY_CLIENT_SECRET';

    const getSpotifyToken = async () => {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization:
                    'Basic ' +
                    btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET),
            },
            body: 'grant_type=client_credentials',
        });

        const data = await response.json();

        console.log(data, 'data');
        return data.access_token;
    };

    const searchSongs = async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const token = await getSpotifyToken();
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                    query
                )}&type=track&limit=10`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }

            const data = await response.json();
            setSearchResults(data.tracks.items);
        } catch (err) {
            setError('Failed to search songs. Please try again.');
            console.error('Search error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                searchSongs(searchQuery);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    return (
        <div className='song-search-container'>
            <div className='search-input-container'>
                <FaSearch className='search-icon' />
                <input
                    type='text'
                    placeholder='Search for songs...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='search-input'
                />
            </div>

            {isLoading && <div className='loading'>Searching...</div>}
            {error && <div className='error'>{error}</div>}

            <div className='search-results'>
                {searchResults.map((track) => (
                    <div key={track.id} className='track-item'>
                        <img
                            src={track.album.images[0]?.url}
                            alt={track.name}
                            className='track-image'
                        />
                        <div className='track-info'>
                            <h3>{track.name}</h3>
                            <p>
                                {track.artists
                                    .map((artist) => artist.name)
                                    .join(', ')}
                            </p>
                            <p className='album-name'>{track.album.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SongSearch;
