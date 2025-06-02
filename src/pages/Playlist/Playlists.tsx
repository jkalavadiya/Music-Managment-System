import React, { useState } from 'react';
import './Playlists.css';
import {
    FaHome,
    FaMusic,
    FaUser,
    FaPlus,
    FaEdit,
    FaTrash,
    FaHeadphones,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PlayerBar from '../../components/PlayerBar/PlayerBar';
import SongSearch from '../../components/SongSearch/SongSearch';

interface Playlist {
    id: number;
    name: string;
    cover: string;
    songCount: number;
}

const dummyPlaylists: Playlist[] = [
    {
        id: 1,
        name: 'My Favorite Songs',
        cover: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663bb',
        songCount: 25,
    },
    {
        id: 2,
        name: 'Workout Mix',
        cover: 'https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1',
        songCount: 18,
    },
    {
        id: 3,
        name: 'Chill Vibes',
        cover: 'https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1',
        songCount: 32,
    },
    {
        id: 4,
        name: 'Party Time',
        cover: 'https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1',
        songCount: 15,
    },
];

export default function Playlists() {
    const [playlists, setPlaylists] = useState<Playlist[]>(dummyPlaylists);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editing, setEditing] = useState<number | null>(null);
    const [editName, setEditName] = useState('');
    const [editCover, setEditCover] = useState('');
    const [newName, setNewName] = useState('');
    const [newCover, setNewCover] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newPlaylist: Playlist = {
            id: Date.now(),
            name: newName,
            cover:
                newCover ||
                'https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1',
            songCount: 0,
        };
        setPlaylists([...playlists, newPlaylist]);
        setNewName('');
        setNewCover('');
        setShowModal(false);
    };

    const handleEdit = (id: number) => {
        const pl = playlists.find((p) => p.id === id);
        if (pl) {
            setEditing(id);
            setEditName(pl.name);
            setEditCover(pl.cover);
            setShowEditModal(true);
        }
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setPlaylists(
            playlists.map((p) =>
                p.id === editing
                    ? { ...p, name: editName, cover: editCover }
                    : p
            )
        );
        setEditing(null);
        setShowEditModal(false);
    };

    const handleDelete = (id: number) => {
        setPlaylists(playlists.filter((p) => p.id !== id));
    };

    return (
        <div className='dashboard-layout'>
            <aside className='sidebar'>
                <nav className='sidebar-nav'>
                    <div className='nav-item'>
                        <FaHome className='nav-icon' />
                        <span>Home</span>
                    </div>
                    <Link to='/songs' className='nav-item'>
                        <FaHeadphones className='nav-icon' />
                        <span>Songs</span>
                    </Link>
                    <Link to='/playlists' className='nav-item active'>
                        <FaMusic className='nav-icon' />
                        <span>Playlists</span>
                    </Link>
                    <Link to='/profile' className='nav-item'>
                        <FaUser className='nav-icon' />
                        <span>Profile</span>
                    </Link>
                </nav>
            </aside>
            <main className='main-content'>
                <div className='playlist-header'>
                    <h2>Playlists</h2>
                </div>
                <SongSearch />
                <div className='playlist-list'>
                    <div
                        className='playlist-card add-card'
                        onClick={() => setShowModal(true)}>
                        <div className='add-card-content'>
                            <FaPlus className='add-card-icon' />
                            <span>Add Playlist</span>
                        </div>
                    </div>
                    {playlists.map((pl) => (
                        <div className='playlist-card' key={pl.id}>
                            <img src={pl.cover} alt={pl.name} />
                            <div className='playlist-info'>
                                <h3>{pl.name}</h3>
                                <span>{pl.songCount} songs</span>
                                <div className='card-actions'>
                                    <button
                                        className='icon-btn edit-btn'
                                        title='Edit Playlist'
                                        onClick={() => handleEdit(pl.id)}>
                                        <FaEdit />
                                    </button>
                                    <button
                                        className='delete-btn'
                                        title='Delete Playlist'
                                        onClick={() => handleDelete(pl.id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {showModal && (
                    <div
                        className='modal-overlay'
                        onClick={() => setShowModal(false)}>
                        <div
                            className='modal'
                            onClick={(e) => e.stopPropagation()}>
                            <form
                                className='playlist-form'
                                onSubmit={handleAdd}>
                                <h4>Add New Playlist</h4>
                                <input
                                    type='text'
                                    placeholder='Playlist name'
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    required
                                />
                                <input
                                    type='text'
                                    placeholder='Cover image URL (optional)'
                                    value={newCover}
                                    onChange={(e) =>
                                        setNewCover(e.target.value)
                                    }
                                />
                                <div className='form-buttons'>
                                    <button type='submit'>Add Playlist</button>
                                    <button
                                        type='button'
                                        onClick={() => setShowModal(false)}
                                        className='cancel-btn'>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {showEditModal && (
                    <div
                        className='modal-overlay'
                        onClick={() => {
                            setShowEditModal(false);
                            setEditing(null);
                        }}>
                        <div
                            className='modal'
                            onClick={(e) => e.stopPropagation()}>
                            <form
                                className='playlist-form'
                                onSubmit={handleUpdate}>
                                <h4>Edit Playlist</h4>
                                <input
                                    type='text'
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                    required
                                />
                                <input
                                    type='text'
                                    value={editCover}
                                    onChange={(e) =>
                                        setEditCover(e.target.value)
                                    }
                                />
                                <div className='form-buttons'>
                                    <button type='submit'>Update</button>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setEditing(null);
                                        }}
                                        className='cancel-btn'>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
            <PlayerBar
                currentTrack={{
                    title: 'Sample Track',
                    artist: 'Sample Artist',
                    cover: 'https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663bb',
                }}
            />
        </div>
    );
}
