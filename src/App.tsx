import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Playlists from './pages/Playlist/Playlists';
import Profile from './pages/Profile/Profile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/playlists' element={<Playlists />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/' element={<Navigate to='/login' replace />} />
            </Routes>
        </Router>
    );
}

export default App;
