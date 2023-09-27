import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

function LogoutButton() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8000/logout');
            setUser(null); // Set user to null in user context
            // Clear token cookie
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigate('/CS361-Spelling-Bee/login');
        } catch (error) {
            console.error('Error during logout', error);
        }
    };

    return (
        <button onClick={handleLogout} className = 'logoutButton'>Logout</button>
    );
}

export default LogoutButton;