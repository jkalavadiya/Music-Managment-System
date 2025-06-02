import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaMusic, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the authentication token
        localStorage.removeItem('token');
        // Redirect to login page
        navigate('/login');
    };

    return (
        <div className='dashboard-layout'>
            <aside className='sidebar'>
                <nav className='sidebar-nav'>
                    <Link to='/' className='nav-item'>
                        <FaHome className='nav-icon' />
                        <span>Home</span>
                    </Link>
                    <Link to='/playlists' className='nav-item'>
                        <FaMusic className='nav-icon' />
                        <span>Playlists</span>
                    </Link>
                    <Link to='/profile' className='nav-item active'>
                        <FaUser className='nav-icon' />
                        <span>Profile</span>
                    </Link>
                </nav>
            </aside>
            <main className='main-content'>
                <div className='profile-container'>
                    <div className='profile-header'>
                        <h2>Profile</h2>
                    </div>
                    <div className='profile-content'>
                        <div className='profile-icon'>
                            <FaUser size={80} />
                        </div>
                        <div className='profile-info'>
                            <h3>User Profile</h3>
                            <p>Welcome to your profile page!</p>
                        </div>
                        <button
                            className='logout-button'
                            onClick={handleLogout}>
                            <FaSignOutAlt className='logout-icon' />
                            Logout
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
